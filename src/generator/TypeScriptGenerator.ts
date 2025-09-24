import * as AST from "../ast/nodes.ts";

interface ExtendedNode {
  __sourceModule?: string;
  __sourceInterface?: string;
}

export interface GeneratorOptions {
  includeStubs?: boolean;
  includeSkeletons?: boolean;
  emitHelpers?: boolean;
  sourceFile?: string;
  corbaImportPath?: string; // Custom import path for CORBA
}

interface ModuleOutput {
  name: string;
  content: string[];
  imports: Set<string>; // Track dependencies on other modules
  typeImports: Set<string>; // Track type-only imports
  corbaImports: Set<string>; // Track which CORBA imports are used (TypeCode, create_request, CorbaStub, etc.)
  corbaTypeImports: Set<string>; // Track which CORBA type imports are used (CORBA)
  definitions: AST.DefinitionNode[]; // Store the AST definitions for lookup
}

export class TypeScriptGenerator {
  // TypeScript/JavaScript reserved words that need escaping
  private static readonly RESERVED_WORDS = new Set([
    // JavaScript reserved words
    'break', 'case', 'catch', 'class', 'const', 'continue', 'debugger', 'default',
    'delete', 'do', 'else', 'export', 'extends', 'finally', 'for', 'function',
    'if', 'import', 'in', 'instanceof', 'new', 'return', 'super', 'switch',
    'this', 'throw', 'try', 'typeof', 'var', 'void', 'while', 'with', 'yield',

    // TypeScript reserved words
    'abstract', 'any', 'boolean', 'constructor', 'declare', 'get', 'implements',
    'interface', 'let', 'module', 'namespace', 'never', 'number', 'object',
    'package', 'private', 'protected', 'public', 'readonly', 'require', 'set',
    'static', 'string', 'symbol', 'type', 'undefined', 'unique', 'unknown',

    // IDL-specific keywords that could conflict with TypeScript
    'struct', 'union', 'exception',

    // Future reserved words
    'enum', 'await', 'async',

    // Global identifiers that could cause conflicts
    'Array', 'Object', 'String', 'Number', 'Boolean', 'Date', 'RegExp', 'Error',
    'Promise', 'Map', 'Set', 'JSON', 'Math', 'console', 'window', 'document',

    // CORBA-specific identifiers we want to avoid conflicts with
    'CORBA', 'TypeCode', 'ObjectRef', 'CorbaStub'
  ]);

  private options: GeneratorOptions;
  private indentLevel: number = 0;
  private output: string[] = [];
  private currentModulePrefix: string = "";
  private currentModule: string = ""; // Track current module for multi-file
  private currentModuleDefinitions: AST.DefinitionNode[] | null = null; // Track current module definitions
  private modules: Map<string, ModuleOutput> = new Map();
  private rootModule: ModuleOutput | null = null;
  private nestedTypes: Map<string, string> = new Map(); // Maps nested type to parent_type
  private currentModuleOutput: ModuleOutput | null = null; // Current module being generated
  private pragmas: Map<string, string> = new Map(); // Store global pragmas
  private scopedPragmas: Map<string, Map<string, string>> = new Map(); // Store scoped pragmas (version, ID)
  private typeRegistry: Map<string, { kind: string; node?: AST.DefinitionNode }> = new Map(); // Track type definitions for CDR marshaling
  private structMarshalCode: Map<string, { unmarshal: string; marshal: string }> = new Map(); // Cache struct marshal code
  private currentInterface: string | null = null; // Track the current interface context for nested type resolution

  constructor(options: GeneratorOptions = {}) {
    this.options = {
      includeStubs: true,
      includeSkeletons: true,
      emitHelpers: true,
      corbaImportPath: "corba", // Default CORBA import (use import map for Deno)
      ...options,
    };
  }

  /**
   * Escapes TypeScript/JavaScript reserved words by appending underscore
   */
  private escapeReservedWord(identifier: string): string {
    if (TypeScriptGenerator.RESERVED_WORDS.has(identifier)) {
      return `${identifier}_`;
    }
    return identifier;
  }

  private addImport(moduleName: string, isTypeOnly: boolean = false): void {
    if (this.currentModuleOutput) {
      if (isTypeOnly) {
        this.currentModuleOutput.typeImports.add(moduleName);
      }
      else {
        this.currentModuleOutput.imports.add(moduleName);
      }
    }
  }

  private markCorbaImportUsed(importName: string): void {
    if (this.currentModuleOutput) {
      this.currentModuleOutput.corbaImports.add(importName);
    }
  }

  private markCorbaTypeUsed(): void {
    if (this.currentModuleOutput) {
      this.currentModuleOutput.corbaTypeImports.add("CORBA");
    }
  }

  private resolveTypeName(
    typeName: string,
    isTypeOnly: boolean = false,
  ): string {
    if (typeName.includes("::")) {
      // Handle global scope references like ::Module::Type
      let parts = typeName.split("::");

      // Remove empty first element if starts with ::
      if (parts[0] === "") {
        parts = parts.slice(1);
      }

      if (parts.length >= 2) {
        const moduleName = parts[0];
        const type = parts.slice(1).join("_");
        if (moduleName !== this.currentModule) {
          this.addImport(moduleName, isTypeOnly);
          return `${moduleName}.${type}`;
        }
        return type;
      }
    }
    return this.getPrefixedName(typeName);
  }

  generate(ast: AST.SpecificationNode): Map<string, string> {
    this.output = [];
    this.indentLevel = 0;
    this.modules.clear();
    this.currentModule = "";
    // Don't clear typeRegistry - let it accumulate across all modules
    // this.typeRegistry.clear();

    // Store pragmas from the AST
    if (ast.pragmas) {
      this.pragmas = new Map(ast.pragmas);
      this.processPragmas(ast.pragmas);
    }

    // Initialize root module for top-level definitions
    this.rootModule = {
      name: "_root",
      content: [],
      imports: new Set<string>(),
      typeImports: new Set<string>(),
      corbaImports: new Set<string>(),
      corbaTypeImports: new Set<string>(),
      definitions: ast.definitions,
    };
    this.currentModuleOutput = this.rootModule;

    // Process all definitions
    for (const def of ast.definitions) {
      this.generateDefinition(def);
    }

    // Generate output for each module
    const outputFiles = new Map<string, string>();

    // Process root module if it has content
    if (this.rootModule.content.length > 0) {
      const rootOutput = this.generateModuleFile(this.rootModule, "index");
      outputFiles.set("index.ts", rootOutput);
    }

    // Process named modules
    for (const [name, module] of this.modules) {
      const moduleOutput = this.generateModuleFile(module, name);
      outputFiles.set(`${name}.ts`, moduleOutput);
    }

    return outputFiles;
  }

  private generateModuleFile(module: ModuleOutput, moduleName: string): string {
    const lines: string[] = [];

    // Get version from package.json
    const version = "1.3.0"; // Version from deno.json

    // Add header comment
    lines.push("/**");
    lines.push(" * This file was automatically generated by idl2ts");
    lines.push(" * DO NOT EDIT THIS FILE DIRECTLY");
    lines.push(" *");
    lines.push(` * Source: ${this.options.sourceFile || "unknown"}`);
    if (moduleName !== "index") {
      lines.push(` * Module: ${moduleName}`);
    }
    lines.push(" * Generated on: " + new Date().toISOString());
    lines.push(` * idl2ts version: ${version}`);
    lines.push(" */");
    lines.push("");

    // Add CORBA imports only if needed
    const hasValueImports = module.corbaImports.size > 0;
    const hasTypeImports = module.corbaTypeImports.size > 0;

    if (hasValueImports && hasTypeImports) {
      // Both value and type usage - combine them and deduplicate
      const allImports = [
        ...new Set([...module.corbaImports, ...module.corbaTypeImports]),
      ];
      lines.push(
        `import { ${allImports.join(", ")} } from "${this.options.corbaImportPath || "corba"}";`,
      );
    }
    else if (hasTypeImports && !hasValueImports) {
      // Type-only usage
      const typeImports = [...module.corbaTypeImports];
      lines.push(
        `import type { ${typeImports.join(", ")} } from "${this.options.corbaImportPath || "corba"}";`,
      );
    }
    else if (hasValueImports) {
      // Value-only usage
      const valueImports = [...module.corbaImports];
      lines.push(
        `import { ${valueImports.join(", ")} } from "${this.options.corbaImportPath || "corba"}";`,
      );
    }

    // Add imports from other modules
    // Handle type-only imports
    if (module.typeImports.size > 0) {
      for (const imp of module.typeImports) {
        // Check if this module is also imported for values
        if (!module.imports.has(imp)) {
          lines.push(`import type * as ${imp} from "./${imp}.ts";`);
        }
      }
    }

    // Handle value imports (which can also be used for types)
    if (module.imports.size > 0) {
      for (const imp of module.imports) {
        lines.push(`import * as ${imp} from "./${imp}.ts";`);
      }
    }

    // Add empty line after imports if any were added
    const hasImports = module.corbaImports.size > 0 ||
      module.corbaTypeImports.size > 0 ||
      module.imports.size > 0 || module.typeImports.size > 0;
    if (hasImports) {
      lines.push("");
    }

    // Add module content
    for (const line of module.content) {
      lines.push(line);
    }

    return lines.join("\n");
  }

  private generateDefinition(node: AST.DefinitionNode): void {
    switch (node.kind) {
      case "module":
        this.generateModule(node);
        break;
      case "interface":
        this.generateInterface(node);
        break;
      case "struct":
        this.generateStruct(node);
        break;
      case "union":
        this.generateUnion(node);
        break;
      case "enum":
        this.generateEnum(node);
        break;
      case "typedef":
        this.generateTypedef(node);
        break;
      case "constant":
        this.generateConstant(node);
        break;
      case "exception":
        this.generateException(node);
        break;
      case "native":
        this.generateNative(node);
        break;
    }
  }

  private generateModule(node: AST.ModuleNode): void {
    // Save current context
    const savedOutput = this.output;
    const savedModule = this.currentModule;
    const savedPrefix = this.currentModulePrefix;
    const savedNestedTypes = new Map(this.nestedTypes);
    const savedModuleDefinitions = this.currentModuleDefinitions;

    // Get or create module (handle module reopening)
    this.currentModule = node.name;
    this.currentModuleDefinitions = node.definitions;
    let moduleOutput = this.modules.get(node.name);
    if (!moduleOutput) {
      moduleOutput = {
        name: node.name,
        content: [],
        imports: new Set<string>(),
        typeImports: new Set<string>(),
        corbaImports: new Set<string>(),
        corbaTypeImports: new Set<string>(),
        definitions: [],
      };
      this.modules.set(node.name, moduleOutput);
    }

    // Merge definitions (module reopening)
    moduleOutput.definitions.push(...node.definitions);
    this.output = moduleOutput.content;
    this.currentModuleOutput = moduleOutput;
    this.currentModulePrefix = ""; // No prefix in multi-file mode
    this.nestedTypes.clear(); // Clear nested types for new module

    // Generate module content
    for (const def of node.definitions) {
      this.generateDefinition(def);
    }

    // Restore context
    this.output = savedOutput;
    this.currentModule = savedModule;
    this.currentModulePrefix = savedPrefix;
    this.nestedTypes = savedNestedTypes;
    this.currentModuleDefinitions = savedModuleDefinitions;
    this.currentModuleOutput = savedModule ? this.modules.get(savedModule) || this.rootModule : this.rootModule;
  }

  private generateInterface(node: AST.InterfaceNode): void {
    // Set the current interface context
    const prevInterface = this.currentInterface;
    this.currentInterface = node.name;

    // Register type for CDR marshaling with both qualified and unqualified names
    const fullName = this.currentModulePrefix ? `${this.currentModulePrefix}::${node.name}` : node.name;
    this.typeRegistry.set(fullName, { kind: 'interface', node });
    // Also register with just the name for local lookups
    this.typeRegistry.set(node.name, { kind: 'interface', node });
    // Check if code generation is inhibited for this type
    if (this.shouldInhibitCodeGeneration(node.name)) {
      this.currentInterface = prevInterface;
      return;
    }

    // First, extract and generate any nested types with prefixed names
    for (const member of node.members) {
      if (
        member.kind === "enum" || member.kind === "struct" ||
        member.kind === "typedef" || member.kind === "constant" ||
        member.kind === "exception" || member.kind === "union"
      ) {
        // Generate nested type at module level with parent interface prefix
        const nestedDef = member as AST.DefinitionNode;
        const originalName = (nestedDef as { name: string }).name;
        if (originalName) {
          const prefixedName = `${node.name}_${originalName}`;
          // Always track nested types, but we'll be smart about when to use them
          this.nestedTypes.set(originalName, prefixedName);
          // Register the nested type in the global registry with prefixed name
          const fullName = this.currentModulePrefix ? `${this.currentModulePrefix}::${prefixedName}` : prefixedName;
          this.typeRegistry.set(fullName, { kind: nestedDef.kind, node: nestedDef });
          this.typeRegistry.set(prefixedName, { kind: nestedDef.kind, node: nestedDef });
          // Temporarily rename for generation
          (nestedDef as { name: string }).name = prefixedName;
          this.generateDefinition(nestedDef);
          // Restore original name
          (nestedDef as { name: string }).name = originalName;
        }
        else {
          this.generateDefinition(nestedDef);
        }
      }
    }

    const name = this.getPrefixedName(node.name);
    let inheritance = "";
    if (node.inheritance && node.inheritance.length > 0) {
      inheritance = ` extends ${
        node.inheritance.map((i: string) => this.resolveTypeName(i, true)).join(
          ", ",
        )
      }`;
    }
    else {
      inheritance = " extends CORBA.ObjectRef";
      this.markCorbaTypeUsed();
    }

    this.emit(`export interface ${name}${inheritance} {`);
    this.indent();

    // Only generate operations and attributes in the interface body
    for (const member of node.members) {
      if (member.kind === "operation") {
        this.generateOperation(member, node.name);
      }
      else if (member.kind === "attribute") {
        this.generateAttribute(member, node.name);
      }
    }

    this.dedent();
    this.emit("}");
    this.emit("");

    if (this.options.includeStubs) {
      this.generateClientStub(node);
      this.generateInterfaceTypeCode(node);
    }

    if (this.options.includeSkeletons) {
      this.generateServerSkeleton(node);
    }

    // Restore previous interface context
    this.currentInterface = prevInterface;
  }

  private generateOperation(node: AST.OperationNode, interfaceName?: string): void {
    const params = node.parameters.map((p: AST.ParameterNode) => {
      const paramName = p.direction === "out" || p.direction === "inout"
        ? `${p.name}?: ${this.mapType(p.type, true, this.currentModule, interfaceName)}`
        : `${p.name}: ${this.mapType(p.type, true, this.currentModule, interfaceName)}`;
      return paramName;
    }).join(", ");

    // Check if we have out parameters
    const outParams = node.parameters.filter((p: AST.ParameterNode) => p.direction === "out" || p.direction === "inout");
    const hasReturn = node.returnType.kind !== "primitiveType" ||
      node.returnType.type !== "void";

    let returnType: string;
    if (node.isOneway) {
      returnType = "Promise<void>";
    }
    else if (outParams.length === 0) {
      // No out parameters - return just the return value
      returnType = `Promise<${this.mapType(node.returnType, true, this.currentModule, interfaceName)}>`;
    }
    else if (!hasReturn) {
      // Out parameters but void return - return object with just out params
      const outParamTypes = outParams.map((p: AST.ParameterNode) => `${p.name}: ${this.mapType(p.type, true, this.currentModule, interfaceName)}`).join(
        "; ",
      );
      returnType = `Promise<{ ${outParamTypes} }>`;
    }
    else {
      // Both return value and out parameters - return object with both
      const returnValueType = this.mapType(node.returnType, true, this.currentModule, interfaceName);
      const outParamTypes = outParams.map((p: AST.ParameterNode) => `${p.name}: ${this.mapType(p.type, true, this.currentModule, interfaceName)}`).join(
        "; ",
      );
      returnType = `Promise<{ returnValue: ${returnValueType}; ${outParamTypes} }>`;
    }

    this.emit(`${this.escapeReservedWord(node.name)}(${params}): ${returnType};`);
  }

  private generateAttribute(node: AST.AttributeNode, interfaceName?: string): void {
    const tsType = this.mapType(node.type, true, this.currentModule, interfaceName);

    if (node.isReadonly) {
      this.emit(`readonly ${this.escapeReservedWord(node.name)}: ${tsType};`);
      this.emit(`get_${node.name}(): Promise<${tsType}>;`);
    }
    else {
      this.emit(`${this.escapeReservedWord(node.name)}: ${tsType};`);
      this.emit(`get_${node.name}(): Promise<${tsType}>;`);
      this.emit(`set_${node.name}(value: ${tsType}): Promise<void>;`);
    }
  }

  private generateStruct(node: AST.StructNode): void {
    // Register type for CDR marshaling with both qualified and unqualified names
    const fullName = this.currentModulePrefix ? `${this.currentModulePrefix}::${node.name}` : node.name;
    this.typeRegistry.set(fullName, { kind: 'struct', node });
    // Also register with just the name for local lookups
    this.typeRegistry.set(node.name, { kind: 'struct', node });

    // Check if code generation is inhibited for this type
    if (this.shouldInhibitCodeGeneration(node.name)) {
      return;
    }
    const name = this.getPrefixedName(node.name);
    this.emit(`export interface ${name} {`);
    this.indent();

    for (const member of node.members) {
      // Determine the parent interface for nested structs
      // If the struct name contains underscore, it's a nested type
      let parentInterface: string | undefined;
      if (node.name.includes('_') && this.currentInterface) {
        // Extract the parent interface name from the prefixed struct name
        const parts = node.name.split('_');
        if (parts[0] === this.currentInterface) {
          parentInterface = this.currentInterface;
        }
      }

      const tsType = this.mapType(member.type, false, this.currentModule, parentInterface || this.currentInterface || undefined);
      this.emit(`${this.escapeReservedWord(member.name)}: ${tsType};`);
    }

    this.dedent();
    this.emit("}");
    this.emit("");

    // Generate TypeCode for struct if stubs are enabled
    if (this.options.includeStubs) {
      this.generateStructTypeCode(node);
    }
  }

  private processPragmas(pragmas: Map<string, string>): void {
    // Process version and ID pragmas
    for (const [key, value] of pragmas) {
      if (key === "version") {
        // Format: #pragma version InterfaceName major.minor
        const parts = value.split(" ");
        if (parts.length >= 2) {
          const typeName = parts[0];
          const version = parts[1];
          if (!this.scopedPragmas.has(typeName)) {
            this.scopedPragmas.set(typeName, new Map());
          }
          this.scopedPragmas.get(typeName)!.set("version", version);
        }
      }
      else if (key === "ID") {
        // Format: #pragma ID InterfaceName "IDL:custom/path:1.0"
        const parts = value.split(" ");
        if (parts.length >= 2) {
          const typeName = parts[0];
          const customId = parts.slice(1).join(" ").replace(/"/g, "");
          if (!this.scopedPragmas.has(typeName)) {
            this.scopedPragmas.set(typeName, new Map());
          }
          this.scopedPragmas.get(typeName)!.set("ID", customId);
        }
      }
      else if (key === "inhibit_code_generation") {
        // Format: #pragma inhibit_code_generation [TypeName]
        // If TypeName is provided, only that type is inhibited
        // Otherwise, all following types are inhibited
        if (value && value.trim()) {
          const typeName = value.trim();
          if (!this.scopedPragmas.has(typeName)) {
            this.scopedPragmas.set(typeName, new Map());
          }
          this.scopedPragmas.get(typeName)!.set("inhibit", "true");
        }
        else {
          // Global inhibit - mark in global pragmas
          this.pragmas.set("global_inhibit", "true");
        }
      }
    }
  }

  private shouldInhibitCodeGeneration(typeName?: string): boolean {
    // Check global inhibit
    if (this.pragmas.get("global_inhibit") === "true") {
      return true;
    }

    // Check type-specific inhibit
    if (typeName) {
      const typePragmas = this.scopedPragmas.get(typeName);
      if (typePragmas?.get("inhibit") === "true") {
        return true;
      }
    }

    return false;
  }

  private getRepositoryId(
    typeName: string,
    defaultVersion: string = "1.0",
  ): string {
    // Check for custom ID pragma
    const typePragmas = this.scopedPragmas.get(typeName);
    if (typePragmas?.has("ID")) {
      return typePragmas.get("ID")!;
    }

    // Build repository ID with prefix
    const prefix = this.pragmas.get("prefix");
    const modulePath = this.currentModule || "global";

    // Check for version pragma
    const version = typePragmas?.get("version") || defaultVersion;

    if (prefix) {
      // With prefix: IDL:prefix/module/type:version
      return `IDL:${prefix}/${modulePath}/${typeName}:${version}`;
    }
    else {
      // Without prefix: IDL:module/type:version
      return `IDL:${modulePath}/${typeName}:${version}`;
    }
  }

  private generateStructTypeCode(node: AST.StructNode): void {
    const name = this.getPrefixedName(node.name);
    const tcName = `TC_${name}`;

    // Build the repository ID using pragma-aware method
    const repoId = this.getRepositoryId(node.name);

    this.emit(`export const ${tcName} = TypeCode.create_struct_tc(`);
    this.indent();
    this.emit(`"${repoId}",`);
    this.emit(`"${node.name}",`);
    this.emit(`[`);
    this.indent();

    for (let i = 0; i < node.members.length; i++) {
      const member = node.members[i];
      const memberTc = this.getTypeCodeForType(member.type);
      this.emit(
        `{ name: "${member.name}", type: ${memberTc} }${i < node.members.length - 1 ? "," : ""}`,
      );
    }

    this.dedent();
    this.emit(`]`);
    this.dedent();
    this.emit(`);`);
    this.emit("");
    this.markCorbaImportUsed("TypeCode");
  }

  private getTypeCodeForTypeWithContext(
    type: AST.TypeNode,
    sourceModule?: string,
    sourceInterface?: string,
  ): string {
    // If the type is a simple name and we have source context, check if it's a nested type
    if (
      type.kind === "namedType" && !type.name.includes("::") &&
      sourceInterface && sourceModule
    ) {
      // Check if this type exists as a nested type in the source interface
      const flattenedName = `${sourceInterface}_${type.name}`;
      if (sourceModule !== this.currentModule) {
        // Check if the flattened type exists in the source module
        const sourceModuleOutput = this.modules.get(sourceModule);
        if (
          sourceModuleOutput &&
          this.typeExistsInModule(flattenedName, sourceModuleOutput)
        ) {
          this.addImport(sourceModule, false); // Need value import for TypeCode
          return `${sourceModule}.TC_${flattenedName}`;
        }
      }
      else {
        // Same module, check if flattened type exists
        const currentModuleOutput = this.modules.get(this.currentModule) ||
          this.rootModule;
        if (
          currentModuleOutput &&
          this.typeExistsInModule(flattenedName, currentModuleOutput)
        ) {
          return `TC_${flattenedName}`;
        }
      }
    }

    return this.getTypeCodeForType(type);
  }

  private getTypeCodeForType(type: AST.TypeNode): string {
    switch (type.kind) {
      case "primitiveType":
        switch (type.type) {
          case "void":
            return "TypeCode.TC_void";
          case "short":
            return "TypeCode.TC_short";
          case "long":
            return "TypeCode.TC_long";
          case "long long":
            return "TypeCode.TC_longlong";
          case "unsigned short":
            return "TypeCode.TC_ushort";
          case "unsigned long":
            return "TypeCode.TC_ulong";
          case "unsigned long long":
            return "TypeCode.TC_ulonglong";
          case "float":
            return "TypeCode.TC_float";
          case "double":
            return "TypeCode.TC_double";
          case "long double":
            return "TypeCode.TC_longdouble";
          case "char":
            return "TypeCode.TC_char";
          case "wchar":
            return "TypeCode.TC_wchar";
          case "boolean":
            return "TypeCode.TC_boolean";
          case "octet":
            return "TypeCode.TC_octet";
          case "any":
            return "TypeCode.TC_any";
          case "Object":
            return "new TypeCode(TypeCode.Kind.tk_objref)";
          default:
            return "TypeCode.TC_any";
        }
      case "stringType":
        return type.type === "wstring" ? "TypeCode.TC_wstring" : "TypeCode.TC_string";
      case "namedType": {
        // Check if this is a nested type that was prefixed
        const prefixedName = this.nestedTypes.get(type.name);
        if (prefixedName) {
          // Use the prefixed name for the TypeCode
          return `TC_${prefixedName}`;
        }

        // Handle qualified names with :: (like IOMode::InputOutputMode or Module::Type)
        if (type.name.includes("::")) {
          let parts = type.name.split("::");
          // Remove empty first element if starts with ::
          if (parts[0] === "") {
            parts = parts.slice(1);
          }

          // For nested types like InterfaceName::TypeName, we need to find the flattened TypeCode
          if (parts.length === 2) {
            const [interfaceOrModule, typeName] = parts;

            // Check if this is a module reference
            if (this.modules.has(interfaceOrModule)) {
              // It's a module reference
              this.addImport(interfaceOrModule, false);
              return `${interfaceOrModule}.TC_${typeName}`;
            }

            // Otherwise, it's likely a nested type within an interface
            // These get flattened to InterfaceName_TypeName in the same module
            const flattenedName = `${interfaceOrModule}_${typeName}`;
            return `TC_${flattenedName}`;
          }
          else if (parts.length > 2) {
            // Module::Interface::Type pattern
            const moduleName = parts[0];
            const interfaceName = parts[1];
            const typeName = parts.slice(2).join("_");
            this.addImport(moduleName, false);
            return `${moduleName}.TC_${interfaceName}_${typeName}`;
          }
        }

        // Reference to another type's TypeCode
        const typeName = this.resolveTypeName(type.name, false); // false = not type-only, we need the value
        if (typeName.includes(".")) {
          // Cross-module reference
          const parts = typeName.split(".");
          // Ensure we have a value import for the module (for TypeCodes)
          this.addImport(parts[0], false);
          return `${parts[0]}.TC_${parts[1]}`;
        }
        return `TC_${typeName}`;
      }
      case "sequenceType": {
        const elemTc = this.getTypeCodeForType(type.elementType);
        return `TypeCode.create_sequence_tc(${type.bound || 0}, ${elemTc})`;
      }
      case "arrayType": {
        const elementTC = this.getTypeCodeForType(type.elementType);
        return `TypeCode.create_array_tc(${type.dimensions[0]}, ${elementTC})`;
      }
      case "fixedType": {
        return `TypeCode.create_fixed_tc(${type.totalDigits}, ${type.fractionalDigits})`;
      }
      default:
        return "TC_any";
    }
  }

  private generateUnion(node: AST.UnionNode): void {
    // Register type for CDR marshaling with both qualified and unqualified names
    const fullName = this.currentModulePrefix ? `${this.currentModulePrefix}::${node.name}` : node.name;
    this.typeRegistry.set(fullName, { kind: 'union', node });
    // Also register with just the name for local lookups
    this.typeRegistry.set(node.name, { kind: 'union', node });

    // Check if code generation is inhibited for this type
    if (this.shouldInhibitCodeGeneration(node.name)) {
      return;
    }
    const name = this.getPrefixedName(node.name);
    this.emit(`export type ${name} =`);
    this.indent();

    const variants: string[] = [];
    for (const caseNode of node.cases) {
      if (caseNode.member) {
        const discriminatorValue = caseNode.isDefault
          ? '"default"'
          : caseNode.labels.map((l: string | number | boolean) => JSON.stringify(l)).join(" | ");

        variants.push(
          `{ discriminator: ${discriminatorValue}; ${this.escapeReservedWord(caseNode.member.name)}: ${this.mapType(caseNode.member.type)} }`,
        );
      }
    }

    // Output each variant on its own line with proper | formatting
    for (let i = 0; i < variants.length; i++) {
      if (i === variants.length - 1) {
        this.emit(`| ${variants[i]};`);
      }
      else {
        this.emit(`| ${variants[i]}`);
      }
    }
    this.dedent();
    this.emit("");

    // Generate TypeCode for union if stubs are enabled
    if (this.options.includeStubs) {
      this.generateUnionTypeCode(node);
    }
  }

  private generateUnionTypeCode(node: AST.UnionNode): void {
    const name = this.getPrefixedName(node.name);
    const tcName = `TC_${name}`;

    // Build the repository ID using pragma-aware method
    const repoId = this.getRepositoryId(node.name);

    // Get the discriminator TypeCode
    const discriminatorTypeCode = this.getTypeCodeForType(
      node.discriminatorType,
    );

    this.emit(`export const ${tcName} = TypeCode.create_union_tc(`);
    this.indent();
    this.emit(`"${repoId}",`);
    this.emit(`"${node.name}",`);
    this.emit(`${discriminatorTypeCode},`);
    this.emit(`[`);
    this.indent();

    // Generate union members
    const members: string[] = [];
    for (const caseNode of node.cases) {
      if (caseNode.member) {
        for (const label of caseNode.labels) {
          const labelValue = typeof label === "string" ? `"${label}"` : label;
          const memberTypeCode = this.getTypeCodeForType(caseNode.member.type);
          members.push(
            `{ label: ${labelValue}, name: "${caseNode.member.name}", type: ${memberTypeCode} }`,
          );
        }
      }
    }

    for (let i = 0; i < members.length; i++) {
      if (i < members.length - 1) {
        this.emit(`${members[i]},`);
      }
      else {
        this.emit(`${members[i]}`);
      }
    }

    this.dedent();
    this.emit(`]`);
    this.dedent();
    this.emit(`);`);
    this.emit("");

    this.markCorbaImportUsed("TypeCode");
  }

  private generateEnum(node: AST.EnumNode): void {
    // Register type for CDR marshaling with both qualified and unqualified names
    const fullName = this.currentModulePrefix ? `${this.currentModulePrefix}::${node.name}` : node.name;
    this.typeRegistry.set(fullName, { kind: 'enum', node });
    // Also register with just the name for local lookups
    this.typeRegistry.set(node.name, { kind: 'enum', node });

    // Check if code generation is inhibited for this type
    if (this.shouldInhibitCodeGeneration(node.name)) {
      return;
    }
    const name = this.getPrefixedName(node.name);
    this.emit(`export enum ${name} {`);
    this.indent();

    for (let i = 0; i < node.members.length; i++) {
      const member = node.members[i];
      const value = member.value !== undefined ? member.value : i;
      this.emit(`${this.escapeReservedWord(member.name)} = ${value},`);
    }

    this.dedent();
    this.emit("}");
    this.emit("");

    // Generate TypeCode for enum if stubs are enabled
    if (this.options.includeStubs) {
      const repoId = this.getRepositoryId(node.name);
      this.emit(`export const TC_${name} = TypeCode.create_enum_tc(`);
      this.indent();
      this.emit(`"${repoId}",`);
      this.emit(`"${node.name}",`);
      this.emit(`[${node.members.map((m) => `"${m.name}"`).join(", ")}]`);
      this.dedent();
      this.emit(`);`);
      this.emit("");
      this.markCorbaImportUsed("TypeCode");
    }
  }

  private generateTypedef(node: AST.TypedefNode): void {
    // Register typedef for CDR marshaling with both qualified and unqualified names
    const fullName = this.currentModulePrefix ? `${this.currentModulePrefix}::${node.name}` : node.name;
    this.typeRegistry.set(fullName, { kind: 'typedef', node });
    // Also register with just the name for local lookups
    this.typeRegistry.set(node.name, { kind: 'typedef', node });

    const name = this.getPrefixedName(node.name);
    const tsType = this.mapType(node.type);
    this.emit(`export type ${name} = ${tsType};`);
    this.emit("");

    // Generate TypeCode alias for typedef if stubs are enabled
    if (this.options.includeStubs) {
      const baseTypeCode = this.getTypeCodeForType(node.type);
      this.emit(`export const TC_${name} = ${baseTypeCode};`);
      this.emit("");
      // Mark TypeCode used if it's being referenced
      if (baseTypeCode.includes("TypeCode")) {
        this.markCorbaImportUsed("TypeCode");
      }
    }
  }

  private generateConstant(node: AST.ConstantNode): void {
    const name = this.getPrefixedName(node.name);
    const tsType = this.mapType(node.type);

    let value: string | number | boolean = node.value;

    // Handle qualified constant references like ::Module::CONSTANT
    if (typeof node.value === "string" && node.value.includes("::")) {
      let parts = node.value.split("::");

      // Remove empty first element if starts with ::
      if (parts[0] === "") {
        parts = parts.slice(1);
      }

      if (parts.length >= 2) {
        const moduleName = parts[0];
        const constName = parts.slice(1).join("_");
        if (moduleName !== this.currentModule) {
          // This is a cross-module constant reference, generate import
          this.addImport(moduleName, false); // Use regular import for values
          value = `${moduleName}.${constName}`;
        }
        else {
          // Same module reference
          value = constName;
        }
      }
    }
    else if (typeof value === "string") {
      // Regular string literal - escape special characters for TypeScript
      // Order matters: escape special chars first, then backslashes, then quotes
      const escaped = value
        .replace(/\r/g, "\\r") // Escape carriage returns
        .replace(/\n/g, "\\n") // Escape newlines
        .replace(/\t/g, "\\t") // Escape tabs
        .replace(/\\/g, "\\\\") // Escape backslashes (must be after other escapes)
        .replace(/"/g, '\\"'); // Escape double quotes (last)
      value = `"${escaped}"`;
    }

    this.emit(`export const ${name}: ${tsType} = ${value};`);
    this.emit("");
  }

  private generateNative(node: AST.NativeNode): void {
    // Register native type in type registry as a typedef to 'any'
    const fullName = this.currentModulePrefix ? `${this.currentModulePrefix}::${node.name}` : node.name;
    this.typeRegistry.set(fullName, { kind: 'typedef', node: { kind: 'typedef', name: node.name, type: { kind: 'primitiveType', type: 'any' } } as AST.TypedefNode });
    this.typeRegistry.set(node.name, { kind: 'typedef', node: { kind: 'typedef', name: node.name, type: { kind: 'primitiveType', type: 'any' } } as AST.TypedefNode });

    // Generate type alias to any
    const name = this.getPrefixedName(node.name);
    this.emit(`export type ${name} = any;`);
    this.emit("");
  }

  private generateException(node: AST.ExceptionNode): void {
    const name = this.getPrefixedName(node.name);
    this.emit(`export class ${name} extends CORBA.SystemException {`);
    this.markCorbaImportUsed("CORBA"); // Exception uses CORBA as value
    this.indent();

    for (const member of node.members) {
      const tsType = this.mapType(member.type);
      this.emit(`${member.name}: ${tsType};`);
    }

    this.emit("");
    this.emit(
      `constructor(${node.members.map((m: AST.MemberNode) => `${m.name}: ${this.mapType(m.type)}`).join(", ")}) {`,
    );
    this.indent();
    this.emit(`super('${this.getPrefixedName(node.name)}');`);

    for (const member of node.members) {
      this.emit(`this.${member.name} = ${member.name};`);
    }

    this.dedent();
    this.emit("}");

    this.dedent();
    this.emit("}");
    this.emit("");
  }

  private generateInterfaceTypeCode(node: AST.InterfaceNode): void {
    const name = this.getPrefixedName(node.name);
    const tcName = `TC_${name}`;

    // Build the repository ID using pragma-aware method
    const repoId = this.getRepositoryId(node.name);

    this.emit(`export const ${tcName} = TypeCode.create_interface_tc(`);
    this.indent();
    this.emit(`"${repoId}",`);
    this.emit(`"${node.name}",`);
    this.dedent();
    this.emit(`);`);
    this.emit("");

    this.markCorbaImportUsed("TypeCode");
  }

  private generateClientStub(node: AST.InterfaceNode): void {
    const name = this.getPrefixedName(node.name);
    const repositoryId = this.getRepositoryId(node.name);

    // Check if any methods conflict with CorbaStub base class methods
    // CorbaStub implements Object which has: release(), duplicate(), hash(), etc.
    const allMembers = this.collectInterfaceMembers(node);
    const corbaObjectMethods = [
      "release",
      "duplicate",
      "hash",
      "is_nil",
      "is_equivalent",
      "is_a",
      "non_existent",
      "get_interface",
      "get_policy",
      "get_domain_managers",
      "set_policy_overrides",
      "get_client_policy",
      "get_policy_overrides",
      "validate_connection",
      "get_component",
      "get_type_id",
      "_get_interface_id",
    ];

    const hasMethodConflict = allMembers.some((m) => m.kind === "operation" && corbaObjectMethods.includes(m.name));

    // If there's a method conflict, we can't extend CorbaStub due to potential signature incompatibility
    // Instead, implement the interface directly and provide our own narrow() method
    if (hasMethodConflict) {
      this.emit(`export class ${name}_Stub implements ${name} {`);
      this.indent();

      // Static repository ID
      this.emit(`static readonly _repository_id = "${repositoryId}";`);
      this.emit("");

      // Store the object reference
      this.emit("constructor(protected readonly _ref: CORBA.ObjectRef) {}");
      this.emit("");

      // Implement our own narrow() since we can't inherit from CorbaStub
      this.emit(
        `static narrow(obj: CORBA.ObjectRef | null | undefined): ${name}_Stub | null {`,
      );
      this.indent();
      this.emit("if (!obj) return null;");
      this.emit(`return new ${name}_Stub(obj);`);
      this.dedent();
      this.emit("}");
      this.emit("");

      // Add index signature to match CORBA.ObjectRef interface
      this.emit("[key: string]: unknown;");
      this.emit("");
    }
    else {
      // No conflicts, use CorbaStub as base class
      this.emit(
        `export class ${name}_Stub extends CorbaStub implements ${name} {`,
      );
      this.indent();

      // Static repository ID for narrow (override from base class)
      this.emit(`static override readonly _repository_id = "${repositoryId}";`);
      this.emit("");

      // Constructor calls super
      this.emit("constructor(ref: CORBA.ObjectRef) {");
      this.indent();
      this.emit("super(ref);");
      this.dedent();
      this.emit("}");
      this.emit("");
    }

    this.markCorbaImportUsed("CorbaStub");
    this.markCorbaTypeUsed();

    // Generate stub implementations for all members
    for (let i = 0; i < allMembers.length; i++) {
      const member = allMembers[i];
      if (member.kind === "operation") {
        this.generateStubOperation(member, i < allMembers.length - 1);
      }
      else if (member.kind === "attribute") {
        this.generateStubAttribute(member, node.name, i < allMembers.length - 1);
      }
    }

    this.dedent();
    this.emit("}");
    this.emit("");
  }

  private generateStubOperation(
    node: AST.OperationNode,
    addBlankLine: boolean = true,
  ): void {
    const sourceModule = (node as AST.OperationNode & ExtendedNode).__sourceModule;
    const sourceInterface = (node as AST.OperationNode & ExtendedNode).__sourceInterface;
    const params = node.parameters.map((p: AST.ParameterNode) => {
      // Make out and inout parameters optional since they're not commonly used
      // Prefix unused out-only parameters with underscore to avoid lint warnings
      const isOptional = p.direction === "out" || p.direction === "inout";
      const paramName = (p.direction === "out") ? `_${p.name}` : p.name;
      return isOptional
        ? `${paramName}?: ${this.mapType(p.type, true, sourceModule, sourceInterface)}`
        : `${paramName}: ${this.mapType(p.type, true, sourceModule, sourceInterface)}`;
    }).join(", ");

    // Check if we have out parameters
    const outParams = node.parameters.filter((p: AST.ParameterNode) => p.direction === "out" || p.direction === "inout");
    const hasReturn = node.returnType.kind !== "primitiveType" ||
      node.returnType.type !== "void";

    let returnType: string;
    if (node.isOneway) {
      returnType = "Promise<void>";
    }
    else if (outParams.length === 0) {
      // No out parameters - return just the return value
      returnType = `Promise<${this.mapType(node.returnType, true, sourceModule, sourceInterface)}>`;
    }
    else if (!hasReturn) {
      // Out parameters but void return - return object with just out params
      const outParamTypes = outParams.map((p: AST.ParameterNode) =>
        `${p.name}: ${this.mapType(p.type, true, sourceModule, sourceInterface)}`
      ).join("; ");
      returnType = `Promise<{ ${outParamTypes} }>`;
    }
    else {
      // Both return value and out parameters - return object with both
      const returnValueType = this.mapType(
        node.returnType,
        true,
        sourceModule,
        sourceInterface,
      );
      const outParamTypes = outParams.map((p: AST.ParameterNode) =>
        `${p.name}: ${this.mapType(p.type, true, sourceModule, sourceInterface)}`
      ).join("; ");
      returnType = `Promise<{ returnValue: ${returnValueType}; ${outParamTypes} }>`;
    }

    this.emit(`async ${this.escapeReservedWord(node.name)}(${params}): ${returnType} {`);
    this.indent();

    this.emit(`const request = create_request(this._ref, "${node.name}");`);
    this.markCorbaImportUsed("create_request");

    for (const param of node.parameters) {
      if (param.direction === "in" || param.direction === "inout") {
        const typeCode = this.getTypeCodeForTypeWithContext(
          param.type,
          sourceModule,
          sourceInterface,
        );
        this.emit(
          `request.add_named_in_arg("${param.name}", ${param.name}, ${typeCode});`,
        );
        // Mark TypeCode used if it's being referenced
        if (typeCode.includes("TypeCode") || typeCode.includes("TC_")) {
          this.markCorbaImportUsed("TypeCode");
        }
      }
      if (param.direction === "out" || param.direction === "inout") {
        const typeCode = this.getTypeCodeForTypeWithContext(
          param.type,
          sourceModule,
          sourceInterface,
        );
        this.emit(`request.add_out_arg(${typeCode});`);
        // Mark TypeCode used if it's being referenced
        if (typeCode.includes("TypeCode") || typeCode.includes("TC_")) {
          this.markCorbaImportUsed("TypeCode");
        }
      }
    }

    if (node.isOneway) {
      this.emit("request.send_oneway();");
    }
    else {
      this.emit("await request.invoke();");

      // Handle return value based on out parameters
      if (outParams.length === 0) {
        // No out parameters - return just the return value
        if (hasReturn) {
          const mappedType = this.mapType(
            node.returnType,
            true,
            sourceModule,
            sourceInterface,
          );
          this.emit(`return request.return_value() as ${mappedType};`);
        }
      }
      else if (!hasReturn) {
        // Out parameters but void return - return object with just out params
        this.emit("return {");
        this.indent();
        outParams.forEach((param: AST.ParameterNode, index: number) => {
          const paramIndex = node.parameters.findIndex((p: AST.ParameterNode) => p === param);
          const comma = index < outParams.length - 1 ? "," : "";
          this.emit(
            `${param.name}: request.get_arg(${paramIndex}) as ${this.mapType(param.type, true, sourceModule, sourceInterface)}${comma}`,
          );
        });
        this.dedent();
        this.emit("};");
      }
      else {
        // Both return value and out parameters - return object with both
        this.emit("return {");
        this.indent();
        const returnValueType = this.mapType(
          node.returnType,
          true,
          sourceModule,
          sourceInterface,
        );
        this.emit(`returnValue: request.return_value() as ${returnValueType},`);
        outParams.forEach((param: AST.ParameterNode, index: number) => {
          const paramIndex = node.parameters.findIndex((p: AST.ParameterNode) => p === param);
          const comma = index < outParams.length - 1 ? "," : "";
          this.emit(
            `${param.name}: request.get_arg(${paramIndex}) as ${this.mapType(param.type, true, sourceModule, sourceInterface)}${comma}`,
          );
        });
        this.dedent();
        this.emit("};");
      }
    }

    this.dedent();
    this.emit("}");
    if (addBlankLine) {
      this.emit("");
    }
  }

  private generateStubAttribute(
    node: AST.AttributeNode,
    interfaceName: string,
    addBlankLine: boolean = true,
  ): void {
    const sourceModule = (node as AST.AttributeNode & ExtendedNode).__sourceModule;
    const sourceInterface = (node as AST.AttributeNode & ExtendedNode).__sourceInterface;
    // For attributes from inherited interfaces, we need to preserve their source context
    // to properly resolve nested types like Location_ImageType
    // For direct attributes, use the current interface context
    const tsType = this.mapType(node.type, true, sourceModule || this.currentModule, sourceInterface || interfaceName);

    this.emit(`async get_${node.name}(): Promise<${tsType}> {`);
    this.indent();
    this.emit(
      `const request = create_request(this._ref, "_get_${node.name}");`,
    );
    this.markCorbaImportUsed("create_request");
    this.emit("await request.invoke();");
    this.emit(`return request.return_value() as ${tsType};`);
    this.dedent();
    this.emit("}");
    this.emit("");

    if (!node.isReadonly) {
      this.emit(`async set_${node.name}(value: ${tsType}): Promise<void> {`);
      this.indent();
      this.emit(
        `const request = create_request(this._ref, "_set_${node.name}");`,
      );
      this.markCorbaImportUsed("create_request");
      const typeCode = this.getTypeCodeForTypeWithContext(
        node.type,
        sourceModule,
        sourceInterface,
      );
      this.emit(`request.add_named_in_arg("value", value, ${typeCode});`);
      // Mark TypeCode used if it's being referenced
      if (typeCode.includes("TypeCode") || typeCode.includes("TC_")) {
        this.markCorbaImportUsed("TypeCode");
      }
      this.emit("await request.invoke();");
      this.dedent();
      this.emit("}");
      this.emit("");
    }

    this.emit(`get ${this.escapeReservedWord(node.name)}(): ${tsType} {`);
    this.indent();
    this.emit(
      `throw new Error("Direct property access not supported. Use get_${node.name}() instead.");`,
    );
    this.dedent();
    this.emit("}");

    if (!node.isReadonly) {
      this.emit("");
      this.emit(`set ${this.escapeReservedWord(node.name)}(value: ${tsType}) {`);
      this.indent();
      this.emit(
        `throw new Error("Direct property access not supported. Use set_${node.name}() instead.");`,
      );
      this.dedent();
      this.emit("}");
    }

    if (addBlankLine) {
      this.emit("");
    }
  }

  private generateServerSkeleton(node: AST.InterfaceNode): void {
    const name = this.getPrefixedName(node.name);
    // POA classes extend Servant but don't implement the interface
    // because the interface extends CORBA.ObjectRef which is for client-side
    this.emit(
      `export abstract class ${name}_POA extends Servant {`,
    );
    this.markCorbaImportUsed("Servant"); // POA uses Servant
    this.indent();

    // Only process operations and attributes for skeleton
    for (const member of node.members) {
      if (member.kind === "operation") {
        const params = member.parameters.map((p: AST.ParameterNode) => {
          // Make out and inout parameters optional since they're not commonly used
          const isOptional = p.direction === "out" || p.direction === "inout";
          return isOptional ? `${p.name}?: ${this.mapType(p.type)}` : `${p.name}: ${this.mapType(p.type)}`;
        }).join(", ");

        // Check if we have out parameters
        const outParams = member.parameters.filter((p: AST.ParameterNode) => p.direction === "out" || p.direction === "inout");
        const hasReturn = member.returnType.kind !== "primitiveType" ||
          member.returnType.type !== "void";

        let returnType: string;
        if (member.isOneway) {
          returnType = "Promise<void>";
        }
        else if (outParams.length === 0) {
          // No out parameters - return just the return value
          returnType = `Promise<${this.mapType(member.returnType)}>`;
        }
        else if (!hasReturn) {
          // Out parameters but void return - return object with just out params
          const outParamTypes = outParams.map((p: AST.ParameterNode) => `${p.name}: ${this.mapType(p.type)}`).join(
            "; ",
          );
          returnType = `Promise<{ ${outParamTypes} }>`;
        }
        else {
          // Both return value and out parameters - return object with both
          const returnValueType = this.mapType(member.returnType);
          const outParamTypes = outParams.map((p: AST.ParameterNode) => `${p.name}: ${this.mapType(p.type)}`).join(
            "; ",
          );
          returnType = `Promise<{ returnValue: ${returnValueType}; ${outParamTypes} }>`;
        }

        this.emit(`abstract ${this.escapeReservedWord(member.name)}(${params}): ${returnType};`);
      }
      else if (member.kind === "attribute") {
        const tsType = this.mapType(member.type);
        this.emit(`abstract get_${member.name}(): Promise<${tsType}>;`);

        if (!member.isReadonly) {
          this.emit(
            `abstract set_${member.name}(value: ${tsType}): Promise<void>;`,
          );
        }

        this.emit(`get ${this.escapeReservedWord(member.name)}(): ${tsType} {`);
        this.indent();
        this.emit(`throw new Error("Direct property access not supported.");`);
        this.dedent();
        this.emit("}");

        if (!member.isReadonly) {
          this.emit(`set ${this.escapeReservedWord(member.name)}(value: ${tsType}) {`);
          this.indent();
          this.emit(
            `throw new Error("Direct property access not supported.");`,
          );
          this.dedent();
          this.emit("}");
        }
      }
    }

    this.emit("");
    // Generate standard CORBA _invoke method for static skeleton
    // Check if interface has any operations or attributes early to determine if responseHandler will be used
    const hasOperationsOrAttributes = node.members.some(member =>
      member.kind === "operation" || member.kind === "attribute"
    );

    // Prefix responseHandler with underscore if it won't be used
    const responseHandlerParam = hasOperationsOrAttributes ? "responseHandler" : "_responseHandler";

    this.emit(`async _invoke(operation: string, _inputStream: CDRInputStream, ${responseHandlerParam}: ResponseHandler): Promise<CDROutputStream> {`);
    this.markCorbaImportUsed("CDRInputStream");
    this.markCorbaImportUsed("CDROutputStream");
    this.markCorbaImportUsed("ResponseHandler");
    this.indent();

    if (!hasOperationsOrAttributes) {
      // Add await to satisfy linter for empty interfaces
      this.emit(`await Promise.resolve(); // Required for async with no operations`);
      this.emit("");
      // For empty interfaces, throw directly without unreachable return
      this.emit(`throw new Error(\`Unknown operation: \${operation}\`);`);
    } else {
      this.emit(`const outputStream = responseHandler.createReply();`);
      this.emit("");
      this.emit(`switch (operation) {`);
      this.indent();

      // Generate cases for each operation
      for (const member of node.members) {
      if (member.kind === "operation") {
        this.emit(`case "${member.name}": {`);
        this.indent();

        // Unmarshal input parameters
        const inParams = member.parameters.filter((p: AST.ParameterNode) => p.direction === "in" || p.direction === "inout");
        if (inParams.length > 0) {
          this.emit("// Unmarshal input parameters");
          for (const param of inParams) {
            const unmarshalCall = this.getUnmarshalCall(param.type);
            this.emit(`const ${param.name} = ${unmarshalCall};`);
          }
        }

        // Call the abstract method
        const outParams = member.parameters.filter((p: AST.ParameterNode) => p.direction === "out" || p.direction === "inout");
        const hasReturn = member.returnType.kind !== "primitiveType" || member.returnType.type !== "void";

        if (member.isOneway) {
          // Oneway operations don't wait for result
          this.emit(`this.${member.name}(${member.parameters.filter((p: AST.ParameterNode) => p.direction === "in" || p.direction === "inout").map((p: AST.ParameterNode) => p.name).join(", ")}); // oneway - no wait`);
        } else if (outParams.length === 0 && hasReturn) {
          // Only return value
          this.emit(`const result = await this.${member.name}(${inParams.map((p: AST.ParameterNode) => p.name).join(", ")});`);
          this.emit("");
          this.emit("// Marshal return value and out parameters");
          const marshalCall = this.getMarshalCall(member.returnType, "result", node.name);
          this.emit(`${marshalCall};`);
        } else if (outParams.length > 0) {
          // Has out parameters
          const resultVar = hasReturn || outParams.length > 0 ? "const result = " : "";
          this.emit(`${resultVar}await this.${member.name}(${inParams.map((p: AST.ParameterNode) => p.name).join(", ")});`);
          this.emit("");
          this.emit("// Marshal return value and out parameters");

          if (hasReturn) {
            const marshalCall = this.getMarshalCall(member.returnType, "result.returnValue", node.name);
            this.emit(`${marshalCall};`);
          }

          for (const param of outParams) {
            const marshalCall = this.getMarshalCall(param.type, `result.${param.name}`, node.name);
            this.emit(`${marshalCall};`);
          }
        } else {
          // void return, no out params
          this.emit(`await this.${member.name}(${inParams.map((p: AST.ParameterNode) => p.name).join(", ")});`);
        }

        this.emit("break;");
        this.dedent();
        this.emit("}");
      } else if (member.kind === "attribute") {
        // Generate getter case
        this.emit(`case "get_${member.name}": {`);
        this.indent();
        this.emit(`const result = await this.get_${member.name}();`);
        // Don't pass interface context for attributes - they should resolve to their declared type
        // not to nested types within the interface
        const marshalCall = this.getMarshalCall(member.type, "result");
        this.emit(`${marshalCall};`);
        this.emit("break;");
        this.dedent();
        this.emit("}");

        // Generate setter case if not readonly
        if (!member.isReadonly) {
          this.emit(`case "set_${member.name}": {`);
          this.indent();
          const unmarshalCall = this.getUnmarshalCall(member.type);
          this.emit(`const value = ${unmarshalCall};`);
          this.emit(`await this.set_${member.name}(value);`);
          this.emit("break;");
          this.dedent();
          this.emit("}");
        }
      }
    }

      this.emit("default: {");
      this.indent();
      this.emit(`throw new Error(\`Unknown operation: \${operation}\`);`);
      this.dedent();
      this.emit("}");

      this.dedent();
      this.emit("}");
      this.emit("");

      this.emit("return outputStream;");
    }
    this.dedent();
    this.emit("}");

    this.dedent();
    this.emit("}");
    this.emit("");
  }

  private getUnmarshalCall(type: AST.TypeNode): string {
    if (type.kind === "primitiveType") {
      switch (type.type) {
        case "boolean":
          return "_inputStream.readBoolean()";
        case "char":
        case "wchar":
          return "_inputStream.readChar()";
        case "octet":
          return "_inputStream.readOctet()";
        case "short":
          return "_inputStream.readShort()";
        case "unsigned short":
          return "_inputStream.readUShort()";
        case "long":
          return "_inputStream.readLong()";
        case "unsigned long":
          return "_inputStream.readULong()";
        case "long long":
          return "_inputStream.readLongLong()";
        case "unsigned long long":
          return "_inputStream.readULongLong()";
        case "float":
          return "_inputStream.readFloat()";
        case "double":
          return "_inputStream.readDouble()";
        case "any":
          // Use decodeAny for proper Any type marshaling
          this.markCorbaImportUsed("decodeAny");
          return "decodeAny(_inputStream)";
        default:
          // Unknown primitive type - try string as safe fallback
          return "_inputStream.readString()";
      }
    } else if (type.kind === "stringType") {
      return type.type === "wstring" ? "_inputStream.readWString()" : "_inputStream.readString()";
    } else if (type.kind === "namedType") {
      // Convert :: to . for cross-module references in TypeScript
      let lookupName = type.name;
      if (type.name.includes("::")) {
        // For cross-module types like types::timeout, we need to look them up properly
        const parts = type.name.split("::");
        if (parts.length >= 2) {
          // Just use the last part for lookup since it's a typedef in another module
          lookupName = parts[parts.length - 1];
        }
      }

      // Look up the type in the registry to determine how to unmarshal it
      const typeInfo = this.findTypeInRegistry(lookupName);
      if (typeInfo) {
        switch (typeInfo.kind) {
          case 'enum':
            // Enums are marshaled as longs in CORBA
            return "_inputStream.readLong()";
          case 'interface': {
            // Interfaces are object references - read IOR string
            // Cast through unknown to the specific interface type to avoid type errors
            const interfaceType = this.resolveTypeName(type.name, true);
            return `({ _ior: _inputStream.readString() } as unknown as ${interfaceType})`;
          }
          case 'typedef': {
            // Follow the typedef to the underlying type
            const typedefNode = typeInfo.node as AST.TypedefNode;
            if (typedefNode) {
              return this.getUnmarshalCall(typedefNode.type);
            }
            return `_inputStream.readString()`;
          }
          case 'struct':
            // Generate inline struct unmarshaling
            return this.generateStructUnmarshal(typeInfo.node as AST.StructNode, type.name);
          case 'union':
            // Generate inline union unmarshaling
            return this.generateUnionUnmarshal(typeInfo.node as AST.UnionNode, type.name);
          default:
            return `_inputStream.readString()`;
        }
      }
      // If type not found, assume it's a long (common for numeric typedefs)
      return `_inputStream.readLong()`;
    } else if (type.kind === "sequenceType") {
      const elementUnmarshal = this.getUnmarshalCall(type.elementType);
      return `(() => { const length = _inputStream.readULong(); const result = []; for (let i = 0; i < length; i++) { result.push(${elementUnmarshal}); } return result; })()`;
    } else if (type.kind === "arrayType") {
      const elementUnmarshal = this.getUnmarshalCall(type.elementType);
      const totalSize = type.dimensions.reduce((a, b) => a * b, 1);
      return `(() => { const result = []; for (let i = 0; i < ${totalSize}; i++) { result.push(${elementUnmarshal}); } return result; })()`;
    } else {
      // Unknown type - try string as fallback
      return "_inputStream.readString()";
    }
  }

  private getElementUnmarshalCall(type: AST.TypeNode): string {
    if (type.kind === "primitiveType") {
      switch (type.type) {
        case "boolean": return "(s) => s.readBoolean()";
        case "char":
        case "wchar": return "(s) => s.readChar()";
        case "octet": return "(s) => s.readOctet()";
        case "short": return "(s) => s.readShort()";
        case "unsigned short": return "(s) => s.readUShort()";
        case "long": return "(s) => s.readLong()";
        case "unsigned long": return "(s) => s.readULong()";
        case "long long": return "(s) => s.readLongLong()";
        case "unsigned long long": return "(s) => s.readULongLong()";
        case "float": return "(s) => s.readFloat()";
        case "double": return "(s) => s.readDouble()";
        default:
          this.markCorbaImportUsed("decodeAny");
          return "(s) => decodeAny(s)"; // For any/unknown types
      }
    } else if (type.kind === "stringType") {
      return type.type === "wstring" ? "(s) => s.readWString()" : "(s) => s.readString()";
    } else if (type.kind === "namedType") {
      // For named types in sequences/arrays, check the type
      const typeInfo = this.findTypeInRegistry(type.name);
      if (typeInfo && typeInfo.kind === 'enum') {
        return "(s) => s.readLong()";
      } else if (typeInfo && typeInfo.kind === 'interface') {
        return "(s) => { const iorStr = s.readString(); return { _ior: iorStr }; }";
      } else if (typeInfo && typeInfo.kind === 'typedef') {
        // Follow the typedef to the underlying type
        const typedefNode = typeInfo.node as AST.TypedefNode;
        if (typedefNode) {
          return this.getElementUnmarshalCall(typedefNode.type);
        }
      }
      // For structs/unions, would need custom logic
      return "(s) => s.readString()";
    } else {
      return "(s) => s.readString()";
    }
  }

  private getMarshalCall(type: AST.TypeNode, value: string, interfaceContext?: string): string {
    if (type.kind === "primitiveType") {
      switch (type.type) {
        case "boolean":
          return `outputStream.writeBoolean(${value})`;
        case "char":
        case "wchar":
          return `outputStream.writeChar(${value})`;
        case "octet":
          return `outputStream.writeOctet(${value})`;
        case "short":
          return `outputStream.writeShort(${value})`;
        case "unsigned short":
          return `outputStream.writeUShort(${value})`;
        case "long":
          return `outputStream.writeLong(${value})`;
        case "unsigned long":
          return `outputStream.writeULong(${value})`;
        case "long long":
          return `outputStream.writeLongLong(${value})`;
        case "unsigned long long":
          return `outputStream.writeULongLong(${value})`;
        case "float":
          return `outputStream.writeFloat(${value})`;
        case "double":
          return `outputStream.writeDouble(${value})`;
        case "any":
          // Use encodeAny for proper Any type marshaling
          this.markCorbaImportUsed("encodeAny");
          this.markCorbaImportUsed("Any");
          return `encodeAny(outputStream, Any.fromValue(${value}))`;
        case "void":
          return "// void return";
        default:
          // Unknown primitive type - fall back to Any marshaling
          this.markCorbaImportUsed("encodeAny");
          this.markCorbaImportUsed("Any");
          return `encodeAny(outputStream, Any.fromValue(${value}))`;
      }
    } else if (type.kind === "stringType") {
      return type.type === "wstring" ? `outputStream.writeWString(${value})` : `outputStream.writeString(${value})`;
    } else if (type.kind === "namedType") {
      // Look up the type in the registry to determine how to marshal it
      // Handle cross-module references (C++ :: to TypeScript .)
      let lookupName = type.name;
      if (type.name.includes("::")) {
        // Extract just the type name from module::type format
        const parts = type.name.split("::");
        if (parts.length >= 2) {
          lookupName = parts[parts.length - 1];
        }
      }

      // If we have an interface context, try to look up as nested type first
      let typeInfo = null;
      if (interfaceContext && !type.name.includes("::")) {
        // Try flattened name first (InterfaceName_TypeName)
        const flattenedName = `${interfaceContext}_${lookupName}`;
        typeInfo = this.findTypeInRegistry(flattenedName);
      }

      // If not found as nested type, try regular lookup
      if (!typeInfo) {
        typeInfo = this.findTypeInRegistry(lookupName);
      }
      if (typeInfo) {
        switch (typeInfo.kind) {
          case 'enum':
            // Enums are marshaled as longs in CORBA
            return `outputStream.writeLong(${value})`;
          case 'interface':
            // Interfaces are object references - write IOR string
            return `outputStream.writeString((${value} as { _ior?: string })?._ior || "")`;
          case 'typedef': {
            // Follow the typedef to the underlying type
            const typedefNode = typeInfo.node as AST.TypedefNode;
            if (typedefNode) {
              return this.getMarshalCall(typedefNode.type, value, interfaceContext);
            }
            this.markCorbaImportUsed("encodeAny");
            this.markCorbaImportUsed("Any");
            return `encodeAny(outputStream, Any.fromValue(${value}))`;  // fallback to Any marshaling
          }
          case 'struct':
            // Generate inline struct marshaling
            return this.generateStructMarshal(typeInfo.node as AST.StructNode, value, interfaceContext);
          case 'union':
            // Generate inline union marshaling
            return this.generateUnionMarshal(typeInfo.node as AST.UnionNode, value, interfaceContext);
          default:
            return `encodeAny(outputStream, Any.fromValue(${value}))`;  // fallback to Any marshaling
        }
      }
      // If type not found, use Any marshaling as fallback
      this.markCorbaImportUsed("encodeAny");
      this.markCorbaImportUsed("Any");
      return `encodeAny(outputStream, Any.fromValue(${value}))`;
    } else if (type.kind === "sequenceType") {
      // Use proper sequence marshaling with length prefix
      const elementType = type.elementType;
      const marshalElement = this.getMarshalCall(elementType, 'element', interfaceContext);
      return `outputStream.writeULong(${value}.length); ${value}.forEach((element) => { ${marshalElement}; })`;
    } else if (type.kind === "arrayType") {
      // Arrays don't have length prefix, just marshal each element
      const elementType = type.elementType;
      const marshalElement = this.getMarshalCall(elementType, 'element', interfaceContext);
      return `${value}.forEach((element) => { ${marshalElement}; })`;
    } else {
      return `outputStream.writeAny(${value})`;
    }
  }

  private mapType(
    node: AST.TypeNode,
    isTypeOnly: boolean = false,
    sourceModule?: string,
    sourceInterface?: string,
  ): string {
    switch (node.kind) {
      case "primitiveType":
        return this.mapPrimitiveType(node.type);
      case "namedType": {
        // Check if this is a qualified name with ::
        if (node.name.includes("::")) {
          let parts = node.name.split("::");

          // Remove empty first element if starts with ::
          if (parts[0] === "") {
            parts = parts.slice(1);
          }

          if (parts.length >= 2) {
            const moduleName = parts[0];

            // Check if this is a nested type reference (e.g., Module::Interface::Type)
            if (parts.length === 3) {
              const interfaceName = parts[1];
              const typeName = parts[2];

              // Look for the flattened type name
              const flattenedName = `${interfaceName}_${typeName}`;

              if (moduleName !== this.currentModule) {
                this.addImport(moduleName, isTypeOnly);
                return `${moduleName}.${flattenedName}`;
              }
              return flattenedName;
            }

            // Standard qualified name (e.g., Module::Type)
            const typeName = parts.slice(1).join("_");
            if (moduleName !== this.currentModule) {
              this.addImport(moduleName, isTypeOnly);
              return `${moduleName}.${typeName}`;
            }
            return typeName;
          }
        }
        // Check if this is a nested type that was extracted
        if (this.nestedTypes.has(node.name)) {
          // However, we should only use the nested type if:
          // 1. We have interface context (sourceInterface is set), OR
          // 2. There's no top-level type with the same name
          if (sourceInterface) {
            // In interface context, prefer nested type
            return this.nestedTypes.get(node.name)!;
          } else {
            // At module level, check if there's a top-level type first
            const hasTopLevel = this.currentModuleDefinitions?.some(def =>
              (def.kind === "interface" || def.kind === "struct" || def.kind === "enum" ||
               def.kind === "typedef" || def.kind === "exception" || def.kind === "union") &&
              (def as { name?: string }).name === node.name
            );
            // Only use nested type if there's no top-level type
            if (!hasTopLevel) {
              return this.nestedTypes.get(node.name)!;
            }
          }
        }

        // If we have a source module context, check there first
        if (sourceModule && sourceModule !== this.currentModule) {
          const sourceModuleOutput = this.modules.get(sourceModule);
          if (sourceModuleOutput) {
            // If we have interface context, try nested types first (CORBA scoping rules)
            if (sourceInterface) {
              const flattenedTypeName = this.findFlattenedType(
                node.name,
                sourceModuleOutput,
                sourceInterface,
              );
              if (flattenedTypeName) {
                this.addImport(sourceModule, isTypeOnly);
                return `${sourceModule}.${flattenedTypeName}`;
              }
            }

            // Then try direct match
            if (this.typeExistsInModule(node.name, sourceModuleOutput)) {
              this.addImport(sourceModule, isTypeOnly);
              return `${sourceModule}.${node.name}`;
            }

            // Finally, try flattened types without interface preference
            if (!sourceInterface) {
              const flattenedTypeName = this.findFlattenedType(
                node.name,
                sourceModuleOutput,
              );
              if (flattenedTypeName) {
                this.addImport(sourceModule, isTypeOnly);
                return `${sourceModule}.${flattenedTypeName}`;
              }
            }
          }
        }

        // For unqualified names in the current module, first check if it's a nested type
        // Use currentModuleDefinitions which is available during generation
        if (this.currentModuleDefinitions && sourceInterface) {
          // Look for the nested type in the current interface
          for (const def of this.currentModuleDefinitions) {
            if (def.kind === "interface" && (def as AST.InterfaceNode).name === sourceInterface) {
              const interfaceDef = def as AST.InterfaceNode;
              for (const member of interfaceDef.members) {
                if (member.name === node.name && (
                  member.kind === "enum" ||
                  member.kind === "struct" ||
                  member.kind === "union" ||
                  member.kind === "typedef" ||
                  member.kind === "exception"
                )) {
                  // Found nested type - return flattened name
                  return `${sourceInterface}_${node.name}`;
                }
              }
              break;
            }
          }
        }

        // For unqualified names, check if it exists in other imported modules
        // This handles the case where we're generating stubs with inherited types
        for (const [moduleName, module] of this.modules) {
          if (
            moduleName !== this.currentModule &&
            this.typeExistsInModule(node.name, module)
          ) {
            this.addImport(moduleName, isTypeOnly);
            return `${moduleName}.${node.name}`;
          }
        }

        // For unqualified names in the current module
        return this.getPrefixedName(node.name);
      }
      case "sequenceType":
        return `${
          this.mapType(
            node.elementType,
            isTypeOnly,
            sourceModule,
            sourceInterface,
          )
        }[]`;
      case "arrayType": {
        const baseType = this.mapType(
          node.elementType,
          isTypeOnly,
          sourceModule,
          sourceInterface,
        );
        return node.dimensions.reduce((type: string) => `${type}[]`, baseType);
      }
      case "stringType":
        return "string";
      case "fixedType":
        return "number";
      default:
        return "unknown";
    }
  }

  private mapPrimitiveType(type: string): string {
    const mapping: Record<string, string> = {
      "void": "void",
      "boolean": "boolean",
      "char": "string",
      "wchar": "string",
      "octet": "number",
      "short": "number",
      "unsigned short": "number",
      "long": "number",
      "unsigned long": "number",
      "long long": "bigint",
      "unsigned long long": "bigint",
      "float": "number",
      "double": "number",
      "long double": "number",
      "any": "unknown",
      "Object": "CORBA.ObjectRef", // Use ObjectRef which is defined in CORBA namespace
    };

    // Mark CORBA as used only when Object type is actually used
    if (type === "Object") {
      this.markCorbaTypeUsed();
    }

    return mapping[type] || "unknown";
  }

  private emit(line: string): void {
    const target = this.currentModule && this.modules.has(this.currentModule)
      ? this.modules.get(this.currentModule)!.content
      : this.rootModule && !this.currentModule
      ? this.rootModule.content
      : this.output;

    if (line) {
      target.push(this.getIndent() + line);
    }
    else {
      target.push("");
    }
  }

  private indent(): void {
    this.indentLevel++;
  }

  private dedent(): void {
    this.indentLevel--;
  }

  private getIndent(): string {
    return "  ".repeat(this.indentLevel);
  }

  private getPrefixedName(name: string): string {
    // No prefixing in multi-file mode
    return name;
  }

  private collectInterfaceMembers(
    node: AST.InterfaceNode,
    sourceModule?: string,
  ): (AST.OperationNode | AST.AttributeNode)[] {
    const members: (AST.OperationNode | AST.AttributeNode)[] = [];

    // Add direct members from this interface
    for (const member of node.members) {
      if (member.kind === "operation" || member.kind === "attribute") {
        // Tag the member with its source module and interface if it's from a different context
        const memberCopy = { ...member } as
          & (AST.OperationNode | AST.AttributeNode)
          & ExtendedNode;
        if (sourceModule && sourceModule !== this.currentModule) {
          memberCopy.__sourceModule = sourceModule;
          memberCopy.__sourceInterface = node.name; // Track which interface originally defined this member
        }
        members.push(memberCopy as AST.OperationNode | AST.AttributeNode);
      }
    }

    // Recursively collect from inherited interfaces
    if (node.inheritance && node.inheritance.length > 0) {
      for (const inheritedName of node.inheritance) {
        const inheritedInterface = this.findInterface(inheritedName);
        if (inheritedInterface) {
          // Determine source module for inherited interface
          let inheritedSourceModule = sourceModule;
          if (inheritedName.includes("::") || inheritedName.includes(".")) {
            const separator = inheritedName.includes("::") ? "::" : ".";
            inheritedSourceModule = inheritedName.split(separator)[0];
          }

          const inheritedMembers = this.collectInterfaceMembers(
            inheritedInterface,
            inheritedSourceModule,
          );
          members.unshift(...inheritedMembers); // Add inherited members first
        }
      }
    }

    return members;
  }

  private findInterface(name: string): AST.InterfaceNode | null {
    // Handle qualified names like "Characteristics::Capture" (IDL) or "Characteristics.Capture" (TypeScript)
    if (name.includes("::") || name.includes(".")) {
      const separator = name.includes("::") ? "::" : ".";
      const parts = name.split(separator);
      const moduleName = parts[0];
      const interfaceName = parts[1];

      // Search in the specified module
      if (this.modules.has(moduleName)) {
        const module = this.modules.get(moduleName)!;
        return this.findInterfaceInDefinitions(
          interfaceName,
          module.definitions,
        );
      }

      return null;
    }

    // Search in current module first
    if (this.currentModule && this.modules.has(this.currentModule)) {
      const module = this.modules.get(this.currentModule)!;
      const found = this.findInterfaceInDefinitions(name, module.definitions);
      if (found) return found;
    }

    // Search in all other modules (prioritizing imported modules)
    if (this.currentModuleOutput) {
      // First search in explicitly imported modules
      for (const importedModule of this.currentModuleOutput.imports) {
        if (this.modules.has(importedModule)) {
          const module = this.modules.get(importedModule)!;
          const found = this.findInterfaceInDefinitions(
            name,
            module.definitions,
          );
          if (found) return found;
        }
      }

      // Also search in type-only imports
      for (const importedModule of this.currentModuleOutput.typeImports) {
        if (this.modules.has(importedModule)) {
          const module = this.modules.get(importedModule)!;
          const found = this.findInterfaceInDefinitions(
            name,
            module.definitions,
          );
          if (found) return found;
        }
      }
    }

    // Search in all other modules
    for (const [moduleName, module] of this.modules) {
      if (moduleName !== this.currentModule) {
        const found = this.findInterfaceInDefinitions(name, module.definitions);
        if (found) return found;
      }
    }

    // Search in root module if we have one
    if (this.rootModule) {
      return this.findInterfaceInDefinitions(name, this.rootModule.definitions);
    }

    return null;
  }

  private findInterfaceInDefinitions(
    name: string,
    definitions: AST.DefinitionNode[],
  ): AST.InterfaceNode | null {
    for (const def of definitions) {
      if (
        def.kind === "interface" && (def as AST.InterfaceNode).name === name
      ) {
        return def as AST.InterfaceNode;
      }
    }
    return null;
  }

  private typeExistsInModule(typeName: string, module: ModuleOutput): boolean {
    for (const def of module.definitions) {
      if (
        (def.kind === "enum" && (def as AST.EnumNode).name === typeName) ||
        (def.kind === "typedef" &&
          (def as AST.TypedefNode).name === typeName) ||
        (def.kind === "struct" && (def as AST.StructNode).name === typeName) ||
        (def.kind === "union" && (def as AST.UnionNode).name === typeName) ||
        (def.kind === "interface" &&
          (def as AST.InterfaceNode).name === typeName)
      ) {
        return true;
      }
    }

    // Also check for flattened nested types like InterfaceName_TypeName
    // This handles cases where typeName is a nested type that was flattened to module level
    for (const def of module.definitions) {
      if (def.kind === "interface") {
        const interfaceDef = def as AST.InterfaceNode;
        // Check if any nested types in this interface match the pattern ParentName_TypeName
        for (const member of interfaceDef.members) {
          const expectedFlattenedName = `${interfaceDef.name}_${member.name}`;
          if (expectedFlattenedName === typeName) {
            if (
              member.kind === "enum" ||
              member.kind === "struct" ||
              member.kind === "union" ||
              member.kind === "typedef" ||
              member.kind === "exception"
            ) {
              return true;
            }
          }
        }
      }
    }

    return false;
  }

  private findFlattenedType(
    typeName: string,
    module: ModuleOutput,
    preferredInterface?: string,
  ): string | null {
    // Look for flattened nested types like InterfaceName_TypeName where TypeName matches our target
    // NOTE: This should only be used when we're in an interface context
    // Without interface context, we should not look for nested types at all

    // If we have a preferred interface (source context), check there first
    if (preferredInterface) {
      for (const def of module.definitions) {
        if (
          def.kind === "interface" &&
          (def as AST.InterfaceNode).name === preferredInterface
        ) {
          const interfaceDef = def as AST.InterfaceNode;
          for (const member of interfaceDef.members) {
            if (member.name === typeName) {
              if (
                member.kind === "enum" ||
                member.kind === "struct" ||
                member.kind === "union" ||
                member.kind === "typedef" ||
                member.kind === "exception"
              ) {
                return `${interfaceDef.name}_${typeName}`;
              }
            }
          }
        }
      }
    }

    // Only look for other matches if we have some interface context
    // Without any interface context, we should not be looking for nested types at all
    if (!preferredInterface) {
      return null;
    }

    // If not found in preferred interface, collect all possible matches
    const allMatches: string[] = [];
    for (const def of module.definitions) {
      if (def.kind === "interface") {
        const interfaceDef = def as AST.InterfaceNode;
        // Skip the preferred interface since we already checked it
        if (interfaceDef.name === preferredInterface) {
          continue;
        }
        for (const member of interfaceDef.members) {
          if (member.name === typeName) {
            if (
              member.kind === "enum" ||
              member.kind === "struct" ||
              member.kind === "union" ||
              member.kind === "typedef" ||
              member.kind === "exception"
            ) {
              allMatches.push(`${interfaceDef.name}_${typeName}`);
            }
          }
        }
      }
    }

    // If multiple matches, apply heuristics to select the best match
    if (allMatches.length > 0) {
      // Build a list with type information for better selection
      const matchesWithInfo: Array<{ name: string; type: string; interfaceName: string }> = [];

      for (const match of allMatches) {
        const interfaceName = match.split("_")[0];
        // Find the actual type of this match
        for (const def of module.definitions) {
          if (def.kind === "interface" && (def as AST.InterfaceNode).name === interfaceName) {
            const interfaceDef = def as AST.InterfaceNode;
            for (const member of interfaceDef.members) {
              if (member.name === typeName) {
                matchesWithInfo.push({
                  name: match,
                  type: member.kind,
                  interfaceName: interfaceName
                });
                break;
              }
            }
          }
        }
      }

      // Apply heuristics:
      // 1. Prefer enum types over other types for discriminator-like usage, but ONLY if we have interface context
      // Without interface context, we should not prefer nested types
      if (preferredInterface) {
        const enumMatches = matchesWithInfo.filter(m => m.type === "enum");
        if (enumMatches.length > 0) {
          // If we have a preferred interface and it has an enum, use it
          const preferredEnum = enumMatches.find(m => m.interfaceName === preferredInterface);
          if (preferredEnum) return preferredEnum.name;
          // Otherwise return the first enum match
          return enumMatches[0].name;
        }
      }

      // 2. Prefer struct types over interface types for data structures
      const structMatches = matchesWithInfo.filter(m => m.type === "struct");
      if (structMatches.length > 0) {
        // If we have a preferred interface and it has a struct, use it
        if (preferredInterface) {
          const preferredStruct = structMatches.find(m => m.interfaceName === preferredInterface);
          if (preferredStruct) return preferredStruct.name;
        }
        // Otherwise return the first struct match
        return structMatches[0].name;
      }

      // 3. For other types, prefer local scope (preferred interface) if available
      if (preferredInterface) {
        const localMatch = matchesWithInfo.find(m => m.interfaceName === preferredInterface);
        if (localMatch) return localMatch.name;
      }

      // 4. Default to first match if no other heuristics apply
      return allMatches[0];
    }

    return null;
  }

  private generateStructUnmarshal(structNode: AST.StructNode | undefined, _typeName: string): string {
    if (!structNode) {
      return `({} as unknown)`;
    }

    // Generate inline object literal with each field unmarshaled
    const fields: string[] = [];
    for (const member of structNode.members) {
      const escapedName = this.escapeReservedWord(member.name);
      const unmarshalCall = this.getUnmarshalCall(member.type);
      fields.push(`${escapedName}: ${unmarshalCall}`);
    }

    return `({ ${fields.join(", ")} })`;
  }

  private generateStructMarshal(structNode: AST.StructNode | undefined, value: string, interfaceContext?: string): string {
    if (!structNode) {
      return `/* Cannot marshal ${value} - struct definition not found */`;
    }

    // Generate code to marshal each field
    const statements: string[] = [];
    for (const member of structNode.members) {
      const escapedName = this.escapeReservedWord(member.name);
      const marshalCall = this.getMarshalCall(member.type, `${value}.${escapedName}`, interfaceContext);
      statements.push(marshalCall);
    }

    // Join statements with semicolons
    return statements.join("; ");
  }

  private generateUnionUnmarshal(unionNode: AST.UnionNode | undefined, _typeName: string): string {
    if (!unionNode) {
      return `({} as unknown)`;
    }

    // Generate proper union unmarshaling with IIFE
    const lines: string[] = [];
    lines.push(`(() => {`);

    // Read discriminator
    const discriminatorUnmarshal = this.getUnmarshalCall(unionNode.discriminatorType);
    lines.push(`  const _discriminator = ${discriminatorUnmarshal};`);
    lines.push(`  switch (_discriminator) {`);

    // Generate cases for each union case
    for (const caseNode of unionNode.cases) {
      if (caseNode.member) {
        for (const label of caseNode.labels) {
          // For enum discriminators, labels are enum member names
          // We need to convert them to the actual enum values
          if (unionNode.discriminatorType.kind === "namedType") {
            // It's an enum type - use the qualified enum member name
            // For cross-module types, we need to qualify them properly
            let enumType = unionNode.discriminatorType.name;
            if (enumType.includes("::")) {
              const parts = enumType.split("::");
              enumType = `${parts[0]}.${parts[parts.length - 1]}`;
            } else {
              // Try to resolve it
              const resolved = this.findTypeInRegistry(enumType);
              if (resolved) {
                // If it's in a different module, we need to qualify it
                if (this.currentModule !== "types" && enumType === "evtFilterType") {
                  enumType = "types." + enumType;
                }
              }
            }
            lines.push(`    case ${enumType}.${label}:`);
          } else {
            // Primitive type - use the value directly
            const labelValue = typeof label === "string" ? `"${label}"` : label;
            lines.push(`    case ${labelValue}:`);
          }
        }

        // Unmarshal the member for this case
        const memberUnmarshal = this.getUnmarshalCall(caseNode.member.type);
        const memberName = this.escapeReservedWord(caseNode.member.name);

        // Create the union object with discriminator and the appropriate field
        // Use the label as a string literal for the discriminator field
        const discriminatorValue = caseNode.labels[0];
        const discriminatorStr = typeof discriminatorValue === "string" ? `"${discriminatorValue}"` : `${discriminatorValue}`;
        lines.push(`      return { discriminator: ${discriminatorStr} as const, ${memberName}: ${memberUnmarshal} };`);
      }
    }

    // Default case
    lines.push(`    default:`);
    lines.push(`      throw new Error(\`Unknown union discriminator: \${_discriminator}\`);`);
    lines.push(`  }`);
    lines.push(`})()`);

    return lines.join("\n");
  }

  private generateUnionMarshal(unionNode: AST.UnionNode | undefined, value: string, _interfaceContext?: string): string {
    if (!unionNode) {
      return `/* Cannot marshal ${value} - union definition not found */`;
    }

    // Generate proper union marshaling with IIFE
    const lines: string[] = [];
    lines.push(`(() => {`);

    // First, we need to marshal the discriminator
    lines.push(`  const _union = ${value};`);

    // Determine how to write the discriminator based on its type
    const discriminatorType = unionNode.discriminatorType;

    // Generate switch statement to handle each case
    lines.push(`  switch (_union.discriminator) {`);

    // Generate cases for each union case
    for (const caseNode of unionNode.cases) {
      if (caseNode.member) {
        if (caseNode.isDefault) {
          lines.push(`    case "default": {`);
        } else {
          // Generate case labels
          for (let i = 0; i < caseNode.labels.length; i++) {
            const label = caseNode.labels[i];
            // Use the label as a string literal for matching
            const labelValue = typeof label === "string" ? `"${label}"` : label;
            if (i === caseNode.labels.length - 1) {
              // Last label gets the opening brace
              lines.push(`    case ${labelValue}: {`);
            } else {
              // Other labels just fall through
              lines.push(`    case ${labelValue}:`);
            }
          }
        }

        // Write the discriminator value
        let discriminatorValue: string;
        if (caseNode.isDefault) {
          // For default case, we need a value that doesn't match any other case
          // This is tricky - in CORBA, the default case handles any discriminator
          // value not explicitly listed. We'll write a special value or the first
          // non-matched value
          if (discriminatorType.kind === "primitiveType") {
            switch (discriminatorType.type) {
              case "long":
              case "short":
              case "unsigned long":
              case "unsigned short":
                discriminatorValue = "-1; // Default case";
                break;
              case "boolean":
                discriminatorValue = "false; // Default case";
                break;
              default:
                discriminatorValue = "0; // Default case";
            }
          } else {
            discriminatorValue = "-1; // Default case";
          }
        } else {
          // For regular cases, get the actual discriminator value
          const label = caseNode.labels[0];
          if (discriminatorType.kind === "namedType") {
            // It's an enum - need to get the enum value
            let enumType = discriminatorType.name;
            if (enumType.includes("::")) {
              const parts = enumType.split("::");
              enumType = `${parts[0]}.${parts[parts.length - 1]}`;
            } else {
              // Try to resolve it
              const resolved = this.findTypeInRegistry(enumType);
              if (resolved) {
                // If it's in a different module, we need to qualify it
                if (this.currentModule !== "types" && enumType === "evtFilterType") {
                  enumType = "types." + enumType;
                }
              }
            }
            discriminatorValue = `${enumType}.${label}`;
          } else {
            // Primitive type - use the value directly
            discriminatorValue = `${label}`;
          }
        }

        // Marshal the discriminator
        lines.push(`      const _discriminatorValue = ${discriminatorValue};`);
        const discriminatorMarshal = this.getMarshalCall(discriminatorType, "_discriminatorValue");
        lines.push(`      ${discriminatorMarshal};`);

        // Marshal the member value
        const memberName = this.escapeReservedWord(caseNode.member.name);
        const memberMarshal = this.getMarshalCall(caseNode.member.type, `_union.${memberName}`);
        lines.push(`      ${memberMarshal};`);
        lines.push(`      break;`);
        lines.push(`    }`);
      }
    }

    // Default error case
    lines.push(`    default:`);
    lines.push(`      throw new Error(\`Unknown union discriminator: \${(_union as { discriminator: unknown }).discriminator}\`);`);
    lines.push(`  }`);
    lines.push(`})()`);

    return lines.join("\n");
  }

  private findTypeInRegistry(typeName: string): { kind: string; node?: AST.DefinitionNode } | undefined {
    // 1. Try direct lookup (for local types and fully qualified names)
    let typeInfo = this.typeRegistry.get(typeName);
    if (typeInfo) return typeInfo;

    // 1b. If the typeName contains ::, it's already qualified - also try without current module prefix
    // (in case we're looking up types::timeout from within types module)
    if (typeName.includes("::")) {
      const parts = typeName.split("::");
      if (parts.length >= 2) {
        const simpleName = parts[parts.length - 1];
        typeInfo = this.typeRegistry.get(simpleName);
        if (typeInfo) return typeInfo;
      }
    }

    // 2. Try nested type lookup (for interface-nested types)
    if (this.nestedTypes.has(typeName)) {
      const prefixedName = this.nestedTypes.get(typeName)!;
      typeInfo = this.typeRegistry.get(prefixedName);
      if (typeInfo) return typeInfo;
    }

    // 3. Try cross-module lookup (types.timeout -> types::timeout)
    if (typeName.includes('.')) {
      const qualifiedName = typeName.replace(/\./g, '::');
      typeInfo = this.typeRegistry.get(qualifiedName);
      if (typeInfo) return typeInfo;
    }

    // 4. Try with current module prefix
    if (this.currentModulePrefix) {
      const fullyQualified = `${this.currentModulePrefix}::${typeName}`;
      typeInfo = this.typeRegistry.get(fullyQualified);
      if (typeInfo) return typeInfo;
    }

    // 5. Search through all registered types for a match
    for (const [key, value] of this.typeRegistry.entries()) {
      // Check if the key ends with our type name (handles various prefixes)
      if (key.endsWith(`::${typeName}`) || key.endsWith(`_${typeName}`)) {
        return value;
      }
    }

    return undefined;
  }
}

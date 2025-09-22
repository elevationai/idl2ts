import * as AST from "../ast/nodes.ts";
import { IDLPreprocessor } from "./IDLPreprocessor.ts";

export interface ParserOptions {
  includePaths?: string[];
  filePath?: string;
}

export class IDLParser {
  private input: string;
  private tokens: string[] = [];
  private currentToken: number = 0;
  private preprocessor: IDLPreprocessor;
  private globalInhibit: boolean = false;

  constructor(options: ParserOptions = {}) {
    this.input = "";
    this.preprocessor = new IDLPreprocessor(options.includePaths || []);
  }

  parse(input: string, filePath?: string): AST.SpecificationNode {
    // Preprocess the input
    const preprocessed = this.preprocessor.preprocess(input, filePath);
    this.input = preprocessed.processedContent;

    this.tokenize();
    this.currentToken = 0;

    const definitions: AST.DefinitionNode[] = [];

    while (this.currentToken < this.tokens.length) {
      // Check for pragma markers
      if (this.peek() === "__PRAGMA_GLOBAL_INHIBIT__") {
        this.consume("__PRAGMA_GLOBAL_INHIBIT__");
        this.globalInhibit = true;
        // Stop processing entirely after global inhibit
        break;
      }

      // Skip definitions if global inhibit is active
      if (this.globalInhibit) {
        // This shouldn't be reached now, but keep as safety
        break;
      }

      const def = this.parseDefinition();
      if (def) {
        definitions.push(def);
      }
    }

    return {
      kind: "specification",
      definitions,
      pragmas: preprocessed.pragmas,
    };
  }

  private tokenize(): void {
    // Only remove comments, preprocessor already handled directives
    const cleanInput = this.input
      .replace(/\/\/.*$/gm, "")
      .replace(/\/\*[\s\S]*?\*\//g, "");

    // Modified pattern to explicitly match our pragma marker
    const tokenPattern = /__PRAGMA_GLOBAL_INHIBIT__|"[^"]*"|'[^']*'|::|[a-zA-Z_][a-zA-Z0-9_]*|[0-9]+\.?[0-9]*|[{}();,<>[\]=]|./gm;
    const matches = cleanInput.match(tokenPattern) || [];

    this.tokens = matches.filter((token) => {
      return !token.match(/^\s+$/);
    });
  }

  private peek(offset: number = 0): string {
    return this.tokens[this.currentToken + offset] || "";
  }

  private consume(expected?: string): string {
    const token = this.tokens[this.currentToken];
    if (expected && token !== expected) {
      throw new Error(`Expected '${expected}' but got '${token}'`);
    }
    this.currentToken++;
    return token;
  }

  private consumeSemicolon(): void {
    // Try to consume semicolon, but don't fail if it's missing
    if (this.peek() === ";") {
      this.consume(";");
    }
  }

  /**
   * Parses anonymous struct body (just the members, not creating a definition)
   */
  private parseAnonymousStruct(): AST.MemberNode[] {
    this.consume("{");
    const members: AST.MemberNode[] = [];

    while (this.peek() !== "}" && this.currentToken < this.tokens.length) {
      if (this.peek() === "::" || this.isType(this.peek())) {
        let type = this.parseType();
        const memberName = this.consume();
        type = this.parseArrayDimensions(type);

        members.push({
          kind: "member",
          name: memberName,
          type,
        });

        this.consume(";");
      }
      else {
        break;
      }
    }

    this.consume("}");
    return members;
  }

  /**
   * Parses anonymous union body (just the cases, not creating a definition)
   */
  private parseAnonymousUnion(): AST.UnionCaseNode[] {
    this.consume("switch");
    this.consume("(");
    this.parseType(); // Parse and consume discriminator type
    this.consume(")");
    this.consume("{");

    const cases: AST.UnionCaseNode[] = [];

    while (this.peek() !== "}" && this.currentToken < this.tokens.length) {
      const unionCase = this.parseUnionCase();
      if (unionCase) {
        cases.push(unionCase);
      }
    }

    this.consume("}");
    return cases;
  }

  /**
   * Parses anonymous enum body (just the members, not creating a definition)
   */
  private parseAnonymousEnum(): string[] {
    this.consume("{");
    const members: string[] = [];

    while (this.peek() !== "}" && this.currentToken < this.tokens.length) {
      members.push(this.consume());
      if (this.peek() === ",") {
        this.consume(",");
      }
      else if (this.peek() !== "}") {
        break;
      }
    }

    this.consume("}");
    return members;
  }

  /**
   * Parses a struct member, handling both regular types and inline definitions.
   * @returns The parsed member node or null if not a valid member
   */
  private parseStructMember(): AST.MemberNode | null {
    const token = this.peek();
    let type: AST.TypeNode;
    let memberName: string;

    // Handle inline type definitions (enum, struct, union)
    if (token === "enum") {
      this.consume("enum");
      let enumName: string | undefined;
      if (this.peek() !== "{") {
        enumName = this.consume();
      }
      if (this.peek() === "{") {
        this.parseAnonymousEnum(); // Parse inline enum definition
        memberName = this.consume();
        type = { kind: "namedType", name: enumName || memberName };
      } else {
        memberName = this.consume();
        type = { kind: "namedType", name: enumName! };
      }
    }
    else if (token === "struct") {
      this.consume("struct");
      let structName: string | undefined;
      if (this.peek() !== "{") {
        structName = this.consume();
      }
      if (this.peek() === "{") {
        this.parseAnonymousStruct(); // Parse inline struct definition
        memberName = this.consume();
        type = { kind: "namedType", name: structName || memberName };
      } else {
        memberName = this.consume();
        type = { kind: "namedType", name: structName! };
      }
    }
    else if (token === "union") {
      this.consume("union");
      let unionName: string | undefined;
      if (this.peek() !== "switch") {
        unionName = this.consume();
      }
      if (this.peek() === "switch") {
        this.parseAnonymousUnion(); // Parse inline union definition
        memberName = this.consume();
        type = { kind: "namedType", name: unionName || memberName };
      } else {
        memberName = this.consume();
        type = { kind: "namedType", name: unionName! };
      }
    }
    // Handle regular types
    else if (this.peek() === "::" || this.isType(this.peek())) {
      type = this.parseType();
      memberName = this.consume();
    } else {
      return null;
    }

    // Check for array dimensions
    type = this.parseArrayDimensions(type);
    this.consume(";");

    return {
      kind: "member",
      name: memberName,
      type,
    };
  }

  /**
   * Parses array dimensions and wraps the given type in an arrayType if dimensions are found.
   * This is used consistently across struct members, union cases, exceptions, parameters, and typedefs.
   */
  private parseArrayDimensions(type: AST.TypeNode): AST.TypeNode {
    const dimensions: number[] = [];

    while (this.peek() === "[") {
      this.consume("[");
      const dim = this.consume();
      dimensions.push(parseInt(dim));
      this.consume("]");
    }

    // If we have dimensions, wrap the type in an arrayType
    if (dimensions.length > 0) {
      return {
        kind: "arrayType",
        elementType: type,
        dimensions,
      };
    }

    return type;
  }

  private parseDefinition(): AST.DefinitionNode | null {
    const token = this.peek();

    switch (token) {
      case "module":
        return this.parseModule();
      case "interface":
        return this.parseInterface();
      case "struct":
        return this.parseStruct();
      case "enum":
        return this.parseEnum();
      case "typedef":
        return this.parseTypedef();
      case "const":
        return this.parseConstant();
      case "exception":
        return this.parseException();
      case "union":
        return this.parseUnion();
      default:
        if (token === "#" || token === ";") {
          this.consume();
          return null;
        }
        if (this.currentToken < this.tokens.length) {
          this.consume();
        }
        return null;
    }
  }

  private parseModule(): AST.ModuleNode {
    this.consume("module");
    const name = this.consume();
    this.consume("{");

    const definitions: AST.DefinitionNode[] = [];

    while (this.peek() !== "}" && this.currentToken < this.tokens.length) {
      const def = this.parseDefinition();
      if (def) {
        definitions.push(def);
      }
    }

    this.consume("}");
    this.consume(";");

    return {
      kind: "module",
      name,
      definitions,
    };
  }

  private parseInterface(): AST.InterfaceNode {
    this.consume("interface");
    const name = this.consume();

    // Check for forward declaration
    if (this.peek() === ";") {
      this.consume(";");
      return {
        kind: "interface",
        name,
        members: [],
      };
    }

    let inheritance: string[] | undefined;
    if (this.peek() === ":") {
      this.consume(":");
      inheritance = [this.parseQualifiedName()];
      while (this.peek() === ",") {
        this.consume(",");
        inheritance.push(this.parseQualifiedName());
      }
    }

    this.consume("{");

    const members: AST.InterfaceMemberNode[] = [];

    while (this.peek() !== "}" && this.currentToken < this.tokens.length) {
      const member = this.parseInterfaceMember();
      if (member) {
        members.push(member);
      }
    }

    this.consume("}");
    this.consumeSemicolon();

    return {
      kind: "interface",
      name,
      inheritance,
      members,
    };
  }

  private parseInterfaceMember(): AST.InterfaceMemberNode | null {
    const token = this.peek();

    if (token === "readonly") {
      return this.parseAttribute(true);
    }
    else if (token === "attribute") {
      return this.parseAttribute(false);
    }
    else if (token === "oneway") {
      this.consume();
      return this.parseOperation(true);
    }
    else if (token === "enum") {
      // Handle nested enum in interface
      return this.parseEnum();
    }
    else if (token === "struct") {
      return this.parseStruct();
    }
    else if (token === "typedef") {
      return this.parseTypedef();
    }
    else if (token === "const") {
      return this.parseConstant();
    }
    else if (token === "exception") {
      return this.parseException();
    }
    else if (token === "void" || token === "::" || this.isType(token)) {
      // Look ahead to determine if this is an operation (has parentheses) or attribute
      const currentPos = this.currentToken;

      try {
        this.parseType(); // Parse the type
        this.consume(); // Parse the name

        if (this.peek() === "(") {
          // It's an operation - reset and parse as operation
          this.currentToken = currentPos;
          return this.parseOperation(false);
        }
        else {
          // It's an attribute - reset and parse as attribute
          this.currentToken = currentPos;
          const type = this.parseType();
          const attrName = this.consume();
          this.consume(";");

          return {
            kind: "attribute",
            name: attrName,
            type: type,
            isReadonly: false,
          };
        }
      }
      catch (_e) {
        // If parsing fails, reset position and try as operation
        this.currentToken = currentPos;
        return this.parseOperation(false);
      }
    }
    else {
      if (token === ";") {
        this.consume();
      }
      return null;
    }
  }

  private parseOperation(isOneway: boolean): AST.OperationNode {
    const returnType = this.parseType();
    const name = this.consume();

    this.consume("(");
    const parameters = this.parseParameters();
    this.consume(")");

    let raises: string[] | undefined;
    if (this.peek() === "raises") {
      this.consume("raises");
      this.consume("(");
      raises = [];
      raises.push(this.consume());
      while (this.peek() === ",") {
        this.consume(",");
        raises.push(this.consume());
      }
      this.consume(")");
    }

    this.consumeSemicolon();

    return {
      kind: "operation",
      name,
      returnType,
      parameters,
      raises,
      isOneway,
    };
  }

  private parseParameters(): AST.ParameterNode[] {
    const params: AST.ParameterNode[] = [];

    if (this.peek() === ")") {
      return params;
    }

    do {
      if (this.peek() === ",") {
        this.consume(",");
      }

      let direction: "in" | "out" | "inout" = "in";
      if (this.peek() === "in") {
        this.consume("in");
        direction = "in";
      }
      else if (this.peek() === "out") {
        this.consume("out");
        direction = "out";
      }
      else if (this.peek() === "inout") {
        this.consume("inout");
        direction = "inout";
      }

      let type = this.parseType();
      const name = this.consume();
      type = this.parseArrayDimensions(type);

      params.push({
        kind: "parameter",
        name,
        type,
        direction,
      });
    }
    while (this.peek() === ",");

    return params;
  }

  private parseAttribute(isReadonly: boolean): AST.AttributeNode {
    if (isReadonly) {
      this.consume("readonly");
    }
    this.consume("attribute");

    const type = this.parseType();
    const name = this.consume();

    this.consume(";");

    return {
      kind: "attribute",
      name,
      type,
      isReadonly,
    };
  }

  private parseStruct(): AST.StructNode {
    this.consume("struct");
    const name = this.consume();

    // Check for forward declaration
    if (this.peek() === ";") {
      this.consume(";");
      return {
        kind: "struct",
        name,
        members: [],
      };
    }

    this.consume("{");

    const members: AST.MemberNode[] = [];

    while (this.peek() !== "}" && this.currentToken < this.tokens.length) {
      const member = this.parseStructMember();
      if (member) {
        members.push(member);
      } else {
        break;
      }
    }

    this.consume("}");
    this.consume(";");

    return {
      kind: "struct",
      name,
      members,
    };
  }

  private parseUnion(): AST.UnionNode {
    this.consume("union");
    const name = this.consume();

    // Check for forward declaration
    if (this.peek() === ";") {
      this.consume(";");
      return {
        kind: "union",
        name,
        discriminatorType: { kind: "primitiveType", type: "long" }, // Default discriminator for forward declarations
        cases: [],
      };
    }

    this.consume("switch");
    this.consume("(");
    const discriminatorType = this.parseType();
    this.consume(")");
    this.consume("{");

    const cases: AST.UnionCaseNode[] = [];

    while (this.peek() !== "}" && this.currentToken < this.tokens.length) {
      const unionCase = this.parseUnionCase();
      if (unionCase) {
        cases.push(unionCase);
      }
    }

    this.consume("}");
    this.consume(";");

    return {
      kind: "union",
      name,
      discriminatorType,
      cases,
    };
  }

  private parseUnionCase(): AST.UnionCaseNode | null {
    const labels: (string | number | boolean)[] = [];
    let isDefault = false;

    while (this.peek() === "case" || this.peek() === "default") {
      if (this.peek() === "case") {
        this.consume("case");
        let value = this.consume();
        // Handle negative numbers
        if (value === "-") {
          value = "-" + this.consume();
        }
        labels.push(this.parseValue(value));
        this.consume(":");
      }
      else if (this.peek() === "default") {
        this.consume("default");
        this.consume(":");
        isDefault = true;
      }
    }

    if (labels.length === 0 && !isDefault) {
      return null;
    }

    let member: AST.MemberNode | undefined;
    if (this.isType(this.peek())) {
      let type = this.parseType();
      const name = this.consume();
      type = this.parseArrayDimensions(type);

      member = {
        kind: "member",
        name,
        type,
      };
      this.consume(";");
    }

    return {
      kind: "unionCase",
      labels,
      member,
      isDefault,
    };
  }

  private parseEnum(): AST.EnumNode {
    this.consume("enum");
    const name = this.consume();
    this.consume("{");

    const members: string[] = [];

    while (this.peek() !== "}" && this.currentToken < this.tokens.length) {
      members.push(this.consume());
      if (this.peek() === ",") {
        this.consume(",");
      }
    }

    this.consume("}");
    this.consume(";");

    return {
      kind: "enum",
      name,
      members,
    };
  }

  private parseTypedef(): AST.TypedefNode {
    this.consume("typedef");

    // Try to parse type, but handle malformed typedef
    let type: AST.TypeNode;
    let name: string;

    try {
      const nextToken = this.peek();
      if (nextToken === ";" || !nextToken) {
        // Malformed typedef with no type or name - use any as default
        type = { kind: "primitiveType", type: "any" };
        name = "UnknownType";
      }
      else if (this.tokens[this.currentToken + 1] === ";") {
        // Only name provided, no type (e.g., typedef MissingType;)
        name = this.consume();
        type = { kind: "primitiveType", type: "any" };
      }
      else if (nextToken === "struct") {
        // Anonymous struct: typedef struct [Name] { ... } AliasName;
        this.consume("struct");
        let structName: string | undefined;
        if (this.peek() !== "{") {
          structName = this.consume();
        }
        if (this.peek() === "{") {
          this.parseAnonymousStruct(); // Parse anonymous struct body
          name = this.consume(); // The typedef alias name comes after the struct definition
          type = { kind: "namedType", name: structName || name };
        } else {
          type = { kind: "namedType", name: structName! };
          name = this.consume();
        }
      }
      else if (nextToken === "union") {
        // Anonymous union: typedef union [Name] switch(...) { ... } AliasName;
        this.consume("union");
        let unionName: string | undefined;
        if (this.peek() !== "switch") {
          unionName = this.consume();
        }
        if (this.peek() === "switch") {
          this.parseAnonymousUnion(); // Parse anonymous union body
          name = this.consume(); // The typedef alias name comes after the union definition
          type = { kind: "namedType", name: unionName || name };
        } else {
          type = { kind: "namedType", name: unionName! };
          name = this.consume();
        }
      }
      else if (nextToken === "enum") {
        // Anonymous enum: typedef enum [Name] { ... } AliasName;
        this.consume("enum");
        let enumName: string | undefined;
        if (this.peek() !== "{") {
          enumName = this.consume();
        }
        if (this.peek() === "{") {
          this.parseAnonymousEnum(); // Parse anonymous enum body
          name = this.consume(); // The typedef alias name comes after the enum definition
          type = { kind: "namedType", name: enumName || name };
        } else {
          type = { kind: "namedType", name: enumName! };
          name = this.consume();
        }
      }
      else {
        // Normal case: parse the base type first
        type = this.parseType();

        // Now get the typedef name
        name = this.consume();
      }
    }
    catch (_e) {
      // Error recovery - create a minimal valid typedef
      type = { kind: "primitiveType", type: "any" };
      name = "ErrorType";
    }

    // Check for array dimensions after the name
    type = this.parseArrayDimensions(type);

    this.consume(";");

    return {
      kind: "typedef",
      name,
      type,
    };
  }

  private parseConstant(): AST.ConstantNode {
    this.consume("const");
    const type = this.parseType();
    const name = this.consume();
    this.consume("=");

    // Handle negative numbers and expressions
    let valueStr = "";
    let parenDepth = 0;

    while (this.peek() !== ";" && this.currentToken < this.tokens.length) {
      const token = this.peek();
      if (token === "(") parenDepth++;
      if (token === ")") parenDepth--;
      valueStr += token;
      this.consume();

      // If we're not in parentheses and hit certain tokens, stop
      if (parenDepth === 0 && (token === "," || token === "}")) {
        break;
      }
    }

    const value = this.parseValue(valueStr);
    this.consume(";");

    return {
      kind: "constant",
      name,
      type,
      value,
    };
  }

  private parseException(): AST.ExceptionNode {
    this.consume("exception");
    const name = this.consume();
    this.consume("{");

    const members: AST.MemberNode[] = [];

    while (this.peek() !== "}" && this.currentToken < this.tokens.length) {
      if (this.isType(this.peek())) {
        let type = this.parseType();
        const memberName = this.consume();
        type = this.parseArrayDimensions(type);

        members.push({
          kind: "member",
          name: memberName,
          type,
        });

        this.consume(";");
      }
      else {
        break;
      }
    }

    this.consume("}");
    this.consume(";");

    return {
      kind: "exception",
      name,
      members,
    };
  }

  private parseType(): AST.TypeNode {
    const token = this.peek();

    if (token === "sequence") {
      this.consume("sequence");
      this.consume("<");
      const elementType = this.parseType();
      let bound: number | undefined;
      if (this.peek() === ",") {
        this.consume(",");
        bound = parseInt(this.consume());
      }
      this.consume(">");

      return {
        kind: "sequenceType",
        elementType,
        bound,
      };
    }

    if (token === "string") {
      this.consume("string");
      let bound: number | undefined;
      if (this.peek() === "<") {
        this.consume("<");
        bound = parseInt(this.consume());
        this.consume(">");
      }
      return {
        kind: "stringType",
        type: "string",
        bound,
      };
    }

    if (token === "wstring") {
      this.consume("wstring");
      let bound: number | undefined;
      if (this.peek() === "<") {
        this.consume("<");
        bound = parseInt(this.consume());
        this.consume(">");
      }
      return {
        kind: "stringType",
        type: "wstring",
        bound,
      };
    }

    const primitiveTypes = [
      "void",
      "boolean",
      "char",
      "wchar",
      "octet",
      "short",
      "long",
      "float",
      "double",
      "any",
      "Object",
    ];

    if (primitiveTypes.includes(token)) {
      this.consume();

      if (token === "long" && this.peek() === "long") {
        this.consume("long");
        return { kind: "primitiveType", type: "long long" };
      }

      if (token === "long" && this.peek() === "double") {
        this.consume("double");
        return { kind: "primitiveType", type: "long double" };
      }

      return {
        kind: "primitiveType",
        type: token as AST.PrimitiveTypeNode["type"],
      };
    }

    if (token === "unsigned") {
      this.consume("unsigned");
      const nextToken = this.consume();

      if (nextToken === "long" && this.peek() === "long") {
        this.consume("long");
        return { kind: "primitiveType", type: "unsigned long long" };
      }

      return {
        kind: "primitiveType",
        type: `unsigned ${nextToken}` as AST.PrimitiveTypeNode["type"],
      };
    }

    const name = this.parseQualifiedName();
    return { kind: "namedType", name };
  }

  private parseQualifiedName(): string {
    const parts: string[] = [];

    // Handle leading :: for global scope
    let prefix = "";
    if (this.peek() === "::") {
      prefix = "::";
      this.consume("::");
    }

    parts.push(this.consume());

    while (this.peek() === "::") {
      this.consume("::");
      parts.push(this.consume());
    }

    return prefix + parts.join("::");
  }

  private parseValue(token: string): string | number | boolean {
    if (token === "TRUE" || token === "true") return true;
    if (token === "FALSE" || token === "false") return false;

    if (token.startsWith('"') && token.endsWith('"')) {
      let str = token.slice(1, -1);
      // Handle escape sequences in strings - order matters!
      // First handle doubled backslashes to avoid double processing
      str = str.replace(/\\\\/g, "\u0000"); // Temporarily replace \\ with null char
      str = str.replace(/\\n/g, "\n");
      str = str.replace(/\\t/g, "\t");
      str = str.replace(/\\r/g, "\r");
      str = str.replace(/\\'/g, "'");
      str = str.replace(/\\"/g, '"');
      // deno-lint-ignore no-control-regex
      str = str.replace(/\u0000/g, "\\"); // Restore single backslashes
      return str;
    }

    if (token.startsWith("'") && token.endsWith("'")) {
      const char = token.slice(1, -1);
      // Handle escape sequences
      if (char === "\\n") return "\n";
      if (char === "\\t") return "\t";
      if (char === "\\r") return "\r";
      if (char === "\\\\") return "\\";
      if (char === "\\'") return "'";
      if (char === '\\"') return '"';
      return char;
    }

    // Handle negative numbers
    if (token.match(/^-?[0-9]+$/)) {
      return parseInt(token);
    }

    if (token.match(/^-?0x[0-9a-fA-F]+$/)) {
      return parseInt(token, 16);
    }

    if (token.match(/^-?[0-9]*\.?[0-9]+([eE][+-]?[0-9]+)?$/)) {
      return parseFloat(token);
    }

    // Handle expressions (keep as string for now)
    if (
      token.includes("(") || token.includes("+") || token.includes("-") ||
      token.includes("*") || token.includes("/") || token.includes("<<") ||
      token.includes(">>")
    ) {
      // Try to evaluate simple expressions
      try {
        // Remove spaces and evaluate
        const cleanExpr = token.replace(/\s+/g, "");
        // Only evaluate if it's a simple numeric expression
        if (/^[\d\-+*\/()<<>>]+$/.test(cleanExpr)) {
          // Use Function constructor to safely evaluate
          const result = Function(
            '"use strict"; return (' +
              cleanExpr.replace(/<</, "*Math.pow(2,").replace(
                />>/,
                ")/Math.pow(2,",
              ) + ")",
          )();
          return result;
        }
      }
      catch (_e) {
        // If evaluation fails, return as string
      }
    }

    return token;
  }

  private isType(token: string): boolean {
    const types = [
      "void",
      "boolean",
      "char",
      "wchar",
      "octet",
      "short",
      "long",
      "float",
      "double",
      "any",
      "Object",
      "unsigned",
      "string",
      "wstring",
      "sequence",
      "fixed",
    ];

    return types.includes(token) ||
      (!!token && token.length > 0 && /^[a-zA-Z_]/.test(token));
  }
}

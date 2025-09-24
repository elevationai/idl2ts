import * as AST from "../ast/nodes.ts";
import { IDLPreprocessor } from "./IDLPreprocessor.ts";
import { ExpressionEvaluator } from "./ExpressionEvaluator.ts";

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
  private expressionEvaluator: ExpressionEvaluator;
  private definedConstants: Map<string, number> = new Map();

  constructor(options: ParserOptions = {}) {
    this.input = "";
    this.preprocessor = new IDLPreprocessor(options.includePaths || []);
    this.expressionEvaluator = new ExpressionEvaluator(this.definedConstants);
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
      const token = this.peek();

      // Handle inline type definitions (enum, struct, union)
      if (token === "enum" || token === "struct" || token === "union") {
        const parsedMembers = this.parseStructMember();
        if (parsedMembers) {
          members.push(...parsedMembers);
        } else {
          break;
        }
      }
      // Handle regular types
      else if (this.peek() === "::" || this.isType(this.peek())) {
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
   * Parses anonymous union body (just the cases, including the closing brace)
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
   * Also handles comma-separated declarators like 'Date first, last;'
   * @returns The parsed member nodes or null if not a valid member
   */
  private parseStructMember(): AST.MemberNode[] | null {
    const token = this.peek();
    let type: AST.TypeNode;
    const memberNames: string[] = [];

    // Handle inline type definitions (enum, struct, union)
    if (token === "enum") {
      this.consume("enum");
      let enumName: string | undefined;

      // Check if we have a name before '{'
      if (this.peek() !== "{") {
        enumName = this.consume();
      }

      // Now check if this is an inline enum definition
      if (this.peek() === "{") {
        this.parseAnonymousEnum(); // Parse inline enum definition
        // Always get the member name after the definition
        memberNames.push(this.consume());
        // Use the enum name if provided, otherwise use the member name
        type = { kind: "namedType", name: enumName || memberNames[0] };
      } else {
        // This is a regular enum type reference, get the member name
        memberNames.push(this.consume());
        type = { kind: "namedType", name: enumName! };
      }
    }
    else if (token === "struct") {
      this.consume("struct");
      let structName: string | undefined;

      // Check if we have a name before '{'
      if (this.peek() !== "{") {
        structName = this.consume();
      }

      // Now check if this is an inline struct definition
      if (this.peek() === "{") {
        this.parseAnonymousStruct(); // Parse inline struct definition
        // Always get the member name after the definition
        memberNames.push(this.consume());
        // Use the struct name if provided, otherwise use the member name
        type = { kind: "namedType", name: structName || memberNames[0] };
      } else {
        // This is a regular struct type reference, get the member name
        memberNames.push(this.consume());
        type = { kind: "namedType", name: structName! };
      }
    }
    else if (token === "union") {
      this.consume("union");
      let unionName: string | undefined;

      // Check if we have a name before 'switch'
      if (this.peek() !== "switch") {
        unionName = this.consume();
      }

      // Now check if this is an inline union definition
      if (this.peek() === "switch") {
        this.parseAnonymousUnion(); // Parse inline union definition
        // Get the member name after the closing brace
        const memberName = this.consume();
        memberNames.push(memberName);
        // If we had a name before switch, it's the type name
        // If not, use the member name as the type name
        type = { kind: "namedType", name: unionName || memberName };
      } else {
        // This is a regular union type reference, get the member name
        memberNames.push(this.consume());
        type = { kind: "namedType", name: unionName! };
      }
    }
    // Handle regular types
    else if (this.peek() === "::" || this.isType(this.peek())) {
      type = this.parseType();
      memberNames.push(this.consume());

      // Handle comma-separated declarators (e.g., Date first, last;)
      while (this.peek() === ",") {
        this.consume(",");
        memberNames.push(this.consume());
      }
    } else {
      return null;
    }

    // Create members array
    const members: AST.MemberNode[] = [];
    for (const memberName of memberNames) {
      // Check for array dimensions for each member
      const memberType = this.parseArrayDimensions(type);
      members.push({
        kind: "member",
        name: memberName,
        type: memberType,
      });
    }

    this.consume(";");
    return members;
  }

  /**
   * Parses array dimensions and wraps the given type in an arrayType if dimensions are found.
   * This is used consistently across struct members, union cases, exceptions, parameters, and typedefs.
   */
  private parseArrayDimensions(type: AST.TypeNode): AST.TypeNode {
    const dimensions: number[] = [];

    while (this.peek() === "[") {
      this.consume("[");
      // Collect tokens until we find the closing bracket
      let dimExpr = "";
      while (this.peek() !== "]" && this.currentToken < this.tokens.length) {
        dimExpr += this.consume();
      }

      // Parse the dimension expression
      const dimValue = this.parseValue(dimExpr);
      if (typeof dimValue === 'number') {
        dimensions.push(dimValue);
      } else {
        // If it's not a number, try to parse as integer
        dimensions.push(parseInt(String(dimValue)));
      }
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
      case "native":
        return this.parseNative();
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
    else if (token === "union") {
      return this.parseUnion();
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
      // Handle qualified exception names (e.g., MosQuery::LoginFailure)
      raises.push(this.parseQualifiedName());
      while (this.peek() === ",") {
        this.consume(",");
        raises.push(this.parseQualifiedName());
      }
      this.consume(")");
    }

    // Parse context clause if present
    // Context clauses are a CORBA-specific feature for passing implicit environmental properties
    // (like user ID, locale, timezone) from client to server alongside the explicit parameters.
    // We parse and store them in the AST for completeness, but ignore them during TypeScript
    // generation because:
    // 1. TypeScript has no built-in equivalent for CORBA-style context propagation
    // 2. Context handling is an ORB runtime concern, not part of the static type system
    // 3. Modern approaches use explicit parameters, headers, or middleware for such data
    // The context data remains in the AST for potential future use (documentation, validation, etc.)
    let context: string[] | undefined;
    if (this.peek() === "context") {
      this.consume("context");
      this.consume("(");
      context = this.parseContextList();
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
      context,
    };
  }

  private parseContextList(): string[] {
    // Parse context list and return the context property names
    const contextItems: string[] = [];
    if (this.peek().startsWith('"')) {
      // Remove quotes from the string literal
      const firstItem = this.consume();
      contextItems.push(firstItem.slice(1, -1)); // Remove surrounding quotes
      while (this.peek() === ",") {
        this.consume(",");
        const nextItem = this.consume();
        contextItems.push(nextItem.slice(1, -1)); // Remove surrounding quotes
      }
    }
    return contextItems;
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
      const parsedMembers = this.parseStructMember();
      if (parsedMembers) {
        members.push(...parsedMembers);
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

        // Handle qualified names (e.g., struct2::RED) and negative numbers
        let value: string;
        if (this.peek(1) === "::") {
          // It's a qualified name, parse the full name
          value = this.parseQualifiedName();
        } else if (this.peek() === "-") {
          // Handle negative numbers
          value = this.consume() + this.consume();
        } else {
          value = this.consume();
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
    const token = this.peek();

    // Handle inline type definitions (enum, struct, union) in union cases
    if (token === "enum" || token === "struct" || token === "union") {
      const parsedMembers = this.parseStructMember();
      if (parsedMembers && parsedMembers.length > 0) {
        member = parsedMembers[0]; // Union cases only support single member
      }
    }
    // Handle regular types
    else if (this.isType(token)) {
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

    const members: AST.EnumMemberNode[] = [];
    let nextValue = 0;  // Enum values start at 0 by default

    while (this.peek() !== "}" && this.currentToken < this.tokens.length) {
      const memberName = this.consume();
      let memberValue: number;

      if (this.peek() === "=") {
        // Explicit value provided
        this.consume("=");

        // Collect tokens until comma or closing brace
        let valueExpr = "";
        while (this.peek() !== "," && this.peek() !== "}" && this.currentToken < this.tokens.length) {
          valueExpr += this.consume();
        }

        // Evaluate the expression
        const evaluatedValue = this.parseValue(valueExpr);
        if (typeof evaluatedValue === 'number') {
          memberValue = evaluatedValue;
        } else {
          throw new Error(`Enum member value must be a constant integer expression: ${valueExpr}`);
        }
        nextValue = memberValue + 1;
      } else {
        // Use auto-incremented value
        memberValue = nextValue++;
      }

      members.push({
        kind: "enumMember",
        name: memberName,
        value: memberValue
      });

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

    // Store constant value if it's numeric
    if (typeof value === 'number') {
      this.definedConstants.set(name, value);
      this.expressionEvaluator.setConstant(name, value);
    }

    return {
      kind: "constant",
      name,
      type,
      value,
    };
  }

  private parseNative(): AST.NativeNode {
    this.consume("native");
    const name = this.consume();
    this.consumeSemicolon();
    return {
      kind: "native",
      name,
    };
  }

  private parseException(): AST.ExceptionNode {
    this.consume("exception");
    const name = this.consume();
    this.consume("{");

    const members: AST.MemberNode[] = [];

    while (this.peek() !== "}" && this.currentToken < this.tokens.length) {
      const token = this.peek();

      // Handle inline struct/union/enum definitions in exceptions
      if (token === "struct" || token === "union" || token === "enum") {
        const parsedMembers = this.parseStructMember();
        if (parsedMembers) {
          members.push(...parsedMembers);
        } else {
          break;
        }
      }
      // Handle regular type declarations
      else if (this.isType(token)) {
        const type = this.parseType();
        const memberNames: string[] = [];

        // Parse first member name
        memberNames.push(this.consume());

        // Handle comma-separated declarators (e.g., string first, last;)
        while (this.peek() === ",") {
          this.consume(",");
          memberNames.push(this.consume());
        }

        // Create member for each name
        for (const memberName of memberNames) {
          const memberType = this.parseArrayDimensions(type);
          members.push({
            kind: "member",
            name: memberName,
            type: memberType,
          });
        }

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

    if (token === "fixed") {
      this.consume("fixed");
      this.consume("<");
      const totalDigits = parseInt(this.consume());
      this.consume(",");
      const fractionalDigits = parseInt(this.consume());
      this.consume(">");
      return {
        kind: "fixedType",
        totalDigits,
        fractionalDigits,
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

    // Check if it's a defined constant first
    if (/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(token)) {
      const constantValue = this.definedConstants.get(token);
      if (constantValue !== undefined) {
        return constantValue;
      }
    }

    // Handle expressions using the complete expression evaluator
    if (
      token.includes("(") || token.includes("+") || token.includes("-") ||
      token.includes("*") || token.includes("/") || token.includes("<<") ||
      token.includes(">>") || token.includes("&") || token.includes("|") ||
      token.includes("^") || token.includes("~") || token.includes("%")
    ) {
      try {
        // Use the expression evaluator for complex expressions
        return this.expressionEvaluator.evaluate(token);
      }
      catch (e) {
        // According to CORBA spec, constant expressions must be evaluable at compile time
        throw new Error(`Failed to evaluate constant expression '${token}': ${e instanceof Error ? e.message : String(e)}`);
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

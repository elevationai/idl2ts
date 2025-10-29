/**
 * Expression evaluator for IDL constant expressions
 * Supports arithmetic, bitwise, and logical operators with proper precedence
 */
export class ExpressionEvaluator {
  private constants: Map<string, number>;

  constructor(constants: Map<string, number> = new Map()) {
    this.constants = constants;
  }

  /**
   * Evaluates an IDL expression and returns a numeric result
   */
  evaluate(expression: string): number {
    const tokens = this.tokenize(expression);
    const postfix = this.infixToPostfix(tokens);
    return this.evaluatePostfix(postfix);
  }

  /**
   * Tokenizes an expression into operators, numbers, and identifiers
   */
  private tokenize(expression: string): string[] {
    const tokens: string[] = [];
    let current = "";
    let i = 0;

    while (i < expression.length) {
      const char = expression[i];
      const nextChar = expression[i + 1];

      // Skip whitespace
      if (/\s/.test(char)) {
        if (current) {
          tokens.push(current);
          current = "";
        }
        i++;
        continue;
      }

      // Handle two-character operators
      if (char === "<" && nextChar === "<") {
        if (current) {
          tokens.push(current);
          current = "";
        }
        tokens.push("<<");
        i += 2;
        continue;
      }
      if (char === ">" && nextChar === ">") {
        if (current) {
          tokens.push(current);
          current = "";
        }
        tokens.push(">>");
        i += 2;
        continue;
      }

      // Handle single-character operators and parentheses
      if ("+-*/%()&|^~".includes(char)) {
        if (current) {
          tokens.push(current);
          current = "";
        }

        // Handle unary minus
        if (
          char === "-" && (tokens.length === 0 ||
            tokens[tokens.length - 1] === "(" ||
            this.isOperator(tokens[tokens.length - 1]))
        ) {
          // This is a unary minus
          current = "-";
          i++;
          // Consume the number or identifier
          while (i < expression.length && /[0-9a-zA-Z_]/.test(expression[i])) {
            current += expression[i];
            i++;
          }
          tokens.push(current);
          current = "";
          continue;
        }

        tokens.push(char);
        i++;
        continue;
      }

      // Build numbers and identifiers
      current += char;
      i++;
    }

    if (current) {
      tokens.push(current);
    }

    return tokens;
  }

  /**
   * Converts infix expression to postfix notation using the Shunting Yard algorithm
   */
  private infixToPostfix(tokens: string[]): string[] {
    const output: string[] = [];
    const operators: string[] = [];

    for (const token of tokens) {
      if (this.isNumber(token) || this.isIdentifier(token)) {
        output.push(token);
      }
      else if (token === "(") {
        operators.push(token);
      }
      else if (token === ")") {
        while (operators.length > 0 && operators[operators.length - 1] !== "(") {
          output.push(operators.pop()!);
        }
        operators.pop(); // Remove the '('
      }
      else if (this.isOperator(token)) {
        while (
          operators.length > 0 &&
          operators[operators.length - 1] !== "(" &&
          this.getPrecedence(operators[operators.length - 1]) >= this.getPrecedence(token) &&
          (this.isLeftAssociative(token) ||
            this.getPrecedence(operators[operators.length - 1]) > this.getPrecedence(token))
        ) {
          output.push(operators.pop()!);
        }
        operators.push(token);
      }
    }

    while (operators.length > 0) {
      output.push(operators.pop()!);
    }

    return output;
  }

  /**
   * Evaluates a postfix expression
   */
  private evaluatePostfix(tokens: string[]): number {
    const stack: number[] = [];

    for (const token of tokens) {
      if (this.isNumber(token)) {
        stack.push(this.parseNumber(token));
      }
      else if (this.isIdentifier(token)) {
        const value = this.constants.get(token);
        if (value === undefined) {
          throw new Error(`Unknown constant: ${token}`);
        }
        stack.push(value);
      }
      else if (this.isOperator(token)) {
        if (token === "~") {
          // Unary operator
          const a = stack.pop();
          if (a === undefined) {
            throw new Error("Invalid expression");
          }
          stack.push(~a);
        }
        else {
          // Binary operator
          const b = stack.pop();
          const a = stack.pop();
          if (a === undefined || b === undefined) {
            throw new Error("Invalid expression");
          }
          stack.push(this.applyOperator(token, a, b));
        }
      }
    }

    if (stack.length !== 1) {
      throw new Error("Invalid expression");
    }

    return stack[0];
  }

  /**
   * Applies a binary operator to two operands
   */
  private applyOperator(operator: string, a: number, b: number): number {
    switch (operator) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "*":
        return a * b;
      case "/":
        if (b === 0) throw new Error("Division by zero");
        return Math.trunc(a / b); // IDL uses integer division
      case "%":
        if (b === 0) throw new Error("Division by zero");
        return a % b;
      case "<<":
        return a << b;
      case ">>":
        return a >> b;
      case "&":
        return a & b;
      case "|":
        return a | b;
      case "^":
        return a ^ b;
      default:
        throw new Error(`Unknown operator: ${operator}`);
    }
  }

  /**
   * Gets the precedence of an operator (higher number = higher precedence)
   */
  private getPrecedence(operator: string): number {
    switch (operator) {
      case "|":
        return 1;
      case "^":
        return 2;
      case "&":
        return 3;
      case "<<":
      case ">>":
        return 4;
      case "+":
      case "-":
        return 5;
      case "*":
      case "/":
      case "%":
        return 6;
      case "~":
        return 7; // Unary operators have highest precedence
      default:
        return 0;
    }
  }

  /**
   * Checks if an operator is left-associative
   */
  private isLeftAssociative(operator: string): boolean {
    // All operators in IDL are left-associative except unary operators
    return operator !== "~";
  }

  /**
   * Checks if a token is an operator
   */
  private isOperator(token: string): boolean {
    return ["~", "+", "-", "*", "/", "%", "<<", ">>", "&", "|", "^"].includes(token);
  }

  /**
   * Checks if a token is a number (including hex and negative)
   */
  private isNumber(token: string): boolean {
    return /^-?\d+$/.test(token) || /^-?0x[0-9a-fA-F]+$/i.test(token);
  }

  /**
   * Checks if a token is an identifier
   */
  private isIdentifier(token: string): boolean {
    return /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(token);
  }

  /**
   * Parses a number token (decimal or hex)
   */
  private parseNumber(token: string): number {
    if (token.startsWith("-")) {
      const positive = token.substring(1);
      if (positive.startsWith("0x") || positive.startsWith("0X")) {
        return -parseInt(positive, 16);
      }
      return -parseInt(positive, 10);
    }

    if (token.startsWith("0x") || token.startsWith("0X")) {
      return parseInt(token, 16);
    }
    return parseInt(token, 10);
  }

  /**
   * Adds or updates a constant value
   */
  setConstant(name: string, value: number): void {
    this.constants.set(name, value);
  }

  /**
   * Gets a constant value
   */
  getConstant(name: string): number | undefined {
    return this.constants.get(name);
  }
}

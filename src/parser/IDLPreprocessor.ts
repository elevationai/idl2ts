import { dirname, join, resolve } from "jsr:@std/path@1.0.0";

export interface PreprocessorResult {
  processedContent: string;
  includes: string[];
  pragmas: Map<string, string>;
  defines: Map<string, string>;
}

interface ConditionalState {
  active: boolean; // Whether this block is currently active
  hasBeenActive: boolean; // Whether any branch has been active
  type: "if" | "ifdef" | "ifndef";
}

export class IDLPreprocessor {
  private includeGuards: Set<string> = new Set();
  private defines: Map<string, string> = new Map();
  private pragmas: Map<string, string> = new Map();
  private includePaths: string[] = [];
  private processedIncludes: string[] = [];
  private baseDir: string = "";
  private processingStack: string[] = [];
  private conditionalStack: ConditionalState[] = [];

  constructor(includePaths: string[] = []) {
    this.includePaths = includePaths;
  }

  /**
   * Evaluates a preprocessor conditional expression
   */
  private evaluateExpression(expr: string): boolean {
    // Handle defined() operator
    expr = expr.replace(/defined\s*\(\s*([A-Za-z_][A-Za-z0-9_]*)\s*\)/g, (_, name) => {
      return this.defines.has(name) ? "1" : "0";
    });

    // Handle defined without parentheses
    expr = expr.replace(/defined\s+([A-Za-z_][A-Za-z0-9_]*)/g, (_, name) => {
      return this.defines.has(name) ? "1" : "0";
    });

    // Replace macros with their values
    for (const [macro, value] of this.defines) {
      const regex = new RegExp(`\\b${macro}\\b`, "g");
      expr = expr.replace(regex, value);
    }

    // Replace any remaining undefined macros with 0
    expr = expr.replace(/\b[A-Za-z_][A-Za-z0-9_]*\b/g, "0");

    // Evaluate boolean operators
    expr = expr.replace(/\|\|/g, "|");
    expr = expr.replace(/&&/g, "&");
    expr = expr.replace(/!/g, "~");

    try {
      // Simple expression evaluator
      // For safety, only allow numbers, operators, and parentheses
      if (!/^[0-9\s()\-+*/%<>=!~&|^]+$/.test(expr)) {
        return false;
      }

      // Convert comparison operators
      expr = expr.replace(/==/g, "===");
      expr = expr.replace(/!=/g, "!==");

      // Evaluate the expression
      // Using Function constructor for controlled evaluation
      const result = new Function("return " + expr)();
      return Boolean(result);
    }
    catch {
      // If evaluation fails, treat as false
      return false;
    }
  }

  /**
   * Check if current code should be included based on conditional stack
   */
  private shouldIncludeContent(): boolean {
    // If no conditionals, include content
    if (this.conditionalStack.length === 0) {
      return true;
    }

    // All conditionals in the stack must be active
    return this.conditionalStack.every((state) => state.active);
  }

  preprocess(content: string, filePath?: string): PreprocessorResult {
    this.baseDir = filePath ? dirname(filePath) : Deno.cwd();

    // Track current file in processing stack to prevent circular includes
    const normalizedPath = filePath ? resolve(filePath) : "inline";
    if (this.processingStack.includes(normalizedPath)) {
      // Circular include detected, skip processing
      return {
        processedContent: "",
        includes: this.processedIncludes,
        pragmas: this.pragmas,
        defines: this.defines,
      };
    }
    this.processingStack.push(normalizedPath);

    // Remove comments first
    content = this.removeComments(content);

    // Handle line continuations
    content = this.handleLineContinuations(content);

    const lines = content.split("\n");
    const processedLines: string[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // Handle #ifndef
      if (line.startsWith("#ifndef")) {
        const macro = line.substring(7).trim();
        const isActive = !this.defines.has(macro);
        this.conditionalStack.push({
          active: isActive && this.shouldIncludeContent(),
          hasBeenActive: isActive && this.shouldIncludeContent(),
          type: "ifndef",
        });

        // Track include guards
        if (isActive && this.conditionalStack.length === 1) {
          // This might be an include guard
          const nextLine = i + 1 < lines.length ? lines[i + 1].trim() : "";
          if (nextLine.startsWith("#define") && nextLine.includes(macro)) {
            this.includeGuards.add(macro);
          }
        }
        continue;
      }

      // Handle #ifdef
      if (line.startsWith("#ifdef")) {
        const macro = line.substring(6).trim();
        const isActive = this.defines.has(macro);
        this.conditionalStack.push({
          active: isActive && this.shouldIncludeContent(),
          hasBeenActive: isActive && this.shouldIncludeContent(),
          type: "ifdef",
        });
        continue;
      }

      // Handle #if
      if (line.startsWith("#if ")) {
        const expr = line.substring(3).trim();
        const isActive = this.evaluateExpression(expr);
        this.conditionalStack.push({
          active: isActive && this.shouldIncludeContent(),
          hasBeenActive: isActive && this.shouldIncludeContent(),
          type: "if",
        });
        continue;
      }

      // Handle #elif
      if (line.startsWith("#elif")) {
        if (this.conditionalStack.length > 0) {
          const current = this.conditionalStack[this.conditionalStack.length - 1];
          if (!current.hasBeenActive) {
            const expr = line.substring(5).trim();
            const parentActive = this.conditionalStack.length > 1 ? this.conditionalStack.slice(0, -1).every((s) => s.active) : true;
            const isActive = this.evaluateExpression(expr) && parentActive;
            current.active = isActive;
            current.hasBeenActive = current.hasBeenActive || isActive;
          }
          else {
            current.active = false;
          }
        }
        continue;
      }

      // Handle #else
      if (line.startsWith("#else")) {
        if (this.conditionalStack.length > 0) {
          const current = this.conditionalStack[this.conditionalStack.length - 1];
          if (!current.hasBeenActive) {
            const parentActive = this.conditionalStack.length > 1 ? this.conditionalStack.slice(0, -1).every((s) => s.active) : true;
            current.active = parentActive;
            current.hasBeenActive = true;
          }
          else {
            current.active = false;
          }
        }
        continue;
      }

      // Handle #endif
      if (line.startsWith("#endif")) {
        this.conditionalStack.pop();
        continue;
      }

      // Handle #define
      if (line.startsWith("#define")) {
        if (this.shouldIncludeContent()) {
          const parts = line.substring(7).trim().split(/\s+/);
          const name = parts[0];
          const value = parts.slice(1).join(" ") || "1";
          this.defines.set(name, value);
        }
        continue;
      }

      // Handle #include
      if (line.startsWith("#include")) {
        if (this.shouldIncludeContent()) {
          const includeMatch = line.match(/#include\s*["<]([^">]+)[">]/);
          if (includeMatch) {
            const includePath = includeMatch[1];
            const resolvedPath = this.resolveIncludePath(includePath);

            if (resolvedPath) {
              const normalizedIncludePath = resolve(resolvedPath);

              // Check if file is in processing stack (circular include)
              if (this.processingStack.includes(normalizedIncludePath)) {
                // Skip circular include
                processedLines.push(
                  `// CIRCULAR INCLUDE SKIPPED: ${includePath}`,
                );
              }
              else if (!this.processedIncludes.includes(resolvedPath)) {
                this.processedIncludes.push(resolvedPath);

                try {
                  const includeContent = Deno.readTextFileSync(resolvedPath);
                  const preprocessed = this.preprocess(
                    includeContent,
                    resolvedPath,
                  );
                  processedLines.push(`// BEGIN INCLUDE: ${includePath}`);
                  processedLines.push(preprocessed.processedContent);
                  processedLines.push(`// END INCLUDE: ${includePath}`);
                }
                catch (error) {
                  console.warn(
                    `Warning: Could not include file ${includePath}: ${error}`,
                  );
                  processedLines.push(
                    `// WARNING: Could not include ${includePath}`,
                  );
                }
              }
            }
          }
        }
        continue;
      }

      // Handle #pragma
      if (line.startsWith("#pragma")) {
        if (this.shouldIncludeContent()) {
          const pragmaMatch = line.match(/#pragma\s+(\w+)(?:\s+(.*))?/);
          if (pragmaMatch) {
            const pragmaType = pragmaMatch[1];
            const pragmaValue = pragmaMatch[2] ? pragmaMatch[2].trim().replace(/"/g, "") : "";
            this.pragmas.set(pragmaType, pragmaValue);

            // For position-dependent pragmas like inhibit_code_generation,
            // inject a marker into the content
            if (pragmaType === "inhibit_code_generation" && pragmaValue === "") {
              // Global inhibit - inject marker
              processedLines.push(`__PRAGMA_GLOBAL_INHIBIT__`);
            }
          }
        }
        continue;
      }

      // Handle #error
      if (line.startsWith("#error")) {
        if (this.shouldIncludeContent()) {
          const message = line.substring(6).trim();
          console.error(`Preprocessor error: ${message}`);
        }
        continue;
      }

      // Handle #warning
      if (line.startsWith("#warning")) {
        if (this.shouldIncludeContent()) {
          const message = line.substring(8).trim();
          console.warn(`Preprocessor warning: ${message}`);
        }
        continue;
      }

      // Skip content if we're in a false conditional
      if (!this.shouldIncludeContent()) {
        continue;
      }

      // Replace defined macros in the line
      let processedLine = lines[i];
      for (const [macro, value] of this.defines) {
        const regex = new RegExp(`\\b${macro}\\b`, "g");
        processedLine = processedLine.replace(regex, value);
      }

      processedLines.push(processedLine);
    }

    // Pop from processing stack
    this.processingStack.pop();

    const finalContent = processedLines.join("\n");

    return {
      processedContent: this.removeComments(finalContent),
      includes: this.processedIncludes,
      pragmas: this.pragmas,
      defines: this.defines,
    };
  }

  private removeComments(content: string): string {
    // More careful comment removal that preserves strings
    let result = "";
    let inString = false;
    let inChar = false;
    let inComment = false;
    let inMultiComment = false;
    let i = 0;

    while (i < content.length) {
      const char = content[i];
      const nextChar = content[i + 1];

      // Handle string literals
      if (char === '"' && !inChar && !inComment && !inMultiComment) {
        if (i === 0 || content[i - 1] !== "\\") {
          inString = !inString;
        }
        result += char;
        i++;
        continue;
      }

      // Handle char literals
      if (char === "'" && !inString && !inComment && !inMultiComment) {
        if (i === 0 || content[i - 1] !== "\\") {
          inChar = !inChar;
        }
        result += char;
        i++;
        continue;
      }

      // Skip if we're in a string or char
      if (inString || inChar) {
        result += char;
        i++;
        continue;
      }

      // Handle single-line comments
      if (char === "/" && nextChar === "/" && !inMultiComment) {
        inComment = true;
        i += 2;
        continue;
      }

      // Handle multi-line comments
      if (char === "/" && nextChar === "*" && !inComment) {
        inMultiComment = true;
        i += 2;
        continue;
      }

      // End multi-line comment
      if (char === "*" && nextChar === "/" && inMultiComment) {
        inMultiComment = false;
        i += 2;
        continue;
      }

      // End single-line comment at newline
      if (char === "\n" && inComment) {
        inComment = false;
        result += char;
        i++;
        continue;
      }

      // Skip comment content
      if (inComment || inMultiComment) {
        i++;
        continue;
      }

      result += char;
      i++;
    }

    return result;
  }

  private handleLineContinuations(content: string): string {
    // Join lines ending with backslash, preserve space
    return content.replace(/\\\s*\n\s*/g, " ");
  }

  private resolveIncludePath(includePath: string): string | null {
    // First try relative to current file
    const relativePath = join(this.baseDir, includePath);
    try {
      Deno.statSync(relativePath);
      return relativePath;
    }
    catch {
      // File doesn't exist, continue
    }

    // Then try include paths
    for (const includeDir of this.includePaths) {
      const fullPath = join(includeDir, includePath);
      try {
        Deno.statSync(fullPath);
        return fullPath;
      }
      catch {
        // File doesn't exist, continue
      }
    }

    // Try as absolute path
    try {
      Deno.statSync(includePath);
      return includePath;
    }
    catch {
      // File doesn't exist
    }

    return null;
  }

  reset(): void {
    this.includeGuards.clear();
    this.defines.clear();
    this.pragmas.clear();
    this.processedIncludes = [];
    this.processingStack = [];
    this.conditionalStack = [];
  }
}

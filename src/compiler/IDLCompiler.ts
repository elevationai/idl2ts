import { IDLParser, ParserOptions } from '../parser/IDLParser.ts';
import {
  GeneratorOptions,
  TypeScriptGenerator,
} from '../generator/TypeScriptGenerator.ts';
import * as AST from '../ast/nodes.ts';
import { basename, dirname, join } from 'jsr:@std/path@1.0.0';

export interface CompilerOptions extends GeneratorOptions {
  outputPath?: string;
  verbose?: boolean;
  includePaths?: string[];
}

export class IDLCompiler {
  private options: CompilerOptions;

  constructor(options: CompilerOptions = {}) {
    this.options = {
      includeStubs: true,
      includeSkeletons: false,
      emitHelpers: true,
      verbose: false,
      ...options,
    };
  }

  compile(idlPath: string): void {
    if (this.options.verbose) {
      console.log(`Compiling ${idlPath}...`);
    }

    const idlContent = Deno.readTextFileSync(idlPath);
    const ast = this.parse(idlContent, idlPath);

    // Pass source file to generator
    const generatorOptions: GeneratorOptions = {
      ...this.options,
      sourceFile: basename(idlPath),
    };
    const generator = new TypeScriptGenerator(generatorOptions);
    const result = generator.generate(ast);

    // Multi-file output
    const outputDir = this.options.outputPath || dirname(idlPath);

    // Create output directory
    try {
      Deno.statSync(outputDir);
    } catch {
      Deno.mkdirSync(outputDir, { recursive: true });
    }

    // Write each module file
    for (const [filename, content] of result) {
      const filePath = join(outputDir, filename);
      Deno.writeTextFileSync(filePath, content);

      if (this.options.verbose) {
        console.log(`Generated ${filePath}`);
      }
    }
  }

  compileString(idlContent: string, filePath?: string): Map<string, string> {
    const ast = this.parse(idlContent, filePath);
    return this.generate(ast);
  }

  parse(idlContent: string, filePath?: string): AST.SpecificationNode {
    const parserOptions: ParserOptions = {
      includePaths: this.options.includePaths || [
        filePath ? dirname(filePath) : Deno.cwd(),
      ],
    };
    const parser = new IDLParser(parserOptions);
    return parser.parse(idlContent, filePath);
  }

  generate(ast: AST.SpecificationNode): Map<string, string> {
    const generator = new TypeScriptGenerator(this.options);
    return generator.generate(ast);
  }
}

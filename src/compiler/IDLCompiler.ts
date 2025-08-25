import { IDLParser, ParserOptions } from '../parser/IDLParser.js';
import { TypeScriptGenerator, GeneratorOptions } from '../generator/TypeScriptGenerator.js';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as AST from '../ast/nodes.js';

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
      ...options
    };
  }

  compile(idlPath: string): void {
    if (this.options.verbose) {
      console.log(`Compiling ${idlPath}...`);
    }

    const idlContent = fs.readFileSync(idlPath, 'utf-8');
    const ast = this.parse(idlContent, idlPath);
    
    // Pass source file to generator
    const generatorOptions: GeneratorOptions = {
      ...this.options,
      sourceFile: path.basename(idlPath)
    };
    const generator = new TypeScriptGenerator(generatorOptions);
    const result = generator.generate(ast);

    // Multi-file output
    const outputDir = this.options.outputPath || path.dirname(idlPath);
    
    // Create output directory
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Write each module file
    for (const [filename, content] of result) {
      const filePath = path.join(outputDir, filename);
      fs.writeFileSync(filePath, content);
      
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
        filePath ? path.dirname(filePath) : process.cwd()
      ]
    };
    const parser = new IDLParser(parserOptions);
    return parser.parse(idlContent, filePath);
  }

  generate(ast: AST.SpecificationNode): Map<string, string> {
    const generator = new TypeScriptGenerator(this.options);
    return generator.generate(ast);
  }
}
#!/usr/bin/env node

import { Command } from 'commander';
import { IDLCompiler, CompilerOptions } from './compiler/IDLCompiler.js';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as glob from 'glob';

const program = new Command();

program
  .name('idl2ts')
  .description('CORBA IDL to TypeScript compiler')
  .version('1.0.0');

program
  .command('compile <input>')
  .description('Compile IDL files to TypeScript')
  .option('-o, --output <path>', 'Output directory or file')
  .option('-I, --include <paths...>', 'Include paths for IDL files')
  .option('--no-stubs', 'Do not generate client stubs')
  .option('--skeletons', 'Generate server skeletons')
  .option('--no-helpers', 'Do not emit helper functions')
  .option('--corba-import <path>', 'Import path for CORBA library (default: corba)')
  .option('-v, --verbose', 'Verbose output')
  .action(async (input: string, options: any) => {
    const compilerOptions: CompilerOptions = {
      includeStubs: options.stubs !== false,
      includeSkeletons: options.skeletons || false,
      emitHelpers: options.helpers !== false,
      corbaImportPath: options.corbaImport,
      verbose: options.verbose || false,
      includePaths: options.include || []
    };

    try {
      const files = glob.sync(input);
      
      if (files.length === 0) {
        if (fs.existsSync(input)) {
          files.push(input);
        } else {
          console.error(`No files found matching: ${input}`);
          process.exit(1);
        }
      }

      for (const file of files) {
        if (!file.endsWith('.idl')) {
          console.warn(`Skipping non-IDL file: ${file}`);
          continue;
        }

        let outputPath: string | undefined;
        
        if (options.output) {
          if (files.length === 1) {
            outputPath = options.output;
          } else {
            const baseName = path.basename(file, '.idl');
            outputPath = path.join(options.output, `${baseName}.ts`);
            
            const outputDir = path.dirname(outputPath);
            if (!fs.existsSync(outputDir)) {
              fs.mkdirSync(outputDir, { recursive: true });
            }
          }
        }

        const compiler = new IDLCompiler({
          ...compilerOptions,
          outputPath
        });

        compiler.compile(file);
      }

      if (compilerOptions.verbose) {
        console.log(`Successfully compiled ${files.length} file(s)`);
      }
    } catch (error) {
      console.error('Compilation failed:', error);
      process.exit(1);
    }
  });

program
  .command('watch <input>')
  .description('Watch IDL files and recompile on changes')
  .option('-o, --output <path>', 'Output directory')
  .option('--no-stubs', 'Do not generate client stubs')
  .option('--skeletons', 'Generate server skeletons')
  .option('--no-helpers', 'Do not emit helper functions')
  .option('-v, --verbose', 'Verbose output')
  .action(async (_input: string, _options: any) => {
    console.log('Watch mode not yet implemented');
    process.exit(1);
  });

program.parse(process.argv);
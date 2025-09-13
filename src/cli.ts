#!/usr/bin/env -S deno run --allow-read --allow-write --allow-env

import { Command } from 'npm:commander@11.0.0';
import { CompilerOptions, IDLCompiler } from './compiler/IDLCompiler.ts';
import { expandGlob } from 'jsr:@std/fs@1.0.0';
import { basename, dirname, join, resolve } from 'jsr:@std/path@1.0.0';

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
  .option(
    '--corba-import <path>',
    'Import path for CORBA library (default: corba)',
  )
  .option('-v, --verbose', 'Verbose output')
  .action(async (input: string, options: {
    output?: string;
    include?: string[];
    stubs?: boolean;
    skeletons?: boolean;
    helpers?: boolean;
    corbaImport?: string;
    verbose?: boolean;
  }) => {
    const compilerOptions: CompilerOptions = {
      includeStubs: options.stubs !== false,
      includeSkeletons: options.skeletons ?? false,
      emitHelpers: options.helpers !== false,
      corbaImportPath: options.corbaImport,
      verbose: options.verbose ?? false,
      includePaths: options.include ?? [],
    };

    try {
      const files: string[] = [];

      // Handle glob patterns
      if (input.includes('*')) {
        for await (const file of expandGlob(input)) {
          if (file.isFile) {
            files.push(file.path);
          }
        }
      } else {
        // Single file
        try {
          await Deno.stat(input);
          files.push(resolve(input));
        } catch {
          console.error(`No files found matching: ${input}`);
          Deno.exit(1);
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
            const baseName = basename(file, '.idl');
            outputPath = join(options.output, `${baseName}.ts`);

            const outputDir = dirname(outputPath);
            try {
              await Deno.stat(outputDir);
            } catch {
              await Deno.mkdir(outputDir, { recursive: true });
            }
          }
        }

        const compiler = new IDLCompiler({
          ...compilerOptions,
          outputPath,
        });

        compiler.compile(file);
      }

      if (compilerOptions.verbose) {
        console.log(`Successfully compiled ${files.length} file(s)`);
      }
    } catch (error) {
      console.error('Compilation failed:', error);
      Deno.exit(1);
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
  .action((_input: string, _options: Record<string, unknown>) => {
    console.log('Watch mode not yet implemented');
    Deno.exit(1);
  });

program.parse(['deno', 'idl2ts', ...Deno.args]);

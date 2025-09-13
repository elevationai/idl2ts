import { describe, it, beforeEach, afterEach } from '@std/testing/bdd';
import { assertEquals, assert } from '@std/assert';
import { IDLPreprocessor } from '../../src/parser/IDLPreprocessor.ts';

describe('IDLPreprocessor', () => {
  let tempDir: string;
  let preprocessor: IDLPreprocessor;
  
  beforeEach(() => {
    tempDir = Deno.makeTempDirSync({ prefix: 'idl-preproc-test-' });
    preprocessor = new IDLPreprocessor([tempDir]);
  });
  
  afterEach(() => {
    try {
      Deno.removeSync(tempDir, { recursive: true });
    } catch {
      // Ignore errors if already removed
    }
  });

  describe('Comment Removal', () => {
    it('should remove single-line comments', () => {
      const input = `
        module Test { // This is a comment
          const long VALUE = 42; // Another comment
          // Full line comment
        };
      `;
      
      const result = preprocessor.preprocess(input);
      
      assert(!result.processedContent.includes('// This is a comment'));
      assert(!result.processedContent.includes('// Another comment'));
      assert(!result.processedContent.includes('// Full line comment'));
      assert(result.processedContent.includes('module Test'));
      assert(result.processedContent.includes('const long VALUE = 42'));
    });

    it('should remove multi-line comments', () => {
      const input = `
        /* This is a 
           multi-line
           comment */
        module Test {
          const long VALUE = /* inline comment */ 42;
          /* Another
             multi-line
             comment */
        };
      `;
      
      const result = preprocessor.preprocess(input);
      
      assert(!result.processedContent.includes('/*'));
      assert(!result.processedContent.includes('*/'));
      assert(!result.processedContent.includes('multi-line'));
      assert(!result.processedContent.includes('inline comment'));
      assert(result.processedContent.includes('module Test'));
      assert(result.processedContent.includes('const long VALUE =  42'));
    });

    it('should handle nested multi-line comments', () => {
      const input = `
        /* Outer comment /* nested */ still in comment */
        module Test {
          const long VALUE = 42;
        };
      `;
      
      const result = preprocessor.preprocess(input);
      
      assert(!result.processedContent.includes('Outer comment'));
      assert(!result.processedContent.includes('nested'));
      assert(result.processedContent.includes('module Test'));
    });

    it('should preserve strings containing comment-like sequences', () => {
      const input = `
        module Test {
          const string URL = "http://example.com";
          const string COMMENT = "// This is not a comment";
          const string MULTI = "/* Also not a comment */";
        };
      `;
      
      const result = preprocessor.preprocess(input);
      
      assert(result.processedContent.includes('"http://example.com"'));
      assert(result.processedContent.includes('"// This is not a comment"'));
      assert(result.processedContent.includes('"/* Also not a comment */"'));
    });
  });

  describe('Include Directives', () => {
    it('should process #include with quoted filename', () => {
      const includedFile = `${tempDir}/types.idl`;
      Deno.writeTextFileSync(includedFile, `
        module Types {
          struct Point {
            double x;
            double y;
          };
        };
      `);
      
      const input = `
        #include "types.idl"
        
        module Main {
          interface Service {
            ::Types::Point getPoint();
          };
        };
      `;
      
      const result = preprocessor.preprocess(input, `${tempDir}/main.idl`);
      
      assert(result.processedContent.includes('module Types'));
      assert(result.processedContent.includes('struct Point'));
      assert(result.processedContent.includes('module Main'));
      assertEquals(result.includes.length, 1);
      assert(result.includes.includes(includedFile));
    });

    it('should process #include with angle brackets', () => {
      const includedFile = `${tempDir}/system.idl`;
      Deno.writeTextFileSync(includedFile, `
        module System {
          const long VERSION = 1;
        };
      `);
      
      const input = `
        #include <system.idl>
        
        module App {
          const long APP_VERSION = ::System::VERSION;
        };
      `;
      
      const result = preprocessor.preprocess(input, `${tempDir}/app.idl`);
      
      assert(result.processedContent.includes('module System'));
      assert(result.processedContent.includes('const long VERSION = 1'));
      assert(result.processedContent.includes('module App'));
    });

    it('should handle nested includes', () => {
      // Create level3.idl
      const level3File = `${tempDir}/level3.idl`;
      Deno.writeTextFileSync(level3File, `
        module Level3 {
          const long VALUE = 3;
        };
      `);
      
      // Create level2.idl that includes level3.idl
      const level2File = `${tempDir}/level2.idl`;
      Deno.writeTextFileSync(level2File, `
        #include "level3.idl"
        module Level2 {
          const long VALUE = 2;
        };
      `);
      
      // Create level1.idl that includes level2.idl
      const level1File = `${tempDir}/level1.idl`;
      Deno.writeTextFileSync(level1File, `
        #include "level2.idl"
        module Level1 {
          const long VALUE = 1;
        };
      `);
      
      const input = `
        #include "level1.idl"
        module Main {
          const long VALUE = 0;
        };
      `;
      
      const result = preprocessor.preprocess(input, `${tempDir}/main.idl`);
      
      assert(result.processedContent.includes('module Level3'));
      assert(result.processedContent.includes('module Level2'));
      assert(result.processedContent.includes('module Level1'));
      assert(result.processedContent.includes('module Main'));
      assertEquals(result.includes.length, 3);
    });

    it('should prevent circular includes', () => {
      // Create a.idl that includes b.idl
      const aFile = `${tempDir}/a.idl`;
      Deno.writeTextFileSync(aFile, `
        #include "b.idl"
        module A {
          const long VALUE_A = 1;
        };
      `);
      
      // Create b.idl that includes a.idl (circular)
      const bFile = `${tempDir}/b.idl`;
      Deno.writeTextFileSync(bFile, `
        #include "a.idl"
        module B {
          const long VALUE_B = 2;
        };
      `);
      
      const result = preprocessor.preprocess(
        Deno.readTextFileSync(aFile), 
        aFile
      );
      
      // Should include b.idl but not re-include a.idl
      assert(result.processedContent.includes('module A'));
      assert(result.processedContent.includes('module B'));
      assertEquals(result.includes.length, 1); // Only b.idl should be included
    });

    it('should resolve includes from include paths', () => {
      const includeDir = `${tempDir}/includes`;
      Deno.mkdirSync(includeDir);
      
      const commonFile = `${includeDir}/common.idl`;
      Deno.writeTextFileSync(commonFile, `
        module Common {
          typedef long ID;
        };
      `);
      
      const preprocessorWithPath = new IDLPreprocessor([tempDir, includeDir]);
      
      const input = `
        #include "common.idl"
        module Main {
          typedef ::Common::ID MainID;
        };
      `;
      
      const result = preprocessorWithPath.preprocess(
        input, 
        `${tempDir}/main.idl`
      );
      
      assert(result.processedContent.includes('module Common'));
      assert(result.processedContent.includes('typedef long ID'));
    });

    it('should handle missing include files gracefully', () => {
      const input = `
        #include "nonexistent.idl"
        module Main {
          const long VALUE = 1;
        };
      `;
      
      const result = preprocessor.preprocess(input, `${tempDir}/main.idl`);
      
      // Should continue processing despite missing include
      assert(result.processedContent.includes('module Main'));
      assert(result.processedContent.includes('const long VALUE = 1'));
    });
  });

  describe('Pragma Directives', () => {
    it('should extract #pragma prefix', () => {
      const input = `
        #pragma prefix "com.example"
        
        module Test {
          const long VALUE = 1;
        };
      `;
      
      const result = preprocessor.preprocess(input);
      
      assertEquals(result.pragmas.has('prefix'), true);
      assertEquals(result.pragmas.get('prefix'), 'com.example');
      assert(!result.processedContent.includes('#pragma'));
    });

    it('should extract #pragma version', () => {
      const input = `
        #pragma version Test 1.0
        
        module Test {
          const long VALUE = 1;
        };
      `;
      
      const result = preprocessor.preprocess(input);
      
      assertEquals(result.pragmas.has('version'), true);
      assertEquals(result.pragmas.get('version'), 'Test 1.0');
    });

    it('should extract #pragma ID', () => {
      const input = `
        #pragma ID Test "IDL:Test:1.0"
        
        module Test {
          const long VALUE = 1;
        };
      `;
      
      const result = preprocessor.preprocess(input);
      
      assertEquals(result.pragmas.has('ID'), true);
      assertEquals(result.pragmas.get('ID'), 'Test IDL:Test:1.0');
    });

    it('should handle multiple pragmas', () => {
      const input = `
        #pragma prefix "com.example"
        #pragma version Test 1.0
        #pragma ID Test "IDL:Test:1.0"
        #pragma custom "value"
        
        module Test {
          const long VALUE = 1;
        };
      `;
      
      const result = preprocessor.preprocess(input);
      
      assertEquals(result.pragmas.size, 4);
      assertEquals(result.pragmas.get('prefix'), 'com.example');
      assertEquals(result.pragmas.get('version'), 'Test 1.0');
      assertEquals(result.pragmas.get('ID'), 'Test IDL:Test:1.0');
      assertEquals(result.pragmas.get('custom'), 'value');
    });
  });

  describe('Other Preprocessor Directives', () => {
    it('should handle #ifndef / #define / #endif', () => {
      const input = `
        #ifndef TEST_IDL
        #define TEST_IDL
        
        module Test {
          const long VALUE = 1;
        };
        
        #endif
      `;
      
      const result = preprocessor.preprocess(input);
      
      // These directives should be removed
      assert(!result.processedContent.includes('#ifndef'));
      assert(!result.processedContent.includes('#define'));
      assert(!result.processedContent.includes('#endif'));
      
      // Content should remain
      assert(result.processedContent.includes('module Test'));
    });

    it('should handle #ifdef / #else / #endif', () => {
      const input = `
        #ifdef FEATURE_X
        module FeatureX {
          const long VALUE = 1;
        };
        #else
        module NoFeature {
          const long VALUE = 0;
        };
        #endif
      `;
      
      const result = preprocessor.preprocess(input);
      
      // #ifdef is not implemented, only handled as #if which skips content
      // #else toggles the skip state
      // Since #ifdef is treated as #if, it will skip the first branch
      assert(!result.processedContent.includes('module FeatureX'));
      assert(result.processedContent.includes('module NoFeature'));
    });

    it('should handle #if / #elif / #endif', () => {
      const input = `
        #if VERSION > 2
        module V3 {
          const long VERSION = 3;
        };
        #elif VERSION > 1
        module V2 {
          const long VERSION = 2;
        };
        #else
        module V1 {
          const long VERSION = 1;
        };
        #endif
      `;
      
      const result = preprocessor.preprocess(input);
      
      // #if and #elif cause content to be skipped
      // #else toggles skip state, so only else branch is included
      assert(!result.processedContent.includes('module V3'));
      assert(!result.processedContent.includes('module V2'));
      assert(result.processedContent.includes('module V1'));
    });

    it('should handle #error directive', () => {
      // Mock console.error for Deno
      const originalError = console.error;
      let errorCalled = false;
      let errorMessage = '';
      console.error = (msg: string) => {
        errorCalled = true;
        errorMessage = msg;
      };
      
      const input = `
        #error "This should not be compiled"
        
        module Test {
          const long VALUE = 1;
        };
      `;
      
      const result = preprocessor.preprocess(input);
      
      // Error directive should be removed but content continues
      assert(!result.processedContent.includes('#error'));
      assert(result.processedContent.includes('module Test'));
      assertEquals(errorCalled, true);
      assertEquals(errorMessage, 'Preprocessor error: "This should not be compiled"');
      
      console.error = originalError;
    });

    it('should handle #warning directive', () => {
      // Mock console.warn for Deno
      const originalWarn = console.warn;
      let warnCalled = false;
      let warnMessage = '';
      console.warn = (msg: string) => {
        warnCalled = true;
        warnMessage = msg;
      };
      
      const input = `
        #warning "This is deprecated"
        
        module Test {
          const long VALUE = 1;
        };
      `;
      
      const result = preprocessor.preprocess(input);
      
      assert(!result.processedContent.includes('#warning'));
      assert(result.processedContent.includes('module Test'));
      assertEquals(warnCalled, true);
      assertEquals(warnMessage, 'Preprocessor warning: "This is deprecated"');
      
      console.warn = originalWarn;
    });
  });

  describe('Line Continuation', () => {
    it('should handle line continuation with backslash', () => {
      const input = `
        module Test {
          const string LONG_STRING = \\
            "This is a very long string that " \\
            "continues across multiple lines";
        };
      `;
      
      const result = preprocessor.preprocess(input);
      
      // Line continuations should be joined
      assert(result.processedContent.includes(
        'const string LONG_STRING =  "This is a very long string that "  "continues across multiple lines"'
      ));
    });

    it('should handle line continuation in interface definitions', () => {
      const input = `
        module Test {
          interface Service {
            void veryLongMethodName( \\
              in string param1, \\
              in string param2, \\
              in string param3 \\
            );
          };
        };
      `;
      
      const result = preprocessor.preprocess(input);
      
      // Should be on one line
      assert(
        /void veryLongMethodName\(\s*in string param1,\s*in string param2,\s*in string param3\s*\)/.test(result.processedContent)
      );
    });
  });

  describe('Mixed Content', () => {
    it('should handle complex file with all features', () => {
      const typesFile = `${tempDir}/types.idl`;
      Deno.writeTextFileSync(typesFile, `
        module Types {
          typedef long ID;
        };
      `);
      
      const input = `
        // File header comment
        /* Multi-line
           copyright notice */
        
        #pragma prefix "com.example"
        #pragma version Service 2.0
        
        #ifndef SERVICE_IDL
        #define SERVICE_IDL
        
        #include "types.idl"
        
        module Service {
          // Single-line comment
          const long VERSION = 2; // Inline comment
          
          /* Multi-line comment
             about the interface */
          interface TestService {
            void method( \\
              in ::Types::ID id, \\
              in string data \\
            ); // Method comment
          };
        };
        
        #endif // SERVICE_IDL
      `;
      
      const result = preprocessor.preprocess(input, `${tempDir}/service.idl`);
      
      // Check pragmas
      assertEquals(result.pragmas.get('prefix'), 'com.example');
      assertEquals(result.pragmas.get('version'), 'Service 2.0');
      
      // Check includes
      assert(result.includes.includes(typesFile));
      
      // Check content
      assert(result.processedContent.includes('module Types'));
      assert(result.processedContent.includes('typedef long ID'));
      assert(result.processedContent.includes('module Service'));
      assert(result.processedContent.includes('const long VERSION = 2'));
      assert(result.processedContent.includes('interface TestService'));
      
      // Check removed content
      assert(!result.processedContent.includes('//'));
      assert(!result.processedContent.includes('/*'));
      assert(!result.processedContent.includes('#pragma'));
      assert(!result.processedContent.includes('#ifndef'));
      assert(!result.processedContent.includes('#define'));
      assert(!result.processedContent.includes('#endif'));
      assert(!result.processedContent.includes('#include'));
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty input', () => {
      const result = preprocessor.preprocess('');
      
      assertEquals(result.processedContent, '');
      assertEquals(result.pragmas.size, 0);
      assertEquals(result.includes.length, 0);
    });

    it('should handle input with only comments', () => {
      const input = `
        // Comment only
        /* Another comment */
        // More comments
      `;
      
      const result = preprocessor.preprocess(input);
      
      assertEquals(result.processedContent.trim(), '');
    });

    it('should handle input with only preprocessor directives', () => {
      const input = `
        #pragma prefix "com.example"
        #ifndef GUARD
        #define GUARD
        #endif
      `;
      
      const result = preprocessor.preprocess(input);
      
      assertEquals(result.pragmas.get('prefix'), 'com.example');
      assertEquals(result.processedContent.trim(), '');
    });

    it('should preserve whitespace in strings', () => {
      const input = `
        module Test {
          const string SPACES = "  spaces  ";
          const string TABS = "\\t\\ttabs\\t\\t";
          const string NEWLINES = "line1\\nline2\\nline3";
        };
      `;
      
      const result = preprocessor.preprocess(input);
      
      assert(result.processedContent.includes('"  spaces  "'));
      assert(result.processedContent.includes('"\\t\\ttabs\\t\\t"'));
      assert(result.processedContent.includes('"line1\\nline2\\nline3"'));
    });
  });
});
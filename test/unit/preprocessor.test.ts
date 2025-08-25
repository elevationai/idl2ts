import { IDLPreprocessor } from '../../src/parser/IDLPreprocessor';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('IDLPreprocessor', () => {
  let tempDir: string;
  let preprocessor: IDLPreprocessor;
  
  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'idl-preproc-test-'));
    preprocessor = new IDLPreprocessor([tempDir]);
  });
  
  afterEach(() => {
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  describe('Comment Removal', () => {
    test('should remove single-line comments', () => {
      const input = `
        module Test { // This is a comment
          const long VALUE = 42; // Another comment
          // Full line comment
        };
      `;
      
      const result = preprocessor.preprocess(input);
      
      expect(result.processedContent).not.toContain('// This is a comment');
      expect(result.processedContent).not.toContain('// Another comment');
      expect(result.processedContent).not.toContain('// Full line comment');
      expect(result.processedContent).toContain('module Test');
      expect(result.processedContent).toContain('const long VALUE = 42');
    });

    test('should remove multi-line comments', () => {
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
      
      expect(result.processedContent).not.toContain('/*');
      expect(result.processedContent).not.toContain('*/');
      expect(result.processedContent).not.toContain('multi-line');
      expect(result.processedContent).not.toContain('inline comment');
      expect(result.processedContent).toContain('module Test');
      expect(result.processedContent).toContain('const long VALUE =  42');
    });

    test('should handle nested multi-line comments', () => {
      const input = `
        /* Outer comment /* nested */ still in comment */
        module Test {
          const long VALUE = 42;
        };
      `;
      
      const result = preprocessor.preprocess(input);
      
      expect(result.processedContent).not.toContain('Outer comment');
      expect(result.processedContent).not.toContain('nested');
      expect(result.processedContent).toContain('module Test');
    });

    test('should preserve strings containing comment-like sequences', () => {
      const input = `
        module Test {
          const string URL = "http://example.com";
          const string COMMENT = "// This is not a comment";
          const string MULTI = "/* Also not a comment */";
        };
      `;
      
      const result = preprocessor.preprocess(input);
      
      expect(result.processedContent).toContain('"http://example.com"');
      expect(result.processedContent).toContain('"// This is not a comment"');
      expect(result.processedContent).toContain('"/* Also not a comment */"');
    });
  });

  describe('Include Directives', () => {
    test('should process #include with quoted filename', () => {
      const includedFile = path.join(tempDir, 'types.idl');
      fs.writeFileSync(includedFile, `
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
      
      const result = preprocessor.preprocess(input, path.join(tempDir, 'main.idl'));
      
      expect(result.processedContent).toContain('module Types');
      expect(result.processedContent).toContain('struct Point');
      expect(result.processedContent).toContain('module Main');
      expect(result.includes.length).toBe(1);
      expect(result.includes.includes(includedFile)).toBe(true);
    });

    test('should process #include with angle brackets', () => {
      const includedFile = path.join(tempDir, 'system.idl');
      fs.writeFileSync(includedFile, `
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
      
      const result = preprocessor.preprocess(input, path.join(tempDir, 'app.idl'));
      
      expect(result.processedContent).toContain('module System');
      expect(result.processedContent).toContain('const long VERSION = 1');
      expect(result.processedContent).toContain('module App');
    });

    test('should handle nested includes', () => {
      // Create level3.idl
      const level3File = path.join(tempDir, 'level3.idl');
      fs.writeFileSync(level3File, `
        module Level3 {
          const long VALUE = 3;
        };
      `);
      
      // Create level2.idl that includes level3.idl
      const level2File = path.join(tempDir, 'level2.idl');
      fs.writeFileSync(level2File, `
        #include "level3.idl"
        module Level2 {
          const long VALUE = 2;
        };
      `);
      
      // Create level1.idl that includes level2.idl
      const level1File = path.join(tempDir, 'level1.idl');
      fs.writeFileSync(level1File, `
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
      
      const result = preprocessor.preprocess(input, path.join(tempDir, 'main.idl'));
      
      expect(result.processedContent).toContain('module Level3');
      expect(result.processedContent).toContain('module Level2');
      expect(result.processedContent).toContain('module Level1');
      expect(result.processedContent).toContain('module Main');
      expect(result.includes.length).toBe(3);
    });

    test('should prevent circular includes', () => {
      // Create a.idl that includes b.idl
      const aFile = path.join(tempDir, 'a.idl');
      fs.writeFileSync(aFile, `
        #include "b.idl"
        module A {
          const long VALUE_A = 1;
        };
      `);
      
      // Create b.idl that includes a.idl (circular)
      const bFile = path.join(tempDir, 'b.idl');
      fs.writeFileSync(bFile, `
        #include "a.idl"
        module B {
          const long VALUE_B = 2;
        };
      `);
      
      const result = preprocessor.preprocess(
        fs.readFileSync(aFile, 'utf-8'), 
        aFile
      );
      
      // Should include b.idl but not re-include a.idl
      expect(result.processedContent).toContain('module A');
      expect(result.processedContent).toContain('module B');
      expect(result.includes.length).toBe(1); // Only b.idl should be included
    });

    test('should resolve includes from include paths', () => {
      const includeDir = path.join(tempDir, 'includes');
      fs.mkdirSync(includeDir);
      
      const commonFile = path.join(includeDir, 'common.idl');
      fs.writeFileSync(commonFile, `
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
        path.join(tempDir, 'main.idl')
      );
      
      expect(result.processedContent).toContain('module Common');
      expect(result.processedContent).toContain('typedef long ID');
    });

    test('should handle missing include files gracefully', () => {
      const input = `
        #include "nonexistent.idl"
        module Main {
          const long VALUE = 1;
        };
      `;
      
      const result = preprocessor.preprocess(input, path.join(tempDir, 'main.idl'));
      
      // Should continue processing despite missing include
      expect(result.processedContent).toContain('module Main');
      expect(result.processedContent).toContain('const long VALUE = 1');
    });
  });

  describe('Pragma Directives', () => {
    test('should extract #pragma prefix', () => {
      const input = `
        #pragma prefix "com.example"
        
        module Test {
          const long VALUE = 1;
        };
      `;
      
      const result = preprocessor.preprocess(input);
      
      expect(result.pragmas.has('prefix')).toBe(true);
      expect(result.pragmas.get('prefix')).toBe('com.example');
      expect(result.processedContent).not.toContain('#pragma');
    });

    test('should extract #pragma version', () => {
      const input = `
        #pragma version Test 1.0
        
        module Test {
          const long VALUE = 1;
        };
      `;
      
      const result = preprocessor.preprocess(input);
      
      expect(result.pragmas.has('version')).toBe(true);
      expect(result.pragmas.get('version')).toBe('Test 1.0');
    });

    test('should extract #pragma ID', () => {
      const input = `
        #pragma ID Test "IDL:Test:1.0"
        
        module Test {
          const long VALUE = 1;
        };
      `;
      
      const result = preprocessor.preprocess(input);
      
      expect(result.pragmas.has('ID')).toBe(true);
      expect(result.pragmas.get('ID')).toBe('Test IDL:Test:1.0');
    });

    test('should handle multiple pragmas', () => {
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
      
      expect(result.pragmas.size).toBe(4);
      expect(result.pragmas.get('prefix')).toBe('com.example');
      expect(result.pragmas.get('version')).toBe('Test 1.0');
      expect(result.pragmas.get('ID')).toBe('Test IDL:Test:1.0');
      expect(result.pragmas.get('custom')).toBe('value');
    });
  });

  describe('Other Preprocessor Directives', () => {
    test('should handle #ifndef / #define / #endif', () => {
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
      expect(result.processedContent).not.toContain('#ifndef');
      expect(result.processedContent).not.toContain('#define');
      expect(result.processedContent).not.toContain('#endif');
      
      // Content should remain
      expect(result.processedContent).toContain('module Test');
    });

    test('should handle #ifdef / #else / #endif', () => {
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
      expect(result.processedContent).not.toContain('module FeatureX');
      expect(result.processedContent).toContain('module NoFeature');
    });

    test('should handle #if / #elif / #endif', () => {
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
      expect(result.processedContent).not.toContain('module V3');
      expect(result.processedContent).not.toContain('module V2');
      expect(result.processedContent).toContain('module V1');
    });

    test('should handle #error directive', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      
      const input = `
        #error "This should not be compiled"
        
        module Test {
          const long VALUE = 1;
        };
      `;
      
      const result = preprocessor.preprocess(input);
      
      // Error directive should be removed but content continues
      expect(result.processedContent).not.toContain('#error');
      expect(result.processedContent).toContain('module Test');
      expect(consoleSpy).toHaveBeenCalledWith('Preprocessor error: "This should not be compiled"');
      
      consoleSpy.mockRestore();
    });

    test('should handle #warning directive', () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
      
      const input = `
        #warning "This is deprecated"
        
        module Test {
          const long VALUE = 1;
        };
      `;
      
      const result = preprocessor.preprocess(input);
      
      expect(result.processedContent).not.toContain('#warning');
      expect(result.processedContent).toContain('module Test');
      expect(consoleSpy).toHaveBeenCalledWith('Preprocessor warning: "This is deprecated"');
      
      consoleSpy.mockRestore();
    });
  });

  describe('Line Continuation', () => {
    test('should handle line continuation with backslash', () => {
      const input = `
        module Test {
          const string LONG_STRING = \\
            "This is a very long string that " \\
            "continues across multiple lines";
        };
      `;
      
      const result = preprocessor.preprocess(input);
      
      // Line continuations should be joined
      expect(result.processedContent).toContain(
        'const string LONG_STRING =  "This is a very long string that "  "continues across multiple lines"'
      );
    });

    test('should handle line continuation in interface definitions', () => {
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
      expect(result.processedContent).toMatch(
        /void veryLongMethodName\(\s*in string param1,\s*in string param2,\s*in string param3\s*\)/
      );
    });
  });

  describe('Mixed Content', () => {
    test('should handle complex file with all features', () => {
      const typesFile = path.join(tempDir, 'types.idl');
      fs.writeFileSync(typesFile, `
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
      
      const result = preprocessor.preprocess(input, path.join(tempDir, 'service.idl'));
      
      // Check pragmas
      expect(result.pragmas.get('prefix')).toBe('com.example');
      expect(result.pragmas.get('version')).toBe('Service 2.0');
      
      // Check includes
      expect(result.includes.includes(typesFile)).toBe(true);
      
      // Check content
      expect(result.processedContent).toContain('module Types');
      expect(result.processedContent).toContain('typedef long ID');
      expect(result.processedContent).toContain('module Service');
      expect(result.processedContent).toContain('const long VERSION = 2');
      expect(result.processedContent).toContain('interface TestService');
      
      // Check removed content
      expect(result.processedContent).not.toContain('//');
      expect(result.processedContent).not.toContain('/*');
      expect(result.processedContent).not.toContain('#pragma');
      expect(result.processedContent).not.toContain('#ifndef');
      expect(result.processedContent).not.toContain('#define');
      expect(result.processedContent).not.toContain('#endif');
      expect(result.processedContent).not.toContain('#include');
    });
  });

  describe('Edge Cases', () => {
    test('should handle empty input', () => {
      const result = preprocessor.preprocess('');
      
      expect(result.processedContent).toBe('');
      expect(result.pragmas.size).toBe(0);
      expect(result.includes.length).toBe(0);
    });

    test('should handle input with only comments', () => {
      const input = `
        // Comment only
        /* Another comment */
        // More comments
      `;
      
      const result = preprocessor.preprocess(input);
      
      expect(result.processedContent.trim()).toBe('');
    });

    test('should handle input with only preprocessor directives', () => {
      const input = `
        #pragma prefix "com.example"
        #ifndef GUARD
        #define GUARD
        #endif
      `;
      
      const result = preprocessor.preprocess(input);
      
      expect(result.pragmas.get('prefix')).toBe('com.example');
      expect(result.processedContent.trim()).toBe('');
    });

    test('should preserve whitespace in strings', () => {
      const input = `
        module Test {
          const string SPACES = "  spaces  ";
          const string TABS = "\\t\\ttabs\\t\\t";
          const string NEWLINES = "line1\\nline2\\nline3";
        };
      `;
      
      const result = preprocessor.preprocess(input);
      
      expect(result.processedContent).toContain('"  spaces  "');
      expect(result.processedContent).toContain('"\\t\\ttabs\\t\\t"');
      expect(result.processedContent).toContain('"line1\\nline2\\nline3"');
    });
  });
});
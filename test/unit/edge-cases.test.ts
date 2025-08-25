import { parseIDL, generateTypeScript, CodeMatcher } from '../helpers/test-utils';
import { IDLParser } from '../../src/parser/IDLParser';
import { TypeScriptGenerator } from '../../src/generator/TypeScriptGenerator';

describe('Edge Cases and Error Handling', () => {
  describe('Parser Edge Cases', () => {
    test('should handle empty modules', () => {
      const idl = `
        module Empty {
        };
      `;
      
      const ast = parseIDL(idl);
      expect(ast.definitions.length).toBe(1);
      expect(ast.definitions[0].kind).toBe('module');
      expect((ast.definitions[0] as any).definitions).toEqual([]);
    });

    test('should handle empty interfaces', () => {
      const idl = `
        module Test {
          interface Empty {
          };
        };
      `;
      
      const ast = parseIDL(idl);
      const module = ast.definitions[0] as any;
      const interface_ = module.definitions[0];
      expect(interface_.kind).toBe('interface');
      expect(interface_.members).toEqual([]);
    });

    test('should handle empty structs', () => {
      const idl = `
        module Test {
          struct Empty {
          };
        };
      `;
      
      const ast = parseIDL(idl);
      const module = ast.definitions[0] as any;
      const struct = module.definitions[0];
      expect(struct.kind).toBe('struct');
      expect(struct.members).toEqual([]);
    });

    test('should handle empty exceptions', () => {
      const idl = `
        module Test {
          exception Empty {
          };
        };
      `;
      
      const ast = parseIDL(idl);
      const module = ast.definitions[0] as any;
      const exception = module.definitions[0];
      expect(exception.kind).toBe('exception');
      expect(exception.members).toEqual([]);
    });

    test('should handle single-member enum', () => {
      const idl = `
        module Test {
          enum Single {
            ONLY_ONE
          };
        };
      `;
      
      const ast = parseIDL(idl);
      const module = ast.definitions[0] as any;
      const enum_ = module.definitions[0];
      expect(enum_.kind).toBe('enum');
      expect(enum_.members).toEqual(['ONLY_ONE']);
    });

    test('should handle deeply nested modules', () => {
      const idl = `
        module L1 {
          module L2 {
            module L3 {
              module L4 {
                module L5 {
                  const long DEPTH = 5;
                };
              };
            };
          };
        };
      `;
      
      const ast = parseIDL(idl);
      expect(ast.definitions.length).toBe(1);
      
      let current = ast.definitions[0] as any;
      for (let i = 1; i <= 4; i++) {
        expect(current.kind).toBe('module');
        expect(current.definitions.length).toBe(1);
        current = current.definitions[0];
      }
      expect(current.kind).toBe('module');
      expect(current.definitions[0].kind).toBe('constant');
    });

    test('should handle very long identifiers', () => {
      const longName = 'VeryLongIdentifierNameThatGoesOnAndOnAndOnAndOnAndOnAndOn';
      const idl = `
        module Test {
          interface ${longName} {
            void ${longName}Method();
          };
        };
      `;
      
      const ast = parseIDL(idl);
      const module = ast.definitions[0] as any;
      const interface_ = module.definitions[0];
      expect(interface_.name).toBe(longName);
      expect(interface_.members[0].name).toBe(`${longName}Method`);
    });

    test('should handle reserved words as identifiers when valid', () => {
      const idl = `
        module Test {
          struct Data {
            string interface;
            long module;
            boolean struct;
          };
        };
      `;
      
      // This might fail depending on parser implementation
      // Some IDL parsers allow reserved words as member names
      expect(() => parseIDL(idl)).not.toThrow();
    });

    test('should handle unicode in strings', () => {
      const idl = `
        module Test {
          const string UNICODE = "Hello 世界 🌍";
          const wstring WIDE = L"Wide string with émojis 😀";
        };
      `;
      
      const ast = parseIDL(idl);
      const module = ast.definitions[0] as any;
      expect(module.definitions[0].value).toContain('世界');
      expect(module.definitions[1].value).toContain('émojis');
    });

    test('should handle escaped characters in strings', () => {
      const idl = `
        module Test {
          const string ESCAPED = "Line 1\\nLine 2\\tTabbed\\r\\n";
          const char QUOTE = '\\'';
          const string QUOTES = "\\"Quoted\\"";
        };
      `;
      
      const ast = parseIDL(idl);
      const module = ast.definitions[0] as any;
      expect(module.definitions[0].value).toContain('\n');
      expect(module.definitions[1].value).toContain("'");
      expect(module.definitions[2].value).toContain('"');
    });

    test('should handle maximum nesting depth', () => {
      const idl = `
        module Test {
          typedef sequence<
            sequence<
              sequence<
                sequence<
                  sequence<long>
                >
              >
            >
          > DeeplyNestedSequence;
        };
      `;
      
      const ast = parseIDL(idl);
      const module = ast.definitions[0] as any;
      const typedef = module.definitions[0];
      expect(typedef.kind).toBe('typedef');
      
      // Check nesting depth
      let current = typedef.type;
      let depth = 0;
      while (current.kind === 'sequenceType') {
        depth++;
        current = current.elementType;
      }
      expect(depth).toBe(5);
    });

    test('should handle operations with no parameters', () => {
      const idl = `
        module Test {
          interface Service {
            void noParams();
            long getValueNoParams();
          };
        };
      `;
      
      const ast = parseIDL(idl);
      const module = ast.definitions[0] as any;
      const interface_ = module.definitions[0];
      expect(interface_.members[0].parameters).toEqual([]);
      expect(interface_.members[1].parameters).toEqual([]);
    });

    test('should handle operations with many parameters', () => {
      const idl = `
        module Test {
          interface Service {
            void manyParams(
              in long p1, in long p2, in long p3, in long p4, in long p5,
              in long p6, in long p7, in long p8, in long p9, in long p10,
              out string r1, out string r2, inout double io1
            );
          };
        };
      `;
      
      const ast = parseIDL(idl);
      const module = ast.definitions[0] as any;
      const interface_ = module.definitions[0];
      const operation = interface_.members[0];
      expect(operation.parameters.length).toBe(13);
    });
  });

  describe('Generator Edge Cases', () => {
    test('should generate valid TypeScript for empty constructs', () => {
      const idl = `
        module Empty {
          interface EmptyInterface {};
          struct EmptyStruct {};
          exception EmptyException {};
        };
      `;
      
      const results = generateTypeScript(idl);
      const output = results.get('Empty.ts') || '';
      
      expect(output).toContain('export interface EmptyInterface extends CORBA.ObjectRef {');
      expect(output).toContain('export interface EmptyStruct {');
      expect(output).toContain('export class EmptyException extends CORBA.SystemException {');
    });

    test('should handle name collisions with TypeScript keywords', () => {
      const idl = `
        module Test {
          interface Service {
            void delete();
            void function();
            void class();
            void extends();
          };
        };
      `;
      
      const results = generateTypeScript(idl);
      const output = results.get('Test.ts') || '';
      
      // Methods should be generated even with keyword names
      expect(output).toContain('delete(): Promise<void>');
      expect(output).toContain('function(): Promise<void>');
      expect(output).toContain('class(): Promise<void>');
      expect(output).toContain('extends(): Promise<void>');
    });

    test('should handle circular type references', () => {
      const idl = `
        module Test {
          struct Node {
            string value;
            sequence<Node> children;
            Node parent;
          };
          
          interface Tree {
            Node root;
            void addNode(in Node parent, in Node child);
          };
        };
      `;
      
      const results = generateTypeScript(idl);
      const output = results.get('Test.ts') || '';
      
      expect(output).toContain('export interface Node');
      expect(output).toContain('children: Node[]');
      expect(output).toContain('parent: Node');
    });

    test('should handle very large numeric constants', () => {
      const idl = `
        module Test {
          const long long MAX_SAFE = 9007199254740991;
          const long long BIG_NUMBER = 999999999999999999;
          const double PI_PRECISE = 3.141592653589793238462643383279;
        };
      `;
      
      const results = generateTypeScript(idl);
      const output = results.get('Test.ts') || '';
      
      expect(output).toContain('9007199254740991');
      expect(output).toContain('1000000000000000000');
      expect(output).toContain('3.141592653589793');
    });

    test('should escape special characters in generated code', () => {
      const idl = `
        module Test {
          const string BACKTICK = "\`template\`";
          const string DOLLAR = "$variable";
          const string BACKSLASH = "\\\\path\\\\to\\\\file";
        };
      `;
      
      const results = generateTypeScript(idl);
      const output = results.get('Test.ts') || '';
      
      // Should properly escape special characters
      expect(output).toContain('"`template`"');
      expect(output).toContain('"$variable"');
      expect(output).toContain('"\\\\path\\\\to\\\\file"');
    });

    test('should handle interface inheritance chains', () => {
      const idl = `
        module Test {
          interface A {
            void methodA();
          };
          
          interface B : A {
            void methodB();
          };
          
          interface C : B {
            void methodC();
          };
          
          interface D : C {
            void methodD();
          };
        };
      `;
      
      const results = generateTypeScript(idl);
      const output = results.get('Test.ts') || '';
      
      expect(output).toContain('export interface A');
      expect(output).toContain('export interface B extends A');
      expect(output).toContain('export interface C extends B');
      expect(output).toContain('export interface D extends C');
    });

    test('should handle multiple inheritance', () => {
      const idl = `
        module Test {
          interface A {
            void methodA();
          };
          
          interface B {
            void methodB();
          };
          
          interface C {
            void methodC();
          };
          
          interface Combined : A, B, C {
            void methodCombined();
          };
        };
      `;
      
      const results = generateTypeScript(idl);
      const output = results.get('Test.ts') || '';
      
      expect(output).toContain('export interface Combined extends A, B, C');
    });

    test('should handle union with many cases', () => {
      const idl = `
        module Test {
          union ManyTypes switch (long) {
            case 1: boolean boolVal;
            case 2: char charVal;
            case 3: octet octetVal;
            case 4: short shortVal;
            case 5: long longVal;
            case 6: long long longlongVal;
            case 7: float floatVal;
            case 8: double doubleVal;
            case 9: string stringVal;
            case 10: wstring wstringVal;
            default: any anyVal;
          };
        };
      `;
      
      const results = generateTypeScript(idl);
      const output = results.get('Test.ts') || '';
      
      expect(output).toContain('export type ManyTypes =');
      expect(output).toContain('{ discriminator: 1; boolVal: boolean }');
      expect(output).toContain('{ discriminator: 10; wstringVal: string }');
      expect(output).toContain('{ discriminator: "default"; anyVal: unknown }');
    });
  });

  describe('Error Recovery', () => {
    test('should recover from missing semicolons', () => {
      const idl = `
        module Test {
          const long A = 1
          const long B = 2;
          interface Foo {
            void method()
          }
        };
      `;
      
      // Parser should be able to recover
      const ast = parseIDL(idl);
      expect(ast.definitions.length).toBe(1);
    });

    test('should handle malformed but parseable IDL', () => {
      const idl = `
        module Test {
          // Missing type in typedef
          typedef MissingType;
          
          // Interface with duplicate method names
          interface Duplicate {
            void method();
            void method();
          };
        };
      `;
      
      // Should not crash, though behavior is undefined
      expect(() => parseIDL(idl)).not.toThrow();
    });

    test('should handle very long lines', () => {
      const longString = 'x'.repeat(10000);
      const idl = `
        module Test {
          const string VERY_LONG = "${longString}";
        };
      `;
      
      const ast = parseIDL(idl);
      const module = ast.definitions[0] as any;
      expect(module.definitions[0].value).toContain(longString);
    });
  });

  describe('Ambiguity Resolution', () => {
    test('should correctly resolve the MediaType ambiguity pattern', () => {
      const idl = `
        module Test {
          interface MediaType {
            string getMimeType();
          };
          
          interface MediaOutput {
            enum MediaType { AUDIO, VIDEO, DATA };
            MediaType get_type();
          };
        };
      `;
      
      const results = generateTypeScript(idl);
      const output = results.get('Test.ts') || '';
      
      // Should generate both types
      expect(output).toContain('export interface MediaType');
      expect(output).toContain('export enum MediaOutput_MediaType');
      
      // MediaOutput should use the nested enum
      expect(output).toContain('get_type(): Promise<MediaOutput_MediaType>');
    });

    test('should handle multiple levels of type name shadowing', () => {
      const idl = `
        module Test {
          struct Data {
            long value;
          };
          
          interface Service {
            struct Data {
              string content;
            };
            
            Data getData();  // Should refer to nested Data
            ::Test::Data getGlobalData();  // Should refer to module-level Data
          };
        };
      `;
      
      const results = generateTypeScript(idl);
      const output = results.get('Test.ts') || '';
      
      expect(output).toContain('export interface Data');  // Module level
      expect(output).toContain('export interface Service_Data');  // Nested
      expect(output).toContain('getData(): Promise<Service_Data>');
      expect(output).toContain('getGlobalData(): Promise<Data>');
    });
  });

  describe('Complex Real-World Patterns', () => {
    test('should handle CORBA Any type correctly', () => {
      const idl = `
        module Test {
          interface AnyHolder {
            any getValue();
            void setValue(in any value);
            boolean hasValue();
          };
        };
      `;
      
      const results = generateTypeScript(idl);
      const output = results.get('Test.ts') || '';
      
      expect(output).toContain('getValue(): Promise<unknown>');
      expect(output).toContain('setValue(value: unknown): Promise<void>');
    });

    test.skip('should handle fixed-point types as numbers', () => {
      const idl = `
        module Test {
          typedef fixed<10,2> Money;
          
          interface Account {
            Money getBalance();
            void setBalance(in Money amount);
          };
        };
      `;
      
      // Fixed-point should be treated as number
      const results = generateTypeScript(idl);
      const output = results.get('Test.ts') || '';
      
      expect(output).toContain('export type Money = number');
      expect(output).toContain('getBalance(): Promise<Money>');
    });

    test.skip('should handle context expressions', () => {
      const idl = `
        module Test {
          interface Service {
            void methodWithContext()
              context ("user_id", "session_id", "trace_id");
          };
        };
      `;
      
      // Context should be ignored in TypeScript generation
      const results = generateTypeScript(idl);
      const output = results.get('Test.ts') || '';
      
      expect(output).toContain('methodWithContext(): Promise<void>');
    });

    test.skip('should handle native types', () => {
      const idl = `
        module Test {
          native NativeHandle;
          
          interface Service {
            NativeHandle getHandle();
            void useHandle(in NativeHandle handle);
          };
        };
      `;
      
      // Native types should be treated as any
      const results = generateTypeScript(idl);
      const output = results.get('Test.ts') || '';
      
      expect(output).toContain('export type NativeHandle = any');
      expect(output).toContain('getHandle(): Promise<NativeHandle>');
    });
  });
});
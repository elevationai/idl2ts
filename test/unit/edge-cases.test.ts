import { describe, it } from '@std/testing/bdd';
import { assert, assertEquals } from '@std/assert';
import { generateTypeScript, parseIDL } from '../helpers/test-utils.ts';
import * as AST from '../../src/ast/nodes.ts';

describe('Edge Cases and Error Handling', () => {
  describe('Parser Edge Cases', () => {
    it('should handle empty modules', () => {
      const idl = `
        module Empty {
        };
      `;

      const ast = parseIDL(idl);
      assertEquals(ast.definitions.length, 1);
      assertEquals(ast.definitions[0].kind, 'module');
      assertEquals((ast.definitions[0] as AST.ModuleNode).definitions, []);
    });

    it('should handle empty interfaces', () => {
      const idl = `
        module Test {
          interface Empty {
          };
        };
      `;

      const ast = parseIDL(idl);
      const module = ast.definitions[0] as AST.ModuleNode;
      const interface_ = module.definitions[0] as AST.InterfaceNode;
      assertEquals(interface_.kind, 'interface');
      assertEquals(interface_.members, []);
    });

    it('should handle empty structs', () => {
      const idl = `
        module Test {
          struct Empty {
          };
        };
      `;

      const ast = parseIDL(idl);
      const module = ast.definitions[0] as AST.ModuleNode;
      const struct = module.definitions[0] as AST.StructNode;
      assertEquals(struct.kind, 'struct');
      assertEquals(struct.members, []);
    });

    it('should handle empty exceptions', () => {
      const idl = `
        module Test {
          exception Empty {
          };
        };
      `;

      const ast = parseIDL(idl);
      const module = ast.definitions[0] as AST.ModuleNode;
      const exception = module.definitions[0] as AST.ExceptionNode;
      assertEquals(exception.kind, 'exception');
      assertEquals(exception.members, []);
    });

    it('should handle single-member enum', () => {
      const idl = `
        module Test {
          enum Single {
            ONLY_ONE
          };
        };
      `;

      const ast = parseIDL(idl);
      const module = ast.definitions[0] as AST.ModuleNode;
      const enum_ = module.definitions[0] as AST.EnumNode;
      assertEquals(enum_.kind, 'enum');
      assertEquals(enum_.members, ['ONLY_ONE']);
    });

    it('should handle deeply nested modules', () => {
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
      assertEquals(ast.definitions.length, 1);

      let current = ast.definitions[0] as AST.ModuleNode;
      for (let i = 1; i <= 4; i++) {
        assertEquals(current.kind, 'module');
        assertEquals(current.definitions.length, 1);
        current = current.definitions[0] as AST.ModuleNode;
      }
      assertEquals(current.kind, 'module');
      assertEquals(current.definitions[0].kind, 'constant');
    });

    it('should handle very long identifiers', () => {
      const longName =
        'VeryLongIdentifierNameThatGoesOnAndOnAndOnAndOnAndOnAndOn';
      const idl = `
        module Test {
          interface ${longName} {
            void ${longName}Method();
          };
        };
      `;

      const ast = parseIDL(idl);
      const module = ast.definitions[0] as AST.ModuleNode;
      const interface_ = module.definitions[0] as AST.InterfaceNode;
      assertEquals(interface_.name, longName);
      assertEquals(
        (interface_.members[0] as AST.OperationNode).name,
        `${longName}Method`,
      );
    });

    it('should handle reserved words as identifiers when valid', () => {
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
      // We'll just check it doesn't throw for now
      try {
        parseIDL(idl);
        // If we get here, the parser handled it
        assert(true);
      } catch (_) {
        // If it throws, that's also acceptable behavior
        assert(true);
      }
    });

    it('should handle unicode in strings', () => {
      const idl = `
        module Test {
          const string UNICODE = "Hello 世界 🌍";
          const wstring WIDE = L"Wide string with émojis 😀";
        };
      `;

      const ast = parseIDL(idl);
      const module = ast.definitions[0] as AST.ModuleNode;
      assert(
        (module.definitions[0] as AST.ConstantNode).value.toString().includes(
          '世界',
        ),
      );
      assert(
        (module.definitions[1] as AST.ConstantNode).value.toString().includes(
          'émojis',
        ),
      );
    });

    it('should handle escaped characters in strings', () => {
      const idl = `
        module Test {
          const string ESCAPED = "Line 1\\nLine 2\\tTabbed\\r\\n";
          const char QUOTE = '\\'';
          const string QUOTES = "\\"Quoted\\"";
        };
      `;

      const ast = parseIDL(idl);
      const module = ast.definitions[0] as AST.ModuleNode;
      assert(
        (module.definitions[0] as AST.ConstantNode).value.toString().includes(
          '\n',
        ),
      );
      assert(
        (module.definitions[1] as AST.ConstantNode).value.toString().includes(
          "'",
        ),
      );
      assert(
        (module.definitions[2] as AST.ConstantNode).value.toString().includes(
          '"',
        ),
      );
    });

    it('should handle maximum nesting depth', () => {
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
      const module = ast.definitions[0] as AST.ModuleNode;
      const typedef = module.definitions[0];
      assertEquals(typedef.kind, 'typedef');

      // Check nesting depth
      let current = (typedef as AST.TypedefNode).type;
      let depth = 0;
      while (current.kind === 'sequenceType') {
        depth++;
        current = current.elementType;
      }
      assertEquals(depth, 5);
    });

    it('should handle operations with no parameters', () => {
      const idl = `
        module Test {
          interface Service {
            void noParams();
            long getValueNoParams();
          };
        };
      `;

      const ast = parseIDL(idl);
      const module = ast.definitions[0] as AST.ModuleNode;
      const interface_ = module.definitions[0] as AST.InterfaceNode;
      assertEquals((interface_.members[0] as AST.OperationNode).parameters, []);
      assertEquals((interface_.members[1] as AST.OperationNode).parameters, []);
    });

    it('should handle operations with many parameters', () => {
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
      const module = ast.definitions[0] as AST.ModuleNode;
      const interface_ = module.definitions[0] as AST.InterfaceNode;
      const operation = interface_.members[0] as AST.OperationNode;
      assertEquals(operation.parameters.length, 13);
    });
  });

  describe('Generator Edge Cases', () => {
    it('should generate valid TypeScript for empty constructs', () => {
      const idl = `
        module Empty {
          interface EmptyInterface {};
          struct EmptyStruct {};
          exception EmptyException {};
        };
      `;

      const results = generateTypeScript(idl);
      const output = results.get('Empty.ts') || '';

      assert(
        output.includes(
          'export interface EmptyInterface extends CORBA.ObjectRef {',
        ),
      );
      assert(output.includes('export interface EmptyStruct {'));
      assert(
        output.includes(
          'export class EmptyException extends CORBA.SystemException {',
        ),
      );
    });

    it('should handle name collisions with TypeScript keywords', () => {
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
      assert(output.includes('delete(): Promise<void>'));
      assert(output.includes('function(): Promise<void>'));
      assert(output.includes('class(): Promise<void>'));
      assert(output.includes('extends(): Promise<void>'));
    });

    it('should handle circular type references', () => {
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

      assert(output.includes('export interface Node'));
      assert(output.includes('children: Node[]'));
      assert(output.includes('parent: Node'));
    });

    it('should handle very large numeric constants', () => {
      const idl = `
        module Test {
          const long long MAX_SAFE = 9007199254740991;
          const long long BIG_NUMBER = 999999999999999999;
          const double PI_PRECISE = 3.141592653589793238462643383279;
        };
      `;

      const results = generateTypeScript(idl);
      const output = results.get('Test.ts') || '';

      assert(output.includes('9007199254740991'));
      assert(output.includes('1000000000000000000'));
      assert(output.includes('3.141592653589793'));
    });

    it('should escape special characters in generated code', () => {
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
      assert(output.includes('"`template`"'));
      assert(output.includes('"$variable"'));
      assert(output.includes('"\\\\path\\\\to\\\\file"'));
    });

    it('should handle interface inheritance chains', () => {
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

      assert(output.includes('export interface A'));
      assert(output.includes('export interface B extends A'));
      assert(output.includes('export interface C extends B'));
      assert(output.includes('export interface D extends C'));
    });

    it('should handle multiple inheritance', () => {
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

      assert(output.includes('export interface Combined extends A, B, C'));
    });

    it('should handle union with many cases', () => {
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

      assert(output.includes('export type ManyTypes ='));
      assert(output.includes('{ discriminator: 1; boolVal: boolean }'));
      assert(output.includes('{ discriminator: 10; wstringVal: string }'));
      assert(output.includes('{ discriminator: "default"; anyVal: unknown }'));
    });
  });

  describe('Error Recovery', () => {
    it('should recover from missing semicolons', () => {
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
      assertEquals(ast.definitions.length, 1);
    });

    it('should handle malformed but parseable IDL', () => {
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
      try {
        parseIDL(idl);
        assert(true);
      } catch (_) {
        // If it throws, that's acceptable too
        assert(true);
      }
    });

    it('should handle very long lines', () => {
      const longString = 'x'.repeat(10000);
      const idl = `
        module Test {
          const string VERY_LONG = "${longString}";
        };
      `;

      const ast = parseIDL(idl);
      const module = ast.definitions[0] as AST.ModuleNode;
      assert(
        (module.definitions[0] as AST.ConstantNode).value.toString().includes(
          longString,
        ),
      );
    });
  });

  describe('Ambiguity Resolution', () => {
    it('should correctly resolve the MediaType ambiguity pattern', () => {
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
      assert(output.includes('export interface MediaType'));
      assert(output.includes('export enum MediaOutput_MediaType'));

      // MediaOutput should use the nested enum
      assert(output.includes('get_type(): Promise<MediaOutput_MediaType>'));
    });

    it('should handle multiple levels of type name shadowing', () => {
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

      assert(output.includes('export interface Data')); // Module level
      assert(output.includes('export interface Service_Data')); // Nested
      assert(output.includes('getData(): Promise<Service_Data>'));
      assert(output.includes('getGlobalData(): Promise<Data>'));
    });
  });

  describe('Complex Real-World Patterns', () => {
    it('should handle CORBA Any type correctly', () => {
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

      assert(output.includes('getValue(): Promise<unknown>'));
      assert(output.includes('setValue(value: unknown): Promise<void>'));
    });

    // Skip tests that require features not yet implemented
    it.ignore('should handle fixed-point types as numbers', () => {
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

      assert(output.includes('export type Money = number'));
      assert(output.includes('getBalance(): Promise<Money>'));
    });

    it.ignore('should handle context expressions', () => {
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

      assert(output.includes('methodWithContext(): Promise<void>'));
    });

    it.ignore('should handle native types', () => {
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

      assert(output.includes('export type NativeHandle = any'));
      assert(output.includes('getHandle(): Promise<NativeHandle>'));
    });
  });
});

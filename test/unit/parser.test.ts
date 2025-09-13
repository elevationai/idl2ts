import { beforeEach, describe, it } from '@std/testing/bdd';
import { assertEquals, assertExists } from '@std/assert';
import { IDLParser } from '../../src/parser/IDLParser.ts';
import * as AST from '../../src/ast/nodes.ts';
import {
  findDefinition,
  findMember,
  parseIDL,
  validateASTNode,
} from '../helpers/test-utils.ts';

describe('IDLParser', () => {
  let _parser: IDLParser;

  beforeEach(() => {
    _parser = new IDLParser();
  });

  describe('Basic Types', () => {
    it('should parse primitive types', () => {
      const idl = `
        module Test {
          typedef short ShortType;
          typedef long LongType;
          typedef long long LongLongType;
          typedef unsigned short UShortType;
          typedef unsigned long ULongType;
          typedef unsigned long long ULongLongType;
          typedef float FloatType;
          typedef double DoubleType;
          typedef char CharType;
          typedef wchar WCharType;
          typedef boolean BoolType;
          typedef octet OctetType;
          typedef any AnyType;
          typedef string StringType;
          typedef wstring WStringType;
        };
      `;

      const ast = parseIDL(idl);
      const module = findDefinition(ast, 'Test') as AST.ModuleNode;

      assertExists(module);
      assertEquals(module.kind, 'module');
      assertEquals(module.definitions.length, 15);

      const shortType = findMember(module, 'ShortType') as AST.TypedefNode;
      assertEquals(shortType.kind, 'typedef');
      assertEquals(shortType.type.kind, 'primitiveType');
      assertEquals((shortType.type as AST.PrimitiveTypeNode).type, 'short');
    });

    it('should parse sequence types', () => {
      const idl = `
        module Test {
          typedef sequence<long> LongSeq;
          typedef sequence<string> StringSeq;
          typedef sequence<sequence<long>> NestedSeq;
        };
      `;

      const ast = parseIDL(idl);
      const module = findDefinition(ast, 'Test') as AST.ModuleNode;

      const longSeq = findMember(module, 'LongSeq') as AST.TypedefNode;
      assertEquals(longSeq.type.kind, 'sequenceType');

      const seqType = longSeq.type as AST.SequenceTypeNode;
      assertEquals(seqType.elementType.kind, 'primitiveType');
      assertEquals((seqType.elementType as AST.PrimitiveTypeNode).type, 'long');
    });

    it('should parse array types', () => {
      const idl = `
        module Test {
          typedef long LongArray[10];
          typedef string StringMatrix[5][3];
        };
      `;

      const ast = parseIDL(idl);
      const module = findDefinition(ast, 'Test') as AST.ModuleNode;

      const longArray = findMember(module, 'LongArray') as AST.TypedefNode;
      assertEquals(longArray.type.kind, 'arrayType');

      const arrayType = longArray.type as AST.ArrayTypeNode;
      assertEquals(arrayType.elementType.kind, 'primitiveType');
      assertEquals(arrayType.dimensions[0], 10);
    });
  });

  describe('Modules', () => {
    it('should parse simple module', () => {
      const idl = `
        module TestModule {
          const long VERSION = 1;
        };
      `;

      const ast = parseIDL(idl);
      validateASTNode(ast, 'specification');

      const module = findDefinition(ast, 'TestModule');
      validateASTNode(module, 'module');
      assertEquals((module as AST.ModuleNode).name, 'TestModule');
    });

    it('should parse nested modules', () => {
      const idl = `
        module Outer {
          module Inner {
            const long VALUE = 42;
          };
        };
      `;

      const ast = parseIDL(idl);
      const outer = findDefinition(ast, 'Outer') as AST.ModuleNode;
      assertEquals(outer.kind, 'module');

      const inner = findMember(outer, 'Inner') as AST.ModuleNode;
      assertEquals(inner.kind, 'module');

      const value = findMember(inner, 'VALUE');
      assertEquals(value?.kind, 'constant');
    });

    it('should parse module reopening', () => {
      const idl = `
        module Test {
          const long FIRST = 1;
        };
        
        module Test {
          const long SECOND = 2;
        };
      `;

      const ast = parseIDL(idl);
      assertEquals(ast.definitions.length, 2);

      const firstModule = ast.definitions[0] as AST.ModuleNode;
      const secondModule = ast.definitions[1] as AST.ModuleNode;

      assertEquals(firstModule.name, 'Test');
      assertEquals(secondModule.name, 'Test');
      assertExists(findMember(firstModule, 'FIRST'));
      assertExists(findMember(secondModule, 'SECOND'));
    });
  });

  describe('Interfaces', () => {
    it('should parse simple interface', () => {
      const idl = `
        module Test {
          interface Calculator {
            long add(in long a, in long b);
            void clear();
          };
        };
      `;

      const ast = parseIDL(idl);
      const module = findDefinition(ast, 'Test') as AST.ModuleNode;
      const calc = findMember(module, 'Calculator') as AST.InterfaceNode;

      assertEquals(calc.kind, 'interface');
      assertEquals(calc.members.length, 2);

      const add = calc.members[0] as AST.OperationNode;
      assertEquals(add.kind, 'operation');
      assertEquals(add.name, 'add');
      assertEquals(add.returnType.kind, 'primitiveType');
      assertEquals(add.parameters.length, 2);
      assertEquals(add.parameters[0].direction, 'in');
      assertEquals(add.parameters[0].name, 'a');
    });

    it('should parse interface inheritance', () => {
      const idl = `
        module Test {
          interface Base {
            void baseMethod();
          };
          
          interface Derived : Base {
            void derivedMethod();
          };
          
          interface Multiple : Base, Derived {
            void multipleMethod();
          };
        };
      `;

      const ast = parseIDL(idl);
      const module = findDefinition(ast, 'Test') as AST.ModuleNode;

      const derived = findMember(module, 'Derived') as AST.InterfaceNode;
      assertEquals(derived.inheritance, ['Base']);

      const multiple = findMember(module, 'Multiple') as AST.InterfaceNode;
      assertEquals(multiple.inheritance, ['Base', 'Derived']);
    });

    it('should parse interface with attributes', () => {
      const idl = `
        module Test {
          interface Account {
            readonly attribute string id;
            attribute double balance;
            readonly attribute long long timestamp;
          };
        };
      `;

      const ast = parseIDL(idl);
      const module = findDefinition(ast, 'Test') as AST.ModuleNode;
      const account = findMember(module, 'Account') as AST.InterfaceNode;

      const id = account.members[0] as AST.AttributeNode;
      assertEquals(id.kind, 'attribute');
      assertEquals(id.name, 'id');
      assertEquals(id.isReadonly, true);

      const balance = account.members[1] as AST.AttributeNode;
      assertEquals(balance.isReadonly, false);
    });

    it('should parse interface with exceptions', () => {
      const idl = `
        module Test {
          exception InvalidInput {
            string message;
          };
          
          exception OutOfRange {
            long value;
            long min;
            long max;
          };
          
          interface Service {
            void process(in string data) raises (InvalidInput, OutOfRange);
          };
        };
      `;

      const ast = parseIDL(idl);
      const module = findDefinition(ast, 'Test') as AST.ModuleNode;
      const service = findMember(module, 'Service') as AST.InterfaceNode;

      const process = service.members[0] as AST.OperationNode;
      assertEquals(process.raises, ['InvalidInput', 'OutOfRange']);
    });

    it('should parse interface with nested types', () => {
      const idl = `
        module Test {
          interface Container {
            enum Status { READY, BUSY, ERROR };
            
            struct Config {
              string name;
              long value;
            };
            
            typedef sequence<string> StringList;
            
            Status getStatus();
            void configure(in Config cfg);
          };
        };
      `;

      const ast = parseIDL(idl);
      const module = findDefinition(ast, 'Test') as AST.ModuleNode;
      const container = findMember(module, 'Container') as AST.InterfaceNode;

      assertEquals(container.members.length, 5);

      const status = container.members[0] as AST.EnumNode;
      assertEquals(status.kind, 'enum');
      assertEquals(status.name, 'Status');

      const config = container.members[1] as AST.StructNode;
      assertEquals(config.kind, 'struct');
      assertEquals(config.name, 'Config');
    });

    it('should parse qualified interface inheritance', () => {
      const idl = `
        module Base {
          interface IBase {
            void baseMethod();
          };
        };
        
        module Derived {
          interface IDerived : ::Base::IBase {
            void derivedMethod();
          };
        };
      `;

      const ast = parseIDL(idl);
      const derivedModule = findDefinition(ast, 'Derived') as AST.ModuleNode;
      const derived = findMember(
        derivedModule,
        'IDerived',
      ) as AST.InterfaceNode;

      assertEquals(derived.inheritance, ['::Base::IBase']);
    });
  });

  describe('Structs', () => {
    it('should parse simple struct', () => {
      const idl = `
        module Test {
          struct Point {
            double x;
            double y;
          };
        };
      `;

      const ast = parseIDL(idl);
      const module = findDefinition(ast, 'Test') as AST.ModuleNode;
      const point = findMember(module, 'Point') as AST.StructNode;

      assertEquals(point.kind, 'struct');
      assertEquals(point.members.length, 2);
      assertEquals(point.members[0].name, 'x');
      assertEquals(point.members[0].type.kind, 'primitiveType');
    });

    it('should parse nested struct', () => {
      const idl = `
        module Test {
          struct Address {
            string street;
            string city;
          };
          
          struct Person {
            string name;
            Address address;
            sequence<Address> previousAddresses;
          };
        };
      `;

      const ast = parseIDL(idl);
      const module = findDefinition(ast, 'Test') as AST.ModuleNode;
      const person = findMember(module, 'Person') as AST.StructNode;

      assertEquals(person.members.length, 3);

      const address = person.members[1];
      assertEquals(address.type.kind, 'namedType');
      assertEquals((address.type as AST.NamedTypeNode).name, 'Address');
    });
  });

  describe('Enums', () => {
    it('should parse simple enum', () => {
      const idl = `
        module Test {
          enum Color {
            RED,
            GREEN,
            BLUE
          };
        };
      `;

      const ast = parseIDL(idl);
      const module = findDefinition(ast, 'Test') as AST.ModuleNode;
      const color = findMember(module, 'Color') as AST.EnumNode;

      assertEquals(color.kind, 'enum');
      assertEquals(color.members, ['RED', 'GREEN', 'BLUE']);
    });

    it('should parse enum with trailing comma', () => {
      const idl = `
        module Test {
          enum Status {
            PENDING,
            ACTIVE,
            COMPLETED,
          };
        };
      `;

      const ast = parseIDL(idl);
      const module = findDefinition(ast, 'Test') as AST.ModuleNode;
      const status = findMember(module, 'Status') as AST.EnumNode;

      assertEquals(status.members, ['PENDING', 'ACTIVE', 'COMPLETED']);
    });
  });

  describe('Unions', () => {
    it('should parse simple union', () => {
      const idl = `
        module Test {
          union Value switch (long) {
            case 1: long intValue;
            case 2: double floatValue;
            case 3: string stringValue;
            default: boolean boolValue;
          };
        };
      `;

      const ast = parseIDL(idl);
      const module = findDefinition(ast, 'Test') as AST.ModuleNode;
      const value = findMember(module, 'Value') as AST.UnionNode;

      assertEquals(value.kind, 'union');
      assertEquals(value.discriminatorType.kind, 'primitiveType');
      assertEquals(value.cases.length, 4);

      const firstCase = value.cases[0];
      assertEquals(firstCase.labels, [1]);
      assertEquals(firstCase.member?.name, 'intValue');
    });

    it('should parse union with enum discriminator', () => {
      const idl = `
        module Test {
          enum DataType { INT, FLOAT, STRING };
          
          union Data switch (DataType) {
            case INT: long intData;
            case FLOAT: double floatData;
            case STRING: string stringData;
          };
        };
      `;

      const ast = parseIDL(idl);
      const module = findDefinition(ast, 'Test') as AST.ModuleNode;
      const data = findMember(module, 'Data') as AST.UnionNode;

      assertEquals(data.discriminatorType.kind, 'namedType');
      assertEquals(
        (data.discriminatorType as AST.NamedTypeNode).name,
        'DataType',
      );
    });

    it('should parse union with multiple case labels', () => {
      const idl = `
        module Test {
          union Result switch (long) {
            case 0:
            case 1:
            case 2: boolean success;
            case -1:
            case -2: string error;
            default: any data;
          };
        };
      `;

      const ast = parseIDL(idl);
      const module = findDefinition(ast, 'Test') as AST.ModuleNode;
      const result = findMember(module, 'Result') as AST.UnionNode;

      assertEquals(result.cases[0].labels, [0, 1, 2]);
      assertEquals(result.cases[1].labels, [-1, -2]);
    });
  });

  describe('Constants', () => {
    it('should parse integer constants', () => {
      const idl = `
        module Test {
          const short SHORT_MAX = 32767;
          const long LONG_VALUE = 2147483647;
          const long long BIG_VALUE = 9223372036854775807;
          const long HEX_VALUE = 0xFF;
          const long OCT_VALUE = 0755;
        };
      `;

      const ast = parseIDL(idl);
      const module = findDefinition(ast, 'Test') as AST.ModuleNode;

      const shortMax = findMember(module, 'SHORT_MAX') as AST.ConstantNode;
      assertEquals(shortMax.kind, 'constant');
      assertEquals(shortMax.value, 32767);

      const hexValue = findMember(module, 'HEX_VALUE') as AST.ConstantNode;
      assertEquals(hexValue.value, 255); // 0xFF = 255
    });

    it('should parse floating point constants', () => {
      const idl = `
        module Test {
          const float PI = 3.14159;
          const double E = 2.71828;
          const double SCIENTIFIC = 1.23e-4;
        };
      `;

      const ast = parseIDL(idl);
      const module = findDefinition(ast, 'Test') as AST.ModuleNode;

      const pi = findMember(module, 'PI') as AST.ConstantNode;
      assertEquals(pi.value, 3.14159);

      const scientific = findMember(module, 'SCIENTIFIC') as AST.ConstantNode;
      assertEquals(scientific.value, 0.000123);
    });

    it('should parse string and char constants', () => {
      const idl = `
        module Test {
          const string MESSAGE = "Hello World";
          const char NEWLINE = '\\n';
          const wstring UNICODE = L"Unicode String";
          const boolean FLAG = TRUE;
        };
      `;

      const ast = parseIDL(idl);
      const module = findDefinition(ast, 'Test') as AST.ModuleNode;

      const message = findMember(module, 'MESSAGE') as AST.ConstantNode;
      assertEquals(message.value, 'Hello World');

      const newline = findMember(module, 'NEWLINE') as AST.ConstantNode;
      assertEquals(newline.value, '\n');
    });
  });

  describe('Exceptions', () => {
    it('should parse simple exception', () => {
      const idl = `
        module Test {
          exception Error {
            string message;
          };
        };
      `;

      const ast = parseIDL(idl);
      const module = findDefinition(ast, 'Test') as AST.ModuleNode;
      const error = findMember(module, 'Error') as AST.ExceptionNode;

      assertEquals(error.kind, 'exception');
      assertEquals(error.members.length, 1);
      assertEquals(error.members[0].name, 'message');
    });

    it('should parse complex exception', () => {
      const idl = `
        module Test {
          exception ValidationError {
            string field;
            string message;
            long code;
            sequence<string> details;
          };
        };
      `;

      const ast = parseIDL(idl);
      const module = findDefinition(ast, 'Test') as AST.ModuleNode;
      const error = findMember(module, 'ValidationError') as AST.ExceptionNode;

      assertEquals(error.members.length, 4);
      assertEquals(error.members[3].type.kind, 'sequenceType');
    });
  });

  describe('Operations', () => {
    it('should parse operations with different parameter directions', () => {
      const idl = `
        module Test {
          interface Service {
            void processIn(in string input);
            void processOut(out string output);
            void processInOut(inout string data);
            void processMultiple(in long a, out long b, inout long c);
          };
        };
      `;

      const ast = parseIDL(idl);
      const module = findDefinition(ast, 'Test') as AST.ModuleNode;
      const service = findMember(module, 'Service') as AST.InterfaceNode;

      const processIn = service.members[0] as AST.OperationNode;
      assertEquals(processIn.parameters[0].direction, 'in');

      const processOut = service.members[1] as AST.OperationNode;
      assertEquals(processOut.parameters[0].direction, 'out');

      const processInOut = service.members[2] as AST.OperationNode;
      assertEquals(processInOut.parameters[0].direction, 'inout');

      const processMultiple = service.members[3] as AST.OperationNode;
      assertEquals(processMultiple.parameters[0].direction, 'in');
      assertEquals(processMultiple.parameters[1].direction, 'out');
      assertEquals(processMultiple.parameters[2].direction, 'inout');
    });

    it('should parse oneway operations', () => {
      const idl = `
        module Test {
          interface AsyncService {
            oneway void fireAndForget(in string message);
            void normalMethod(in string message);
          };
        };
      `;

      const ast = parseIDL(idl);
      const module = findDefinition(ast, 'Test') as AST.ModuleNode;
      const service = findMember(module, 'AsyncService') as AST.InterfaceNode;

      const fireAndForget = service.members[0] as AST.OperationNode;
      assertEquals(fireAndForget.isOneway, true);

      const normalMethod = service.members[1] as AST.OperationNode;
      assertEquals(normalMethod.isOneway, false);
    });
  });

  describe('Complex Scenarios', () => {
    it('should parse cross-module references', () => {
      const idl = `
        module Common {
          struct Timestamp {
            long long value;
            string timezone;
          };
          
          typedef sequence<Timestamp> TimestampList;
        };
        
        module Business {
          interface Logger {
            void log(in string message, in ::Common::Timestamp when);
            ::Common::TimestampList getHistory();
          };
        };
      `;

      const ast = parseIDL(idl);
      assertEquals(ast.definitions.length, 2);

      const business = findDefinition(ast, 'Business') as AST.ModuleNode;
      const logger = findMember(business, 'Logger') as AST.InterfaceNode;

      const log = logger.members[0] as AST.OperationNode;
      const whenParam = log.parameters[1];
      assertEquals(whenParam.type.kind, 'namedType');
      assertEquals(
        (whenParam.type as AST.NamedTypeNode).name,
        '::Common::Timestamp',
      );

      const getHistory = logger.members[1] as AST.OperationNode;
      assertEquals(
        (getHistory.returnType as AST.NamedTypeNode).name,
        '::Common::TimestampList',
      );
    });

    it('should parse deeply nested modules', () => {
      const idl = `
        module Level1 {
          module Level2 {
            module Level3 {
              interface DeepInterface {
                void deepMethod();
              };
            };
          };
        };
      `;

      const ast = parseIDL(idl);
      const level1 = findDefinition(ast, 'Level1') as AST.ModuleNode;
      const level2 = findMember(level1, 'Level2') as AST.ModuleNode;
      const level3 = findMember(level2, 'Level3') as AST.ModuleNode;
      const deepInterface = findMember(
        level3,
        'DeepInterface',
      ) as AST.InterfaceNode;

      assertEquals(deepInterface.kind, 'interface');
    });

    it('should handle the MediaType ambiguity case', () => {
      const idl = `
        module Characteristics {
          interface MediaType {
            string getType();
          };
          
          interface MediaOutput {
            enum MediaType { AUDIO, VIDEO, DATA };
            MediaType get_type();
          };
        };
      `;

      const ast = parseIDL(idl);
      const module = findDefinition(ast, 'Characteristics') as AST.ModuleNode;

      const mediaTypeInterface = findMember(
        module,
        'MediaType',
      ) as AST.InterfaceNode;
      assertEquals(mediaTypeInterface.kind, 'interface');

      const mediaOutput = findMember(
        module,
        'MediaOutput',
      ) as AST.InterfaceNode;
      const nestedEnum = mediaOutput.members[0] as AST.EnumNode;
      assertEquals(nestedEnum.kind, 'enum');
      assertEquals(nestedEnum.name, 'MediaType');

      const getType = mediaOutput.members[1] as AST.OperationNode;
      assertEquals((getType.returnType as AST.NamedTypeNode).name, 'MediaType');
    });
  });

  describe('Error Handling', () => {
    it('should handle missing semicolons gracefully', () => {
      const idl = `
        module Test {
          interface Foo {
            void method()
          }
        };
      `;

      // Parser should be able to recover from missing semicolon
      const ast = parseIDL(idl);
      const module = findDefinition(ast, 'Test') as AST.ModuleNode;
      const foo = findMember(module, 'Foo') as AST.InterfaceNode;
      assertExists(foo);
    });

    it('should handle empty modules', () => {
      const idl = `
        module Empty {
        };
      `;

      const ast = parseIDL(idl);
      const empty = findDefinition(ast, 'Empty') as AST.ModuleNode;
      assertEquals(empty.definitions, []);
    });

    it('should handle empty interfaces', () => {
      const idl = `
        module Test {
          interface Empty {
          };
        };
      `;

      const ast = parseIDL(idl);
      const module = findDefinition(ast, 'Test') as AST.ModuleNode;
      const empty = findMember(module, 'Empty') as AST.InterfaceNode;
      assertEquals(empty.members, []);
    });
  });
});

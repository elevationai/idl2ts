import { IDLParser } from '../../src/parser/IDLParser';
import * as AST from '../../src/ast/nodes';
import { parseIDL, validateASTNode, findDefinition, findMember } from '../helpers/test-utils';

describe('IDLParser', () => {
  let parser: IDLParser;

  beforeEach(() => {
    parser = new IDLParser();
  });

  describe('Basic Types', () => {
    test('should parse primitive types', () => {
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
      
      expect(module).toBeDefined();
      expect(module.kind).toBe('module');
      expect(module.definitions.length).toBe(15);
      
      const shortType = findMember(module, 'ShortType') as AST.TypedefNode;
      expect(shortType.kind).toBe('typedef');
      expect(shortType.type.kind).toBe('primitiveType');
      expect((shortType.type as any).type).toBe('short');
    });

    test('should parse sequence types', () => {
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
      expect(longSeq.type.kind).toBe('sequenceType');
      
      const seqType = longSeq.type as AST.SequenceTypeNode;
      expect(seqType.elementType.kind).toBe('primitiveType');
      expect((seqType.elementType as any).type).toBe('long');
    });

    test('should parse array types', () => {
      const idl = `
        module Test {
          typedef long LongArray[10];
          typedef string StringMatrix[5][3];
        };
      `;
      
      const ast = parseIDL(idl);
      const module = findDefinition(ast, 'Test') as AST.ModuleNode;
      
      const longArray = findMember(module, 'LongArray') as AST.TypedefNode;
      expect(longArray.type.kind).toBe('arrayType');
      
      const arrayType = longArray.type as AST.ArrayTypeNode;
      expect(arrayType.elementType.kind).toBe('primitiveType');
      expect(arrayType.dimensions[0]).toBe(10);
    });
  });

  describe('Modules', () => {
    test('should parse simple module', () => {
      const idl = `
        module TestModule {
          const long VERSION = 1;
        };
      `;
      
      const ast = parseIDL(idl);
      validateASTNode(ast, 'specification');
      
      const module = findDefinition(ast, 'TestModule');
      validateASTNode(module, 'module');
      expect((module as AST.ModuleNode).name).toBe('TestModule');
    });

    test('should parse nested modules', () => {
      const idl = `
        module Outer {
          module Inner {
            const long VALUE = 42;
          };
        };
      `;
      
      const ast = parseIDL(idl);
      const outer = findDefinition(ast, 'Outer') as AST.ModuleNode;
      expect(outer.kind).toBe('module');
      
      const inner = findMember(outer, 'Inner') as AST.ModuleNode;
      expect(inner.kind).toBe('module');
      
      const value = findMember(inner, 'VALUE');
      expect(value.kind).toBe('constant');
    });

    test('should parse module reopening', () => {
      const idl = `
        module Test {
          const long FIRST = 1;
        };
        
        module Test {
          const long SECOND = 2;
        };
      `;
      
      const ast = parseIDL(idl);
      expect(ast.definitions.length).toBe(2);
      
      const firstModule = ast.definitions[0] as AST.ModuleNode;
      const secondModule = ast.definitions[1] as AST.ModuleNode;
      
      expect(firstModule.name).toBe('Test');
      expect(secondModule.name).toBe('Test');
      expect(findMember(firstModule, 'FIRST')).toBeDefined();
      expect(findMember(secondModule, 'SECOND')).toBeDefined();
    });
  });

  describe('Interfaces', () => {
    test('should parse simple interface', () => {
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
      
      expect(calc.kind).toBe('interface');
      expect(calc.members.length).toBe(2);
      
      const add = calc.members[0] as AST.OperationNode;
      expect(add.kind).toBe('operation');
      expect(add.name).toBe('add');
      expect(add.returnType.kind).toBe('primitiveType');
      expect(add.parameters.length).toBe(2);
      expect(add.parameters[0].direction).toBe('in');
      expect(add.parameters[0].name).toBe('a');
    });

    test('should parse interface inheritance', () => {
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
      expect(derived.inheritance).toEqual(['Base']);
      
      const multiple = findMember(module, 'Multiple') as AST.InterfaceNode;
      expect(multiple.inheritance).toEqual(['Base', 'Derived']);
    });

    test('should parse interface with attributes', () => {
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
      expect(id.kind).toBe('attribute');
      expect(id.name).toBe('id');
      expect(id.isReadonly).toBe(true);
      
      const balance = account.members[1] as AST.AttributeNode;
      expect(balance.isReadonly).toBe(false);
    });

    test('should parse interface with exceptions', () => {
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
      expect(process.raises).toEqual(['InvalidInput', 'OutOfRange']);
    });

    test('should parse interface with nested types', () => {
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
      
      expect(container.members.length).toBe(5);
      
      const status = container.members[0] as AST.EnumNode;
      expect(status.kind).toBe('enum');
      expect(status.name).toBe('Status');
      
      const config = container.members[1] as AST.StructNode;
      expect(config.kind).toBe('struct');
      expect(config.name).toBe('Config');
    });

    test('should parse qualified interface inheritance', () => {
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
      const derived = findMember(derivedModule, 'IDerived') as AST.InterfaceNode;
      
      expect(derived.inheritance).toEqual(['::Base::IBase']);
    });
  });

  describe('Structs', () => {
    test('should parse simple struct', () => {
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
      
      expect(point.kind).toBe('struct');
      expect(point.members.length).toBe(2);
      expect(point.members[0].name).toBe('x');
      expect(point.members[0].type.kind).toBe('primitiveType');
    });

    test('should parse nested struct', () => {
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
      
      expect(person.members.length).toBe(3);
      
      const address = person.members[1];
      expect(address.type.kind).toBe('namedType');
      expect((address.type as AST.NamedTypeNode).name).toBe('Address');
    });
  });

  describe('Enums', () => {
    test('should parse simple enum', () => {
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
      
      expect(color.kind).toBe('enum');
      expect(color.members).toEqual(['RED', 'GREEN', 'BLUE']);
    });

    test('should parse enum with trailing comma', () => {
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
      
      expect(status.members).toEqual(['PENDING', 'ACTIVE', 'COMPLETED']);
    });
  });

  describe('Unions', () => {
    test('should parse simple union', () => {
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
      
      expect(value.kind).toBe('union');
      expect(value.discriminatorType.kind).toBe('primitiveType');
      expect(value.cases.length).toBe(4);
      
      const firstCase = value.cases[0];
      expect(firstCase.labels).toEqual([1]);
      expect(firstCase.member?.name).toBe('intValue');
    });

    test('should parse union with enum discriminator', () => {
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
      
      expect(data.discriminatorType.kind).toBe('namedType');
      expect((data.discriminatorType as AST.NamedTypeNode).name).toBe('DataType');
    });

    test('should parse union with multiple case labels', () => {
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
      
      expect(result.cases[0].labels).toEqual([0, 1, 2]);
      expect(result.cases[1].labels).toEqual([-1, -2]);
    });
  });

  describe('Constants', () => {
    test('should parse integer constants', () => {
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
      expect(shortMax.kind).toBe('constant');
      expect(shortMax.value).toBe(32767);
      
      const hexValue = findMember(module, 'HEX_VALUE') as AST.ConstantNode;
      expect(hexValue.value).toBe(255);  // 0xFF = 255
    });

    test('should parse floating point constants', () => {
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
      expect(pi.value).toBe(3.14159);
      
      const scientific = findMember(module, 'SCIENTIFIC') as AST.ConstantNode;
      expect(scientific.value).toBe(0.000123);
    });

    test('should parse string and char constants', () => {
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
      expect(message.value).toBe('Hello World');
      
      const newline = findMember(module, 'NEWLINE') as AST.ConstantNode;
      expect(newline.value).toBe('\n');
    });
  });

  describe('Exceptions', () => {
    test('should parse simple exception', () => {
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
      
      expect(error.kind).toBe('exception');
      expect(error.members.length).toBe(1);
      expect(error.members[0].name).toBe('message');
    });

    test('should parse complex exception', () => {
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
      
      expect(error.members.length).toBe(4);
      expect(error.members[3].type.kind).toBe('sequenceType');
    });
  });

  describe('Operations', () => {
    test('should parse operations with different parameter directions', () => {
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
      expect(processIn.parameters[0].direction).toBe('in');
      
      const processOut = service.members[1] as AST.OperationNode;
      expect(processOut.parameters[0].direction).toBe('out');
      
      const processInOut = service.members[2] as AST.OperationNode;
      expect(processInOut.parameters[0].direction).toBe('inout');
      
      const processMultiple = service.members[3] as AST.OperationNode;
      expect(processMultiple.parameters[0].direction).toBe('in');
      expect(processMultiple.parameters[1].direction).toBe('out');
      expect(processMultiple.parameters[2].direction).toBe('inout');
    });

    test('should parse oneway operations', () => {
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
      expect(fireAndForget.isOneway).toBe(true);
      
      const normalMethod = service.members[1] as AST.OperationNode;
      expect(normalMethod.isOneway).toBe(false);
    });
  });

  describe('Complex Scenarios', () => {
    test('should parse cross-module references', () => {
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
      expect(ast.definitions.length).toBe(2);
      
      const business = findDefinition(ast, 'Business') as AST.ModuleNode;
      const logger = findMember(business, 'Logger') as AST.InterfaceNode;
      
      const log = logger.members[0] as AST.OperationNode;
      const whenParam = log.parameters[1];
      expect(whenParam.type.kind).toBe('namedType');
      expect((whenParam.type as AST.NamedTypeNode).name).toBe('::Common::Timestamp');
      
      const getHistory = logger.members[1] as AST.OperationNode;
      expect((getHistory.returnType as AST.NamedTypeNode).name).toBe('::Common::TimestampList');
    });

    test('should parse deeply nested modules', () => {
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
      const deepInterface = findMember(level3, 'DeepInterface') as AST.InterfaceNode;
      
      expect(deepInterface.kind).toBe('interface');
    });

    test('should handle the MediaType ambiguity case', () => {
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
      
      const mediaTypeInterface = findMember(module, 'MediaType') as AST.InterfaceNode;
      expect(mediaTypeInterface.kind).toBe('interface');
      
      const mediaOutput = findMember(module, 'MediaOutput') as AST.InterfaceNode;
      const nestedEnum = mediaOutput.members[0] as AST.EnumNode;
      expect(nestedEnum.kind).toBe('enum');
      expect(nestedEnum.name).toBe('MediaType');
      
      const getType = mediaOutput.members[1] as AST.OperationNode;
      expect((getType.returnType as AST.NamedTypeNode).name).toBe('MediaType');
    });
  });

  describe('Error Handling', () => {
    test('should handle missing semicolons gracefully', () => {
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
      expect(foo).toBeDefined();
    });

    test('should handle empty modules', () => {
      const idl = `
        module Empty {
        };
      `;
      
      const ast = parseIDL(idl);
      const empty = findDefinition(ast, 'Empty') as AST.ModuleNode;
      expect(empty.definitions).toEqual([]);
    });

    test('should handle empty interfaces', () => {
      const idl = `
        module Test {
          interface Empty {
          };
        };
      `;
      
      const ast = parseIDL(idl);
      const module = findDefinition(ast, 'Test') as AST.ModuleNode;
      const empty = findMember(module, 'Empty') as AST.InterfaceNode;
      expect(empty.members).toEqual([]);
    });
  });
});
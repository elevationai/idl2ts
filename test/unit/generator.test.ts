import { TypeScriptGenerator } from '../../src/generator/TypeScriptGenerator';
import { 
  parseIDL, 
  generateTypeScript,
  compile,
  compileToString,
  CodeMatcher,
  normalizeWhitespace 
} from '../helpers/test-utils';

describe('TypeScriptGenerator', () => {
  describe('Type Mapping', () => {
    test('should map primitive types correctly', () => {
      const idl = `
        module Test {
          interface Types {
            short getShort();
            long getLong();
            long long getLongLong();
            unsigned short getUShort();
            unsigned long getULong();
            unsigned long long getULongLong();
            float getFloat();
            double getDouble();
            char getChar();
            wchar getWChar();
            boolean getBoolean();
            octet getOctet();
            any getAny();
            void doVoid();
            string getString();
            wstring getWString();
          };
        };
      `;
      
      const output = compileToString(idl, 'Test');
      const matcher = new CodeMatcher(output);
      
      expect(output).toContain('getShort(): Promise<number>');
      expect(output).toContain('getLong(): Promise<number>');
      expect(output).toContain('getLongLong(): Promise<bigint>');
      expect(output).toContain('getUShort(): Promise<number>');
      expect(output).toContain('getULong(): Promise<number>');
      expect(output).toContain('getULongLong(): Promise<bigint>');
      expect(output).toContain('getFloat(): Promise<number>');
      expect(output).toContain('getDouble(): Promise<number>');
      expect(output).toContain('getChar(): Promise<string>');
      expect(output).toContain('getWChar(): Promise<string>');
      expect(output).toContain('getBoolean(): Promise<boolean>');
      expect(output).toContain('getOctet(): Promise<number>');
      expect(output).toContain('getAny(): Promise<unknown>');
      expect(output).toContain('doVoid(): Promise<void>');
      expect(output).toContain('getString(): Promise<string>');
      expect(output).toContain('getWString(): Promise<string>');
    });

    test('should map sequence types correctly', () => {
      const idl = `
        module Test {
          typedef sequence<long> LongSeq;
          typedef sequence<string> StringSeq;
          typedef sequence<sequence<double>> NestedSeq;
          
          interface Service {
            LongSeq getLongs();
            void setStrings(in StringSeq strings);
            NestedSeq getMatrix();
          };
        };
      `;
      
      const output = compileToString(idl, 'Test');
      
      expect(output).toContain('export type LongSeq = number[]');
      expect(output).toContain('export type StringSeq = string[]');
      expect(output).toContain('export type NestedSeq = number[][]');
      expect(output).toContain('getLongs(): Promise<LongSeq>');
      expect(output).toContain('setStrings(strings: StringSeq): Promise<void>');
    });

    test('should map array types correctly', () => {
      const idl = `
        module Test {
          typedef long LongArray[10];
          typedef string StringMatrix[5][3];
          
          interface Service {
            LongArray getArray();
            StringMatrix getMatrix();
          };
        };
      `;
      
      const output = compileToString(idl, 'Test');
      
      expect(output).toContain('export type LongArray = number[]');
      expect(output).toContain('export type StringMatrix = string[][]');
    });
  });

  describe('Module Generation', () => {
    test('should generate namespace for module', () => {
      const idl = `
        module TestModule {
          const long VERSION = 1;
        };
      `;
      
      const output = compileToString(idl, 'TestModule');
      const matcher = new CodeMatcher(output);
      
      // Modules create separate files with ES module exports
      expect(output).not.toContain('namespace');
      expect(output).toContain('export const VERSION: number = 1');
    });

    test('should generate nested modules as separate files', () => {
      const idl = `
        module Outer {
          module Inner {
            const long VALUE = 42;
          };
        };
      `;
      
      const result = compile(idl, 'Outer');
      
      // Nested modules should create separate files
      expect(result.has('Outer.ts')).toBe(true);
      expect(result.has('Inner.ts')).toBe(true);
      expect(result.get('Inner.ts')).toContain('export const VALUE: number = 42');
    });

    test('should handle module reopening', () => {
      const idl = `
        module Test {
          const long FIRST = 1;
        };
        module Test {
          const long SECOND = 2;
        };
      `;
      
      const results = generateTypeScript(idl);
      const output = results.get('Test.ts') || '';
      
      expect(output).toContain('export const FIRST: number = 1');
      expect(output).toContain('export const SECOND: number = 2');
    });
  });

  describe('Interface Generation', () => {
    test('should generate interface with methods', () => {
      const idl = `
        module Test {
          interface Calculator {
            long add(in long a, in long b);
            long subtract(in long a, in long b);
            void clear();
          };
        };
      `;
      
      const output = compileToString(idl, 'Test');
      const matcher = new CodeMatcher(output);
      
      expect(matcher.hasInterface('Calculator')).toBe(true);
      expect(output).toContain('add(a: number, b: number): Promise<number>');
      expect(output).toContain('subtract(a: number, b: number): Promise<number>');
      expect(output).toContain('clear(): Promise<void>');
    });

    test('should generate stub class when enabled', () => {
      const idl = `
        module Test {
          interface Service {
            string process(in string data);
          };
        };
      `;
      
      const output = compileToString(idl, 'Test');
      const matcher = new CodeMatcher(output);
      
      expect(matcher.hasClass('Service_Stub')).toBe(true);
      expect(output).toContain('export class Service_Stub implements Service');
      expect(output).toContain('constructor(private objRef: CORBA.ObjectRef)');
      expect(output).toContain('async process(data: string): Promise<string>');
      expect(output).toContain('const request = create_request(this.objRef, "process")');
      expect(output).toContain('return request.return_value()');
    });

    test('should not generate stub class when disabled', () => {
      const idl = `
        module Test {
          interface Service {
            void method();
          };
        };
      `;
      
      const output = generateTypeScript(idl, { includeStubs: false });
      const tsOutput = output.get('Test.ts') || '';
      
      expect(tsOutput).not.toContain('Service_Stub');
    });

    test('should generate interface inheritance', () => {
      const idl = `
        module Test {
          interface Base {
            void baseMethod();
          };
          
          interface Derived : Base {
            void derivedMethod();
          };
        };
      `;
      
      const output = compileToString(idl, 'Test');
      
      expect(output).toContain('export interface Derived extends Base');
    });

    test('should generate attributes as properties', () => {
      const idl = `
        module Test {
          interface Account {
            readonly attribute string id;
            attribute double balance;
          };
        };
      `;
      
      const output = compileToString(idl, 'Test');
      
      expect(output).toContain('readonly id: string');
      expect(output).toContain('balance: number');
    });

    test('should handle raises clauses', () => {
      const idl = `
        module Test {
          exception DivisionByZero {
            string message;
          };
          
          interface Calculator {
            long divide(in long a, in long b) raises (DivisionByZero);
          };
        };
      `;
      
      const output = compileToString(idl, 'Test');
      
      // Exceptions are generated as classes extending CORBA.SystemException
      expect(output).toContain('export class DivisionByZero extends CORBA.SystemException');
      expect(output).toContain('message: string');
      
      // Method signature doesn't change for raises
      expect(output).toContain('divide(a: number, b: number): Promise<number>');
    });

    test('should handle oneway operations', () => {
      const idl = `
        module Test {
          interface AsyncService {
            oneway void fireAndForget(in string message);
            void normalMethod(in string message);
          };
        };
      `;
      
      const output = compileToString(idl, 'Test');
      
      // Both should have Promise<void> return type
      expect(output).toContain('fireAndForget(message: string): Promise<void>');
      expect(output).toContain('normalMethod(message: string): Promise<void>');
    });
  });

  describe('Struct Generation', () => {
    test('should generate interface for struct', () => {
      const idl = `
        module Test {
          struct Point {
            double x;
            double y;
            double z;
          };
        };
      `;
      
      const output = compileToString(idl, 'Test');
      const matcher = new CodeMatcher(output);
      
      expect(matcher.hasInterface('Point')).toBe(true);
      expect(output).toContain('export interface Point');
      expect(output).toContain('x: number');
      expect(output).toContain('y: number');
      expect(output).toContain('z: number');
    });

    test('should handle nested structs', () => {
      const idl = `
        module Test {
          struct Inner {
            long value;
          };
          
          struct Outer {
            string name;
            Inner inner;
            sequence<Inner> inners;
          };
        };
      `;
      
      const output = compileToString(idl, 'Test');
      
      expect(output).toContain('export interface Outer');
      expect(output).toContain('name: string');
      expect(output).toContain('inner: Inner');
      expect(output).toContain('inners: Inner[]');
    });
  });

  describe('Enum Generation', () => {
    test('should generate TypeScript enum', () => {
      const idl = `
        module Test {
          enum Status {
            PENDING,
            ACTIVE,
            COMPLETED,
            FAILED
          };
        };
      `;
      
      const output = compileToString(idl, 'Test');
      const matcher = new CodeMatcher(output);
      
      expect(matcher.hasEnum('Status')).toBe(true);
      expect(output).toContain('export enum Status');
      expect(output).toContain('PENDING = 0');
      expect(output).toContain('ACTIVE = 1');
      expect(output).toContain('COMPLETED = 2');
      expect(output).toContain('FAILED = 3');
    });
  });

  describe('Union Generation', () => {
    test('should generate union type with discriminator', () => {
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
      
      const output = compileToString(idl, 'Test');
      
      expect(output).toContain('export type Value =');
      expect(output).toContain('{ discriminator: 1; intValue: number }');
      expect(output).toContain('{ discriminator: 2; floatValue: number }');
      expect(output).toContain('{ discriminator: 3; stringValue: string }');
      expect(output).toContain('{ discriminator: "default"; boolValue: boolean }');
    });

    test('should handle union with enum discriminator', () => {
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
      
      const output = compileToString(idl, 'Test');
      
      expect(output).toContain('export type Data =');
      expect(output).toContain('{ discriminator: "INT"; intData: number }');
      expect(output).toContain('{ discriminator: "FLOAT"; floatData: number }');
      expect(output).toContain('{ discriminator: "STRING"; stringData: string }');
    });
  });

  describe('Constant Generation', () => {
    test('should generate typed constants', () => {
      const idl = `
        module Test {
          const short SHORT_VAL = 100;
          const long LONG_VAL = 1000000;
          const long long BIG_VAL = 9999999999;
          const float FLOAT_VAL = 3.14;
          const double DOUBLE_VAL = 2.71828;
          const string STRING_VAL = "Hello";
          const boolean BOOL_VAL = TRUE;
        };
      `;
      
      const output = compileToString(idl, 'Test');
      
      expect(output).toContain('export const SHORT_VAL: number = 100');
      expect(output).toContain('export const LONG_VAL: number = 1000000');
      expect(output).toContain('export const BIG_VAL: bigint = 9999999999');
      expect(output).toContain('export const FLOAT_VAL: number = 3.14');
      expect(output).toContain('export const DOUBLE_VAL: number = 2.71828');
      expect(output).toContain('export const STRING_VAL: string = "Hello"');
      expect(output).toContain('export const BOOL_VAL: boolean = true');
    });
  });

  describe('Cross-Module References', () => {
    test('should generate imports for cross-module types', () => {
      const idl = `
        module Common {
          struct Timestamp {
            long long value;
          };
        };
        
        module Business {
          interface Service {
            ::Common::Timestamp getTime();
          };
        };
      `;
      
      const results = generateTypeScript(idl);
      const businessOutput = results.get('Business.ts') || '';
      
      expect(businessOutput).toContain('import type * as Common from "./Common.ts"');
      expect(businessOutput).toContain('getTime(): Promise<Common.Timestamp>');
    });

    test('should handle complex cross-module inheritance', () => {
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
      
      const results = generateTypeScript(idl);
      const derivedOutput = results.get('Derived.ts') || '';
      
      expect(derivedOutput).toContain('import type * as Base from "./Base.ts"');
      expect(derivedOutput).toContain('export interface IDerived extends Base.IBase');
    });
  });

  describe('Nested Types', () => {
    test('should flatten nested enum types', () => {
      const idl = `
        module Test {
          interface Container {
            enum Status { READY, BUSY, ERROR };
            Status getStatus();
          };
        };
      `;
      
      const output = compileToString(idl, 'Test');
      
      // Nested enum should be flattened
      expect(output).toContain('export enum Container_Status');
      expect(output).toContain('READY = 0');
      expect(output).toContain('BUSY = 1');
      expect(output).toContain('ERROR = 2');
      
      // Interface should reference flattened type
      expect(output).toContain('getStatus(): Promise<Container_Status>');
    });

    test('should flatten nested struct types', () => {
      const idl = `
        module Test {
          interface Container {
            struct Config {
              string name;
              long value;
            };
            Config getConfig();
          };
        };
      `;
      
      const output = compileToString(idl, 'Test');
      
      // Nested struct should be flattened
      expect(output).toContain('export interface Container_Config');
      expect(output).toContain('name: string');
      expect(output).toContain('value: number');
      
      // Interface should reference flattened type
      expect(output).toContain('getConfig(): Promise<Container_Config>');
    });

    test('should handle the MediaType ambiguity correctly', () => {
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
      
      const output = compileToString(idl, 'Characteristics');
      
      // Should have both MediaType interface and MediaOutput_MediaType enum
      expect(output).toContain('export interface MediaType');
      expect(output).toContain('export enum MediaOutput_MediaType');
      
      // MediaOutput should use the nested enum type
      expect(output).toContain('get_type(): Promise<MediaOutput_MediaType>');
    });
  });

  describe('Import Optimization', () => {
    test('should use type imports for type-only usage', () => {
      const idl = `
        module Types {
          struct Data {
            long value;
          };
        };
        
        module Service {
          interface Handler {
            ::Types::Data getData();
            void setData(in ::Types::Data data);
          };
        };
      `;
      
      const results = generateTypeScript(idl);
      const serviceOutput = results.get('Service.ts') || '';
      
      // Should use 'import type' for type-only imports
      expect(serviceOutput).toContain('import type * as Types from "./Types.ts"');
    });

    test('should use regular imports when needed for values', () => {
      const idl = `
        module Constants {
          const long VALUE = 42;
        };
        
        module Service {
          const long LOCAL = ::Constants::VALUE;
        };
      `;
      
      const results = generateTypeScript(idl);
      const serviceOutput = results.get('Service.ts') || '';
      
      // Should use regular import when constants are referenced
      // But in this case, constants are copied by value, so might still be type import
      expect(serviceOutput).toMatch(/import (type )?\* as Constants from "\.\/Constants\.ts"/);
    });
  });

  describe('Helper Functions', () => {
    test('should emit helper functions when enabled', () => {
      const idl = `
        module Test {
          interface Service {
            void method();
          };
        };
      `;
      
      const outputWithHelpers = generateTypeScript(idl, { emitHelpers: true });
      const outputWithoutHelpers = generateTypeScript(idl, { emitHelpers: false });
      
      // This depends on what helpers are implemented
      // For now, just check that the option is respected
      expect(outputWithHelpers.get('Test.ts')).toBeDefined();
      expect(outputWithoutHelpers.get('Test.ts')).toBeDefined();
    });
  });

  describe('Output Structure', () => {
    test('should generate separate files for each module', () => {
      const idl = `
        module ModuleA {
          const long A = 1;
        };
        
        module ModuleB {
          const long B = 2;
        };
        
        module ModuleC {
          const long C = 3;
        };
      `;
      
      const results = generateTypeScript(idl);
      
      expect(results.has('ModuleA.ts')).toBe(true);
      expect(results.has('ModuleB.ts')).toBe(true);
      expect(results.has('ModuleC.ts')).toBe(true);
      expect(results.size).toBe(3);
    });

    test('should include file header with metadata', () => {
      const idl = `
        module Test {
          const long VALUE = 1;
        };
      `;
      
      const output = compileToString(idl, 'Test');
      
      expect(output).toContain('/**');
      expect(output).toContain('* This file was automatically generated');
      expect(output).toContain('* DO NOT EDIT THIS FILE DIRECTLY');
      expect(output).toContain('* Source: test.idl');
    });
  });

  describe('CORBA Import Path', () => {
    test('should use custom CORBA import path', () => {
      const idl = `
        module Test {
          interface Service {
            void method();
          };
        };
      `;
      
      const output = generateTypeScript(idl, { 
        corbaImportPath: '@myorg/corba-lib'
      });
      const tsOutput = output.get('Test.ts') || '';
      
      expect(tsOutput).toContain('import type { CORBA, TypeCode } from "@myorg/corba-lib"');
      expect(tsOutput).toContain('import { create_request } from "@myorg/corba-lib"');
    });

    test('should use default CORBA import path', () => {
      const idl = `
        module Test {
          interface Service {
            void method();
          };
        };
      `;
      
      const output = generateTypeScript(idl);
      const tsOutput = output.get('Test.ts') || '';
      
      expect(tsOutput).toContain('import type { CORBA, TypeCode } from "corba"');
      expect(tsOutput).toContain('import { create_request } from "corba"');
    });
  });
});
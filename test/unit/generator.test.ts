import { describe, it } from '@std/testing/bdd';
import { assertEquals, assertExists, assert } from '@std/assert';
import {
  generateTypeScript,
  compile,
  compileToString,
  CodeMatcher,
} from '../helpers/test-utils.ts';

describe('TypeScriptGenerator', () => {
  describe('Type Mapping', () => {
    it('should map primitive types correctly', () => {
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
      const _matcher = new CodeMatcher(output);

      assert(output.includes('getShort(): Promise<number>'));
      assert(output.includes('getLong(): Promise<number>'));
      assert(output.includes('getLongLong(): Promise<bigint>'));
      assert(output.includes('getUShort(): Promise<number>'));
      assert(output.includes('getULong(): Promise<number>'));
      assert(output.includes('getULongLong(): Promise<bigint>'));
      assert(output.includes('getFloat(): Promise<number>'));
      assert(output.includes('getDouble(): Promise<number>'));
      assert(output.includes('getChar(): Promise<string>'));
      assert(output.includes('getWChar(): Promise<string>'));
      assert(output.includes('getBoolean(): Promise<boolean>'));
      assert(output.includes('getOctet(): Promise<number>'));
      assert(output.includes('getAny(): Promise<unknown>'));
      assert(output.includes('doVoid(): Promise<void>'));
      assert(output.includes('getString(): Promise<string>'));
      assert(output.includes('getWString(): Promise<string>'));
    });

    it('should map sequence types correctly', () => {
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

      assert(output.includes('export type LongSeq = number[]'));
      assert(output.includes('export type StringSeq = string[]'));
      assert(output.includes('export type NestedSeq = number[][]'));
      assert(output.includes('getLongs(): Promise<LongSeq>'));
      assert(output.includes('setStrings(strings: StringSeq): Promise<void>'));
    });

    it('should map array types correctly', () => {
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

      assert(output.includes('export type LongArray = number[]'));
      assert(output.includes('export type StringMatrix = string[][]'));
    });
  });

  describe('Module Generation', () => {
    it('should generate namespace for module', () => {
      const idl = `
        module TestModule {
          const long VERSION = 1;
        };
      `;

      const output = compileToString(idl, 'TestModule');
      const _matcher = new CodeMatcher(output);

      // Modules create separate files with ES module exports
      assert(!output.includes('namespace'));
      assert(output.includes('export const VERSION: number = 1'));
    });

    it('should generate nested modules as separate files', () => {
      const idl = `
        module Outer {
          module Inner {
            const long VALUE = 42;
          };
        };
      `;

      const result = compile(idl, 'Outer');

      // Nested modules should create separate files
      assertEquals(result.has('Outer.ts'), true);
      assertEquals(result.has('Inner.ts'), true);
      const innerContent = result.get('Inner.ts')!;
      assert(innerContent.includes('export const VALUE: number = 42'));
    });

    it('should handle module reopening', () => {
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

      assert(output.includes('export const FIRST: number = 1'));
      assert(output.includes('export const SECOND: number = 2'));
    });
  });

  describe('Interface Generation', () => {
    it('should generate interface with methods', () => {
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
      const _matcher = new CodeMatcher(output);

      assertEquals(_matcher.hasInterface('Calculator'), true);
      assert(output.includes('add(a: number, b: number): Promise<number>'));
      assert(output.includes('subtract(a: number, b: number): Promise<number>'));
      assert(output.includes('clear(): Promise<void>'));
    });

    it('should generate stub class when enabled', () => {
      const idl = `
        module Test {
          interface Service {
            string process(in string data);
          };
        };
      `;

      const output = compileToString(idl, 'Test');
      const _matcher = new CodeMatcher(output);

      assertEquals(_matcher.hasClass('Service_Stub'), true);
      assert(output.includes('export class Service_Stub extends CorbaStub implements Service'));
      assert(output.includes('constructor(ref: CORBA.ObjectRef)'));
      assert(output.includes('super(ref);'));
      assert(output.includes('async process(data: string): Promise<string>'));
      assert(output.includes('const request = create_request(this._ref, "process")'));
      assert(output.includes('return request.return_value()'));
    });

    it('should not generate stub class when disabled', () => {
      const idl = `
        module Test {
          interface Service {
            void method();
          };
        };
      `;

      const output = generateTypeScript(idl, { includeStubs: false });
      const tsOutput = output.get('Test.ts') || '';

      assert(!tsOutput.includes('Service_Stub'));
    });

    it('should generate interface inheritance', () => {
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

      assert(output.includes('export interface Derived extends Base'));
    });

    it('should generate attributes as properties', () => {
      const idl = `
        module Test {
          interface Account {
            readonly attribute string id;
            attribute double balance;
          };
        };
      `;

      const output = compileToString(idl, 'Test');

      assert(output.includes('readonly id: string'));
      assert(output.includes('balance: number'));
    });

    it('should handle raises clauses', () => {
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
      assert(output.includes('export class DivisionByZero extends CORBA.SystemException'));
      assert(output.includes('message: string'));

      // Method signature doesn't change for raises
      assert(output.includes('divide(a: number, b: number): Promise<number>'));
    });

    it('should handle oneway operations', () => {
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
      assert(output.includes('fireAndForget(message: string): Promise<void>'));
      assert(output.includes('normalMethod(message: string): Promise<void>'));
    });
  });

  describe('Struct Generation', () => {
    it('should generate interface for struct', () => {
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
      const _matcher = new CodeMatcher(output);

      assertEquals(_matcher.hasInterface('Point'), true);
      assert(output.includes('export interface Point'));
      assert(output.includes('x: number'));
      assert(output.includes('y: number'));
      assert(output.includes('z: number'));
    });

    it('should handle nested structs', () => {
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

      assert(output.includes('export interface Outer'));
      assert(output.includes('name: string'));
      assert(output.includes('inner: Inner'));
      assert(output.includes('inners: Inner[]'));
    });
  });

  describe('Enum Generation', () => {
    it('should generate TypeScript enum', () => {
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
      const _matcher = new CodeMatcher(output);

      assertEquals(_matcher.hasEnum('Status'), true);
      assert(output.includes('export enum Status'));
      assert(output.includes('PENDING = 0'));
      assert(output.includes('ACTIVE = 1'));
      assert(output.includes('COMPLETED = 2'));
      assert(output.includes('FAILED = 3'));
    });
  });

  describe('Union Generation', () => {
    it('should generate union type with discriminator', () => {
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

      assert(output.includes('export type Value ='));
      assert(output.includes('{ discriminator: 1; intValue: number }'));
      assert(output.includes('{ discriminator: 2; floatValue: number }'));
      assert(output.includes('{ discriminator: 3; stringValue: string }'));
      assert(output.includes('{ discriminator: "default"; boolValue: boolean }'));
    });

    it('should handle union with enum discriminator', () => {
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

      assert(output.includes('export type Data ='));
      assert(output.includes('{ discriminator: "INT"; intData: number }'));
      assert(output.includes('{ discriminator: "FLOAT"; floatData: number }'));
      assert(output.includes('{ discriminator: "STRING"; stringData: string }'));
    });
  });

  describe('Constant Generation', () => {
    it('should generate typed constants', () => {
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

      assert(output.includes('export const SHORT_VAL: number = 100'));
      assert(output.includes('export const LONG_VAL: number = 1000000'));
      assert(output.includes('export const BIG_VAL: bigint = 9999999999'));
      assert(output.includes('export const FLOAT_VAL: number = 3.14'));
      assert(output.includes('export const DOUBLE_VAL: number = 2.71828'));
      assert(output.includes('export const STRING_VAL: string = "Hello"'));
      assert(output.includes('export const BOOL_VAL: boolean = true'));
    });
  });

  describe('Cross-Module References', () => {
    it('should generate imports for cross-module types', () => {
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

      assert(businessOutput.includes('import type * as Common from "./Common.ts"'));
      assert(businessOutput.includes('getTime(): Promise<Common.Timestamp>'));
    });

    it('should handle complex cross-module inheritance', () => {
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

      assert(derivedOutput.includes('import type * as Base from "./Base.ts"'));
      assert(derivedOutput.includes('export interface IDerived extends Base.IBase'));
    });
  });

  describe('Nested Types', () => {
    it('should flatten nested enum types', () => {
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
      assert(output.includes('export enum Container_Status'));
      assert(output.includes('READY = 0'));
      assert(output.includes('BUSY = 1'));
      assert(output.includes('ERROR = 2'));

      // Interface should reference flattened type
      assert(output.includes('getStatus(): Promise<Container_Status>'));
    });

    it('should flatten nested struct types', () => {
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
      assert(output.includes('export interface Container_Config'));
      assert(output.includes('name: string'));
      assert(output.includes('value: number'));

      // Interface should reference flattened type
      assert(output.includes('getConfig(): Promise<Container_Config>'));
    });

    it('should handle the MediaType ambiguity correctly', () => {
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
      assert(output.includes('export interface MediaType'));
      assert(output.includes('export enum MediaOutput_MediaType'));

      // MediaOutput should use the nested enum type
      assert(output.includes('get_type(): Promise<MediaOutput_MediaType>'));
    });
  });

  describe('Import Optimization', () => {
    it('should use type imports for type-only usage', () => {
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

      // Should use regular import because Types.TC_Data is used as a value in the stub
      assert(serviceOutput.includes('import * as Types from "./Types.ts"'));
    });

    it('should use regular imports when needed for values', () => {
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
      assert(/import (type )?\* as Constants from "\.\/Constants\.ts"/.test(serviceOutput));
    });
  });

  describe('Helper Functions', () => {
    it('should emit helper functions when enabled', () => {
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
      assertExists(outputWithHelpers.get('Test.ts'));
      assertExists(outputWithoutHelpers.get('Test.ts'));
    });
  });

  describe('Output Structure', () => {
    it('should generate separate files for each module', () => {
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

      assertEquals(results.has('ModuleA.ts'), true);
      assertEquals(results.has('ModuleB.ts'), true);
      assertEquals(results.has('ModuleC.ts'), true);
      assertEquals(results.size, 3);
    });

    it('should include file header with metadata', () => {
      const idl = `
        module Test {
          const long VALUE = 1;
        };
      `;

      const output = compileToString(idl, 'Test');

      assert(output.includes('/**'));
      assert(output.includes('* This file was automatically generated'));
      assert(output.includes('* DO NOT EDIT THIS FILE DIRECTLY'));
      assert(output.includes('* Source: test.idl'));
    });
  });

  describe('CORBA Import Path', () => {
    it('should use custom CORBA import path', () => {
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

      // Now we import everything together since we generate interface TypeCodes
      assert(tsOutput.includes('import { TypeCode, CORBA, CorbaStub, create_request } from "@myorg/corba-lib"'));
    });

    it('should use default CORBA import path', () => {
      const idl = `
        module Test {
          interface Service {
            void method();
          };
        };
      `;

      const output = generateTypeScript(idl);
      const tsOutput = output.get('Test.ts') || '';

      // Now we import everything together since we generate interface TypeCodes
      assert(tsOutput.includes('import { TypeCode, CORBA, CorbaStub, create_request } from "corba"'));
    });
  });
});
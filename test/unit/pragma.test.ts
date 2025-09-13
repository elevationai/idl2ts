import { describe, it, beforeEach } from '@std/testing/bdd';
import { assertEquals, assertExists, assert } from '@std/assert';
import { IDLParser } from '../../src/parser/IDLParser.ts';
import { TypeScriptGenerator } from '../../src/generator/TypeScriptGenerator.ts';

describe('Pragma Directives', () => {
  let parser: IDLParser;
  let generator: TypeScriptGenerator;
  
  beforeEach(() => {
    parser = new IDLParser();
    generator = new TypeScriptGenerator({ includeStubs: true });
  });
  
  describe('#pragma prefix', () => {
    it('should apply prefix to repository IDs', () => {
      const idl = `
#pragma prefix "com.example.test"

module TestModule {
  interface TestInterface {
    void test();
  };
  
  struct TestStruct {
    string field;
  };
};`;
      
      const ast = parser.parse(idl);
      const result = generator.generate(ast);
      
      const moduleCode = result.get('TestModule.ts');
      assertExists(moduleCode);
      
      // Check that repository IDs include the prefix
      assert(moduleCode.includes('IDL:com.example.test/TestModule/TestInterface:1.0'));
      assert(moduleCode.includes('IDL:com.example.test/TestModule/TestStruct:1.0'));
    });
  });
  
  describe('#pragma version', () => {
    it('should apply custom version to specific types', () => {
      const idl = `
#pragma prefix "test.org"
#pragma version TestInterface 2.5

module TestModule {
  interface TestInterface {
    void test();
  };
  
  interface OtherInterface {
    void other();
  };
};`;
      
      const ast = parser.parse(idl);
      const result = generator.generate(ast);
      
      const moduleCode = result.get('TestModule.ts');
      assertExists(moduleCode);
      
      // TestInterface should have version 2.5
      assert(moduleCode.includes('IDL:test.org/TestModule/TestInterface:2.5'));
      
      // OtherInterface should have default version 1.0
      assert(moduleCode.includes('IDL:test.org/TestModule/OtherInterface:1.0'));
    });
  });
  
  describe('#pragma ID', () => {
    it('should use custom repository ID for specific types', () => {
      const idl = `
#pragma prefix "test.org"
#pragma ID CustomInterface "IDL:custom/location/CustomInterface:3.0"

module TestModule {
  interface CustomInterface {
    void test();
  };
  
  interface NormalInterface {
    void test();
  };
};`;
      
      const ast = parser.parse(idl);
      const result = generator.generate(ast);
      
      const moduleCode = result.get('TestModule.ts');
      assertExists(moduleCode);
      
      // CustomInterface should have the custom ID
      assert(moduleCode.includes('IDL:custom/location/CustomInterface:3.0'));
      
      // NormalInterface should use prefix
      assert(moduleCode.includes('IDL:test.org/TestModule/NormalInterface:1.0'));
    });
  });
  
  describe('#pragma inhibit_code_generation', () => {
    it('should not generate code for inhibited types', () => {
      const idl = `
#pragma inhibit_code_generation InhibitedInterface

module TestModule {
  interface InhibitedInterface {
    void neverGenerated();
  };
  
  interface GeneratedInterface {
    void generated();
  };
};`;
      
      const ast = parser.parse(idl);
      const result = generator.generate(ast);
      
      const moduleCode = result.get('TestModule.ts');
      assertExists(moduleCode);
      
      // InhibitedInterface should not be generated
      assert(!moduleCode.includes('interface InhibitedInterface'));
      assert(!moduleCode.includes('class InhibitedInterface_Stub'));
      
      // GeneratedInterface should be generated
      assert(moduleCode.includes('interface GeneratedInterface'));
    });
    
    it('should not generate any code after global inhibit pragma', () => {
      const idl = `
module GeneratedModule {
  interface GeneratedInterface {
    void test();
  };
};

#pragma inhibit_code_generation

module InhibitedModule {
  interface ShouldNotGenerate {
    void test();
  };
};`;
      
      const ast = parser.parse(idl);
      const result = generator.generate(ast);
      
      // GeneratedModule should exist
      assertExists(result.get('GeneratedModule.ts'));
      
      // InhibitedModule should not be generated
      assertEquals(result.get('InhibitedModule.ts'), undefined);
    });
  });
  
  describe('Real-world CUSS IDL', () => {
    it('should handle CUSS1 IDL pragma prefix correctly', () => {
      const idl = `
#pragma prefix "cuss.iata.org"

module Components {
  interface ApplicationManager {
    long level();
  };
};`;
      
      const ast = parser.parse(idl);
      const result = generator.generate(ast);
      
      const moduleCode = result.get('Components.ts');
      assertExists(moduleCode);
      
      // Should generate the exact repository ID the Python server expects
      assert(moduleCode.includes('IDL:cuss.iata.org/Components/ApplicationManager:1.0'));
      assert(moduleCode.includes('static override readonly _repository_id = "IDL:cuss.iata.org/Components/ApplicationManager:1.0"'));
    });
  });
});
import { IDLParser } from '../../src/parser/IDLParser';
import { TypeScriptGenerator } from '../../src/generator/TypeScriptGenerator';
import * as fs from 'fs';
import * as path from 'path';

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
      expect(moduleCode).toBeDefined();
      
      // Check that repository IDs include the prefix
      expect(moduleCode).toContain('IDL:com.example.test/TestModule/TestInterface:1.0');
      expect(moduleCode).toContain('IDL:com.example.test/TestModule/TestStruct:1.0');
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
      expect(moduleCode).toBeDefined();
      
      // TestInterface should have version 2.5
      expect(moduleCode).toContain('IDL:test.org/TestModule/TestInterface:2.5');
      
      // OtherInterface should have default version 1.0
      expect(moduleCode).toContain('IDL:test.org/TestModule/OtherInterface:1.0');
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
      expect(moduleCode).toBeDefined();
      
      // CustomInterface should have the custom ID
      expect(moduleCode).toContain('IDL:custom/location/CustomInterface:3.0');
      
      // NormalInterface should use prefix
      expect(moduleCode).toContain('IDL:test.org/TestModule/NormalInterface:1.0');
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
      expect(moduleCode).toBeDefined();
      
      // InhibitedInterface should not be generated
      expect(moduleCode).not.toContain('interface InhibitedInterface');
      expect(moduleCode).not.toContain('class InhibitedInterface_Stub');
      
      // GeneratedInterface should be generated
      expect(moduleCode).toContain('interface GeneratedInterface');
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
      expect(result.get('GeneratedModule.ts')).toBeDefined();
      
      // InhibitedModule should not be generated
      expect(result.get('InhibitedModule.ts')).toBeUndefined();
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
      expect(moduleCode).toBeDefined();
      
      // Should generate the exact repository ID the Python server expects
      expect(moduleCode).toContain('IDL:cuss.iata.org/Components/ApplicationManager:1.0');
      expect(moduleCode).toContain('static override readonly _repository_id = "IDL:cuss.iata.org/Components/ApplicationManager:1.0"');
    });
  });
});
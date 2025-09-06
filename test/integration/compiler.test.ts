import { IDLCompiler } from '../../src/compiler/IDLCompiler';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('IDLCompiler Integration', () => {
  let tempDir: string;
  
  beforeEach(() => {
    // Create a temp directory for test outputs
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'idl2ts-test-'));
  });
  
  afterEach(() => {
    // Clean up temp directory
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  describe('File Output', () => {
    test('should compile IDL file to TypeScript', () => {
      const idlPath = path.join(tempDir, 'test.idl');
      const idlContent = `
        module TestModule {
          interface TestInterface {
            long testMethod(in string param);
          };
        };
      `;
      
      fs.writeFileSync(idlPath, idlContent);
      
      const compiler = new IDLCompiler({
        outputPath: tempDir,
        includeStubs: true
      });
      
      compiler.compile(idlPath);
      
      const outputFile = path.join(tempDir, 'TestModule.ts');
      expect(fs.existsSync(outputFile)).toBe(true);
      
      const output = fs.readFileSync(outputFile, 'utf-8');
      expect(output).not.toContain('namespace'); // Uses ES modules, not namespaces
      expect(output).toContain('export interface TestInterface');
      expect(output).toContain('testMethod(param: string): Promise<number>');
    });

    test('should generate multiple module files', () => {
      const idlPath = path.join(tempDir, 'multi.idl');
      const idlContent = `
        module ModuleA {
          const long A = 1;
        };
        
        module ModuleB {
          const long B = 2;
        };
      `;
      
      fs.writeFileSync(idlPath, idlContent);
      
      const compiler = new IDLCompiler({
        outputPath: tempDir
      });
      
      compiler.compile(idlPath);
      
      expect(fs.existsSync(path.join(tempDir, 'ModuleA.ts'))).toBe(true);
      expect(fs.existsSync(path.join(tempDir, 'ModuleB.ts'))).toBe(true);
    });
  });

  describe('Include Paths', () => {
    test('should resolve includes from include paths', () => {
      const includeDir = path.join(tempDir, 'includes');
      fs.mkdirSync(includeDir);
      
      // Create included file
      const commonIdl = path.join(includeDir, 'common.idl');
      fs.writeFileSync(commonIdl, `
        module Common {
          struct Timestamp {
            long long value;
          };
        };
      `);
      
      // Create main file that includes common
      const mainIdl = path.join(tempDir, 'main.idl');
      fs.writeFileSync(mainIdl, `
        #include "common.idl"
        
        module Main {
          interface Service {
            ::Common::Timestamp getTime();
          };
        };
      `);
      
      const compiler = new IDLCompiler({
        outputPath: tempDir,
        includePaths: [includeDir]
      });
      
      compiler.compile(mainIdl);
      
      const mainOutput = path.join(tempDir, 'Main.ts');
      const commonOutput = path.join(tempDir, 'Common.ts');
      
      expect(fs.existsSync(mainOutput)).toBe(true);
      expect(fs.existsSync(commonOutput)).toBe(true);
      
      const mainContent = fs.readFileSync(mainOutput, 'utf-8');
      expect(mainContent).toContain('import type * as Common from "./Common.ts"');
      expect(mainContent).toContain('getTime(): Promise<Common.Timestamp>');
    });
  });

  describe('Compiler Options', () => {
    test('should respect includeStubs option', () => {
      const idlPath = path.join(tempDir, 'stubs.idl');
      fs.writeFileSync(idlPath, `
        module Test {
          interface Service {
            void method();
          };
        };
      `);
      
      // With stubs
      const compilerWithStubs = new IDLCompiler({
        outputPath: tempDir,
        includeStubs: true
      });
      compilerWithStubs.compile(idlPath);
      
      const outputWithStubs = fs.readFileSync(
        path.join(tempDir, 'Test.ts'), 
        'utf-8'
      );
      expect(outputWithStubs).toContain('Service_Stub');
      
      // Without stubs
      const compilerWithoutStubs = new IDLCompiler({
        outputPath: tempDir,
        includeStubs: false
      });
      compilerWithoutStubs.compile(idlPath);
      
      const outputWithoutStubs = fs.readFileSync(
        path.join(tempDir, 'Test.ts'), 
        'utf-8'
      );
      expect(outputWithoutStubs).not.toContain('Service_Stub');
    });

    test('should use custom CORBA import path', () => {
      const idlPath = path.join(tempDir, 'corba.idl');
      fs.writeFileSync(idlPath, `
        module Test {
          interface Service {
            void method();
          };
        };
      `);
      
      const compiler = new IDLCompiler({
        outputPath: tempDir,
        corbaImportPath: '@myorg/corba',
        includeStubs: true
      });
      
      compiler.compile(idlPath);
      
      const output = fs.readFileSync(
        path.join(tempDir, 'Test.ts'), 
        'utf-8'
      );
      
      expect(output).toContain('import type { TypeCode } from "@myorg/corba"');
      expect(output).toContain('import { CORBA, CorbaStub, create_request } from "@myorg/corba"');
    });
  });

  describe('Complex Scenarios', () => {
    test('should compile complex IDL with cross-module references', () => {
      const idlPath = path.join(tempDir, 'complex.idl');
      const idlContent = `
        module Common {
          struct Address {
            string street;
            string city;
            string country;
          };
          
          enum AccountType {
            CHECKING,
            SAVINGS,
            BUSINESS
          };
          
          typedef sequence<string> StringList;
        };
        
        module Banking {
          exception InsufficientFunds {
            double requested;
            double available;
          };
          
          interface Account {
            readonly attribute string id;
            attribute double balance;
            attribute ::Common::AccountType type;
            
            void deposit(in double amount);
            void withdraw(in double amount) raises (InsufficientFunds);
            ::Common::Address getAddress();
            void setTags(in ::Common::StringList tags);
          };
          
          interface Bank {
            Account createAccount(
              in string customerName, 
              in ::Common::AccountType type,
              in ::Common::Address address
            );
            
            sequence<Account> findAccounts(in ::Common::AccountType type);
          };
        };
      `;
      
      fs.writeFileSync(idlPath, idlContent);
      
      const compiler = new IDLCompiler({
        outputPath: tempDir,
        includeStubs: true
      });
      
      compiler.compile(idlPath);
      
      // Check Common module
      const commonOutput = fs.readFileSync(
        path.join(tempDir, 'Common.ts'), 
        'utf-8'
      );
      expect(commonOutput).toContain('export interface Address');
      expect(commonOutput).toContain('export enum AccountType');
      expect(commonOutput).toContain('export type StringList = string[]');
      
      // Check Banking module
      const bankingOutput = fs.readFileSync(
        path.join(tempDir, 'Banking.ts'), 
        'utf-8'
      );
      expect(bankingOutput).toContain('import type * as Common from "./Common.ts"');
      expect(bankingOutput).toContain('export class InsufficientFunds extends CORBA.SystemException');
      expect(bankingOutput).toContain('export interface Account');
      expect(bankingOutput).toContain('export interface Bank');
      expect(bankingOutput).toContain('export class Account_Stub');
      expect(bankingOutput).toContain('export class Bank_Stub');
      
      // Check cross-module type usage
      expect(bankingOutput).toContain('type: Common.AccountType');
      expect(bankingOutput).toContain('getAddress(): Promise<Common.Address>');
      expect(bankingOutput).toContain('setTags(tags: Common.StringList): Promise<void>');
      expect(bankingOutput).toContain(
        'createAccount(customerName: string, type: Common.AccountType, address: Common.Address): Promise<Account>'
      );
    });

    test('should handle nested interface types correctly', () => {
      const idlPath = path.join(tempDir, 'nested.idl');
      const idlContent = `
        module Test {
          interface Container {
            enum Status { 
              IDLE, 
              RUNNING, 
              STOPPED 
            };
            
            struct Config {
              string name;
              long timeout;
              Status status;
            };
            
            exception ConfigError {
              string field;
              string message;
            };
            
            typedef sequence<Config> ConfigList;
            
            Status getStatus();
            Config getConfig();
            void setConfig(in Config config) raises (ConfigError);
            ConfigList getAllConfigs();
          };
          
          interface Manager {
            ::Test::Container::Status getContainerStatus();
            ::Test::Container::Config getContainerConfig();
          };
        };
      `;
      
      fs.writeFileSync(idlPath, idlContent);
      
      const compiler = new IDLCompiler({
        outputPath: tempDir,
        includeStubs: true
      });
      
      compiler.compile(idlPath);
      
      const output = fs.readFileSync(
        path.join(tempDir, 'Test.ts'), 
        'utf-8'
      );
      
      // Check flattened nested types
      expect(output).toContain('export enum Container_Status');
      expect(output).toContain('export interface Container_Config');
      expect(output).toContain('export class Container_ConfigError extends CORBA.SystemException');
      expect(output).toContain('export type Container_ConfigList = Container_Config[]');
      
      // Check Container interface uses flattened types
      expect(output).toContain('getStatus(): Promise<Container_Status>');
      expect(output).toContain('getConfig(): Promise<Container_Config>');
      expect(output).toContain('setConfig(config: Container_Config): Promise<void>');
      expect(output).toContain('getAllConfigs(): Promise<Container_ConfigList>');
      
      // Check Manager interface uses flattened types
      expect(output).toContain('getContainerStatus(): Promise<Container_Status>');
      expect(output).toContain('getContainerConfig(): Promise<Container_Config>');
    });

    test('should resolve MediaType-style ambiguity correctly', () => {
      const idlPath = path.join(tempDir, 'ambiguity.idl');
      const idlContent = `
        module Media {
          // Top-level interface named MediaType
          interface MediaType {
            string getMimeType();
            long getSize();
          };
          
          // Interface with nested enum also named MediaType
          interface MediaOutput {
            enum MediaType { 
              AUDIO, 
              VIDEO, 
              IMAGE,
              DATA 
            };
            
            struct MediaInfo {
              MediaType type;
              string format;
            };
            
            MediaType get_type();
            void set_type(in MediaType type);
            MediaInfo get_info();
          };
          
          // Another interface that uses both
          interface MediaProcessor {
            // Should use the top-level interface
            MediaType processMedia(in MediaType media);
            
            // Should use the nested enum
            ::Media::MediaOutput::MediaType getOutputType();
          };
        };
      `;
      
      fs.writeFileSync(idlPath, idlContent);
      
      const compiler = new IDLCompiler({
        outputPath: tempDir,
        includeStubs: true
      });
      
      compiler.compile(idlPath);
      
      const output = fs.readFileSync(
        path.join(tempDir, 'Media.ts'), 
        'utf-8'
      );
      
      // Should have both types
      expect(output).toContain('export interface MediaType');
      expect(output).toContain('export enum MediaOutput_MediaType');
      
      // MediaOutput interface should use nested enum
      expect(output).toContain('get_type(): Promise<MediaOutput_MediaType>');
      expect(output).toContain('set_type(type: MediaOutput_MediaType): Promise<void>');
      
      // MediaInfo struct should use nested enum
      expect(output).toContain('export interface MediaOutput_MediaInfo');
      expect(output).toContain('type: MediaOutput_MediaType');
      
      // MediaProcessor should use appropriate types
      expect(output).toContain('processMedia(media: MediaOutput_MediaType): Promise<MediaOutput_MediaType>');
      expect(output).toContain('getOutputType(): Promise<MediaOutput_MediaType>');
    });
  });

  describe('Error Recovery', () => {
    test('should handle empty IDL file gracefully', () => {
      const idlPath = path.join(tempDir, 'empty.idl');
      fs.writeFileSync(idlPath, '');
      
      const compiler = new IDLCompiler({
        outputPath: tempDir
      });
      
      // Should not throw
      expect(() => compiler.compile(idlPath)).not.toThrow();
    });

    test('should handle IDL with only comments', () => {
      const idlPath = path.join(tempDir, 'comments.idl');
      fs.writeFileSync(idlPath, `
        // This is a comment
        /* This is a 
           multi-line comment */
        // Another comment
      `);
      
      const compiler = new IDLCompiler({
        outputPath: tempDir
      });
      
      expect(() => compiler.compile(idlPath)).not.toThrow();
    });
  });

  describe('Real-world Examples', () => {
    test.skip('should compile CORBA-style service definition', () => {
      const idlPath = path.join(tempDir, 'service.idl');
      const idlContent = `
        #pragma prefix "com.example"
        
        module Services {
          module Auth {
            struct Credentials {
              string username;
              string password;
            };
            
            struct Token {
              string value;
              long long expiresAt;
            };
            
            exception AuthenticationFailed {
              string reason;
            };
            
            exception TokenExpired {
              long long expiredAt;
            };
            
            interface AuthService {
              Token login(in Credentials creds) 
                raises (AuthenticationFailed);
              
              boolean validateToken(in Token token)
                raises (TokenExpired);
              
              void logout(in Token token);
              
              oneway void logActivity(in string activity);
            };
          };
          
          module User {
            struct Profile {
              string id;
              string name;
              string email;
              ::Services::Auth::Token authToken;
            };
            
            exception UserNotFound {
              string userId;
            };
            
            exception InvalidProfile {
              string field;
              string message;
            };
            
            interface UserService {
              Profile getProfile(in string userId)
                raises (UserNotFound, ::Services::Auth::TokenExpired);
              
              void updateProfile(in Profile profile)
                raises (InvalidProfile, ::Services::Auth::TokenExpired);
              
              sequence<Profile> searchProfiles(in string query)
                raises (::Services::Auth::TokenExpired);
            };
          };
        };
      `;
      
      fs.writeFileSync(idlPath, idlContent);
      
      const compiler = new IDLCompiler({
        outputPath: tempDir,
        includeStubs: true,
        corbaImportPath: '@example/corba'
      });
      
      compiler.compile(idlPath);
      
      // Check Auth module
      const authPath = path.join(tempDir, 'Services.ts');
      expect(fs.existsSync(authPath)).toBe(true);
      
      const authOutput = fs.readFileSync(authPath, 'utf-8');
      
      // Check nested namespace structure
      expect(authOutput).toContain('export namespace Services');
      expect(authOutput).toContain('export namespace Auth');
      expect(authOutput).toContain('export namespace User');
      
      // Check Auth types
      expect(authOutput).toContain('export interface Credentials');
      expect(authOutput).toContain('export interface Token');
      expect(authOutput).toContain('export interface AuthenticationFailed');
      expect(authOutput).toContain('export interface AuthService');
      expect(authOutput).toContain('export class AuthService_Stub');
      
      // Check User types
      expect(authOutput).toContain('export interface Profile');
      expect(authOutput).toContain('authToken: Auth.Token');
      expect(authOutput).toContain('export interface UserService');
      expect(authOutput).toContain('export class UserService_Stub');
      
      // Check CORBA import
      expect(authOutput).toContain('import type { CORBA } from "@example/corba"');
    });
  });
});
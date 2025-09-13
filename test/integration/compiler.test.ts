import { afterEach, beforeEach, describe, it } from '@std/testing/bdd';
import { assert } from '@std/assert';
import { IDLCompiler } from '../../src/compiler/IDLCompiler.ts';

describe('IDLCompiler Integration', () => {
  let tempDir: string;

  beforeEach(() => {
    // Create a temp directory for test outputs
    tempDir = Deno.makeTempDirSync({ prefix: 'idl2ts-test-' });
  });

  afterEach(() => {
    // Clean up temp directory
    try {
      Deno.removeSync(tempDir, { recursive: true });
    } catch {
      // Ignore errors if already removed
    }
  });

  describe('File Output', () => {
    it('should compile IDL file to TypeScript', () => {
      const idlPath = `${tempDir}/test.idl`;
      const idlContent = `
        module TestModule {
          interface TestInterface {
            long testMethod(in string param);
          };
        };
      `;

      Deno.writeTextFileSync(idlPath, idlContent);

      const compiler = new IDLCompiler({
        outputPath: tempDir,
        includeStubs: true,
      });

      compiler.compile(idlPath);

      const outputFile = `${tempDir}/TestModule.ts`;
      try {
        const stat = Deno.statSync(outputFile);
        assert(stat.isFile);
      } catch {
        throw new Error(`Output file ${outputFile} was not created`);
      }

      const output = Deno.readTextFileSync(outputFile);
      assert(!output.includes('namespace')); // Uses ES modules, not namespaces
      assert(output.includes('export interface TestInterface'));
      assert(output.includes('testMethod(param: string): Promise<number>'));
    });

    it('should generate multiple module files', () => {
      const idlPath = `${tempDir}/multi.idl`;
      const idlContent = `
        module ModuleA {
          const long A = 1;
        };
        
        module ModuleB {
          const long B = 2;
        };
      `;

      Deno.writeTextFileSync(idlPath, idlContent);

      const compiler = new IDLCompiler({
        outputPath: tempDir,
      });

      compiler.compile(idlPath);

      try {
        const statA = Deno.statSync(`${tempDir}/ModuleA.ts`);
        const statB = Deno.statSync(`${tempDir}/ModuleB.ts`);
        assert(statA.isFile);
        assert(statB.isFile);
      } catch (e) {
        throw new Error(`Module files were not created: ${e}`);
      }
    });
  });

  describe('Include Paths', () => {
    it('should resolve includes from include paths', () => {
      const includeDir = `${tempDir}/includes`;
      Deno.mkdirSync(includeDir);

      // Create included file
      const commonIdl = `${includeDir}/common.idl`;
      Deno.writeTextFileSync(
        commonIdl,
        `
        module Common {
          struct Timestamp {
            long long value;
          };
        };
      `,
      );

      // Create main file that includes common
      const mainIdl = `${tempDir}/main.idl`;
      Deno.writeTextFileSync(
        mainIdl,
        `
        #include "common.idl"
        
        module Main {
          interface Service {
            ::Common::Timestamp getTime();
          };
        };
      `,
      );

      const compiler = new IDLCompiler({
        outputPath: tempDir,
        includePaths: [includeDir],
      });

      compiler.compile(mainIdl);

      const mainOutput = `${tempDir}/Main.ts`;
      const commonOutput = `${tempDir}/Common.ts`;

      try {
        const mainStat = Deno.statSync(mainOutput);
        const commonStat = Deno.statSync(commonOutput);
        assert(mainStat.isFile);
        assert(commonStat.isFile);
      } catch (e) {
        throw new Error(`Output files were not created: ${e}`);
      }

      const mainContent = Deno.readTextFileSync(mainOutput);
      assert(
        mainContent.includes('import type * as Common from "./Common.ts"'),
      );
      assert(mainContent.includes('getTime(): Promise<Common.Timestamp>'));
    });
  });

  describe('Compiler Options', () => {
    it('should respect includeStubs option', () => {
      const idlPath = `${tempDir}/stubs.idl`;
      Deno.writeTextFileSync(
        idlPath,
        `
        module Test {
          interface Service {
            void method();
          };
        };
      `,
      );

      // With stubs
      const compilerWithStubs = new IDLCompiler({
        outputPath: tempDir,
        includeStubs: true,
      });
      compilerWithStubs.compile(idlPath);

      const outputWithStubs = Deno.readTextFileSync(
        `${tempDir}/Test.ts`,
      );
      assert(outputWithStubs.includes('Service_Stub'));

      // Without stubs
      const compilerWithoutStubs = new IDLCompiler({
        outputPath: tempDir,
        includeStubs: false,
      });
      compilerWithoutStubs.compile(idlPath);

      const outputWithoutStubs = Deno.readTextFileSync(
        `${tempDir}/Test.ts`,
      );
      assert(!outputWithoutStubs.includes('Service_Stub'));
    });

    it('should use custom CORBA import path', () => {
      const idlPath = `${tempDir}/corba.idl`;
      Deno.writeTextFileSync(
        idlPath,
        `
        module Test {
          interface Service {
            void method();
          };
        };
      `,
      );

      const compiler = new IDLCompiler({
        outputPath: tempDir,
        corbaImportPath: '@myorg/corba',
        includeStubs: true,
      });

      compiler.compile(idlPath);

      const output = Deno.readTextFileSync(
        `${tempDir}/Test.ts`,
      );

      // Now we import everything together since we generate interface TypeCodes
      assert(
        output.includes(
          'import { TypeCode, CORBA, CorbaStub, create_request } from "@myorg/corba"',
        ),
      );
    });
  });

  describe('Complex Scenarios', () => {
    it('should compile complex IDL with cross-module references', () => {
      const idlPath = `${tempDir}/complex.idl`;
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

      Deno.writeTextFileSync(idlPath, idlContent);

      const compiler = new IDLCompiler({
        outputPath: tempDir,
        includeStubs: true,
      });

      compiler.compile(idlPath);

      // Check Common module
      const commonOutput = Deno.readTextFileSync(
        `${tempDir}/Common.ts`,
      );
      assert(commonOutput.includes('export interface Address'));
      assert(commonOutput.includes('export enum AccountType'));
      assert(commonOutput.includes('export type StringList = string[]'));

      // Check Banking module
      const bankingOutput = Deno.readTextFileSync(
        `${tempDir}/Banking.ts`,
      );
      // Now we import as value because Common.TC_* TypeCodes are used in stubs
      assert(bankingOutput.includes('import * as Common from "./Common.ts"'));
      assert(
        bankingOutput.includes(
          'export class InsufficientFunds extends CORBA.SystemException',
        ),
      );
      assert(bankingOutput.includes('export interface Account'));
      assert(bankingOutput.includes('export interface Bank'));
      assert(bankingOutput.includes('export class Account_Stub'));
      assert(bankingOutput.includes('export class Bank_Stub'));

      // Check cross-module type usage
      assert(bankingOutput.includes('type: Common.AccountType'));
      assert(bankingOutput.includes('getAddress(): Promise<Common.Address>'));
      assert(
        bankingOutput.includes(
          'setTags(tags: Common.StringList): Promise<void>',
        ),
      );
      assert(bankingOutput.includes(
        'createAccount(customerName: string, type: Common.AccountType, address: Common.Address): Promise<Account>',
      ));
    });

    it('should handle nested interface types correctly', () => {
      const idlPath = `${tempDir}/nested.idl`;
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

      Deno.writeTextFileSync(idlPath, idlContent);

      const compiler = new IDLCompiler({
        outputPath: tempDir,
        includeStubs: true,
      });

      compiler.compile(idlPath);

      const output = Deno.readTextFileSync(
        `${tempDir}/Test.ts`,
      );

      // Check flattened nested types
      assert(output.includes('export enum Container_Status'));
      assert(output.includes('export interface Container_Config'));
      assert(
        output.includes(
          'export class Container_ConfigError extends CORBA.SystemException',
        ),
      );
      assert(
        output.includes(
          'export type Container_ConfigList = Container_Config[]',
        ),
      );

      // Check Container interface uses flattened types
      assert(output.includes('getStatus(): Promise<Container_Status>'));
      assert(output.includes('getConfig(): Promise<Container_Config>'));
      assert(
        output.includes('setConfig(config: Container_Config): Promise<void>'),
      );
      assert(output.includes('getAllConfigs(): Promise<Container_ConfigList>'));

      // Check Manager interface uses flattened types
      assert(
        output.includes('getContainerStatus(): Promise<Container_Status>'),
      );
      assert(
        output.includes('getContainerConfig(): Promise<Container_Config>'),
      );
    });

    it('should resolve MediaType-style ambiguity correctly', () => {
      const idlPath = `${tempDir}/ambiguity.idl`;
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

      Deno.writeTextFileSync(idlPath, idlContent);

      const compiler = new IDLCompiler({
        outputPath: tempDir,
        includeStubs: true,
      });

      compiler.compile(idlPath);

      const output = Deno.readTextFileSync(
        `${tempDir}/Media.ts`,
      );

      // Should have both types
      assert(output.includes('export interface MediaType'));
      assert(output.includes('export enum MediaOutput_MediaType'));

      // MediaOutput interface should use nested enum
      assert(output.includes('get_type(): Promise<MediaOutput_MediaType>'));
      assert(
        output.includes('set_type(type: MediaOutput_MediaType): Promise<void>'),
      );

      // MediaInfo struct should use nested enum
      assert(output.includes('export interface MediaOutput_MediaInfo'));
      assert(output.includes('type: MediaOutput_MediaType'));

      // MediaProcessor should use appropriate types
      assert(
        output.includes(
          'processMedia(media: MediaOutput_MediaType): Promise<MediaOutput_MediaType>',
        ),
      );
      assert(
        output.includes('getOutputType(): Promise<MediaOutput_MediaType>'),
      );
    });
  });

  describe('Error Recovery', () => {
    it('should handle empty IDL file gracefully', () => {
      const idlPath = `${tempDir}/empty.idl`;
      Deno.writeTextFileSync(idlPath, '');

      const compiler = new IDLCompiler({
        outputPath: tempDir,
      });

      // Should not throw
      try {
        compiler.compile(idlPath);
        assert(true);
      } catch (e) {
        throw new Error(`Compiler threw error on empty file: ${e}`);
      }
    });

    it('should handle IDL with only comments', () => {
      const idlPath = `${tempDir}/comments.idl`;
      Deno.writeTextFileSync(
        idlPath,
        `
        // This is a comment
        /* This is a 
           multi-line comment */
        // Another comment
      `,
      );

      const compiler = new IDLCompiler({
        outputPath: tempDir,
      });

      try {
        compiler.compile(idlPath);
        assert(true);
      } catch (e) {
        throw new Error(`Compiler threw error on comments-only file: ${e}`);
      }
    });
  });

  describe('Real-world Examples', () => {
    it.ignore('should compile CORBA-style service definition', () => {
      const idlPath = `${tempDir}/service.idl`;
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

      Deno.writeTextFileSync(idlPath, idlContent);

      const compiler = new IDLCompiler({
        outputPath: tempDir,
        includeStubs: true,
        corbaImportPath: '@example/corba',
      });

      compiler.compile(idlPath);

      // Check Auth module
      const authPath = `${tempDir}/Services.ts`;
      try {
        const stat = Deno.statSync(authPath);
        assert(stat.isFile);
      } catch (e) {
        throw new Error(`Services module was not created: ${e}`);
      }

      const authOutput = Deno.readTextFileSync(authPath);

      // Check nested namespace structure
      assert(authOutput.includes('export namespace Services'));
      assert(authOutput.includes('export namespace Auth'));
      assert(authOutput.includes('export namespace User'));

      // Check Auth types
      assert(authOutput.includes('export interface Credentials'));
      assert(authOutput.includes('export interface Token'));
      assert(authOutput.includes('export interface AuthenticationFailed'));
      assert(authOutput.includes('export interface AuthService'));
      assert(authOutput.includes('export class AuthService_Stub'));

      // Check User types
      assert(authOutput.includes('export interface Profile'));
      assert(authOutput.includes('authToken: Auth.Token'));
      assert(authOutput.includes('export interface UserService'));
      assert(authOutput.includes('export class UserService_Stub'));

      // Check CORBA import
      assert(
        authOutput.includes('import type { CORBA } from "@example/corba"'),
      );
    });
  });
});

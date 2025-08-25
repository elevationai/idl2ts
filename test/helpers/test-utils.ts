import { IDLParser } from '../../src/parser/IDLParser';
import { TypeScriptGenerator } from '../../src/generator/TypeScriptGenerator';
import { IDLCompiler } from '../../src/compiler/IDLCompiler';
import * as AST from '../../src/ast/nodes';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Helper to parse IDL string and return AST
 */
export function parseIDL(idl: string): AST.SpecificationNode {
  const parser = new IDLParser();
  return parser.parse(idl);
}

/**
 * Helper to generate TypeScript from IDL string
 */
export function generateTypeScript(
  idl: string, 
  options: Partial<{
    includeStubs: boolean;
    includeSkeletons: boolean;
    emitHelpers: boolean;
    corbaImportPath: string;
  }> = {}
): Map<string, string> {
  const ast = parseIDL(idl);
  const generator = new TypeScriptGenerator({
    includeStubs: options.includeStubs ?? true,
    includeSkeletons: options.includeSkeletons ?? false,
    emitHelpers: options.emitHelpers ?? true,
    corbaImportPath: options.corbaImportPath ?? 'corba',
    sourceFile: 'test.idl'
  });
  return generator.generate(ast);
}

/**
 * Helper to compile IDL and return all generated files
 */
export function compile(idl: string, sourceFile: string = 'test.idl'): Map<string, string> {
  const ast = parseIDL(idl);
  const generator = new TypeScriptGenerator({
    includeStubs: true,
    includeSkeletons: false,
    emitHelpers: true,
    corbaImportPath: 'corba',
    sourceFile
  });
  return generator.generate(ast);
}

/**
 * Helper to compile IDL and get the main module output
 */
export function compileToString(idl: string, moduleName: string = 'test'): string {
  const result = generateTypeScript(idl);
  return result.get(`${moduleName}.ts`) || '';
}

/**
 * Helper to normalize whitespace for comparison
 */
export function normalizeWhitespace(str: string): string {
  return str
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .join('\n');
}

/**
 * Helper to extract specific constructs from generated code
 */
export function extractInterface(code: string, interfaceName: string): string | null {
  const regex = new RegExp(`export interface ${interfaceName}[^{]*{[^}]*}`, 'g');
  const match = code.match(regex);
  return match ? match[0] : null;
}

export function extractClass(code: string, className: string): string | null {
  const regex = new RegExp(`export class ${className}[^{]*{[\\s\\S]*?^  }`, 'gm');
  const match = code.match(regex);
  return match ? match[0] : null;
}

export function extractEnum(code: string, enumName: string): string | null {
  const regex = new RegExp(`export enum ${enumName}[^{]*{[^}]*}`, 'g');
  const match = code.match(regex);
  return match ? match[0] : null;
}

/**
 * Helper to load test fixtures
 */
export function loadFixture(name: string): string {
  const fixturePath = path.join(__dirname, '..', 'fixtures', name);
  return fs.readFileSync(fixturePath, 'utf-8');
}

/**
 * Helper to create a test compiler instance
 */
export function createTestCompiler(options: any = {}): IDLCompiler {
  return new IDLCompiler({
    includeStubs: true,
    includeSkeletons: false,
    emitHelpers: true,
    verbose: false,
    ...options
  });
}

/**
 * Helper to check if generated code contains expected elements
 */
export class CodeMatcher {
  constructor(private code: string) {}

  hasInterface(name: string): boolean {
    return new RegExp(`export interface ${name}`).test(this.code);
  }

  hasClass(name: string): boolean {
    return new RegExp(`export class ${name}`).test(this.code);
  }

  hasEnum(name: string): boolean {
    return new RegExp(`export enum ${name}`).test(this.code);
  }

  hasMethod(interfaceName: string, methodName: string): boolean {
    const interfaceContent = extractInterface(this.code, interfaceName);
    if (!interfaceContent) return false;
    return new RegExp(`${methodName}\\s*\\(`).test(interfaceContent);
  }

  hasImport(module: string): boolean {
    return new RegExp(`import.*from ['"]${module}['"]`).test(this.code);
  }

  hasConstant(name: string): boolean {
    return new RegExp(`export const ${name}`).test(this.code);
  }

  hasType(name: string): boolean {
    return new RegExp(`export type ${name}`).test(this.code);
  }

  hasNamespace(name: string): boolean {
    return new RegExp(`export namespace ${name}`).test(this.code);
  }
}

/**
 * Helper to validate AST nodes
 */
export function validateASTNode(node: any, expectedKind: string): void {
  expect(node).toBeDefined();
  expect(node.kind).toBe(expectedKind);
}

/**
 * Find a definition in AST by name
 */
export function findDefinition(
  ast: AST.SpecificationNode, 
  name: string
): AST.DefinitionNode | undefined {
  return ast.definitions.find((def: any) => def.name === name);
}

/**
 * Find a member in a module or interface
 */
export function findMember(
  container: any, 
  memberName: string
): any {
  // Modules use 'definitions', interfaces use 'members'
  const collection = container.definitions || container.members;
  if (!collection) return undefined;
  return collection.find((m: any) => m.name === memberName);
}
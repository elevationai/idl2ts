import { describe, it } from '@std/testing/bdd';
import { assertEquals, assertExists } from '@std/assert';
import { IDLParser } from '../src/parser/IDLParser.ts';
import * as AST from '../src/ast/nodes.ts';

// Helper functions
function parseIDL(idl: string): AST.SpecificationNode {
  const parser = new IDLParser();
  return parser.parse(idl);
}

function findDefinition(
  ast: AST.SpecificationNode,
  name: string,
): AST.DefinitionNode | undefined {
  return ast.definitions.find((def) =>
    (def as AST.DefinitionNode & { name: string }).name === name
  );
}

function findMember(
  container: AST.ModuleNode | AST.InterfaceNode,
  memberName: string,
): AST.DefinitionNode | AST.InterfaceMemberNode | undefined {
  const collection = container.kind === 'module'
    ? container.definitions
    : container.members;
  if (!collection) return undefined;
  return collection.find((m) => (m as { name: string }).name === memberName);
}

describe('IDLParser', () => {
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

  it('should parse simple module', () => {
    const idl = `
      module TestModule {
        const long VERSION = 1;
      };
    `;

    const ast = parseIDL(idl);
    assertExists(ast);
    assertEquals(ast.kind, 'specification');

    const module = findDefinition(ast, 'TestModule') as AST.ModuleNode;
    assertExists(module);
    assertEquals(module.kind, 'module');
    assertEquals(module.name, 'TestModule');
  });

  it('should parse interface with operations', () => {
    const idl = `
      interface Calculator {
        long add(in long a, in long b);
        long subtract(in long a, in long b);
        double divide(in double a, in double b) raises (DivisionByZero);
      };
    `;

    const ast = parseIDL(idl);
    const iface = findDefinition(ast, 'Calculator') as AST.InterfaceNode;

    assertExists(iface);
    assertEquals(iface.kind, 'interface');
    assertEquals(iface.members.length, 3);

    const addOp = iface.members[0] as AST.OperationNode;
    assertEquals(addOp.kind, 'operation');
    assertEquals(addOp.name, 'add');
    assertEquals(addOp.parameters.length, 2);
  });

  it('should parse enum', () => {
    const idl = `
      enum Color {
        RED,
        GREEN,
        BLUE
      };
    `;

    const ast = parseIDL(idl);
    const enumDef = findDefinition(ast, 'Color') as AST.EnumNode;

    assertExists(enumDef);
    assertEquals(enumDef.kind, 'enum');
    assertEquals(enumDef.members.length, 3);
    assertEquals(enumDef.members[0], 'RED');
    assertEquals(enumDef.members[1], 'GREEN');
    assertEquals(enumDef.members[2], 'BLUE');
  });

  it('should parse struct', () => {
    const idl = `
      struct Point {
        long x;
        long y;
        long z;
      };
    `;

    const ast = parseIDL(idl);
    const struct = findDefinition(ast, 'Point') as AST.StructNode;

    assertExists(struct);
    assertEquals(struct.kind, 'struct');
    assertEquals(struct.members.length, 3);

    const xMember = struct.members[0];
    assertEquals(xMember.name, 'x');
    assertEquals(xMember.type.kind, 'primitiveType');
  });
});

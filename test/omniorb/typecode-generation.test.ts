/**
 * Tests TypeCode generation from idl2ts
 * Converted from OmniORB typecodeTest/typecodeParse.cc
 *
 * Tests that idl2ts correctly generates TypeCode constants for IDL types
 */

import { assertEquals, assertExists } from "@std/assert";
import { IDLCompiler } from "../../src/compiler/IDLCompiler.ts";

Deno.test("TypeCode generation - struct with TypeCode member", () => {
  const idl = `
#include <orb.idl>

struct typeStruct {
  long a;
  CORBA::TypeCode tc;
  double b;
};
`;

  const compiler = new IDLCompiler({ includeStubs: true });
  const result = compiler.compileString(idl, "test.idl");

  // Get the generated TypeScript code
  const tsCode = result.get("index.ts");
  assertExists(tsCode, "Should generate TypeScript file");

  // Verify struct interface is generated
  assertEquals(tsCode.includes("export interface typeStruct {"), true, "Should generate struct interface");
  assertEquals(tsCode.includes("a: number;"), true, "Should have 'a' member");
  assertEquals(tsCode.includes("tc: CORBA.TypeCode;"), true, "Should have 'tc' member as CORBA.TypeCode");
  assertEquals(tsCode.includes("b: number;"), true, "Should have 'b' member");

  assertEquals(
    tsCode.includes("export const TC_typeStruct: TypeCode = TypeCode.create_struct_tc("),
    true,
    "Should generate TC_typeStruct constant",
  );
  assertEquals(/"IDL:[^"]+"/.test(tsCode), true, "Should have a repository ID");
});

Deno.test("TypeCode generation - enum", () => {
  const idl = `
enum testUnionEnum { G, H, I };
`;

  const compiler = new IDLCompiler({ includeStubs: true });
  const result = compiler.compileString(idl, "test.idl");

  const tsCode = result.get("index.ts");
  assertExists(tsCode, "Should generate TypeScript file");

  // Verify enum is generated
  assertEquals(tsCode.includes("export enum testUnionEnum {"), true, "Should generate enum");
  assertEquals(tsCode.includes("G = 0,"), true, "Should have G = 0");
  assertEquals(tsCode.includes("H = 1,"), true, "Should have H = 1");
  assertEquals(tsCode.includes("I = 2,"), true, "Should have I = 2");

  assertEquals(
    tsCode.includes("export const TC_testUnionEnum: TypeCode = TypeCode.create_enum_tc("),
    true,
    "Should generate TC_testUnionEnum constant",
  );
  assertEquals(/"IDL:[^"]+"/.test(tsCode), true, "Should have a repository ID");
  assertEquals(tsCode.includes('["G", "H", "I"]'), true, "Should have enum member names");
});

Deno.test("TypeCode generation - union", () => {
  const idl = `
enum Color { RED, GREEN, BLUE };

union MyUnion switch(Color) {
  case RED: long redValue;
  case GREEN: string greenValue;
  case BLUE: double blueValue;
};
`;

  const compiler = new IDLCompiler({ includeStubs: true });
  const result = compiler.compileString(idl, "test.idl");

  const tsCode = result.get("index.ts");
  assertExists(tsCode, "Should generate TypeScript file");

  // Verify union type is generated
  assertEquals(tsCode.includes("export type MyUnion ="), true, "Should generate union type");

  assertEquals(
    tsCode.includes("export const TC_MyUnion: TypeCode = TypeCode.create_union_tc("),
    true,
    "Should generate TC_MyUnion constant",
  );
  assertEquals(/"IDL:[^"]+"/.test(tsCode), true, "Should have a repository ID");
});

Deno.test("TypeCode generation - sequences", () => {
  const idl = `
typedef sequence<long> LongSeq;
typedef sequence<string, 10> BoundedStringSeq;
`;

  const compiler = new IDLCompiler({ includeStubs: true });
  const result = compiler.compileString(idl, "test.idl");

  const tsCode = result.get("index.ts");
  assertExists(tsCode, "Should generate TypeScript file");

  // Verify sequence types are generated
  assertEquals(tsCode.includes("export type LongSeq = number[];"), true, "Should generate LongSeq type");
  assertEquals(tsCode.includes("export type BoundedStringSeq = string[];"), true, "Should generate BoundedStringSeq type");

  // Verify TypeCode constants are generated with proper alias TypeCodes
  assertEquals(
    tsCode.includes("export const TC_LongSeq: TypeCode = TypeCode.create_alias_tc("),
    true,
    "Should generate TC_LongSeq using create_alias_tc",
  );
  assertEquals(
    tsCode.includes('"LongSeq",'),
    true,
    "TC_LongSeq should include the typedef name",
  );
  assertEquals(
    tsCode.includes("TypeCode.create_sequence_tc(0, TypeCode.TC_long)"),
    true,
    "TC_LongSeq should wrap the sequence TypeCode",
  );

  assertEquals(
    tsCode.includes("export const TC_BoundedStringSeq: TypeCode = TypeCode.create_alias_tc("),
    true,
    "Should generate TC_BoundedStringSeq using create_alias_tc",
  );
  assertEquals(
    tsCode.includes('"BoundedStringSeq",'),
    true,
    "TC_BoundedStringSeq should include the typedef name",
  );
  assertEquals(
    tsCode.includes("TypeCode.create_sequence_tc(10, TypeCode.TC_string)"),
    true,
    "TC_BoundedStringSeq should wrap the bounded sequence TypeCode",
  );
});

Deno.test("TypeCode generation - interface", () => {
  const idl = `
interface TestInterface {
  void testMethod();
};
`;

  const compiler = new IDLCompiler({ includeStubs: true });
  const result = compiler.compileString(idl, "test.idl");

  const tsCode = result.get("index.ts");
  assertExists(tsCode, "Should generate TypeScript file");

  assertEquals(
    tsCode.includes("export const TC_TestInterface: TypeCode = TypeCode.create_interface_tc("),
    true,
    "Should generate TC_TestInterface constant",
  );
  assertEquals(/"IDL:[^"]+"/.test(tsCode), true, "Should have a repository ID");
});

Deno.test("TypeCode generation - typedef", () => {
  const idl = `
typedef long MyLong;
typedef string MyString;
`;

  const compiler = new IDLCompiler({ includeStubs: true });
  const result = compiler.compileString(idl, "test.idl");

  const tsCode = result.get("index.ts");
  assertExists(tsCode, "Should generate TypeScript file");

  // Verify typedef aliases are generated
  assertEquals(tsCode.includes("export type MyLong = number;"), true, "Should generate MyLong type");
  assertEquals(tsCode.includes("export type MyString = string;"), true, "Should generate MyString type");

  // Verify TypeCode constants are generated with proper alias TypeCodes
  assertEquals(
    tsCode.includes("export const TC_MyLong: TypeCode = TypeCode.create_alias_tc("),
    true,
    "Should generate TC_MyLong using create_alias_tc",
  );
  assertEquals(
    tsCode.includes('"MyLong",'),
    true,
    "TC_MyLong should include the typedef name",
  );
  assertEquals(
    tsCode.includes("TypeCode.TC_long"),
    true,
    "TC_MyLong should reference TC_long",
  );

  assertEquals(
    tsCode.includes("export const TC_MyString: TypeCode = TypeCode.create_alias_tc("),
    true,
    "Should generate TC_MyString using create_alias_tc",
  );
  assertEquals(
    tsCode.includes('"MyString",'),
    true,
    "TC_MyString should include the typedef name",
  );
  assertEquals(
    tsCode.includes("TypeCode.TC_string"),
    true,
    "TC_MyString should reference TC_string",
  );
});

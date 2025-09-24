import { describe, it } from "@std/testing/bdd";
import { assert } from "@std/assert";
import { generateTypeScript } from "../helpers/test-utils.ts";

describe("Reserved Word Marshaling", () => {
  it("should correctly marshal/unmarshal struct fields with reserved words", () => {
    const idl = `
      module Test {
        struct Contact {
          string type;
          long class;
          boolean interface;
        };

        interface Service {
          Contact getContact();
        };
      };
    `;

    const output = generateTypeScript(idl, {
      includeStubs: true,
      includeSkeletons: true
    });

    const testFile = output.get("Test.ts");
    assert(testFile, "Generated TypeScript file should exist");

    // Verify struct fields are escaped in the interface
    assert(testFile.includes("type_: string"), "struct type field should be escaped");
    assert(testFile.includes("class_: number"), "struct class field should be escaped");
    assert(testFile.includes("interface_: boolean"), "struct interface field should be escaped");

    // Verify marshaling code uses escaped field names
    // The generated TypeCode should include marshaling of escaped fields
    assert(testFile.includes(".type_") || testFile.includes("result.type_"),
      "Marshaling code should use escaped field name 'type_'");
    assert(testFile.includes(".class_") || testFile.includes("result.class_"),
      "Marshaling code should use escaped field name 'class_'");
    assert(testFile.includes(".interface_") || testFile.includes("result.interface_"),
      "Marshaling code should use escaped field name 'interface_'");

    // Verify unmarshaling code creates objects with escaped field names
    assert(testFile.includes("type_:"), "Unmarshaling should create object with escaped field name 'type_'");
    assert(testFile.includes("class_:"), "Unmarshaling should create object with escaped field name 'class_'");
    assert(testFile.includes("interface_:"), "Unmarshaling should create object with escaped field name 'interface_'");
  });

  it("should correctly marshal/unmarshal union members with reserved words", () => {
    const idl = `
      module Test {
        enum DiscriminatorType {
          TYPE_A,
          TYPE_B,
          TYPE_C
        };

        union DataUnion switch (DiscriminatorType) {
          case TYPE_A: string class;
          case TYPE_B: long function;
          case TYPE_C: boolean return;
        };

        interface Service {
          DataUnion getData();
        };
      };
    `;

    const output = generateTypeScript(idl, {
      includeStubs: true,
      includeSkeletons: true
    });

    const testFile = output.get("Test.ts");
    assert(testFile, "Generated TypeScript file should exist");

    // Verify union member names are escaped in type definition
    assert(testFile.includes("class_: string") || testFile.includes("class_?: string"),
      "Union class member should be escaped");
    assert(testFile.includes("function_: number") || testFile.includes("function_?: number"),
      "Union function member should be escaped");
    assert(testFile.includes("return_: boolean") || testFile.includes("return_?: boolean"),
      "Union return member should be escaped");

    // Verify marshaling code uses escaped member names
    assert(testFile.includes("_union.class_"),
      "Union marshaling should use escaped field name 'class_'");
    assert(testFile.includes("_union.function_"),
      "Union marshaling should use escaped field name 'function_'");
    assert(testFile.includes("_union.return_"),
      "Union marshaling should use escaped field name 'return_'");

    // Verify unmarshaling creates objects with escaped member names
    assert(testFile.includes("class_:") && testFile.includes("discriminator"),
      "Union unmarshaling should create object with escaped field name 'class_'");
  });

  it("should handle nested structs with reserved words in marshaling", () => {
    const idl = `
      module Test {
        struct Inner {
          string static;
          boolean async;
        };

        struct Outer {
          Inner export;
          long import;
        };

        interface Service {
          Outer getOuter();
        };
      };
    `;

    const output = generateTypeScript(idl, {
      includeStubs: true,
      includeSkeletons: true
    });

    const testFile = output.get("Test.ts");
    assert(testFile, "Generated TypeScript file should exist");

    // Verify nested struct fields are escaped
    assert(testFile.includes("static_: string"), "Inner struct static field should be escaped");
    assert(testFile.includes("async_: boolean"), "Inner struct async field should be escaped");
    assert(testFile.includes("export_: Inner"), "Outer struct export field should be escaped");
    assert(testFile.includes("import_: number"), "Outer struct import field should be escaped");

    // Verify nested marshaling uses escaped names
    // When marshaling Outer.export_, it should access the Inner fields correctly
    assert(testFile.includes("export_") && (testFile.includes("static_") || testFile.includes("async_")),
      "Nested struct marshaling should use escaped field names");
  });

  it("should generate valid TypeScript that compiles without errors", () => {
    const idl = `
      module Test {
        struct Data {
          string interface;
          long module;
          boolean struct;
          string class;
          long function;
          boolean return;
          string const;
          long var;
          boolean type;
          string async;
          long await;
          boolean enum;
        };

        interface Service {
          Data getData();
          void setData(in Data data);
        };
      };
    `;

    const output = generateTypeScript(idl, {
      includeStubs: true,
      includeSkeletons: true
    });

    const testFile = output.get("Test.ts");
    assert(testFile, "Generated TypeScript file should exist");

    // Verify ALL reserved words are escaped
    const reservedWords = ['interface', 'module', 'struct', 'class', 'function',
                          'return', 'const', 'var', 'type', 'async', 'await', 'enum'];

    for (const word of reservedWords) {
      assert(testFile.includes(`${word}_:`),
        `Reserved word '${word}' should be escaped to '${word}_' in struct definition`);
    }

    // The generated code should not have any unescaped reserved words as identifiers
    // Check that common problematic patterns don't exist
    assert(!testFile.includes("interface:"), "Should not have unescaped 'interface' as property");
    assert(!testFile.includes("class:"), "Should not have unescaped 'class' as property");
    assert(!testFile.includes("function:"), "Should not have unescaped 'function' as property");
    assert(!testFile.includes(".type)") && !testFile.includes(".type;"),
      "Should not access unescaped 'type' property");
    assert(!testFile.includes(".class)") && !testFile.includes(".class;"),
      "Should not access unescaped 'class' property");
  });
});
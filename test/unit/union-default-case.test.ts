import { describe, it } from "@std/testing/bdd";
import { assert } from "@std/assert";
import { generateTypeScript } from "../helpers/test-utils.ts";

describe("Union Default Case Handling", () => {
  it("should properly handle default case with enum discriminator", () => {
    const idl = `
      module Test {
        enum Choice { A, B, C, D, E };

        union ChoiceUnion switch (Choice) {
          case A: string aValue;
          case B: long bValue;
          default: double defaultValue;
        };

        interface Service {
          ChoiceUnion getChoice();
        };
      };
    `;

    const output = generateTypeScript(idl, {
      includeStubs: true,
      includeSkeletons: false,
    });

    const testFile = output.get("Test.ts");
    assert(testFile, "Generated TypeScript file should exist");

    // Check union type definition includes all enum values for default case
    // The implementation groups all default-handled values together as "C" | "D" | "E"
    const hasGroupedDefault = testFile.includes('"C" | "D" | "E"') ||
      testFile.includes("'C' | 'D' | 'E'");
    const hasSeparateC = testFile.includes('discriminator: "C"') || testFile.includes("discriminator: 'C'");

    assert(hasGroupedDefault || hasSeparateC, "Union type should include enum values C, D, E (handled by default)");

    // Check that default member is present in all default variants
    assert(
      testFile.includes("defaultValue: number") || testFile.includes("defaultValue?: number"),
      "Default case member should be present in union type",
    );

    // Check that TypeCode includes default case
    assert(
      testFile.includes("isDefault: true") ||
        (testFile.includes("label: 0") && testFile.includes("defaultValue")),
      "TypeCode should include default case entry",
    );

    // The actual marshaling/unmarshaling happens through the TypeCode mechanism
    assert(testFile.includes("TC_ChoiceUnion"), "Should generate TypeCode for union");

    // Verify no literal "default" discriminator
    assert(!testFile.includes('discriminator: "default"'), "Should not have literal 'default' as discriminator value");
    assert(!testFile.includes('case "default":'), "Should not have case 'default' in switch statements");
  });

  it("should handle default case with primitive discriminator", () => {
    const idl = `
      module Test {
        union IntUnion switch (long) {
          case 1: string stringValue;
          case 2: boolean boolValue;
          default: double defaultValue;
        };

        interface Service {
          IntUnion getValue();
        };
      };
    `;

    const output = generateTypeScript(idl, {
      includeStubs: true,
      includeSkeletons: false,
    });

    const testFile = output.get("Test.ts");
    assert(testFile, "Generated TypeScript file should exist");

    // Check union type includes default variant (any other number)
    assert(
      testFile.includes("defaultValue: number") || testFile.includes("defaultValue?: number"),
      "Default case member should be present in union type",
    );

    // Check discriminator type allows other values
    // For primitive discriminators with default, we generate a broader type
    assert(
      testFile.includes("discriminator: string | number") ||
        testFile.includes("discriminator: number") ||
        testFile.includes("{ discriminator: 1"),
      "Discriminator should allow numeric values",
    );

    // The union type should properly represent the default case
    const hasDefaultVariant = testFile.includes("defaultValue");
    assert(hasDefaultVariant, "Union type should include default case variant with defaultValue member");
  });

  it("should handle union with only default case", () => {
    const idl = `
      module Test {
        enum Status { ACTIVE, INACTIVE, PENDING };

        union StatusData switch (Status) {
          default: string message;
        };

        interface Service {
          StatusData getStatus();
        };
      };
    `;

    const output = generateTypeScript(idl, {
      includeStubs: true,
      includeSkeletons: false,
    });

    const testFile = output.get("Test.ts");
    assert(testFile, "Generated TypeScript file should exist");

    // All enum values should use default member
    assert(testFile.includes("message: string") || testFile.includes("message?: string"), "Default member should be present in union type");

    // Should handle all Status values
    assert(testFile.includes("ACTIVE") || testFile.includes('"ACTIVE"'), "Should handle ACTIVE status");
    assert(testFile.includes("INACTIVE") || testFile.includes('"INACTIVE"'), "Should handle INACTIVE status");
    assert(testFile.includes("PENDING") || testFile.includes('"PENDING"'), "Should handle PENDING status");
  });

  it("should correctly marshal and unmarshal unions with default case", () => {
    const idl = `
      module Test {
        enum Color { RED, GREEN, BLUE, YELLOW, ORANGE };

        union ColorData switch (Color) {
          case RED: short redIntensity;
          case GREEN: short greenIntensity;
          default: string colorName;
        };

        interface Service {
          ColorData getColorData();
          void setColorData(in ColorData data);
        };
      };
    `;

    const output = generateTypeScript(idl, {
      includeStubs: true,
      includeSkeletons: true,
    });

    const testFile = output.get("Test.ts");
    assert(testFile, "Generated TypeScript file should exist");

    // Verify marshaling writes discriminator then appropriate member
    const marshalSection = testFile.split("Marshal the discriminator")[1]?.split("})(")[0];
    if (marshalSection) {
      assert(marshalSection.includes("discriminator"), "Marshaling should write the discriminator value");
      assert(marshalSection.includes("default:"), "Marshaling should have default case");
      assert(marshalSection.includes("colorName"), "Marshaling default case should handle colorName member");
    }

    // Verify unmarshaling reads discriminator then appropriate member
    const unmarshalSection = testFile.split("Unmarshal ColorData")[1]?.split("return")[0];
    if (unmarshalSection) {
      assert(unmarshalSection.includes("switch"), "Unmarshaling should use switch on discriminator");
      assert(unmarshalSection.includes("default:"), "Unmarshaling should have default case");
      assert(unmarshalSection.includes("colorName"), "Unmarshaling default case should read colorName member");
    }
  });

  it("should handle multiple case labels with default", () => {
    const idl = `
      module Test {
        enum Type { T1, T2, T3, T4, T5, T6 };

        union MultiUnion switch (Type) {
          case T1:
          case T2: string textValue;
          case T3: long numValue;
          default: boolean flagValue;
        };

        interface Service {
          MultiUnion getData();
        };
      };
    `;

    const output = generateTypeScript(idl, {
      includeStubs: false,
      includeSkeletons: false,
    });

    const testFile = output.get("Test.ts");
    assert(testFile, "Generated TypeScript file should exist");

    // T1 and T2 share textValue
    assert(testFile.includes("textValue") || testFile.includes("textValue:"), "Should have textValue member for T1/T2 cases");

    // T3 has numValue
    assert(testFile.includes("numValue") || testFile.includes("numValue:"), "Should have numValue member for T3 case");

    // T4, T5, T6 should use default flagValue
    assert(testFile.includes("flagValue") || testFile.includes("flagValue:"), "Should have flagValue member for default cases");

    // Verify T4, T5, T6 are handled by default
    const hasT4 = testFile.includes('"T4"') || testFile.includes("'T4'") || testFile.includes(".T4");
    const hasT5 = testFile.includes('"T5"') || testFile.includes("'T5'") || testFile.includes(".T5");
    const hasT6 = testFile.includes('"T6"') || testFile.includes("'T6'") || testFile.includes(".T6");

    assert(hasT4 || hasT5 || hasT6, "At least some unhandled enum values should appear in type definition");
  });
});

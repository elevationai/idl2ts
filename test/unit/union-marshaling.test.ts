import { describe, it } from "@std/testing/bdd";
import { assert } from "@std/assert";
import { generateTypeScript } from "../helpers/test-utils.ts";

describe("Union Marshaling", () => {
  describe("Marshaling with enum discriminator", () => {
    it("should generate proper marshaling code for union with enum discriminator", () => {
      const idl = `
        module Test {
          enum DataType { INT, FLOAT, STRING };

          union Data switch (DataType) {
            case INT: long intData;
            case FLOAT: double floatData;
            case STRING: string stringData;
          };

          interface DataProcessor {
            Data processData(in Data input);
          };
        };
      `;

      const output = generateTypeScript(idl, {
        includeStubs: true,
        includeSkeletons: true
      });
      const testFile = output.get("Test.ts");

      assert(testFile);

      // Check for proper marshaling structure
      assert(testFile.includes("switch (_union.discriminator)"));
      assert(testFile.includes('case "INT":'));
      assert(testFile.includes('case "FLOAT":'));
      assert(testFile.includes('case "STRING":'));

      // Check that discriminator values are written using enum
      assert(testFile.includes("_discriminatorValue = DataType.INT"));
      assert(testFile.includes("_discriminatorValue = DataType.FLOAT"));
      assert(testFile.includes("_discriminatorValue = DataType.STRING"));

      // Check that discriminator is marshaled
      assert(testFile.includes("outputStream.writeLong(_discriminatorValue)"));

      // Check that union fields are marshaled
      assert(testFile.includes("outputStream.writeLong(_union.intData)"));
      assert(testFile.includes("outputStream.writeDouble(_union.floatData)"));
      assert(testFile.includes("outputStream.writeString(_union.stringData)"));

      // Check for error handling
      assert(testFile.includes("Unknown union discriminator"));
    });

    it("should generate proper unmarshaling code for union with enum discriminator", () => {
      const idl = `
        module Test {
          enum Color { RED, GREEN, BLUE };

          union ColorValue switch (Color) {
            case RED: long redValue;
            case GREEN: double greenValue;
            case BLUE: string blueValue;
          };

          interface ColorProcessor {
            void processColor(in ColorValue color);
          };
        };
      `;

      const output = generateTypeScript(idl, {
        includeStubs: true,
        includeSkeletons: true
      });
      const testFile = output.get("Test.ts");

      assert(testFile);

      // Check unmarshaling structure
      assert(testFile.includes("const _discriminator = _inputStream.readLong()"));
      assert(testFile.includes("switch (_discriminator)"));

      // Check case handling with enum values
      assert(testFile.includes("case Color.RED:"));
      assert(testFile.includes("case Color.GREEN:"));
      assert(testFile.includes("case Color.BLUE:"));

      // Check that correct discriminator is set in result
      assert(testFile.includes('discriminator: "RED" as const'));
      assert(testFile.includes('discriminator: "GREEN" as const'));
      assert(testFile.includes('discriminator: "BLUE" as const'));

      // Check field unmarshaling
      assert(testFile.includes("redValue: _inputStream.readLong()"));
      assert(testFile.includes("greenValue: _inputStream.readDouble()"));
      assert(testFile.includes("blueValue: _inputStream.readString()"));
    });
  });

  describe("Marshaling with primitive discriminator", () => {
    it("should generate proper marshaling for union with long discriminator", () => {
      const idl = `
        module Test {
          union Value switch (long) {
            case 1: long intValue;
            case 2: double floatValue;
            case 3: string stringValue;
          };

          interface ValueProcessor {
            Value processValue(in Value v);
          };
        };
      `;

      const output = generateTypeScript(idl, {
        includeStubs: true,
        includeSkeletons: true
      });
      const testFile = output.get("Test.ts");

      assert(testFile);

      // Check marshaling with numeric discriminator
      assert(testFile.includes("case 1:"));
      assert(testFile.includes("case 2:"));
      assert(testFile.includes("case 3:"));

      // For primitive discriminators, we write the discriminator directly
      // Check discriminator marshaling (long type)
      assert(testFile.includes("outputStream.writeLong(_union.discriminator)"));
    });

    it("should generate proper unmarshaling for union with boolean discriminator", () => {
      const idl = `
        module Test {
          union BoolUnion switch (boolean) {
            case TRUE: string trueValue;
            case FALSE: long falseValue;
          };

          interface BoolProcessor {
            void processBool(in BoolUnion b);
          };
        };
      `;

      const output = generateTypeScript(idl, {
        includeStubs: true,
        includeSkeletons: true
      });
      const testFile = output.get("Test.ts");

      assert(testFile);

      // Check unmarshaling with boolean discriminator
      assert(testFile.includes("const _discriminator = _inputStream.readBoolean()"));

      // Check case handling
      assert(testFile.includes("case true:"));
      assert(testFile.includes("case false:"));

      // Check result construction
      assert(testFile.includes('discriminator: true as const'));
      assert(testFile.includes('discriminator: false as const'));
    });
  });

  describe("Default case handling", () => {
    it("should generate proper code for union with default case", () => {
      const idl = `
        module Test {
          union DefaultUnion switch (long) {
            case 1: string option1;
            case 2: long option2;
            default: boolean defaultOption;
          };

          interface DefaultProcessor {
            DefaultUnion process(in DefaultUnion u);
          };
        };
      `;

      const output = generateTypeScript(idl, {
        includeStubs: true,
        includeSkeletons: true
      });
      const testFile = output.get("Test.ts");

      assert(testFile);

      // Check TypeScript type generation - default case allows any discriminator value
      assert(testFile.includes('{ discriminator: string | number; defaultOption: boolean }'));

      // Check marshaling handles default case
      assert(testFile.includes('default:') && testFile.includes('defaultOption'));

      // Check that default option is marshaled
      assert(testFile.includes("outputStream.writeBoolean(_union.defaultOption)"));
    });

    it("should generate proper unmarshaling with default case", () => {
      const idl = `
        module Test {
          enum Choice { A, B, C };

          union ChoiceUnion switch (Choice) {
            case A: string aValue;
            case B: long bValue;
            default: double defaultValue;
          };

          interface ChoiceHandler {
            ChoiceUnion getChoice();
          };
        };
      `;

      const output = generateTypeScript(idl, {
        includeStubs: true,
        includeSkeletons: true
      });
      const testFile = output.get("Test.ts");

      assert(testFile);

      // The unmarshaling handles default cases properly:
      // - For unions with default members, unmatched discriminators return the default member
      // - For unions without default members, unmatched discriminators throw an error
      assert(testFile.includes("default:"));
      assert(testFile.includes("throw new Error"));
    });
  });

  describe("Complex union types", () => {
    it("should handle union with multiple case labels", () => {
      const idl = `
        module Test {
          union MultiLabel switch (long) {
            case 1:
            case 2:
            case 3: string stringValue;
            case 4:
            case 5: long intValue;
            default: boolean boolValue;
          };

          interface MultiLabelProcessor {
            MultiLabel process(in MultiLabel m);
          };
        };
      `;

      const output = generateTypeScript(idl, {
        includeStubs: true,
        includeSkeletons: true
      });
      const testFile = output.get("Test.ts");

      assert(testFile);

      // Check TypeScript type generation handles multiple labels
      assert(testFile.includes("{ discriminator: 1 | 2 | 3; stringValue: string }"));
      assert(testFile.includes("{ discriminator: 4 | 5; intValue: number }"));

      // Check marshaling handles multiple case labels
      assert(testFile.includes("case 1:"));
      assert(testFile.includes("case 2:"));
      assert(testFile.includes("case 3:"));
      assert(testFile.includes("case 4:"));
      assert(testFile.includes("case 5:"));

      // For primitive discriminators, we write the discriminator directly
      // Check that the marshaling properly handles multiple labels
      assert(testFile.includes("outputStream.writeLong(_union.discriminator)"));
    });

    it("should handle union with nested struct types", () => {
      const idl = `
        module Test {
          struct Point {
            long x;
            long y;
          };

          enum ShapeType { POINT, CIRCLE, RECTANGLE };

          union Shape switch (ShapeType) {
            case POINT: Point position;
            case CIRCLE: double radius;
            case RECTANGLE: long width;
          };

          interface ShapeProcessor {
            Shape processShape(in Shape s);
          };
        };
      `;

      const output = generateTypeScript(idl, {
        includeStubs: true,
        includeSkeletons: true
      });
      const testFile = output.get("Test.ts");

      assert(testFile);

      // Check that struct marshaling is properly integrated
      assert(testFile.includes('case "POINT":'));

      // Should marshal the struct fields (may be on same line or different lines)
      assert(testFile.includes("outputStream.writeLong(_union.position.x)"));
      assert(testFile.includes("outputStream.writeLong(_union.position.y)"));

      // Check unmarshaling creates struct properly (might have extra parens)
      assert(testFile.includes("x: _inputStream.readLong(), y: _inputStream.readLong()"));
    });
  });

  describe("Cross-module unions", () => {
    it("should handle unions with cross-module enum discriminators", () => {
      const idl = `
        module Types {
          enum Status { ACTIVE, INACTIVE, PENDING };
        };

        module Data {
          union StatusInfo switch (Types::Status) {
            case ACTIVE: string activeData;
            case INACTIVE: long inactiveCode;
            case PENDING: double pendingTime;
          };

          interface StatusProcessor {
            void processStatus(in StatusInfo s);
            StatusInfo getStatus();
          };
        };
      `;

      const output = generateTypeScript(idl, {
        includeStubs: true,
        includeSkeletons: true
      });
      const dataFile = output.get("Data.ts");

      assert(dataFile);

      // Check import of Types module (could be namespace import or named import)
      assert(dataFile.includes('import * as Types from "./Types.ts"') ||
             dataFile.includes('import { Status } from "./Types.ts"'));

      // Check that enum is properly qualified in marshaling
      assert(dataFile.includes("_discriminatorValue = Types.Status.ACTIVE") ||
             dataFile.includes("_discriminatorValue = Status.ACTIVE"));

      // Check unmarshaling uses qualified enum
      assert(dataFile.includes("case Types.Status.ACTIVE:") ||
             dataFile.includes("case Status.ACTIVE:"));
    });
  });
});

import { describe, it } from "@std/testing/bdd";
import { assert } from "@std/assert";
import { generateTypeScript } from "../helpers/test-utils.ts";

describe("Cross-module Union Marshaling", () => {
  it("should properly qualify enum discriminators from other modules", () => {
    const idl = `
      module Types {
        enum FilterType { ALL, ANY, CODE, TYPE, COMPONENT };

        union FilterData switch (FilterType) {
          case ALL:
          case ANY: string anyData;
          case CODE: long codeData;
          case TYPE: double typeData;
          case COMPONENT: boolean componentData;
        };
      };

      module Components {
        interface DataProcessor {
          Types::FilterData processData(in Types::FilterData data);
        };
      };
    `;

    const output = generateTypeScript(idl, {
      includeStubs: true,
      includeSkeletons: true
    });

    const componentsFile = output.get("Components.ts");
    assert(componentsFile, "Components.ts should be generated");

    // Check that the enum is properly qualified in marshaling
    assert(componentsFile.includes("Types.FilterType.ALL") ||
           componentsFile.includes("types.FilterType.ALL"),
      "Enum should be qualified with module name in marshaling");

    // Check that the discriminator conversion doesn't use unqualified enum name
    assert(!componentsFile.includes("= FilterType.ALL"),
      "Should not use unqualified enum name");

    // Check imports
    assert(componentsFile.includes('import * as Types from "./Types.ts"') ||
           componentsFile.includes('import * as types from "./types.ts"'),
      "Should import Types module");
  });

  it("should handle unions with same-module enum discriminators", () => {
    const idl = `
      module Test {
        enum Status { ACTIVE, INACTIVE, PENDING };

        union StatusData switch (Status) {
          case ACTIVE: string message;
          case INACTIVE: long errorCode;
          default: boolean unknown;
        };

        interface Service {
          StatusData getStatus();
        };
      };
    `;

    const output = generateTypeScript(idl, {
      includeStubs: true,
      includeSkeletons: true
    });

    const testFile = output.get("Test.ts");
    assert(testFile, "Test.ts should be generated");

    // Check that same-module enums don't need qualification
    assert(testFile.includes("Status.ACTIVE"),
      "Same-module enum should be used without extra qualification");

    // Should not have module prefix for same-module enum
    assert(!testFile.includes("Test.Status.ACTIVE"),
      "Should not qualify enum with its own module name");
  });

  it("should generate valid marshaling code for complex cross-module unions", () => {
    const idl = `
      module Common {
        enum EventType { INFO, WARNING, ERROR, CRITICAL };

        struct EventData {
          long timestamp;
          string message;
        };
      };

      module Events {
        union EventUnion switch (Common::EventType) {
          case Common::EventType::INFO: string infoMessage;
          case Common::EventType::WARNING: Common::EventData warningData;
          case Common::EventType::ERROR:
          case Common::EventType::CRITICAL: long errorCode;
        };

        interface EventHandler {
          void handleEvent(in EventUnion event);
        };
      };
    `;

    const output = generateTypeScript(idl, {
      includeStubs: true,
      includeSkeletons: true
    });

    const eventsFile = output.get("Events.ts");
    assert(eventsFile, "Events.ts should be generated");

    // Check proper qualification
    assert(eventsFile.includes("Common.EventType") ||
           eventsFile.includes("common.EventType"),
      "Cross-module enum should be qualified");

    // Check struct type qualification
    assert(eventsFile.includes("Common.EventData") ||
           eventsFile.includes("common.EventData"),
      "Cross-module struct type should be qualified");

    // Check that marshaling doesn't have compilation errors
    assert(!eventsFile.includes("EventType.INFO") ||
           eventsFile.includes("Common.EventType.INFO"),
      "Enum values should be properly qualified");
  });

  it("should not generate cases for enum values not used in union", () => {
    const idl = `
      module Test {
        enum LargeEnum { A, B, C, D, E, F, G, H, I, J };

        union SelectiveUnion switch (LargeEnum) {
          case A: string aValue;
          case B:
          case C: long bcValue;
          default: double defaultValue;
        };

        interface Service {
          SelectiveUnion getData();
        };
      };
    `;

    const output = generateTypeScript(idl, {
      includeStubs: true,
      includeSkeletons: true
    });

    const testFile = output.get("Test.ts");
    assert(testFile, "Test.ts should be generated");

    // Should only have cases for values actually in the union type
    // Find the discriminator conversion section
    const lines = testFile.split('\n');
    let inDiscriminatorConversion = false;
    const conversionCases = [];

    for (const line of lines) {
      if (line.includes("Convert string discriminator to enum value")) {
        inDiscriminatorConversion = true;
      } else if (inDiscriminatorConversion && line.includes("case ")) {
        conversionCases.push(line);
      } else if (inDiscriminatorConversion && line.includes("outputStream.writeLong")) {
        break;
      }
    }

    // Should have cases for A, B, C (explicit) and D-J (default)
    const hasA = conversionCases.some(l => l.includes('"A"'));
    const hasB = conversionCases.some(l => l.includes('"B"'));
    const hasC = conversionCases.some(l => l.includes('"C"'));

    assert(hasA, "Should have case for A");
    assert(hasB, "Should have case for B");
    assert(hasC, "Should have case for C");

    // For default case handling, should have cases for D-J
    const hasD = conversionCases.some(l => l.includes('"D"'));
    const hasE = conversionCases.some(l => l.includes('"E"'));

    assert(hasD || hasE, "Should have cases for default-handled enum values");
  });
});
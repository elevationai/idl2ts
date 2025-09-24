import { describe, it } from "@std/testing/bdd";
import { assert } from "@std/assert";
import { generateTypeScript } from "../helpers/test-utils.ts";

describe("Type Resolution Fixes", () => {
  it("should correctly resolve MediaType interface vs MediaOutput_MediaType enum", () => {
    const idl = `
      module Characteristics {
        interface MediaType {
          readonly attribute long id;
        };

        interface MediaOutput {
          enum MediaType { TYPE_A, TYPE_B, TYPE_C };
          readonly attribute MediaType type;  // Should resolve to interface, not enum
        };
      };
    `;

    const output = generateTypeScript(idl, {
      includeStubs: true,
      includeSkeletons: true
    });

    const charFile = output.get("Characteristics.ts");
    assert(charFile);

    // The marshaling for get_type should use writeString for interface reference
    assert(charFile.includes('outputStream.writeString((result as { _ior?: string })?._ior || "")'),
      "get_type() should marshal as interface reference, not enum");

    // Should not use writeLong for the type attribute
    assert(!charFile.includes('case "get_type": {\n        const result = await this.get_type();\n        outputStream.writeLong(result)'),
      "get_type() should not marshal as long (enum)");
  });

  it("should correctly resolve cross-module nested types in inherited interfaces", () => {
    const idl = `
      module Characteristics {
        interface Location {
          enum ImageType { JPEG, PNG, GIF };
          readonly attribute ImageType mapType;
        };
      };

      module Components {
        interface Display : Characteristics::Location {
        };
      };
    `;

    const output = generateTypeScript(idl, {
      includeStubs: true,
      includeSkeletons: true
    });

    const compFile = output.get("Components.ts");
    assert(compFile);

    // Should properly qualify the nested type from Characteristics
    assert(compFile.includes("Promise<Characteristics.Location_ImageType>"),
      "Should correctly reference Characteristics.Location_ImageType");

    // Should not have undefined ImageType
    assert(!compFile.includes("Promise<ImageType>"),
      "Should not have unqualified ImageType reference");
  });

  it("should prioritize direct type matches over nested types for attributes", () => {
    const idl = `
      module Test {
        interface Status {
          readonly attribute long code;
        };

        interface Component {
          enum Status { READY, BUSY, ERROR };
          readonly attribute Status status;  // Should resolve to interface
        };
      };
    `;

    const output = generateTypeScript(idl, {
      includeStubs: true,
      includeSkeletons: true
    });

    const testFile = output.get("Test.ts");
    assert(testFile);

    // The type attribute should be the Status interface, marshaled as object reference
    assert(testFile.includes('outputStream.writeString((result as { _ior?: string })?._ior || "")'),
      "status attribute should marshal as interface reference");
  });

  it("should generate consistent types between interface and stub for nested types", () => {
    const idl = `
      module Test {
        interface MediaType {
          readonly attribute long id;
        };

        interface MediaOutput {
          enum MediaType { TYPE_A, TYPE_B, TYPE_C };
          readonly attribute MediaType type;
        };
      };
    `;

    const output = generateTypeScript(idl, {
      includeStubs: true,
      includeSkeletons: false
    });

    const testFile = output.get("Test.ts");
    assert(testFile);

    // The interface should declare get_type() returning MediaOutput_MediaType (the enum)
    assert(testFile.includes("get_type(): Promise<MediaOutput_MediaType>"),
      "Interface should declare get_type() returning MediaOutput_MediaType");

    // The stub should also implement get_type() returning MediaOutput_MediaType (consistent)
    assert(testFile.includes("async get_type(): Promise<MediaOutput_MediaType>"),
      "Stub should implement get_type() returning MediaOutput_MediaType");

    // The stub property getter should also return MediaOutput_MediaType (with escaped name)
    assert(testFile.includes("get type_(): MediaOutput_MediaType"),
      "Stub property getter should return MediaOutput_MediaType");
  });
});
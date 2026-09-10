import { describe, it } from "@std/testing/bdd";
import { assert } from "@std/assert";
import { generateTypeScript } from "../helpers/test-utils.ts";

describe("Type Resolution Fixes", () => {
  it("should resolve a nested enum that shadows an outer interface of the same name", () => {
    // CORBA IDL name scoping: an unqualified name resolves in the innermost
    // enclosing scope first, so `MediaType` inside interface MediaOutput is the
    // nested enum, not the sibling interface. Reaching the interface requires
    // the qualified name Characteristics::MediaType.
    const idl = `
      module Characteristics {
        interface MediaType {
          readonly attribute long id;
        };

        interface MediaOutput {
          enum MediaType { TYPE_A, TYPE_B, TYPE_C };
          readonly attribute MediaType type;  // the nested enum
        };
      };
    `;

    const output = generateTypeScript(idl, {
      includeStubs: true,
      includeSkeletons: true,
    });

    const charFile = output.get("Characteristics.ts");
    assert(charFile);

    // The skeleton must declare and marshal the enum...
    assert(
      charFile.includes("abstract get_type(): Promise<MediaOutput_MediaType>;"),
      "MediaOutput_POA should declare get_type() returning the nested enum",
    );
    assert(
      charFile.includes("outputStream.writeLong(result)"),
      "MediaOutput_POA should marshal the nested enum as a CDR long",
    );

    // ...and must not fall back to marshalling it as an object reference.
    assert(
      !charFile.includes('outputStream.writeString((result as { _ior?: string })?._ior || "")'),
      "MediaOutput_POA should not marshal the nested enum as an interface reference",
    );
  });

  it("should generate the same attribute type in the stub and the skeleton", () => {
    // Regression: the stub resolved `type` to the nested enum while the
    // skeleton resolved it to the shadowed outer interface, so a server
    // marshalled an IOR string where the client read a 4-byte enum.
    const idl = `
      module Characteristics {
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
      includeSkeletons: true,
    });

    const charFile = output.get("Characteristics.ts");
    assert(charFile);

    // Stub side (client) and POA side (server) must agree on the type.
    assert(
      charFile.includes("async get_type(): Promise<MediaOutput_MediaType>"),
      "Stub should return the nested enum",
    );
    assert(
      charFile.includes("abstract get_type(): Promise<MediaOutput_MediaType>;"),
      "Skeleton should return the same nested enum as the stub",
    );
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
      includeSkeletons: true,
    });

    const compFile = output.get("Components.ts");
    assert(compFile);

    // Should properly qualify the nested type from Characteristics
    assert(
      compFile.includes("Promise<Characteristics.Location_ImageType>"),
      "Should correctly reference Characteristics.Location_ImageType",
    );

    // Should not have undefined ImageType
    assert(!compFile.includes("Promise<ImageType>"), "Should not have unqualified ImageType reference");
  });

  it("should let a nested type shadow a same-named interface for attributes", () => {
    const idl = `
      module Test {
        interface Status {
          readonly attribute long code;
        };

        interface Component {
          enum Status { READY, BUSY, ERROR };
          readonly attribute Status status;  // the nested enum shadows the interface
        };
      };
    `;

    const output = generateTypeScript(idl, {
      includeStubs: true,
      includeSkeletons: true,
    });

    const testFile = output.get("Test.ts");
    assert(testFile);

    assert(
      testFile.includes("abstract get_status(): Promise<Component_Status>;"),
      "status should resolve to the nested enum Component_Status",
    );
    assert(
      testFile.includes("outputStream.writeLong(result)"),
      "status should marshal as a CDR long",
    );
  });

  it("should still resolve an outer interface when nothing shadows it", () => {
    const idl = `
      module Test {
        interface Status {
          readonly attribute long code;
        };

        interface Component {
          readonly attribute Status status;  // no nested Status — the interface
        };
      };
    `;

    const output = generateTypeScript(idl, {
      includeStubs: true,
      includeSkeletons: true,
    });

    const testFile = output.get("Test.ts");
    assert(testFile);

    assert(
      testFile.includes("abstract get_status(): Promise<Status>;"),
      "status should resolve to the Status interface",
    );
    assert(
      testFile.includes('outputStream.writeString((result as { _ior?: string })?._ior || "")'),
      "an interface-typed attribute should still marshal as an object reference",
    );
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
      includeSkeletons: false,
    });

    const testFile = output.get("Test.ts");
    assert(testFile);

    // The interface should declare get_type() returning MediaOutput_MediaType (the enum)
    assert(
      testFile.includes("get_type(): Promise<MediaOutput_MediaType>"),
      "Interface should declare get_type() returning MediaOutput_MediaType",
    );

    // The stub should also implement get_type() returning MediaOutput_MediaType (consistent)
    assert(
      testFile.includes("async get_type(): Promise<MediaOutput_MediaType>"),
      "Stub should implement get_type() returning MediaOutput_MediaType",
    );

    // The stub property getter should also return MediaOutput_MediaType (with escaped name)
    assert(testFile.includes("get type_(): MediaOutput_MediaType"), "Stub property getter should return MediaOutput_MediaType");
  });
});

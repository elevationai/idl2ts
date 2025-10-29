import { assert } from "@std/assert";
import { describe, it } from "@std/testing/bdd";
import { generateTypeScript } from "../../test/helpers/test-utils.ts";

describe("Inherited Attribute TypeCode Generation", () => {
  it("should properly qualify TypeCodes for inherited attributes from other modules", () => {
    const idl = `
      module Characteristics {
        typedef sequence<long> MediaTypeListDef;

        interface MediaTypeList {
          readonly attribute MediaTypeListDef mtList;
        };

        interface MediaInput : MediaTypeList {
          // MediaInput interface in Characteristics module
        };
      };

      module Components {
        interface MediaInput : Characteristics::MediaInput {
          // MediaInput interface in Components module that inherits from Characteristics::MediaInput
        };
      };
    `;

    const output = generateTypeScript(idl, {
      includeStubs: true,
    });

    const componentsFile = output.get("Components.ts");
    assert(componentsFile);

    // The inherited attribute mtList has type MediaTypeListDef which is defined in Characteristics
    // So the TypeCode should be qualified as Characteristics.TC_MediaTypeListDef
    assert(
      componentsFile.includes("request.set_return_type(Characteristics.TC_MediaTypeListDef)"),
      "Should qualify TC_MediaTypeListDef with Characteristics module",
    );

    // Should NOT have unqualified reference
    assert(!componentsFile.includes("request.set_return_type(TC_MediaTypeListDef)"), "Should not have unqualified TC_MediaTypeListDef");
  });

  it("should handle complex inheritance chains across modules", () => {
    const idl = `
      module Base {
        typedef string DataType;
        enum Status { ACTIVE, INACTIVE };

        interface HasData {
          readonly attribute DataType dataType;
        };

        interface HasStatus {
          readonly attribute Status currentStatus;
        };
      };

      module Middle {
        interface Combined : Base::HasData, Base::HasStatus {
          // Inherits from multiple Base interfaces
        };
      };

      module Components {
        interface Device : Middle::Combined {
          // Inherits through Middle from Base
        };
      };
    `;

    const output = generateTypeScript(idl, {
      includeStubs: true,
    });

    const componentsFile = output.get("Components.ts");
    assert(componentsFile);

    // Both attributes are from Base module, so TypeCodes should be qualified with Base
    assert(componentsFile.includes("request.set_return_type(Base.TC_DataType)"), "Should qualify TC_DataType with Base module");

    assert(componentsFile.includes("request.set_return_type(Base.TC_Status)"), "Should qualify TC_Status with Base module");

    // Should NOT have unqualified references
    assert(!componentsFile.includes("request.set_return_type(TC_DataType)"), "Should not have unqualified TC_DataType");
    assert(!componentsFile.includes("request.set_return_type(TC_Status)"), "Should not have unqualified TC_Status");
  });
});

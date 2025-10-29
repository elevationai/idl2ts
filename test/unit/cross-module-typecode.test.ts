import { assert } from "@std/assert";
import { describe, it } from "@std/testing/bdd";
import { generateTypeScript } from "../../test/helpers/test-utils.ts";

describe("Cross-Module TypeCode References", () => {
  it("should properly qualify TypeCode references for cross-module typedef returns", () => {
    const idl = `
      module Characteristics {
        typedef sequence<long> DataTypeList;
        typedef long MediaTypeListDef;
        enum DataType { TYPE_A, TYPE_B };
      };

      module Components {
        interface Device {
          readonly attribute Characteristics::DataTypeList supportedDataTypes;
          readonly attribute Characteristics::MediaTypeListDef mtList;
          Characteristics::DataType getDefaultType();
        };
      };
    `;

    const output = generateTypeScript(idl, {
      includeStubs: true,
    });

    const componentsFile = output.get("Components.ts");
    assert(componentsFile);

    // Check that TypeCodes are properly qualified
    assert(
      componentsFile.includes("request.set_return_type(Characteristics.TC_DataTypeList)"),
      "Should qualify TC_DataTypeList with module name",
    );

    assert(
      componentsFile.includes("request.set_return_type(Characteristics.TC_MediaTypeListDef)"),
      "Should qualify TC_MediaTypeListDef with module name",
    );

    assert(componentsFile.includes("request.set_return_type(Characteristics.TC_DataType)"), "Should qualify TC_DataType with module name");

    // Should NOT have unqualified references
    assert(!componentsFile.includes("request.set_return_type(TC_DataTypeList)"), "Should not have unqualified TC_DataTypeList");
    assert(!componentsFile.includes("request.set_return_type(TC_MediaTypeListDef)"), "Should not have unqualified TC_MediaTypeListDef");
    assert(!componentsFile.includes("request.set_return_type(TC_DataType)"), "Should not have unqualified TC_DataType");
  });

  it("should not qualify TypeCode references for same-module types", () => {
    const idl = `
      module Components {
        typedef sequence<long> LocalList;
        struct LocalStruct {
          long value;
        };

        interface Device {
          readonly attribute LocalList items;
          LocalStruct getStruct();
        };
      };
    `;

    const output = generateTypeScript(idl, {
      includeStubs: true,
    });

    const componentsFile = output.get("Components.ts");
    assert(componentsFile);

    // Same-module TypeCodes should not be qualified
    assert(componentsFile.includes("request.set_return_type(TC_LocalList)"), "Same-module TC_LocalList should not be qualified");

    assert(componentsFile.includes("request.set_return_type(TC_LocalStruct)"), "Same-module TC_LocalStruct should not be qualified");
  });
});

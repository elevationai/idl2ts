import { assert } from "@std/assert";
import { describe, it } from "@std/testing/bdd";
import { generateTypeScript } from "../../test/helpers/test-utils.ts";

describe("Stub Return Type Generation", () => {
  it("should generate set_return_type for operations with primitive return types", () => {
    const idl = `
      module Test {
        interface Service {
          long getValue();
          string getName();
          boolean isActive();
          float getRate();
        };
      };
    `;

    const output = generateTypeScript(idl, {
      includeStubs: true,
    });
    const testFile = output.get("Test.ts");
    assert(testFile);

    // Check that set_return_type is called for each non-void return type
    assert(testFile.includes("request.set_return_type(TypeCode.TC_long)"));
    assert(testFile.includes("request.set_return_type(TypeCode.TC_string)"));
    assert(testFile.includes("request.set_return_type(TypeCode.TC_boolean)"));
    assert(testFile.includes("request.set_return_type(TypeCode.TC_float)"));
  });

  it("should NOT generate set_return_type for void operations", () => {
    const idl = `
      module Test {
        interface Service {
          void doSomething();
          oneway void notify();
        };
      };
    `;

    const output = generateTypeScript(idl, {
      includeStubs: true,
    });
    const testFile = output.get("Test.ts");
    assert(testFile);

    // Check that set_return_type is NOT called for void operations
    const doSomethingMatch = testFile.match(
      /async doSomething\(\)[^}]*}/s,
    );
    assert(doSomethingMatch);
    assert(!doSomethingMatch[0].includes("set_return_type"));
  });

  it("should generate set_return_type for typedef return types", () => {
    const idl = `
      module Test {
        typedef long UserID;
        interface Service {
          UserID getCurrentUser();
        };
      };
    `;

    const output = generateTypeScript(idl, {
      includeStubs: true,
    });
    const testFile = output.get("Test.ts");
    assert(testFile);

    // Check that set_return_type is called with the typedef's TypeCode
    assert(testFile.includes("request.set_return_type(TC_UserID)"));
  });

  it("should generate set_return_type for struct return types", () => {
    const idl = `
      module Test {
        struct Result {
          long code;
          string message;
        };
        interface Service {
          Result getResult();
        };
      };
    `;

    const output = generateTypeScript(idl, {
      includeStubs: true,
    });
    const testFile = output.get("Test.ts");
    assert(testFile);

    // Check that set_return_type is called with the struct's TypeCode
    assert(testFile.includes("request.set_return_type(TC_Result)"));
  });

  it("should generate set_return_type for enum return types", () => {
    const idl = `
      module Test {
        enum Status { ACTIVE, INACTIVE };
        interface Service {
          Status getStatus();
        };
      };
    `;

    const output = generateTypeScript(idl, {
      includeStubs: true,
    });
    const testFile = output.get("Test.ts");
    assert(testFile);

    // Check that set_return_type is called with the enum's TypeCode
    assert(testFile.includes("request.set_return_type(TC_Status)"));
  });

  it("should generate set_return_type for cross-module return types", () => {
    const idl = `
      module Types {
        typedef long ID;
        enum ReturnCode { OK, ERROR };
      };
      module Services {
        interface UserService {
          Types::ID getUserId();
          Types::ReturnCode process();
        };
      };
    `;

    const output = generateTypeScript(idl, {
      includeStubs: true,
    });
    const servicesFile = output.get("Services.ts");
    assert(servicesFile);

    // Check that set_return_type references the correct module
    assert(servicesFile.includes("request.set_return_type(Types.TC_ID)"));
    assert(servicesFile.includes("request.set_return_type(Types.TC_ReturnCode)"));
  });

  it("should handle operations with both return values and out parameters", () => {
    const idl = `
      module Test {
        enum RC { SUCCESS, FAILURE };
        enum Level { LOW, MEDIUM, HIGH };
        interface Service {
          RC getLevel(in long id, out Level level);
        };
      };
    `;

    const output = generateTypeScript(idl, {
      includeStubs: true,
    });
    const testFile = output.get("Test.ts");
    assert(testFile);

    // Should have set_return_type for the RC return value
    assert(testFile.includes("request.set_return_type(TC_RC)"));
    // Should also handle the out parameter
    assert(testFile.includes("request.add_out_arg(TC_Level)"));
  });
});

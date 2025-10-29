import { describe, it } from "@std/testing/bdd";
import { assertEquals, assertThrows } from "@std/assert";
import { ExpressionEvaluator } from "../../src/parser/ExpressionEvaluator.ts";
import { parseIDL } from "../helpers/test-utils.ts";
import * as AST from "../../src/ast/nodes.ts";

describe("ExpressionEvaluator", () => {
  describe("Basic arithmetic operations", () => {
    it("should evaluate simple addition", () => {
      const evaluator = new ExpressionEvaluator();
      assertEquals(evaluator.evaluate("2 + 3"), 5);
      assertEquals(evaluator.evaluate("10 + 20 + 30"), 60);
    });

    it("should evaluate simple subtraction", () => {
      const evaluator = new ExpressionEvaluator();
      assertEquals(evaluator.evaluate("10 - 3"), 7);
      assertEquals(evaluator.evaluate("100 - 50 - 25"), 25);
    });

    it("should evaluate multiplication", () => {
      const evaluator = new ExpressionEvaluator();
      assertEquals(evaluator.evaluate("3 * 4"), 12);
      assertEquals(evaluator.evaluate("5 * 6 * 2"), 60);
    });

    it("should evaluate division", () => {
      const evaluator = new ExpressionEvaluator();
      assertEquals(evaluator.evaluate("12 / 3"), 4);
      assertEquals(evaluator.evaluate("100 / 5 / 4"), 5);
    });

    it("should evaluate modulo", () => {
      const evaluator = new ExpressionEvaluator();
      assertEquals(evaluator.evaluate("10 % 3"), 1);
      assertEquals(evaluator.evaluate("17 % 5"), 2);
    });

    it("should handle negative numbers", () => {
      const evaluator = new ExpressionEvaluator();
      assertEquals(evaluator.evaluate("-5"), -5);
      assertEquals(evaluator.evaluate("-10 + 5"), -5);
      assertEquals(evaluator.evaluate("10 + -5"), 5);
    });
  });

  describe("Bitwise operations", () => {
    it("should evaluate left shift", () => {
      const evaluator = new ExpressionEvaluator();
      assertEquals(evaluator.evaluate("1 << 3"), 8);
      assertEquals(evaluator.evaluate("5 << 2"), 20);
    });

    it("should evaluate right shift", () => {
      const evaluator = new ExpressionEvaluator();
      assertEquals(evaluator.evaluate("16 >> 2"), 4);
      assertEquals(evaluator.evaluate("100 >> 3"), 12);
    });

    it("should evaluate bitwise AND", () => {
      const evaluator = new ExpressionEvaluator();
      assertEquals(evaluator.evaluate("15 & 7"), 7);
      assertEquals(evaluator.evaluate("0xFF & 0x0F"), 0x0F);
    });

    it("should evaluate bitwise OR", () => {
      const evaluator = new ExpressionEvaluator();
      assertEquals(evaluator.evaluate("8 | 4"), 12);
      assertEquals(evaluator.evaluate("0xF0 | 0x0F"), 0xFF);
    });

    it("should evaluate bitwise XOR", () => {
      const evaluator = new ExpressionEvaluator();
      assertEquals(evaluator.evaluate("15 ^ 7"), 8);
      assertEquals(evaluator.evaluate("0xFF ^ 0xAA"), 0x55);
    });

    it("should evaluate bitwise NOT", () => {
      const evaluator = new ExpressionEvaluator();
      assertEquals(evaluator.evaluate("~0"), -1);
      assertEquals(evaluator.evaluate("~15"), -16);
    });
  });

  describe("Operator precedence", () => {
    it("should respect multiplication before addition", () => {
      const evaluator = new ExpressionEvaluator();
      assertEquals(evaluator.evaluate("2 + 3 * 4"), 14);
      assertEquals(evaluator.evaluate("3 * 4 + 2"), 14);
    });

    it("should respect division before subtraction", () => {
      const evaluator = new ExpressionEvaluator();
      assertEquals(evaluator.evaluate("10 - 12 / 3"), 6);
      assertEquals(evaluator.evaluate("20 / 4 - 2"), 3);
    });

    it("should respect shift operators precedence", () => {
      const evaluator = new ExpressionEvaluator();
      assertEquals(evaluator.evaluate("1 << 2 + 1"), 8); // 1 << (2 + 1) = 1 << 3
      assertEquals(evaluator.evaluate("2 + 1 << 2"), 12); // (2 + 1) << 2 = 3 << 2
    });

    it("should respect bitwise operators precedence", () => {
      const evaluator = new ExpressionEvaluator();
      assertEquals(evaluator.evaluate("2 | 4 & 6"), 6); // 2 | (4 & 6)
      assertEquals(evaluator.evaluate("8 ^ 4 | 2"), 14); // (8 ^ 4) | 2
    });
  });

  describe("Parentheses", () => {
    it("should evaluate expressions with parentheses", () => {
      const evaluator = new ExpressionEvaluator();
      assertEquals(evaluator.evaluate("(2 + 3) * 4"), 20);
      assertEquals(evaluator.evaluate("2 * (3 + 4)"), 14);
    });

    it("should handle nested parentheses", () => {
      const evaluator = new ExpressionEvaluator();
      assertEquals(evaluator.evaluate("((2 + 3) * 4) + 5"), 25);
      assertEquals(evaluator.evaluate("2 * (3 + (4 * 5))"), 46);
    });

    it("should handle complex nested expressions", () => {
      const evaluator = new ExpressionEvaluator();
      assertEquals(evaluator.evaluate("((1 << 3) + 2) * (16 >> 2)"), 40);
    });
  });

  describe("Hexadecimal numbers", () => {
    it("should evaluate hex numbers", () => {
      const evaluator = new ExpressionEvaluator();
      assertEquals(evaluator.evaluate("0xFF"), 255);
      assertEquals(evaluator.evaluate("0x10 + 0x20"), 48);
    });

    it("should handle hex in complex expressions", () => {
      const evaluator = new ExpressionEvaluator();
      assertEquals(evaluator.evaluate("0xFF & 0xAA"), 0xAA);
      assertEquals(evaluator.evaluate("0x100 >> 4"), 16);
    });
  });

  describe("Constant references", () => {
    it("should evaluate expressions with constants", () => {
      const evaluator = new ExpressionEvaluator();
      evaluator.setConstant("MAX_SIZE", 100);
      evaluator.setConstant("MIN_SIZE", 10);

      assertEquals(evaluator.evaluate("MAX_SIZE"), 100);
      assertEquals(evaluator.evaluate("MAX_SIZE + MIN_SIZE"), 110);
      assertEquals(evaluator.evaluate("MAX_SIZE - MIN_SIZE"), 90);
    });

    it("should handle constants in complex expressions", () => {
      const evaluator = new ExpressionEvaluator();
      evaluator.setConstant("BASE", 16);
      evaluator.setConstant("OFFSET", 4);

      assertEquals(evaluator.evaluate("BASE << 2"), 64);
      assertEquals(evaluator.evaluate("(BASE + OFFSET) * 2"), 40);
    });

    it("should throw error for undefined constants", () => {
      const evaluator = new ExpressionEvaluator();
      assertThrows(
        () => evaluator.evaluate("UNDEFINED_CONST"),
        Error,
        "Unknown constant: UNDEFINED_CONST",
      );
    });
  });

  describe("Complex real-world expressions", () => {
    it("should evaluate buffer size calculations", () => {
      const evaluator = new ExpressionEvaluator();
      // Common pattern: (1 << bits) - 1 for creating masks
      assertEquals(evaluator.evaluate("(1 << 8) - 1"), 255);
      assertEquals(evaluator.evaluate("(1 << 16) - 1"), 65535);
    });

    it("should evaluate alignment calculations", () => {
      const evaluator = new ExpressionEvaluator();
      evaluator.setConstant("ALIGNMENT", 8);
      // Align size to boundary: (size + ALIGNMENT - 1) & ~(ALIGNMENT - 1)
      const size = 13;
      evaluator.setConstant("SIZE", size);
      assertEquals(
        evaluator.evaluate("(SIZE + ALIGNMENT - 1) & ~(ALIGNMENT - 1)"),
        16,
      );
    });

    it("should evaluate flag combinations", () => {
      const evaluator = new ExpressionEvaluator();
      evaluator.setConstant("FLAG_READ", 0x01);
      evaluator.setConstant("FLAG_WRITE", 0x02);
      evaluator.setConstant("FLAG_EXEC", 0x04);

      assertEquals(
        evaluator.evaluate("FLAG_READ | FLAG_WRITE"),
        0x03,
      );
      assertEquals(
        evaluator.evaluate("FLAG_READ | FLAG_WRITE | FLAG_EXEC"),
        0x07,
      );
    });
  });

  describe("Error handling", () => {
    it("should throw error for division by zero", () => {
      const evaluator = new ExpressionEvaluator();
      assertThrows(
        () => evaluator.evaluate("10 / 0"),
        Error,
        "Division by zero",
      );
    });

    it("should throw error for invalid expressions", () => {
      const evaluator = new ExpressionEvaluator();
      assertThrows(
        () => evaluator.evaluate("+ +"),
        Error,
        "Invalid expression",
      );
    });
  });
});

describe("IDL Parser with Expression Evaluator", () => {
  it("should parse constants with simple expressions", () => {
    const idl = `
      const long SIZE = 256;
      const long DOUBLE_SIZE = SIZE * 2;
      const long MASK = (1 << 8) - 1;
    `;

    const ast = parseIDL(idl);
    const constants = ast.definitions.filter((d) => d.kind === "constant");

    assertEquals(constants.length, 3);
    assertEquals(constants[0].name, "SIZE");
    assertEquals(constants[0].value, 256);
    assertEquals(constants[1].name, "DOUBLE_SIZE");
    assertEquals(constants[1].value, 512);
    assertEquals(constants[2].name, "MASK");
    assertEquals(constants[2].value, 255);
  });

  it("should parse constants with complex expressions", () => {
    const idl = `
      const long BASE = 16;
      const long OFFSET = 4;
      const long TOTAL = (BASE << 2) + OFFSET;
      const long MASK = TOTAL & 0xFF;
    `;

    const ast = parseIDL(idl);
    const constants = ast.definitions.filter((d) => d.kind === "constant");

    assertEquals(constants.length, 4);
    assertEquals(constants[0].value, 16);
    assertEquals(constants[1].value, 4);
    assertEquals(constants[2].value, 68); // (16 << 2) + 4 = 64 + 4
    assertEquals(constants[3].value, 68); // 68 & 0xFF = 68
  });

  it("should handle constants in array dimensions", () => {
    const idl = `
      const long BUFFER_SIZE = 1024;
      const long NUM_BUFFERS = 4;

      struct Data {
        long buffer[BUFFER_SIZE];
        long multiBuffer[NUM_BUFFERS * BUFFER_SIZE];
      };
    `;

    const ast = parseIDL(idl);
    const structs = ast.definitions.filter((d) => d.kind === "struct");

    assertEquals(structs.length, 1);
    const dataStruct = structs[0] as AST.StructNode;
    const bufferType = dataStruct.members[0].type as AST.ArrayTypeNode;
    const multiBufferType = dataStruct.members[1].type as AST.ArrayTypeNode;
    assertEquals(bufferType.dimensions[0], 1024);
    assertEquals(multiBufferType.dimensions[0], 4096);
  });

  it("should handle constants in enum values", () => {
    const idl = `
      const long BASE_CODE = 0x100;

      enum ErrorCode {
        SUCCESS = 0,
        ERROR_READ = BASE_CODE + 1,
        ERROR_WRITE = BASE_CODE + 2,
        ERROR_EXEC = BASE_CODE | 0x10
      };
    `;

    const ast = parseIDL(idl);
    const enums = ast.definitions.filter((d) => d.kind === "enum");

    assertEquals(enums.length, 1);
    const errorEnum = enums[0] as AST.EnumNode;
    assertEquals(errorEnum.members[0].value, 0);
    assertEquals(errorEnum.members[1].value, 0x101);
    assertEquals(errorEnum.members[2].value, 0x102);
    assertEquals(errorEnum.members[3].value, 0x110);
  });

  it("should handle bitwise expressions", () => {
    const idl = `
      const long FLAGS_ALL = 0xFF;
      const long FLAGS_READ = FLAGS_ALL & 0x01;
      const long FLAGS_WRITE = FLAGS_ALL & 0x02;
      const long FLAGS_RW = FLAGS_READ | FLAGS_WRITE;
      const long FLAGS_INVERTED = ~FLAGS_RW;
    `;

    const ast = parseIDL(idl);
    const constants = ast.definitions.filter((d) => d.kind === "constant");

    assertEquals(constants[0].value, 0xFF);
    assertEquals(constants[1].value, 0x01);
    assertEquals(constants[2].value, 0x02);
    assertEquals(constants[3].value, 0x03);
    assertEquals(constants[4].value, ~0x03);
  });
});

import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { TypeScriptGenerator } from "../../src/generator/TypeScriptGenerator.ts";
import { IDLParser } from "../../src/parser/IDLParser.ts";

Deno.test("POA skeleton generation - basic operations", () => {
  const parser = new IDLParser();
  const generator = new TypeScriptGenerator();
  const idl = `
    interface Calculator {
      long add(in long a, in long b);
      void reset();
    };
  `;

  const ast = parser.parse(idl);
  const result = generator.generate(ast);
  const generatedCode = result.get("index.ts") || "";

  // Check that POA class is generated
  assertEquals(generatedCode.includes("class Calculator_POA"), true);
  assertEquals(generatedCode.includes("_invoke"), true);
  assertEquals(generatedCode.includes('case "add":'), true);
  assertEquals(generatedCode.includes('case "reset":'), true);
});

Deno.test("POA skeleton generation - parameter marshaling", () => {
  const parser = new IDLParser();
  const generator = new TypeScriptGenerator();
  const idl = `
    interface DataService {
      string processData(in string input, in long count);
      boolean validate(in any data);
    };
  `;

  const ast = parser.parse(idl);
  const result = generator.generate(ast);
  const generatedCode = result.get("index.ts") || "";

  // Check unmarshaling of parameters
  assertEquals(generatedCode.includes("_inputStream.readString()"), true);
  assertEquals(generatedCode.includes("_inputStream.readLong()"), true);
  assertEquals(generatedCode.includes("decodeAny(_inputStream)"), true); // 'any' type uses decodeAny

  // Check marshaling of return values
  assertEquals(generatedCode.includes("outputStream.writeString(result)"), true);
  assertEquals(generatedCode.includes("outputStream.writeBoolean(result)"), true);
});

Deno.test("POA skeleton generation - out and inout parameters", () => {
  const parser = new IDLParser();
  const generator = new TypeScriptGenerator();
  const idl = `
    interface Exchange {
      void swap(inout long a, inout long b);
      boolean compute(in long input, out long result);
      void getMultiple(out string name, out long id);
    };
  `;

  const ast = parser.parse(idl);
  const result = generator.generate(ast);
  const generatedCode = result.get("index.ts") || "";

  // Check that inout parameters are read
  assertEquals(generatedCode.includes('case "swap":'), true);
  assertEquals(generatedCode.includes("const a = _inputStream.readLong()"), true);
  assertEquals(generatedCode.includes("const b = _inputStream.readLong()"), true);

  // Check that out parameters are written
  assertEquals(generatedCode.includes("outputStream.writeLong(result.a)"), true);
  assertEquals(generatedCode.includes("outputStream.writeLong(result.b)"), true);
  assertEquals(generatedCode.includes("outputStream.writeBoolean(result.returnValue)"), true);
  assertEquals(generatedCode.includes("outputStream.writeLong(result.result)"), true);
});

Deno.test("POA skeleton generation - oneway operations", () => {
  const parser = new IDLParser();
  const generator = new TypeScriptGenerator();
  const idl = `
    interface Notifier {
      oneway void notify(in string message);
      void confirm(in string message);
    };
  `;

  const ast = parser.parse(idl);
  const result = generator.generate(ast);
  const generatedCode = result.get("index.ts") || "";

  // Check that oneway operations don't wait for result
  assertEquals(generatedCode.includes("this.notify(message); // oneway - no wait"), true);
  // Regular operations should await
  assertEquals(generatedCode.includes("await this.confirm(message)"), true);
});

Deno.test("POA skeleton generation - attributes", () => {
  const parser = new IDLParser();
  const generator = new TypeScriptGenerator();
  const idl = `
    interface Config {
      attribute string name;
      readonly attribute long id;
    };
  `;

  const ast = parser.parse(idl);
  const result = generator.generate(ast);
  const generatedCode = result.get("index.ts") || "";

  // Check getter operations
  assertEquals(generatedCode.includes('case "get_name":'), true);
  assertEquals(generatedCode.includes('case "get_id":'), true);
  assertEquals(generatedCode.includes("await this.get_name()"), true);
  assertEquals(generatedCode.includes("await this.get_id()"), true);

  // Check setter operation (only for non-readonly)
  assertEquals(generatedCode.includes('case "set_name":'), true);
  assertEquals(generatedCode.includes("await this.set_name(value)"), true);

  // Should not have setter for readonly
  assertEquals(generatedCode.includes('case "set_id":'), false);
});

Deno.test("POA skeleton generation - sequences and arrays", () => {
  const parser = new IDLParser();
  const generator = new TypeScriptGenerator();
  const idl = `
    interface Collection {
      sequence<long> getNumbers();
      void setData(in sequence<string> items);
      typedef long NumberArray[10];
      NumberArray getArray();
    };
  `;

  const ast = parser.parse(idl);
  const result = generator.generate(ast);
  const generatedCode = result.get("index.ts") || "";

  // Check sequence marshaling - now uses manual loop with length prefix
  assertEquals(generatedCode.includes("inputStream.readULong()"), true);
  assertEquals(generatedCode.includes("outputStream.writeULong("), true);

  // Check array handling - now uses manual loop without length prefix
  assertEquals(generatedCode.includes(".forEach((element) =>"), true);
});

Deno.test("POA skeleton generation - complex types", () => {
  const parser = new IDLParser();
  const generator = new TypeScriptGenerator();
  const idl = `
    struct Point {
      long x;
      long y;
    };

    interface Graphics {
      Point getOrigin();
      void moveTo(in Point position);
    };
  `;

  const ast = parser.parse(idl);
  const result = generator.generate(ast);
  const generatedCode = result.get("index.ts") || "";

  // Check struct marshaling - should generate field-by-field marshaling
  assertEquals(generatedCode.includes("x: _inputStream.readLong()"), true); // Unmarshal struct field x
  assertEquals(generatedCode.includes("y: _inputStream.readLong()"), true); // Unmarshal struct field y
  assertEquals(generatedCode.includes("outputStream.writeLong(result.x)"), true); // Marshal struct field x
  assertEquals(generatedCode.includes("outputStream.writeLong(result.y)"), true); // Marshal struct field y
});

Deno.test("POA skeleton generation - no skeleton flag", () => {
  const parser = new IDLParser();
  const generator = new TypeScriptGenerator({ includeSkeletons: false });
  const idl = `
    interface NoSkeleton {
      void test();
    };
  `;

  const ast = parser.parse(idl);
  const result = generator.generate(ast);
  const generatedCode = result.get("index.ts") || "";

  // Should not generate POA class when skeletons are disabled
  assertEquals(generatedCode.includes("class NoSkeleton_POA"), false);
  assertEquals(generatedCode.includes("_invoke"), false);

  // Should still generate stub
  assertEquals(generatedCode.includes("class NoSkeleton_Stub"), true);
});

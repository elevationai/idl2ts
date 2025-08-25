# IDL to TypeScript Compiler Project

## Project Goal
Create a robust CORBA IDL parser and TypeScript code generator that can parse `.idl` files and generate TypeScript interfaces, types, and client/server stubs compatible with the CORBA.ts library.

## Requirements

### Core Functionality
1. **Full IDL 3.5/4.0 Support**
   - Parse all IDL constructs: modules, interfaces, structs, unions, enums, typedefs, constants, exceptions
   - Handle nested modules and interfaces
   - Support interface inheritance
   - Parse attributes (readonly and read-write)
   - Parse operations with in/out/inout parameters
   - Handle raises clauses for exceptions
   - Support sequences, arrays, and other complex types
   - Parse preprocessor directives (#include, #pragma, etc.)

2. **TypeScript Code Generation**
   - Generate TypeScript interfaces for IDL interfaces
   - Generate TypeScript types for structs, unions, enums
   - Generate proper type mappings (e.g., `long` → `number`, `string` → `string`)
   - Generate async method signatures (operations return Promises)
   - Generate getter/setter methods for attributes
   - Support namespaces matching IDL modules
   - Generate type guards and validators

3. **CORBA.ts Integration**
   - Generated code should import from the CORBA.ts library
   - Use CORBA.ts types like `CORBA.ObjectRef`, `CORBA.SystemException`
   - Generate client stubs that use CORBA.ts ORB
   - Generate server skeletons compatible with CORBA.ts POA

## Technical Approach

### Parser Implementation
Use ANTLR4 with the official IDL grammar:
```bash
# Get the grammar
curl -O https://raw.githubusercontent.com/antlr/grammars-v4/master/idl/IDL.g4

# Install ANTLR tools
npm install --save-dev antlr4ts-cli
npm install antlr4ts

# Generate parser
npx antlr4ts -visitor IDL.g4
```

### Project Structure
```
idl-compiler/
├── src/
│   ├── grammar/          # ANTLR grammar and generated parser
│   │   ├── IDL.g4
│   │   ├── IDLLexer.ts
│   │   ├── IDLParser.ts
│   │   └── IDLVisitor.ts
│   ├── ast/              # AST node definitions
│   │   ├── nodes.ts
│   │   └── visitor.ts
│   ├── analyzer/         # Semantic analysis
│   │   ├── TypeResolver.ts
│   │   └── SymbolTable.ts
│   ├── generator/        # Code generation
│   │   ├── TypeScriptGenerator.ts
│   │   ├── ClientStubGenerator.ts
│   │   └── ServerSkeletonGenerator.ts
│   └── cli.ts           # Command-line interface
├── test/
│   ├── fixtures/         # Test IDL files
│   └── specs/           # Test suites
└── package.json

```

### Key Classes to Implement

1. **IDLCompiler** - Main orchestrator
   ```typescript
   class IDLCompiler {
     parse(idlContent: string): AST
     analyze(ast: AST): AnalyzedAST  
     generate(ast: AnalyzedAST): GeneratedCode
     compile(idlPath: string, options: CompilerOptions): void
   }
   ```

2. **ASTBuilder** - Visitor that builds AST from parse tree
   ```typescript
   class ASTBuilder extends IDLVisitor<ASTNode> {
     visitModule(ctx: ModuleContext): ModuleNode
     visitInterface_decl(ctx: InterfaceContext): InterfaceNode
     // ... other visit methods
   }
   ```

3. **TypeScriptGenerator** - Generates TS code from AST
   ```typescript
   class TypeScriptGenerator {
     generateModule(module: ModuleNode): string
     generateInterface(iface: InterfaceNode): string
     generateStruct(struct: StructNode): string
     // ... other generation methods
   }
   ```

## Example Input/Output

### Input IDL (`example.idl`):
```idl
module Example {
    interface Calculator {
        long add(in long a, in long b);
        long subtract(in long a, in long b);
        readonly attribute long lastResult;
    };
    
    struct Result {
        long value;
        string message;
    };
};
```

### Output TypeScript (`example.ts`):
```typescript
import { CORBA } from 'corba.ts';

export namespace Example {
    export interface Calculator extends CORBA.Object {
        add(a: number, b: number): Promise<number>;
        subtract(a: number, b: number): Promise<number>;
        readonly lastResult: number;
        get_lastResult(): Promise<number>;
    }
    
    export interface Result {
        value: number;
        message: string;
    }
    
    export class CalculatorStub implements Calculator {
        constructor(private objRef: CORBA.ObjectRef) {}
        
        async add(a: number, b: number): Promise<number> {
            const request = this.objRef.create_request('add');
            request.add_in_arg('a', a);
            request.add_in_arg('b', b);
            await request.invoke();
            return request.return_value();
        }
        
        // ... other methods
    }
}
```

## CLI Usage
```bash
# Basic compilation
idl-compiler compile input.idl -o output.ts

# With options
idl-compiler compile \
  --input ./idl/*.idl \
  --output ./generated \
  --target client,server \
  --namespace-prefix com.example \
  --emit-helpers
```

## Testing Requirements
1. Parse test suite of IDL files from OMG specifications
2. Validate against known CORBA implementations
3. Round-trip testing (parse → generate → parse)
4. Integration tests with CORBA.ts library
5. Test error handling and edge cases

## Implementation Notes
- Start with basic types and single-file IDL support
- Add #include and complex types incrementally  
- Consider using a two-pass approach for forward references
- Cache parsed modules for multi-file projects
- Generate source maps for debugging
- Add JSDoc comments from IDL comments
- Consider generating .d.ts files for better IDE support

## Reference Materials
- CORBA 3.4 Specification: https://www.omg.org/spec/CORBA/
- IDL Grammar: https://github.com/antlr/grammars-v4/tree/master/idl
- ANTLR4 TypeScript Target: https://github.com/tunnelvisionlabs/antlr4ts
- Example IDL files: Look at OMG specifications, TAO, omniORB examples

## Success Criteria
The compiler should successfully parse and generate TypeScript for:
1. The `characteristics.idl` file from the CUSS specification
2. Standard CORBA services IDL files  
3. Complex real-world IDL with nested modules, inheritance, and exceptions
4. Files using preprocessor directives and includes

The generated TypeScript should:
1. Compile without errors
2. Work with the CORBA.ts library
3. Provide full type safety
4. Support all IDL features used in the input
# @elevationai/idl2ts

CORBA IDL to TypeScript compiler that generates type-safe TypeScript interfaces and stubs from CORBA IDL files.

## Installation

```bash
npm install -g @elevationai/idl2ts
```

Or as a development dependency:

```bash
npm install --save-dev @elevationai/idl2ts
```

## Usage

### Command Line

```bash
idl2ts compile <input.idl> -o <output-directory> [options]
```

#### Options

- `-o, --output <path>` - Output directory for generated TypeScript files
- `-I, --include <paths...>` - Include paths for IDL files
- `--no-stubs` - Do not generate client stubs
- `--skeletons` - Generate server skeletons
- `--no-helpers` - Do not emit helper functions
- `--corba-import <path>` - Import path for CORBA library (default: "corba")
- `-v, --verbose` - Verbose output

#### Example

```bash
# Compile a single IDL file
idl2ts compile myservice.idl -o ./generated --corba-import corba

# Compile with include paths
idl2ts compile myservice.idl -o ./generated -I ./idl-includes --corba-import @myorg/corba

# Compile multiple files using glob patterns
idl2ts compile "idls/*.idl" -o ./generated
```

### Programmatic API

```typescript
import { IDLCompiler } from '@elevationai/idl2ts';

const compiler = new IDLCompiler({
  outputPath: './generated',
  includeStubs: true,
  includeSkeletons: false,
  emitHelpers: true,
  corbaImportPath: 'corba',
  verbose: false
});

compiler.compile('myservice.idl');
```

## Features

- **Full CORBA IDL Support**: Handles modules, interfaces, structs, unions, enums, typedefs, exceptions, and more
- **Cross-Module Type Resolution**: Correctly resolves types across module boundaries with proper qualified names
- **Nested Type Support**: Handles nested types (enums, structs, etc.) defined within interfaces
- **Type-Safe Async/Await**: Generates modern TypeScript with async/await patterns
- **CORBA Stub Generation**: Follows official CORBA specification for stub generation with `_Stub` suffix
- **Inheritance Support**: Properly handles interface inheritance hierarchies

## IDL to TypeScript Mapping

### Basic Types

| IDL Type | TypeScript Type |
|----------|----------------|
| `short` | `number` |
| `long` | `number` |
| `long long` | `bigint` |
| `unsigned short` | `number` |
| `unsigned long` | `number` |
| `unsigned long long` | `bigint` |
| `float` | `number` |
| `double` | `number` |
| `char` | `string` |
| `wchar` | `string` |
| `string` | `string` |
| `wstring` | `string` |
| `boolean` | `boolean` |
| `octet` | `number` |
| `any` | `any` |
| `void` | `void` |

### Complex Types

- **sequence<T>** → `T[]`
- **T[N]** → `T[]` (fixed-size arrays)
- **struct** → TypeScript interface
- **enum** → TypeScript enum
- **union** → TypeScript union type with discriminator
- **interface** → TypeScript interface with async methods

### Example IDL

```idl
module Example {
  interface Calculator {
    long add(in long a, in long b);
    double divide(in double numerator, in double denominator) 
      raises (DivisionByZero);
  };
  
  exception DivisionByZero {
    string message;
  };
};
```

### Generated TypeScript

```typescript
export namespace Example {
  export interface Calculator {
    add(a: number, b: number): Promise<number>;
    divide(numerator: number, denominator: number): Promise<number>;
  }

  export class Calculator_Stub implements Calculator {
    constructor(private readonly __orb: any) {}
    
    async add(a: number, b: number): Promise<number> {
      return this.__orb.invoke(this, 'add', { a, b });
    }
    
    async divide(numerator: number, denominator: number): Promise<number> {
      return this.__orb.invoke(this, 'divide', { numerator, denominator });
    }
  }

  export interface DivisionByZero {
    message: string;
  }
}
```

## Requirements

- Node.js 14 or higher
- TypeScript 4.0 or higher (for generated code)

## Development

```bash
# Clone the repository
git clone https://github.com/elevationai/idl2ts.git
cd idl2ts

# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm test
```

## License

MIT © Elevation AI

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues and feature requests, please use the [GitHub issues page](https://github.com/elevationai/idl2ts/issues).
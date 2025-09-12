# IDL2TS for Deno

CORBA IDL to TypeScript compiler for Deno and JSR.

## Installation

### Using directly with Deno
```bash
deno run -A jsr:@eai/idl2ts/cli compile myservice.idl -o ./generated
```

### Install globally
```bash
deno install -A --name idl2ts jsr:@eai/idl2ts/cli
idl2ts compile myservice.idl -o ./generated
```

### Using with npx (for Node.js users)
```bash
npx jsr:@eai/idl2ts compile myservice.idl -o ./generated
```

## Usage

```bash
# Compile a single IDL file
idl2ts compile input.idl -o output-dir

# Compile with options
idl2ts compile input.idl \
  -o output-dir \
  --no-stubs \
  --skeletons \
  -v
```

## Options

- `-o, --output <path>` - Output directory or file
- `-I, --include <paths...>` - Include paths for IDL files  
- `--no-stubs` - Do not generate client stubs
- `--skeletons` - Generate server skeletons
- `--no-helpers` - Do not emit helper functions
- `--corba-import <path>` - Import path for CORBA library
- `-v, --verbose` - Verbose output

## Publishing to JSR

To publish this package to JSR:

```bash
deno publish
```

## Development

```bash
# Check TypeScript types
deno check src/**/*.ts

# Run linter
deno lint src/**/*.ts

# Run tests (when available)
deno test
```

## License

MIT
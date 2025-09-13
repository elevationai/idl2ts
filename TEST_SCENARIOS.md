# IDL2TS Test Scenarios

## Overview
This document lists all test scenarios for the IDL2TS compiler, organized by category. Total: **174 test scenarios** covering the complete IDL to TypeScript compilation pipeline.

## 1. Parser Tests (53 scenarios)

### Basic Types
- Parse primitive types: short, long, long long, unsigned variants, float, double, char, wchar, boolean, octet, any, string, wstring
- Parse sequence types: basic sequences, nested sequences (sequence<sequence<T>>)
- Parse array types: single dimension arrays, multi-dimensional arrays (matrices)

### Module Parsing
- Parse simple module with constants
- Parse nested modules (multiple levels)
- Parse module reopening (same module defined multiple times)

### Interface Parsing
- Parse simple interface with methods
- Parse interface inheritance (single and multiple)
- Parse interface attributes (readonly and mutable)
- Parse interface exceptions (methods with raises clauses)
- Parse nested types in interfaces (enums, structs, typedefs)
- Parse qualified interface inheritance (cross-module)

### Struct Parsing
- Parse simple struct with primitive members
- Parse nested struct (structs containing other structs and sequences)

### Enum Parsing
- Parse simple enum
- Parse enum with trailing comma

### Union Parsing
- Parse simple union with integer discriminator
- Parse union with enum discriminator
- Parse union with multiple case labels

### Constant Parsing
- Parse integer constants (including hex and octal)
- Parse floating point constants (float, double, scientific notation)
- Parse string and character constants (escape sequences, wide strings)
- Parse boolean constants

### Exception Parsing
- Parse simple exception
- Parse complex exception with multiple members

### Operation Parsing
- Parse parameter directions (in, out, inout)
- Parse oneway operations
- Parse operations without parameters
- Parse operations with many parameters

### Complex Scenarios
- Parse cross-module references
- Parse deeply nested modules
- Parse MediaType ambiguity pattern

### Error Handling
- Handle missing semicolons
- Handle empty constructs
- Handle malformed IDL

## 2. Preprocessor Tests (25 scenarios)

### Comment Removal
- Remove single-line comments (//)
- Remove multi-line comments (/* */)
- Preserve comments inside strings

### Include Directives
- Process quoted includes (#include "file.idl")
- Process angle bracket includes (#include <file.idl>)
- Process nested includes
- Prevent circular includes
- Resolve include paths from multiple directories
- Handle missing include files

### Pragma Directives
- Process #pragma prefix
- Process #pragma version
- Process #pragma ID
- Handle multiple pragma directives

### Other Preprocessor Directives
- Handle conditional compilation (#ifndef, #define, #endif)
- Handle if/else directives (#ifdef, #else, #endif)
- Handle error/warning directives

### Line Continuation
- Process backslash line continuation
- Handle multi-line interface definitions

### Mixed Content
- Process files with comments, pragmas, includes, and IDL

### Edge Cases
- Handle empty input
- Handle comment-only files
- Handle directive-only files
- Preserve string whitespace

## 3. Generator Tests (39 scenarios)

### Type Mapping
- Map primitive types to TypeScript
- Map sequences to arrays
- Map arrays to TypeScript arrays

### Module Generation
- Generate TypeScript namespaces
- Generate separate files for nested modules
- Merge multiple module definitions

### Interface Generation
- Generate async methods with Promise returns
- Generate stub classes (_Stub)
- Option to disable stub generation
- Generate interface inheritance
- Generate attributes as properties
- Handle raises clauses
- Handle oneway operations

### Struct Generation
- Generate TypeScript interfaces from structs
- Handle nested struct references

### Enum Generation
- Generate TypeScript enums with explicit values

### Union Generation
- Generate discriminated union types
- Support enum discriminators

### Constant Generation
- Generate typed const declarations
- Map constant types correctly (long long → bigint)

### Cross-Module References
- Generate import statements
- Handle complex inheritance across modules

### Nested Types
- Flatten nested types with prefixed names
- Resolve MediaType ambiguity

### Import Optimization
- Use type-only imports when appropriate
- Use value imports when needed

### Helper Functions
- Optional helper function emission

### Output Structure
- Generate separate files per module
- Add file headers with metadata

### CORBA Import Path
- Support custom import paths
- Use default "corba" import

## 4. Edge Cases Tests (27 scenarios)

### Parser Edge Cases
- Empty constructs (modules, interfaces, structs)
- Single-member enum
- Deep nesting (5+ levels)
- Long identifiers
- Reserved words as identifiers
- Unicode in strings
- Escape sequences
- Maximum sequence nesting
- Operations without parameters
- Operations with 10+ parameters

### Generator Edge Cases
- Generate valid TypeScript for empty constructs
- Handle TypeScript reserved words
- Handle circular references
- Large numeric constants
- Special character escaping
- Long inheritance chains
- Multiple inheritance
- Unions with 10+ cases

### Error Recovery
- Recover from missing semicolons
- Handle malformed IDL
- Process very long lines

### Ambiguity Resolution
- Resolve MediaType pattern
- Handle type shadowing

### Complex Patterns
- Map CORBA any type
- Handle fixed-point types
- Process context expressions
- Map native types

## 5. Integration Tests (13 scenarios)

### File Output
- End-to-end IDL to TypeScript compilation
- Generate multiple module files

### Include Paths
- Resolve includes from specified paths
- Generate cross-module imports

### Compiler Options
- Control stub generation
- Custom CORBA import path

### Complex Scenarios
- Cross-module references
- Nested interface types
- MediaType ambiguity resolution

### Error Recovery
- Handle empty files
- Handle comment-only files

### Real-world Examples
- CORBA service definition

## 6. Pragma Tests (8 scenarios)

### #pragma prefix
- Apply repository ID prefix

### #pragma version
- Set custom versions for types
- Preserve default versions

### #pragma ID
- Override repository IDs

### #pragma inhibit_code_generation
- Selective type inhibition
- Global generation inhibition

### Real-world CUSS IDL
- CUSS1 compatibility

## 7. Basic Parser Tests (9 scenarios)

### Fundamental Parsing (Deno-based)
- Primitive types
- Sequence types
- Array types
- Simple modules
- Interface operations
- Enums
- Structs

## Test Implementation Priority

### Phase 1: Core Functionality
1. Basic parser tests (types, modules, interfaces)
2. Basic generator tests (type mapping, simple generation)
3. Basic preprocessor tests (comments, simple includes)

### Phase 2: Complex Features
1. Complex parser scenarios (inheritance, nested types)
2. Cross-module references
3. Pragma directives

### Phase 3: Edge Cases & Integration
1. Edge case handling
2. Error recovery
3. End-to-end integration tests

### Phase 4: Real-world Scenarios
1. CUSS IDL compatibility
2. Complex service definitions
3. Performance with large files
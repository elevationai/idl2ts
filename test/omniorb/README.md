# OmniORB Test Suite

## Source

The IDL files in the `idl/` directory are from the OmniORB CORBA implementation test suite (version svn-r6791). These files test various IDL constructs and edge cases that a CORBA IDL compiler should handle.

## Test Files

### compilation.test.ts

Tests that idl2ts can successfully parse and compile all 170 IDL files from the OmniORB test suite.

- **Success rate:** 99.4% (169/170 files)
- **Expected failure:** `bug980812.idl` - intentionally malformed to test compiler error handling

This test verifies idl2ts can handle the wide variety of IDL constructs used in real CORBA systems.

### typecode-generation.test.ts

Tests that idl2ts generates TypeCode constants for various IDL types (structs, enums, unions, sequences, interfaces, typedefs).

TypeCodes are CORBA's runtime type information system. This test verifies that the TypeCode generation works without asserting specific format details (as the original OmniORB test only prints TypeCode information for diagnostic purposes).

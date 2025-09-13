# IDL2TS - CORBA IDL to TypeScript Compiler

## ⚠️ This project has moved!

The IDL2TS project has moved to JSR (JavaScript Registry) for better Deno compatibility and modern JavaScript tooling.

**Please use the JSR package instead:**

🔗 **https://jsr.io/@eai/idl2ts**

## Installation & Usage with JSR

### **Using with npx (Recommended)**
```bash
npx jsr:@eai/idl2ts compile myservice.idl -o ./generated
```

### Using with Deno
```bash
deno run -A jsr:@eai/idl2ts/cli compile myservice.idl -o ./generated
```

### Installing in Node.js projects
```bash
npx jsr add @eai/idl2ts
```

## Why the move?

- Native Deno support with TypeScript-first approach
- Better module resolution and dependency management
- Modern ESM-only distribution
- Improved developer experience

## Support

For issues, documentation, and updates, please visit the JSR package page:
https://jsr.io/@eai/idl2ts

---

*This npm package is no longer maintained. All future development will happen on JSR.*

#!/usr/bin/env node

console.error('\n⚠️  WARNING: @elevationai/idl2ts has moved to JSR');
console.error('📦 Please use: jsr:@eai/idl2ts');
console.error('🔗 https://jsr.io/@eai/idl2ts\n');
console.error('Installation:');
console.error('  Deno: deno run -A jsr:@eai/idl2ts/cli compile myservice.idl -o ./generated');
console.error('  Node: npx jsr add @eai/idl2ts\n');

process.exit(1);
import { OmniORBTestHarness } from "./test-harness.ts";
import { resolve, join } from "@std/path";
import { walk } from "@std/fs";

const testDir = resolve(import.meta.dirname!, "idl");

// IDL files that are expected to fail compilation (intentionally malformed)
const EXPECTED_FAILURES = new Set([
  "bug980812.idl", // Intentionally malformed - tests that compiler doesn't crash
]);

// Categorize IDL files based on their names and content
function categorizeIDL(filename: string): string {
  const name = filename.toLowerCase();

  if (name.includes("any")) return "any";
  if (name.includes("array")) return "arrays";
  if (name.includes("seq")) return "sequences";
  if (name.includes("struct")) return "structs";
  if (name.includes("union")) return "unions";
  if (name.includes("enum")) return "enums";
  if (name.includes("const")) return "constants";
  if (name.includes("except")) return "exceptions";
  if (name.includes("inherit") || name.includes("derived")) return "inheritance";
  if (name.includes("forward") || name.includes("fwd")) return "forward";
  if (name.includes("rec")) return "recursive";
  if (name.includes("typecode") || name.includes("tc")) return "typecode";
  if (name.includes("bug")) return "bugs";
  if (name.includes("echo") || name.includes("test")) return "basic";
  if (["bootstrap.idl", "corbaidl.idl", "costrading.idl", "naming.idl", "orb.idl", "ir.idl"].includes(name)) {
    return "standard";
  }

  return "basic";
}

Deno.test("OmniORB IDL Compilation Tests", async (t) => {
  const harness = new OmniORBTestHarness();
  const idlFiles: Map<string, string[]> = new Map();

  // Collect all IDL files and categorize them
  for await (const entry of walk(testDir, { exts: [".idl"] })) {
    if (entry.isFile) {
      const category = categorizeIDL(entry.name);
      if (!idlFiles.has(category)) {
        idlFiles.set(category, []);
      }
      idlFiles.get(category)!.push(entry.path);
    }
  }

  // Sort categories for consistent test order
  const categories = Array.from(idlFiles.keys()).sort();

  console.log(`\nFound ${Array.from(idlFiles.values()).flat().length} IDL files in ${categories.length} categories\n`);

  // Test each category
  for (const category of categories) {
    const files = idlFiles.get(category)!.sort();

    await t.step(`${category} (${files.length} files)`, async (t2) => {
      // Test each IDL file individually
      for (const file of files) {
        const filename = file.split('/').pop()!;

        await t2.step(filename, async () => {
          const result = await harness.testIDLFile(file, category);

          if (EXPECTED_FAILURES.has(filename)) {
            // This file is expected to fail
            if (result.success) {
              throw new Error(`[${filename}] Expected to fail but compiled successfully`);
            }
            // Test passes - it failed as expected
            console.log(`    ✓ Failed as expected: ${result.error?.split('\n')[0]}`);
          } else {
            // This file should compile successfully
            if (!result.success) {
              throw new Error(`[${filename}] ${result.error!}`);
            }
          }
        });
      }
    });
  }

  // Print summary
  await t.step("Summary", async () => {
    harness.printSummary();

    // Save detailed results
    const failures = harness.getFailures();
    if (failures.length > 0) {
      const failureReport = failures.map(f => ({
        file: f.idlFile,
        category: f.category,
        error: f.error
      }));

      await Deno.writeTextFile(
        join(import.meta.dirname!, "compilation-failures.json"),
        JSON.stringify(failureReport, null, 2)
      );

      console.log(`\nDetailed failure report saved to compilation-failures.json`);
      console.log(`Total failures: ${failures.length}`);
    }
  });
});
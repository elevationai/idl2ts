import { IDLCompiler } from "../../src/compiler/IDLCompiler.ts";
import { basename } from "@std/path";

export interface TestResult {
  idlFile: string;
  category: string;
  success: boolean;
  error?: string;
  output?: string;
}

export class OmniORBTestHarness {
  private compiler: IDLCompiler;
  private results: TestResult[] = [];

  constructor() {
    this.compiler = new IDLCompiler();
  }

  async testIDLFile(idlPath: string, category: string): Promise<TestResult> {
    const idlFile = basename(idlPath);

    try {
      // Read the IDL content
      const idlContent = await Deno.readTextFile(idlPath);

      // Compile without writing to files
      const result = this.compiler.compileString(idlContent, idlPath);

      return {
        idlFile,
        category,
        success: true,
        output: `Generated ${result.size} file(s)`
      };
    } catch (error) {
      return {
        idlFile,
        category,
        success: false,
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }

  async testIDLFiles(idlFiles: string[], category: string): Promise<TestResult[]> {
    const results: TestResult[] = [];

    for (const idlFile of idlFiles) {
      const result = await this.testIDLFile(idlFile, category);
      results.push(result);
      this.results.push(result);
    }

    return results;
  }

  getResults(): TestResult[] {
    return this.results;
  }

  getSummary(): {
    total: number;
    successful: number;
    failed: number;
    byCategory: Record<string, { total: number; successful: number; failed: number }>;
  } {
    const summary = {
      total: this.results.length,
      successful: 0,
      failed: 0,
      byCategory: {} as Record<string, { total: number; successful: number; failed: number }>
    };

    for (const result of this.results) {
      if (result.success) {
        summary.successful++;
      } else {
        summary.failed++;
      }

      if (!summary.byCategory[result.category]) {
        summary.byCategory[result.category] = { total: 0, successful: 0, failed: 0 };
      }

      summary.byCategory[result.category].total++;
      if (result.success) {
        summary.byCategory[result.category].successful++;
      } else {
        summary.byCategory[result.category].failed++;
      }
    }

    return summary;
  }

  printSummary(): void {
    const summary = this.getSummary();

    console.log("\n=== OmniORB Test Suite Summary ===");
    console.log(`Total Tests: ${summary.total}`);
    console.log(`Successful: ${summary.successful} (${(summary.successful / summary.total * 100).toFixed(1)}%)`);
    console.log(`Failed: ${summary.failed} (${(summary.failed / summary.total * 100).toFixed(1)}%)`);

    console.log("\n=== By Category ===");
    for (const [category, stats] of Object.entries(summary.byCategory)) {
      console.log(`${category}:`);
      console.log(`  Total: ${stats.total}`);
      console.log(`  Successful: ${stats.successful} (${(stats.successful / stats.total * 100).toFixed(1)}%)`);
      console.log(`  Failed: ${stats.failed} (${(stats.failed / stats.total * 100).toFixed(1)}%)`);
    }
  }

  getFailures(): TestResult[] {
    return this.results.filter(r => !r.success);
  }

  printFailures(): void {
    const failures = this.getFailures();

    if (failures.length === 0) {
      console.log("\nNo failures!");
      return;
    }

    console.log("\n=== Failures ===");
    for (const failure of failures) {
      console.log(`\n${failure.category}/${failure.idlFile}:`);
      console.log(`  Error: ${failure.error}`);
    }
  }
}

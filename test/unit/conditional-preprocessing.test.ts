import { describe, it } from "@std/testing/bdd";
import { assertEquals } from "@std/assert";
import { IDLPreprocessor } from "../../src/parser/IDLPreprocessor.ts";

describe("Conditional Preprocessing", () => {
  describe("#ifdef and #ifndef", () => {
    it("should include content when macro is defined for #ifdef", () => {
      const preprocessor = new IDLPreprocessor();
      const input = `
        #define FEATURE_ENABLED
        #ifdef FEATURE_ENABLED
        interface Enabled {
          void method();
        };
        #endif
      `;

      const result = preprocessor.preprocess(input);
      assertEquals(result.processedContent.includes("interface Enabled"), true);
      assertEquals(result.processedContent.includes("void method()"), true);
    });

    it("should exclude content when macro is not defined for #ifdef", () => {
      const preprocessor = new IDLPreprocessor();
      const input = `
        #ifdef FEATURE_DISABLED
        interface Disabled {
          void method();
        };
        #endif
      `;

      const result = preprocessor.preprocess(input);
      assertEquals(result.processedContent.includes("interface Disabled"), false);
    });

    it("should include content when macro is not defined for #ifndef", () => {
      const preprocessor = new IDLPreprocessor();
      const input = `
        #ifndef FEATURE_DISABLED
        interface Enabled {
          void method();
        };
        #endif
      `;

      const result = preprocessor.preprocess(input);
      assertEquals(result.processedContent.includes("interface Enabled"), true);
    });

    it("should exclude content when macro is defined for #ifndef", () => {
      const preprocessor = new IDLPreprocessor();
      const input = `
        #define FEATURE_ENABLED
        #ifndef FEATURE_ENABLED
        interface Disabled {
          void method();
        };
        #endif
      `;

      const result = preprocessor.preprocess(input);
      assertEquals(result.processedContent.includes("interface Disabled"), false);
    });
  });

  describe("#if expressions", () => {
    it("should evaluate simple numeric expressions", () => {
      const preprocessor = new IDLPreprocessor();
      const input = `
        #if 1
        interface TrueCase {};
        #endif
        #if 0
        interface FalseCase {};
        #endif
      `;

      const result = preprocessor.preprocess(input);
      assertEquals(result.processedContent.includes("interface TrueCase"), true);
      assertEquals(result.processedContent.includes("interface FalseCase"), false);
    });

    it("should evaluate defined() operator", () => {
      const preprocessor = new IDLPreprocessor();
      const input = `
        #define FEATURE_A
        #if defined(FEATURE_A)
        interface FeatureA {};
        #endif
        #if defined(FEATURE_B)
        interface FeatureB {};
        #endif
      `;

      const result = preprocessor.preprocess(input);
      assertEquals(result.processedContent.includes("interface FeatureA"), true);
      assertEquals(result.processedContent.includes("interface FeatureB"), false);
    });

    it("should evaluate complex expressions with operators", () => {
      const preprocessor = new IDLPreprocessor();
      const input = `
        #define VERSION 2
        #define FEATURE_X

        #if VERSION > 1
        interface NewVersion {};
        #endif

        #if defined(FEATURE_X) && VERSION >= 2
        interface BothConditions {};
        #endif

        #if defined(FEATURE_Y) || VERSION > 1
        interface EitherCondition {};
        #endif
      `;

      const result = preprocessor.preprocess(input);
      assertEquals(result.processedContent.includes("interface NewVersion"), true);
      assertEquals(result.processedContent.includes("interface BothConditions"), true);
      assertEquals(result.processedContent.includes("interface EitherCondition"), true);
    });

    it("should handle macro substitution in expressions", () => {
      const preprocessor = new IDLPreprocessor();
      const input = `
        #define MAX_SIZE 100
        #define MIN_SIZE 10

        #if MAX_SIZE > MIN_SIZE
        interface SizeCheck {};
        #endif

        #if MAX_SIZE == 100
        interface ExactCheck {};
        #endif
      `;

      const result = preprocessor.preprocess(input);
      assertEquals(result.processedContent.includes("interface SizeCheck"), true);
      assertEquals(result.processedContent.includes("interface ExactCheck"), true);
    });
  });

  describe("#elif and #else", () => {
    it("should handle #elif branches correctly", () => {
      const preprocessor = new IDLPreprocessor();
      const input = `
        #define VERSION 2

        #if VERSION == 1
        interface Version1 {};
        #elif VERSION == 2
        interface Version2 {};
        #elif VERSION == 3
        interface Version3 {};
        #else
        interface VersionUnknown {};
        #endif
      `;

      const result = preprocessor.preprocess(input);
      assertEquals(result.processedContent.includes("interface Version1"), false);
      assertEquals(result.processedContent.includes("interface Version2"), true);
      assertEquals(result.processedContent.includes("interface Version3"), false);
      assertEquals(result.processedContent.includes("interface VersionUnknown"), false);
    });

    it("should handle #else when no previous condition matched", () => {
      const preprocessor = new IDLPreprocessor();
      const input = `
        #if 0
        interface IfBranch {};
        #elif 0
        interface ElifBranch {};
        #else
        interface ElseBranch {};
        #endif
      `;

      const result = preprocessor.preprocess(input);
      assertEquals(result.processedContent.includes("interface IfBranch"), false);
      assertEquals(result.processedContent.includes("interface ElifBranch"), false);
      assertEquals(result.processedContent.includes("interface ElseBranch"), true);
    });

    it("should not execute #else when previous condition matched", () => {
      const preprocessor = new IDLPreprocessor();
      const input = `
        #if 1
        interface IfBranch {};
        #else
        interface ElseBranch {};
        #endif
      `;

      const result = preprocessor.preprocess(input);
      assertEquals(result.processedContent.includes("interface IfBranch"), true);
      assertEquals(result.processedContent.includes("interface ElseBranch"), false);
    });
  });

  describe("Nested conditionals", () => {
    it("should handle nested #ifdef correctly", () => {
      const preprocessor = new IDLPreprocessor();
      const input = `
        #define OUTER
        #define INNER

        #ifdef OUTER
        interface OuterDefined {
          #ifdef INNER
          void innerMethod();
          #endif
          #ifndef MISSING
          void notMissing();
          #endif
        };
        #endif
      `;

      const result = preprocessor.preprocess(input);
      assertEquals(result.processedContent.includes("interface OuterDefined"), true);
      assertEquals(result.processedContent.includes("void innerMethod()"), true);
      assertEquals(result.processedContent.includes("void notMissing()"), true);
    });

    it("should not include nested content when outer condition is false", () => {
      const preprocessor = new IDLPreprocessor();
      const input = `
        #define INNER
        #define OUTER

        #ifndef OUTER
        interface OuterNotDefined {
          #ifdef INNER
          void innerMethod();
          #endif
        };
        #endif
      `;

      const result = preprocessor.preprocess(input);
      assertEquals(result.processedContent.includes("interface OuterNotDefined"), false);
      assertEquals(result.processedContent.includes("void innerMethod()"), false);
    });

    it("should handle complex nested conditions with #elif", () => {
      const preprocessor = new IDLPreprocessor();
      const input = `
        #define PLATFORM_LINUX
        #define ARCH_64

        #ifdef PLATFORM_LINUX
          #if defined(ARCH_64)
          interface Linux64 {};
          #elif defined(ARCH_32)
          interface Linux32 {};
          #endif
        #elif defined(PLATFORM_WINDOWS)
          #ifdef ARCH_64
          interface Windows64 {};
          #endif
        #endif
      `;

      const result = preprocessor.preprocess(input);
      assertEquals(result.processedContent.includes("interface Linux64"), true);
      assertEquals(result.processedContent.includes("interface Linux32"), false);
      assertEquals(result.processedContent.includes("interface Windows64"), false);
    });
  });

  describe("Macro definitions within conditionals", () => {
    it("should only define macros in active branches", () => {
      const preprocessor = new IDLPreprocessor();
      const input = `
        #if 1
        #define ACTIVE_MACRO 1
        #else
        #define INACTIVE_MACRO 1
        #endif

        #ifdef ACTIVE_MACRO
        interface ActiveDefined {};
        #endif

        #ifdef INACTIVE_MACRO
        interface InactiveDefined {};
        #endif
      `;

      const result = preprocessor.preprocess(input);
      assertEquals(result.processedContent.includes("interface ActiveDefined"), true);
      assertEquals(result.processedContent.includes("interface InactiveDefined"), false);
    });

    it("should handle conditional macro redefinition", () => {
      const preprocessor = new IDLPreprocessor();
      const input = `
        #define VERSION 1

        #if VERSION == 1
        #define API_LEVEL 10
        #else
        #define API_LEVEL 20
        #endif

        #if API_LEVEL == 10
        interface ApiLevel10 {};
        #endif
      `;

      const result = preprocessor.preprocess(input);
      assertEquals(result.processedContent.includes("interface ApiLevel10"), true);
    });
  });

  describe("Include guards", () => {
    it("should recognize and handle include guards", () => {
      const preprocessor = new IDLPreprocessor();
      const input = `
        #ifndef MY_HEADER_H
        #define MY_HEADER_H

        interface MyInterface {
          void method();
        };

        #endif // MY_HEADER_H
      `;

      const result = preprocessor.preprocess(input);
      assertEquals(result.processedContent.includes("interface MyInterface"), true);

      // Processing again should skip due to guard
      const result2 = preprocessor.preprocess(input);
      assertEquals(result2.processedContent.includes("interface MyInterface"), false);
    });
  });

  describe("Error handling", () => {
    it("should handle #error directive in active branch", () => {
      const preprocessor = new IDLPreprocessor();
      let errorMessage = "";
      const originalError = console.error;
      console.error = (msg: string) => {
        errorMessage = msg;
      };

      try {
        const input = `
          #if 1
          #error "This is an error"
          #endif
        `;

        preprocessor.preprocess(input);
        assertEquals(errorMessage.includes("This is an error"), true);
      }
      finally {
        console.error = originalError;
      }
    });

    it("should not process #error in inactive branch", () => {
      const preprocessor = new IDLPreprocessor();
      let errorMessage = "";
      const originalError = console.error;
      console.error = (msg: string) => {
        errorMessage = msg;
      };

      try {
        const input = `
          #if 0
          #error "This should not appear"
          #endif
        `;

        preprocessor.preprocess(input);
        assertEquals(errorMessage, "");
      }
      finally {
        console.error = originalError;
      }
    });

    it("should handle #warning directive", () => {
      const preprocessor = new IDLPreprocessor();
      let warningMessage = "";
      const originalWarn = console.warn;
      console.warn = (msg: string) => {
        warningMessage = msg;
      };

      try {
        const input = `
          #warning "This is a warning"
        `;

        preprocessor.preprocess(input);
        assertEquals(warningMessage.includes("This is a warning"), true);
      }
      finally {
        console.warn = originalWarn;
      }
    });
  });

  describe("Real-world scenarios", () => {
    it("should handle platform-specific code", () => {
      const preprocessor = new IDLPreprocessor();
      const input = `
        // Simulate different platforms
        #define _WIN32

        #ifdef _WIN32
          #define PLATFORM_NAME "Windows"
          interface WindowsSpecific {
            HANDLE getHandle();
          };
        #elif defined(__linux__)
          #define PLATFORM_NAME "Linux"
          interface LinuxSpecific {
            int getFileDescriptor();
          };
        #elif defined(__APPLE__)
          #define PLATFORM_NAME "macOS"
          interface MacSpecific {
            CFStringRef getName();
          };
        #else
          #error "Unsupported platform"
        #endif

        interface CrossPlatform {
          string getPlatform();
        };
      `;

      const result = preprocessor.preprocess(input);
      assertEquals(result.processedContent.includes("interface WindowsSpecific"), true);
      assertEquals(result.processedContent.includes("interface LinuxSpecific"), false);
      assertEquals(result.processedContent.includes("interface MacSpecific"), false);
      assertEquals(result.processedContent.includes("interface CrossPlatform"), true);
    });

    it("should handle feature flags", () => {
      const preprocessor = new IDLPreprocessor();
      const input = `
        #define FEATURE_LOGGING
        #define DEBUG_BUILD
        // #define FEATURE_EXPERIMENTAL  // Not enabled

        interface Core {
          void process();

          #ifdef FEATURE_LOGGING
          void log(in string message);
          #endif

          #ifdef DEBUG_BUILD
          void debug(in string info);
          #endif

          #ifdef FEATURE_EXPERIMENTAL
          void experimental();
          #endif
        };
      `;

      const result = preprocessor.preprocess(input);
      assertEquals(result.processedContent.includes("void process()"), true);
      assertEquals(result.processedContent.includes("void log("), true);
      assertEquals(result.processedContent.includes("void debug("), true);
      assertEquals(result.processedContent.includes("void experimental()"), false);
    });
  });
});

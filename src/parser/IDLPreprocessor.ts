import * as fs from 'node:fs';
import * as path from 'node:path';

export interface PreprocessorResult {
  processedContent: string;
  includes: string[];
  pragmas: Map<string, string>;
  defines: Map<string, string>;
}

export class IDLPreprocessor {
  private includeGuards: Set<string> = new Set();
  private defines: Map<string, string> = new Map();
  private pragmas: Map<string, string> = new Map();
  private includePaths: string[] = [];
  private processedIncludes: string[] = [];
  private currentFile: string = '';
  private baseDir: string = '';

  constructor(includePaths: string[] = []) {
    this.includePaths = includePaths;
  }

  preprocess(content: string, filePath?: string): PreprocessorResult {
    this.currentFile = filePath || 'inline';
    this.baseDir = filePath ? path.dirname(filePath) : process.cwd();
    
    const lines = content.split('\n');
    const processedLines: string[] = [];
    let insideIfndef = false;
    let skipContent = false;
    let currentGuard = '';

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Handle #ifndef
      if (line.startsWith('#ifndef')) {
        const guard = line.substring(7).trim();
        currentGuard = guard;
        if (this.includeGuards.has(guard)) {
          skipContent = true;
        }
        insideIfndef = true;
        continue;
      }
      
      // Handle #define
      if (line.startsWith('#define')) {
        const parts = line.substring(7).trim().split(/\s+/);
        const name = parts[0];
        const value = parts.slice(1).join(' ') || '1';
        
        if (insideIfndef && name === currentGuard) {
          this.includeGuards.add(name);
        }
        
        this.defines.set(name, value);
        continue;
      }
      
      // Handle #endif
      if (line.startsWith('#endif')) {
        if (insideIfndef) {
          insideIfndef = false;
          skipContent = false;
          currentGuard = '';
        }
        continue;
      }
      
      // Handle #ifdef
      if (line.startsWith('#ifdef')) {
        const macro = line.substring(6).trim();
        if (!this.defines.has(macro)) {
          skipContent = true;
        }
        continue;
      }
      
      // Handle #include
      if (line.startsWith('#include')) {
        if (!skipContent) {
          const includeMatch = line.match(/#include\s*["<]([^">]+)[">]/);
          if (includeMatch) {
            const includePath = includeMatch[1];
            const resolvedPath = this.resolveIncludePath(includePath);
            
            if (resolvedPath && !this.processedIncludes.includes(resolvedPath)) {
              this.processedIncludes.push(resolvedPath);
              
              try {
                const includeContent = fs.readFileSync(resolvedPath, 'utf-8');
                const preprocessed = this.preprocess(includeContent, resolvedPath);
                processedLines.push(`// BEGIN INCLUDE: ${includePath}`);
                processedLines.push(preprocessed.processedContent);
                processedLines.push(`// END INCLUDE: ${includePath}`);
              } catch (error) {
                console.warn(`Warning: Could not include file ${includePath}: ${error}`);
                processedLines.push(`// WARNING: Could not include ${includePath}`);
              }
            }
          }
        }
        continue;
      }
      
      // Handle #pragma
      if (line.startsWith('#pragma')) {
        const pragmaMatch = line.match(/#pragma\s+(\w+)\s+(.*)/);
        if (pragmaMatch) {
          const pragmaType = pragmaMatch[1];
          const pragmaValue = pragmaMatch[2].trim().replace(/"/g, '');
          this.pragmas.set(pragmaType, pragmaValue);
          
          // Keep pragma prefix as a comment for reference
          if (pragmaType === 'prefix') {
            processedLines.push(`// @pragma prefix: ${pragmaValue}`);
          }
        }
        continue;
      }
      
      // Handle #if, #elif, #else
      if (line.startsWith('#if ') || line.startsWith('#elif')) {
        // For now, skip complex conditionals
        skipContent = true;
        continue;
      }
      
      if (line.startsWith('#else')) {
        skipContent = !skipContent;
        continue;
      }
      
      // Skip content if we're in a false conditional
      if (skipContent) {
        continue;
      }
      
      // Replace defined macros in the line
      let processedLine = lines[i];
      for (const [macro, value] of this.defines) {
        const regex = new RegExp(`\\b${macro}\\b`, 'g');
        processedLine = processedLine.replace(regex, value);
      }
      
      processedLines.push(processedLine);
    }
    
    return {
      processedContent: processedLines.join('\n'),
      includes: this.processedIncludes,
      pragmas: this.pragmas,
      defines: this.defines
    };
  }

  private resolveIncludePath(includePath: string): string | null {
    // First try relative to current file
    const relativePath = path.join(this.baseDir, includePath);
    if (fs.existsSync(relativePath)) {
      return relativePath;
    }
    
    // Then try include paths
    for (const includeDir of this.includePaths) {
      const fullPath = path.join(includeDir, includePath);
      if (fs.existsSync(fullPath)) {
        return fullPath;
      }
    }
    
    // Try as absolute path
    if (fs.existsSync(includePath)) {
      return includePath;
    }
    
    return null;
  }
  
  reset(): void {
    this.includeGuards.clear();
    this.defines.clear();
    this.pragmas.clear();
    this.processedIncludes = [];
  }
}
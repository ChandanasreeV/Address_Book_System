// File: src/utils/IOUtils.ts
import * as readline from "readline-sync";

export class IOUtils {
  static prompt(message: string): string {
    return readline.question(message);
  }

  static log(message: string, success: boolean = true): void {
    console.log(success ? ` ${message}` : ` ${message}`);
  }
}
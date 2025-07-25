// File: src/utils/IOUtils.ts

// Importing readline-sync to enable synchronous user input from the command line
import * as readline from "readline-sync";

// Utility class to handle user input and formatted console logging
export class IOUtils {
  
  /**
   * Prompt the user for input using a custom message.
   * @param message - The prompt message shown to the user.
   * @returns The user input as a string.
   */
  static prompt(message: string): string {
    return readline.question(message);
  }

  /**
   * Logs a message to the console with a prefix icon indicating success or error.
   * @param message - The message to display.
   * @param success - Optional flag; if true (default), logs a success  message; if false, logs an error  message.
   */
  static log(message: string, success: boolean = true): void {
    console.log(success ? ` ${message}` : ` ${message}`);
  }
}
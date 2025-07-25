

import { IOUtils } from "./IOUtils";

export class Validator {
 
  static promptAndValidate(
    message: string,
    validatorFn: (input: string) => boolean,
    errorMsg: string,
    maxAttempts: number = 3
  ): string | null {
    let attempts = 0;

    while (attempts < maxAttempts) {
      const input = IOUtils.prompt(message).trim();

      if (validatorFn(input)) return input;

      IOUtils.log(errorMsg);
      attempts++;
    }

    IOUtils.log(`Maximum attempts (${maxAttempts}) reached.`);
    return null;
  }

  
    static validateNameOrThrow(name: string): void {
        if (!/^[A-Z][a-z]{2,}$/.test(name)) {
          throw new Error(" Invalid name. It must start with a capital letter and have at least 3 lowercase letters.");
        }
      }

  
    static isNameValid(name: string): boolean {
      return /^[A-Z][a-z]{2,}$/.test(name);
    }


 
  static isAddressValid(address: string): boolean {
    return /^[\w\s#,\/.-]{3,}$/.test(address);
  }

  static isZipValid(zip: string): boolean {
    return /^\d{6}$/.test(zip);
  }

  static isPhoneNumberValid(phone: string): boolean {
    return /^\+91\d{10}$/.test(phone);

  }

  static isEmailValid(email: string): boolean {
    return /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email);
  }
}
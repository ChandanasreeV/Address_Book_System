// File: src/utils/Validator.ts
export class Validator {
  static isZipcodeValid(zipcode: number): boolean {
    return /^[1-9][0-9]{5}$/.test(zipcode.toString());
  }

  static isPhoneNumberValid(phone: string): boolean {
    return /^\+91[6-9]\d{9}$/.test(phone);
  }

  static isEmailValid(email: string): boolean {
    return /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email);
  }
}
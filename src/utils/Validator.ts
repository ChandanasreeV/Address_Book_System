// File: src/utils/Validator.ts

// Validator class contains static methods for validating user inputs
export class Validator {

  /**
   * Validates names (First Name, Last Name, and Address Book Name).
   * - Must start with a capital letter.
   * - Must be at least 3 characters long.
   * - Only letters are allowed.
   */
  static isNameValid(name: string): boolean {
    return /^[A-Z][a-zA-Z]{2,}$/.test(name);
  }

  /**
   * Validates address.
   * - Must be at least 3 characters.
   * - Can include letters, numbers, spaces, and special characters: # , / . -
   */
  static isAddressValid(address: string): boolean {
    return /^[\w\s#,\/.-]{3,}$/.test(address);
  }

  /**
   * Validates city or state name.
   * - At least 2 characters.
   * - Only letters are allowed.
   */
  static isCityOrStateValid(city: string): boolean {
    return /^[A-Za-z]{2,}$/.test(city);
  }

  /**
   * Validates Indian ZIP code (PIN code).
   * - Must be exactly 6 digits.
   * - Cannot start with 0.
   */
  static isZipcodeValid(zipcode: number): boolean {
    return /^[1-9][0-9]{5}$/.test(zipcode.toString());
  }

  /**
   * Validates Indian phone numbers.
   * - Must start with +91 followed by 10 digits.
   */
  static isPhoneNumberValid(phone: string): boolean {
    return /^\+91[0-9]\d{9}$/.test(phone);
  }

  /**
   * Validates email address.
   * - Basic pattern check for user@domain.extension
   */
  static isEmailValid(email: string): boolean {
    return /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email);
  }

  /**
   * Validates address book name.
   * - Reuses same logic as person name.
   */
  static isAddressBookNameValid(name: string): boolean {
    return /^[A-Z][a-zA-Z]{2,}$/.test(name);
  }
}
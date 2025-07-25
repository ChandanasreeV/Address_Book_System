// File: src/model/ContactPerson.ts

import { Validator } from "../utils/Validator";
import { IOUtils } from "../utils/IOUtils";

// Represents an individual contact in the address book
export class ContactPerson {
  constructor(
    public firstName: string,
    public lastName: string,
    public address: string,
    public city: string,
    public state: string,
    public zipcode: number,
    public phoneNumber: string,
    public email: string
  ) {
    // Validate key fields during object construction
    this.zipcode = this.getValidZipcode(zipcode);
    this.phoneNumber = this.getValidPhoneNumber(phoneNumber);
    this.email = this.getValidEmail(email);
  }

  /**
   * Validates the ZIP code.
   * If invalid, prompts the user until a valid 6-digit ZIP is entered.
   */
  private getValidZipcode(zip: number): number {
    while (!Validator.isZipcodeValid(zip)) {
      IOUtils.log("Invalid Zipcode! It should be a 6-digit number not starting with 0.", false);
      zip = parseInt(IOUtils.prompt("Enter valid Zipcode: "));
    }
    return zip;
  }

  /**
   * Validates the phone number.
   * Must match Indian format: +91XXXXXXXXXX.
   */
  private getValidPhoneNumber(phone: string): string {
    while (!Validator.isPhoneNumberValid(phone)) {
      IOUtils.log("Invalid Phone Number! Format: +91XXXXXXXXXX", false);
      phone = IOUtils.prompt("Enter valid Phone Number: ");
    }
    return phone;
  }

  /**
   * Validates the email address.
   * Loops until a valid email format is entered.
   */
  private getValidEmail(email: string): string {
    while (!Validator.isEmailValid(email)) {
      IOUtils.log("Invalid Email Format!", false);
      email = IOUtils.prompt("Enter valid Email: ");
    }
    return email;
  }

  /**
   * Allows the user to update contact details interactively.
   * Zipcode, phone number, and email are revalidated during updates.
   */
  updateDetails(): void {
    this.lastName = IOUtils.prompt("Enter last name");
    this.address = IOUtils.prompt("Enter new Address: ");
    this.city = IOUtils.prompt("Enter new City: ");
    this.state = IOUtils.prompt("Enter new State: ");
    this.zipcode = this.getValidZipcode(parseInt(IOUtils.prompt("Enter new Zipcode: ")));
    this.phoneNumber = this.getValidPhoneNumber(IOUtils.prompt("Enter new Phone Number: "));
    this.email = this.getValidEmail(IOUtils.prompt("Enter new Email: "));
  }

  /**
   * Returns a formatted string with contact details.
   */
  toString(): string {
    return `${this.firstName} ${this.lastName}, ${this.address}, ${this.city}, ${this.state}, ${this.zipcode}, ${this.phoneNumber}, ${this.email}`;
  }

  /**
   * Returns the full name of the contact (used for duplicate checks).
   */
  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
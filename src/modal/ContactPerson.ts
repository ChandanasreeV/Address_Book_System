// File: src/model/ContactPerson.ts
import { Validator } from "../utils/Validator";
import { IOUtils } from "../utils/IOUtils";

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
    this.zipcode = this.getValidZipcode(zipcode);
    this.phoneNumber = this.getValidPhoneNumber(phoneNumber);
    this.email = this.getValidEmail(email);
  }

  private getValidZipcode(zip: number): number {
    while (!Validator.isZipcodeValid(zip)) {
      IOUtils.log("Invalid Zipcode! It should be a 6-digit number not starting with 0.", false);
      zip = parseInt(IOUtils.prompt("Enter valid Zipcode: "));
    }
    return zip;
  }

  private getValidPhoneNumber(phone: string): string {
    while (!Validator.isPhoneNumberValid(phone)) {
      IOUtils.log("Invalid Phone Number! Format: +91XXXXXXXXXX", false);
      phone = IOUtils.prompt("Enter valid Phone Number: ");
    }
    return phone;
  }

  private getValidEmail(email: string): string {
    while (!Validator.isEmailValid(email)) {
      IOUtils.log("Invalid Email Format!", false);
      email = IOUtils.prompt("Enter valid Email: ");
    }
    return email;
  }

  updateDetails(): void {
    this.address = IOUtils.prompt("Enter new Address: ");
    this.city = IOUtils.prompt("Enter new City: ");
    this.state = IOUtils.prompt("Enter new State: ");
    this.zipcode = this.getValidZipcode(parseInt(IOUtils.prompt("Enter new Zipcode: ")));
    this.phoneNumber = this.getValidPhoneNumber(IOUtils.prompt("Enter new Phone Number: "));
    this.email = this.getValidEmail(IOUtils.prompt("Enter new Email: "));
  }

  toString(): string {
    return `${this.firstName} ${this.lastName}, ${this.address}, ${this.city}, ${this.state}, ${this.zipcode}, ${this.phoneNumber}, ${this.email}`;
  }
}
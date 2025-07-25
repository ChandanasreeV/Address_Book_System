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
    this.validateZipcode(zipcode);
    this.validatePhoneNumber(phoneNumber);
    this.validateEmail(email);
  }

  validateZipcode(zipcode: number): void {
    const zipRegex = /^[1-9][0-9]{5}$/;
    if (!zipRegex.test(zipcode.toString())) {
      throw new Error(" Invalid Zipcode! It should be a 6-digit number not starting with 0.");
    }
  }

  validatePhoneNumber(phone: string): void {
    const phoneRegex = /^\+91[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      throw new Error(" Invalid Phone Number! It must start with +91 and be followed by a valid 10-digit Indian number.");
    }
  }

  validateEmail(email: string): void {
    const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      throw new Error(" Invalid Email Format!");
    }
  }

  toString(): string {
    return `${this.firstName} ${this.lastName}, ${this.city}, ${this.state}, ${this.zipcode}, ${this.phoneNumber}, ${this.email}`;
  }
}
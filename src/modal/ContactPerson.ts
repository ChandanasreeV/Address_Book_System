// models/Contact.ts
export class Contact {
  constructor(
    public readonly id: string,
    public firstName: string,
    public lastName: string,
    public address: string,
    public city: string,
    public state: string,
    public zip: string,
    public phone: string,
    public email: string
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this.firstName.trim() || !this.lastName.trim()) {
      throw new Error("First and last names are required");
    }
    if (!/^\d{6}$/.test(this.zip)) {
      throw new Error("Zip code must be 6 digits");
    }
    if (!/^\+?\d{10,15}$/.test(this.phone)) {
      throw new Error("Invalid phone number format");
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
      throw new Error("Invalid email format");
    }
  }

  toString(): string {
    return `${this.firstName} ${this.lastName}\n` +
           `${this.address}, ${this.city}, ${this.state} ${this.zip}\n` +
           `Phone: ${this.phone} | Email: ${this.email}`;
  }
}


export class ContactPerson {
  constructor(
    public firstName: string,
    public lastName: string,
    public address: string,
    public city: string,
    public state: string,
    public zip: number,
    public phoneNumber: string,
    public email: string
  ) {}

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  updateDetails(newData: Required<ContactPerson>) {
    Object.assign(this, newData);
  }

  toString(): string {
    return `${this.getFullName()}, ${this.address}, ${this.city}, ${this.state} - ${this.zip},  ${this.phoneNumber},  ${this.email}`;
  }
}
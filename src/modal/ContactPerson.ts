

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

  getFirstName():string{
    return`${this.firstName}`
  }
  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  updateDetails(newData: Required<ContactPerson>) {
    Object.assign(this, newData);
  }
toString(): string {
  return `
 Name        : ${this.getFullName()}
 Address     : ${this.address}
 City        : ${this.city}
 State       : ${this.state}
 Zip Code    : ${this.zip}
 Phone       : ${this.phoneNumber}
  Email       : ${this.email}
─────────────────────────────────────`;
}

}
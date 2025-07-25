// File: src/model/AddressBook.ts
import { IOUtils } from "../utils/IOUtils";
import { ContactPerson } from "./ContactPerson";




export class AddressBook {
  private contacts: ContactPerson[] = [];

  addContact(contact: ContactPerson): void {
    this.contacts.push(contact);
    IOUtils.log("Contact added successfully.");
  }

  getAllContacts(): void {
    if (this.contacts.length === 0) {
      IOUtils.log("No contacts available.", false);
      return;
    }

    IOUtils.log("Contact List:");
    this.contacts.forEach((contact, i) =>
      console.log(`${i + 1}. ${contact.toString()}`)
    );
  }

  editContact(firstName: string): void {
    const contact = this.contacts.find((c) => c.firstName === firstName);
    if (contact) {
      contact.updateDetails();
      IOUtils.log("Contact updated successfully.");
    } else {
      IOUtils.log("Contact not found.", false);
    }
  }

  deleteContact(firstName: string): void {
    const index = this.contacts.findIndex((c) => c.firstName === firstName);
    if (index !== -1) {
      this.contacts.splice(index, 1);
      IOUtils.log("Contact deleted successfully.");
    } else {
      IOUtils.log("Contact not found.", false);
    }
  }
}
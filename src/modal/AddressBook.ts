// services/AddressBook.ts

import { Contact } from "./ContactPerson";

export class AddressBook {
  private contacts: Contact[] = [];
  private nextId = 1;

  addContact(contactData: Omit<Contact, 'id'>): Contact {
    const contact = new Contact(
      (this.nextId++).toString(),
      contactData.firstName,
      contactData.lastName,
      contactData.address,
      contactData.city,
      contactData.state,
      contactData.zip,
      contactData.phone,
      contactData.email
    );

    if (this.isDuplicate(contact)) {
      throw new Error("Contact already exists");
    }

    this.contacts.push(contact);
    return contact;
  }

  private isDuplicate(newContact: Contact): boolean {
    return this.contacts.some(c => 
      c.phone === newContact.phone || 
      c.email === newContact.email
    );
  }

  displayContacts(): void {
    if (this.contacts.length === 0) {
      console.log("No contacts found");
      return;
    }
    console.log("\nAddress Book Contacts:");
    this.contacts.forEach((contact, index) => {
      console.log(`${index + 1}. ${contact.toString()}\n`);
    });
  }
}
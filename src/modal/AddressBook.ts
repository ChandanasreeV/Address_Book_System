// File: src/model/AddressBook.ts

import { ContactPerson } from "./ContactPerson";
import { IOUtils } from "../utils/IOUtils";

// Class representing a single Address Book, containing a list of ContactPerson objects
export class AddressBook {
  // Internal list of contacts
  private contacts: ContactPerson[] = [];

  /**
   * Adds a contact to the address book after checking for duplicates.
   * Duplicate check is based on the full name (firstName + lastName).
   * @param contact - The ContactPerson object to be added.
   */
  addContact(contact: ContactPerson): void {
    const isDuplicate = this.contacts.some(
      (c) => c.getFullName() === contact.getFullName()
    );

    if (isDuplicate) {
      IOUtils.log(
        ` Duplicate Entry: ${contact.getFullName()} already exists in this Address Book.`,
        false
      );
    } else {
      this.contacts.push(contact);
      IOUtils.log(" Contact added successfully.");
    }
  }

  /**
   * Displays all contacts in the address book.
   * If no contacts exist, shows an appropriate message.
   */
  getAllContacts(): void {
    if (this.contacts.length === 0) {
      IOUtils.log(" No contacts available.", false);
      return;
    }

    IOUtils.log(" Contact List:");
    this.contacts.forEach((contact, i) => {
      console.log(`${i + 1}. ${contact.toString()}`);
    });
  }

  /**
   * Finds and allows the user to update a contact based on the first name.
   * @param firstName - The first name of the contact to be edited.
   */
  editContact(firstName: string): void {
    const contact = this.contacts.find((c) => c.firstName === firstName);

    if (contact) {
      contact.updateDetails(); // Triggers interactive update via IOUtils
      IOUtils.log(" Contact updated successfully.");
    } else {
      IOUtils.log(" Contact not found.", false);
    }
  }

  /**
   * Deletes a contact from the address book by first name.
   * @param firstName - The first name of the contact to be deleted.
   */
  deleteContact(firstName: string): void {
    const index = this.contacts.findIndex((c) => c.firstName === firstName);

    if (index !== -1) {
      this.contacts.splice(index, 1);
      IOUtils.log(" Contact deleted successfully.");
    } else {
      IOUtils.log(" Contact not found.", false);
    }
  }
}
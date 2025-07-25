
// File: src/manager/AddressBookManager.ts
import { AddressBook } from "../modal/AddressBook";
import { ContactPerson } from "../modal/ContactPerson";

import { ContactInputHelper } from "../utils/ContactInputHelper";
import { IOUtils } from "../utils/IOUtils";
import { Validator } from "../utils/Validator";

// Class responsible for managing multiple address books and operations on them
export class AddressBookManager {
  private addressBooks: Map<string, AddressBook> = new Map();

  prompt(msg: string): string {
    return IOUtils.prompt(msg);
  }

  addAddressBook(name: string): void {
    if (!Validator.isNameValid(name)) {
      IOUtils.log("Invalid Address Book name.", false);
      return;
    }

    if (this.addressBooks.has(name)) {
      IOUtils.log("Address Book already exists.", false);
      return;
    }

    this.addressBooks.set(name, new AddressBook());
    IOUtils.log(`Created Address Book: ${name}`);
  }
  selectAddressBook(): string | undefined {
  if (this.addressBooks.size === 0) {
    IOUtils.log("No address books available.", false);
    return;
  }

  const names = Array.from(this.addressBooks.keys());
  IOUtils.log("Available Address Books:");
  names.forEach((name) => {
    IOUtils.log(` ${name}`);
  });

  const selectedName = IOUtils.prompt("Enter name of Address Book to select: ");
  if (!this.addressBooks.has(selectedName)) {
    IOUtils.log(" No such Address Book exists.", false);
    return;
  }

  return selectedName;
}

  getBook(name: string): AddressBook | undefined {
    return this.addressBooks.get(name);
  }

  findInAllBooksByCity(city: string): ContactPerson[] {
    const allContacts: ContactPerson[] = [];
    this.addressBooks.forEach(book => {
      allContacts.push(...book.findByCity(city));
    });
    return allContacts;
  }

  findInAllBooksByState(state: string): ContactPerson[] {
    const allContacts: ContactPerson[] = [];
    this.addressBooks.forEach(book => {
      allContacts.push(...book.findByState(state));
    });
    return allContacts;
  }

  listAllBooks(): void {
    if (this.addressBooks.size === 0) {
      IOUtils.log("No address books available.", false);
      return;
    }

    IOUtils.log("Available Address Books:");
    this.addressBooks.forEach((_, name) => {
      IOUtils.log(` ${name}`);
    });
  }

  deleteBook(name: string): void {
    if (this.addressBooks.delete(name)) {
      IOUtils.log(`Deleted Address Book: ${name}`);
    } else {
      IOUtils.log("Address Book not found.", false);
    }
  }

  manageAddressBook(name: string): void {
    const addressBook = this.getBook(name);
    if (!addressBook) {
      IOUtils.log("Address Book not found.", false);
      return;
    }

    let option: string;
    do {
      console.log("\n Managing Address Book");
      console.log("1. Add Contact\n2. View Contacts\n3. Edit Contact\n4. Delete Contact\n5. Find by City\n6. Find by State\n7. Find in All Books by City\n8. Find in All Books by State\n9. Exit");
      option = IOUtils.prompt("Choose an option: ");

      switch (option) {
         case "1":
        const contact = ContactInputHelper.getValidatedContact();
        if (contact) {
          addressBook.addContact(contact);
        } else {
          IOUtils.log(" Failed to add contact due to invalid input.");
        }
         break;

        case "2":
          IOUtils.displayContactsList("All Contacts", addressBook.getAllContacts());
          break;
        case "3":
          const editName = IOUtils.prompt("Enter First Name of contact to edit: ");
          addressBook.editContact(editName);
          break;
        case "4":
          const delName = IOUtils.prompt("Enter First Name of contact to delete: ");
          addressBook.deleteContact(delName);
          break;
        case "5":
          const city = IOUtils.prompt("Enter City to search contacts: ");
          IOUtils.displayContactsList(`Contacts in City: ${city}`, addressBook.findByCity(city));
          break;
        case "6":
          const state = IOUtils.prompt("Enter State to search contacts: ");
          IOUtils.displayContactsList(`Contacts in State: ${state}`, addressBook.findByState(state));
          break;
        case "7":
          const cityAll = IOUtils.prompt("Enter City to search across all books: ");
          IOUtils.displayContactsList(`All Books - Contacts in City: ${cityAll}`, this.findInAllBooksByCity(cityAll));
          break;
        case "8":
          const stateAll = IOUtils.prompt("Enter State to search across all books: ");
          IOUtils.displayContactsList(`All Books - Contacts in State: ${stateAll}`, this.findInAllBooksByState(stateAll));
          break;
        case "9":
          IOUtils.log("Exiting address book management.");
          break;
        default:
          IOUtils.log("Invalid option. Please try again.", false);
      }
    } while (option !== "9");
  }
}
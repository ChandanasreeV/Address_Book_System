// File: src/manager/AddressBookManager.ts

import { AddressBook } from "../modal/AddressBook";
import { ContactPerson } from "../modal/ContactPerson";

import { IOUtils } from "../utils/IOUtils";

export class AddressBookManager {
  private addressBooks: Map<string, AddressBook> = new Map();

  prompt(msg: string): string {
    return IOUtils.prompt(msg);
  }

  addAddressBook(): void {
    const name = IOUtils.prompt("Enter new Address Book name: ");
    if (this.addressBooks.has(name)) {
      IOUtils.log(`Address Book '${name}' already exists.`, false);
      return;
    }
    this.addressBooks.set(name, new AddressBook());
    IOUtils.log(`New Address Book '${name}' created.`);
  }

 selectAddressBook(): AddressBook | null {
  if (this.addressBooks.size === 0) {
    IOUtils.log("No address books available.", false);
    return null;
  }

  const names = Array.from(this.addressBooks.keys());
  console.log("Available Address Books:");
  names.forEach((name) => console.log(`📘 ${name}`));

  const selectedName = IOUtils.prompt("Enter the name of the Address Book to select: ").trim();

  if (this.addressBooks.has(selectedName)) {
    return this.addressBooks.get(selectedName)!;
  }

  IOUtils.log("Address Book not found with that name.", false);
  return null;
}


  manageAddressBook(addressBook: AddressBook): void {
    let option: string;
    do {
      console.log("\n📘 Managing Address Book");
      console.log("1. Add Contact\n2. View Contacts\n3. Edit Contact\n4. Delete Contact\n5. Exit");
      option = IOUtils.prompt("Choose an option: ");

      switch (option) {
        case "1":
          const firstName = IOUtils.prompt("Enter First Name: ");
          const lastName = IOUtils.prompt("Enter Last Name: ");
          const address = IOUtils.prompt("Enter Address: ");
          const city = IOUtils.prompt("Enter City: ");
          const state = IOUtils.prompt("Enter State: ");
          const zipcode = parseInt(IOUtils.prompt("Enter Zipcode: "));
          const phoneNumber = IOUtils.prompt("Enter Phone Number: ");
          const email = IOUtils.prompt("Enter Email: ");
          const contact = new ContactPerson(firstName, lastName, address, city, state, zipcode, phoneNumber, email);
          addressBook.addContact(contact);
          break;

        case "2":
          addressBook.getAllContacts();
          break;

        case "3":
          const nameToEdit = IOUtils.prompt("Enter First Name of contact to edit: ");
          addressBook.editContact(nameToEdit);
          break;

        case "4":
          const nameToDelete = IOUtils.prompt("Enter First Name of contact to delete: ");
          addressBook.deleteContact(nameToDelete);
          break;

        case "5":
          IOUtils.log("Exiting address book management.");
          break;

        default:
          IOUtils.log("Invalid option. Please try again.", false);
      }
    } while (option !== "5");
  }
}
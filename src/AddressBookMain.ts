
import { AddressBook } from './modal/AddressBook';
import { ContactPerson } from './modal/ContactPerson';

import * as readline from "readline-sync";

class AddressBookMain {
  private addressBook = new AddressBook();

  welcomeToAddressBook(): void {
    console.log(" Welcome to the Address Book Program");
  }
  // DRY Helper method for prompting input with optional validation
  private promptInput(message: string, validator?: (input: string) => boolean): string {
    while (true) {
      const input = readline.question(message).trim();
      if (!input) {
        console.log(" Input cannot be empty. Try again.");
        continue;
      }

      if (validator && !validator(input)) {
        console.log(" Invalid input format. Try again.");
        continue;
      }

      return input;
    }
  }

  //  Method to get contact data from user
  getContactFromUser(): ContactPerson {
    const firstName = this.promptInput("First Name: ");
    const lastName = this.promptInput("Last Name: ");
    const address = this.promptInput("Address: ");
    const city = this.promptInput("City: ");
    const state = this.promptInput("State: ");
    const zipcode = parseInt(this.promptInput("Zipcode (6 digits): ", input => /^\d{6}$/.test(input)));
    const phoneNumber = this.promptInput("Phone Number (with +91): ", input => /^\+91[6-9]\d{9}$/.test(input));
    const email = this.promptInput("Email: ", input => /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(input));

    return new ContactPerson(
      firstName,
      lastName,
      address,
      city,
      state,
      zipcode,
      phoneNumber,
      email
    );
  }

  run(): void {
    this.welcomeToAddressBook();
    const personContact = this.getContactFromUser();       //  Valid contact input
    this.addressBook.addContact(personContact);            //  Add contact
    this.addressBook.getAllContacts();                     //  Show all
    const nameToEdit = this.promptInput("Enter first name to edit: ");
    this.addressBook.editContact(nameToEdit);              //  Edit contact
    this.addressBook.getAllContacts();                     //  Show all after editing
  }
}

//  Entry point
const addressApp = new AddressBookMain();
addressApp.run();
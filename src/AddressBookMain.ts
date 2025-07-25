import * as readline from "readline-sync";
import { AddressBook } from "./modal/AddressBook";
import { Contact } from "./modal/ContactPerson";


class AddressBookApp {
  private addressBook = new AddressBook();

  private showMenu(): void {
    console.log("\n==== Address Book ====");
    console.log("1. Add Contact");
    console.log("2. View Contacts");
    console.log("3. Exit");
  }

  private getContactDetails(): Omit<Contact, 'id'> {
    console.log("\nEnter Contact Details:");
    return {
      firstName: readline.question("First Name: "),
      lastName: readline.question("Last Name: "),
      address: readline.question("Address: "),
      city: readline.question("City: "),
      state: readline.question("State: "),
      zip: readline.question("Zip Code (6 digits): "),
      phone: readline.question("Phone: "),
      email: readline.question("Email: ")
    };
  }

  run(): void {
    console.log("Welcome to Address Book System");

    while (true) {
      this.showMenu();
      const choice = readline.question("Choose option (1-3): ");

      switch (choice) {
        case "1":
          try {
            const contact = this.addressBook.addContact(this.getContactDetails());
            console.log("\n Contact added successfully!");
            console.log(contact.toString());
          } catch (error) {
            if (error instanceof Error) {
              console.error("\n Error:", error.message);
            } else {
              console.error("\n An unknown error occurred");
            }
          }
          break;

        case "2":
          this.addressBook.displayContacts();
          break;

        case "3":
          console.log(" Goodbye!");
          return;

        default:
          console.log(" Invalid choice. Please try again.");
      }
    }
  }
}

// Start the application
new AddressBookApp().run();
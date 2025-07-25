import * as readline from "readline-sync";
import { ContactPerson } from "./ContactPerson";

export class AddressBook {
  private contacts: ContactPerson[] = [];

  addContact(contact: ContactPerson): void {
    this.contacts.push(contact);
    console.log("✅ Contact added successfully.");
  }

  getAllContacts(): void {
    if (this.contacts.length === 0) {
      console.log("📭 No contacts available.");
      return;
    }

    console.log("📇 Contact List:");
    this.contacts.forEach((contact, i) =>
      console.log(`${i + 1}. ${contact.toString()}`)
    );
  }

  editContact(firstName: string): boolean {
    const contact = this.contacts.find(c => c.firstName === firstName);

    if (!contact) {
      console.log("❌ Contact not found.");
      return false;
    }

    const confirm = this.prompt("Do you want to edit this contact? (yes/no): ").toLowerCase();
    if (confirm !== "yes") {
      console.log("✋ Edit cancelled.");
      return false;
    }
 
    try {
      const lastName = this.prompt("Last Name: ");
      const address = this.prompt("Address: ");
      const city = this.prompt("City: ");
      const state = this.prompt("State: ");
      const zipcodeStr = this.prompt("Zipcode: ", true);
      const phoneNumber = this.prompt("Phone Number (with +91): ");
      const email = this.prompt("Email: ");

      // Validate manually using helper methods
      const updatedZip = parseInt(zipcodeStr);
      contact['validateZipcode'](updatedZip);
      contact['validatePhoneNumber'](phoneNumber);
      contact['validateEmail'](email);

      // Now update the fields
      contact.lastName = lastName;
      contact.address = address;
      contact.city = city;
      contact.state = state;
      contact.zipcode = updatedZip;
      contact.phoneNumber = phoneNumber;
      contact.email = email;

      console.log("✅ Contact updated successfully.");
      return true;
    } catch (error: any) {
      console.error("❌ Error updating contact:", error.message);
      return false;
    }
  }

  private prompt(promptText: string, isNumber: boolean = false): string {
    while (true) {
      const input = readline.question(promptText).trim();

      if (!input) {
        console.log("❌ Input cannot be empty. Please try again.");
        continue;
      }

      if (isNumber) {
        if (!/^\d+$/.test(input)) {
          console.log("❌ Invalid number. Please enter digits only.");
          continue;
        }
      }

      return input;
    }
  }
}
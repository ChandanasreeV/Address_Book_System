

import { ContactPerson } from "./ContactPerson";
import { IOUtils } from "../utils/IOUtils";
import { ContactInputHelper } from "../utils/ContactInputHelper";

export class AddressBook {
  private contacts: ContactPerson[] = [];

  addContact(contact: ContactPerson): void {
    if (this.contacts.some(c => c.getFullName() === contact.getFullName())) {
      IOUtils.log(`Duplicate contact: ${contact.getFullName()}`, false);
      return;
    }
    this.contacts.push(contact);
    IOUtils.log("Contact added successfully.");
  }

  getAllContacts(): ContactPerson[] {
    return this.contacts;
  }
  
  editContact(firstName: string): boolean {
    const contact = this.contacts.find(c => c.firstName === firstName);
    if (!contact) {
      IOUtils.log(" Contact not found.", false);
      return false;
    }

    const confirm = IOUtils.prompt("Do you want to edit this contact? (yes/no): ").trim().toLowerCase();
    if (confirm !== "yes") {
      IOUtils.log(" Edit cancelled.");
      return false;
    }

    try {
        const firstName = ContactInputHelper.promptAndValidateOptional(
        `Enter Last Name if not to change leave blank (${contact.firstName}): `,
        ContactInputHelper.validateName,
        contact.firstName
      );
      // Prompt and validate each field. If left blank, keep original.
      const lastName = ContactInputHelper.promptAndValidateOptional(
        `Enter Last Name if not to change leave blank (${contact.lastName}): `,
        ContactInputHelper.validateName,
        contact.lastName
      );

      const address = ContactInputHelper.promptAndValidateOptional(
        `Enter Address if not to change leave blank(${contact.address}): `,
        ContactInputHelper.validateAddress,
        contact.address
      );

      const city = ContactInputHelper.promptAndValidateOptional(
        `Enter City if not to change leave blank (${contact.city}): `,
        ContactInputHelper.validateName,
        contact.city
      );

      const state = ContactInputHelper.promptAndValidateOptional(
        `Enter State if not to change leave blank (${contact.state}): `,
        ContactInputHelper.validateName,
        contact.state
      );

      const zipStr = ContactInputHelper.promptAndValidateOptional(
        `Enter Zipcode if not to change leave blank(${contact.zip}): `,
        ContactInputHelper.validateZip,
        contact.zip.toString()
      );
      const zip = parseInt(zipStr);

      const phoneNumber = ContactInputHelper.promptAndValidateOptional(
        `Enter Phone Number if not to change leave blank(${contact.phoneNumber}): `,
        ContactInputHelper.validatePhoneNumber,
        contact.phoneNumber
      );

      const email = ContactInputHelper.promptAndValidateOptional(
        `Enter Email if not to change leave blank (${contact.email}): `,
        ContactInputHelper.validateEmail,
        contact.email
      );

      // Assign updated values
      contact.lastName = lastName;
      contact.address = address;
      contact.city = city;
      contact.state = state;
      contact.zip = zip;
      contact.phoneNumber = phoneNumber;
      contact.email = email;

      IOUtils.log(" Contact updated successfully.");
      return true;
    } catch (error: any) {
      IOUtils.log(` Error: ${error.message}`, false);
      return false;
    }
  }

  deleteContact(firstName: string): void {
  const index = this.contacts.findIndex(c => c.firstName === firstName);

  if (index === -1) {
    IOUtils.log(" Contact not found.", false);
    return;
  }

  const contact = this.contacts[index];
  const confirmation = IOUtils.prompt(
    ` Are you sure you want to delete "${contact.getFullName()}"? (yes/no): `
  ).trim().toLowerCase();

  if (confirmation !== "yes") {
    IOUtils.log(" Deletion cancelled.");
    return;
  }

  this.contacts.splice(index, 1);
  IOUtils.log(" Contact deleted successfully.");
}


  findByCity(city: string): ContactPerson[] {
    return this.contacts.filter(c => c.city.toLowerCase() === city.toLowerCase());
  }

  findByState(state: string): ContactPerson[] {
    return this.contacts.filter(c => c.state.toLowerCase() === state.toLowerCase());
  }
}
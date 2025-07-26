// File: src/model/AddressBook.ts
import { ContactPerson } from "./ContactPerson";
import { IOUtils } from "../utils/IOUtils";
import { ContactInputHelper } from "../utils/ContactInputHelper";

export class AddressBook {
  private contacts: ContactPerson[] = [];
  private cityMap: Map<string, ContactPerson[]> = new Map();
  private stateMap: Map<string, ContactPerson[]> = new Map();
  

  private updateMaps(contact: ContactPerson): void {
    const city = contact.city.toLowerCase();
    const state = contact.state.toLowerCase();

    if (!this.cityMap.has(city)) this.cityMap.set(city, []);
    if (!this.stateMap.has(state)) this.stateMap.set(state, []);

    this.cityMap.get(city)?.push(contact);
    this.stateMap.get(state)?.push(contact);
  }

  private removeFromMaps(contact: ContactPerson): void {
    const city = contact.city.toLowerCase();
    const state = contact.state.toLowerCase();

    this.cityMap.set(city, (this.cityMap.get(city) || []).filter(c => c !== contact));
    this.stateMap.set(state, (this.stateMap.get(state) || []).filter(c => c !== contact));
  }

  addContact(contact: ContactPerson): void {
    if (this.contacts.some(c => c.getFullName() === contact.getFullName())) {
      IOUtils.log(`Duplicate contact: ${contact.getFullName()}`, false);
      return;
    }
    this.contacts.push(contact);
    this.updateMaps(contact);
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
      const oldCity = contact.city.toLowerCase();
      const oldState = contact.state.toLowerCase();

      const firstName = ContactInputHelper.promptAndValidateOptional(
        `Enter First Name if not to change leave blank (${contact.firstName}): `,
        ContactInputHelper.validateName,
        contact.firstName
      );
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

      // If city/state changed, update maps
      if (oldCity !== city.toLowerCase() || oldState !== state.toLowerCase()) {
        this.removeFromMaps(contact); // remove old
        contact.city = city;
        contact.state = state;
        this.updateMaps(contact); // add new
      }

      contact.firstName = firstName;
      contact.lastName = lastName;
      contact.address = address;
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
    this.removeFromMaps(contact);
    IOUtils.log(" Contact deleted successfully.");
  }

  findByCity(city: string): ContactPerson[] {
    return this.cityMap.get(city.toLowerCase()) || [];
  }

  findByState(state: string): ContactPerson[] {
    return this.stateMap.get(state.toLowerCase()) || [];
  }

  getCityWiseMap(): Map<string, ContactPerson[]> {
    return this.cityMap;
  }

  getStateWiseMap(): Map<string, ContactPerson[]> {
    return this.stateMap;
  }
}
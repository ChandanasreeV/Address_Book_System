import { ContactPerson } from "./ContactPerson";
import { IOUtils } from "../utils/IOUtils";
import { ContactInputHelper } from "../utils/ContactInputHelper";

export class AddressBook {
  private contacts: ContactPerson[] = [];
  private cityMap: Map<string, ContactPerson[]> = new Map();
  private stateMap: Map<string, ContactPerson[]> = new Map();
  private nameMap: Map<string, ContactPerson[]> = new Map();

  // --- Internal Methods to Manage Maps ---
 private updateMaps(contact: ContactPerson): void {
  const city = contact.city.toLowerCase();
  const state = contact.state.toLowerCase();
  const name = contact.getFullName().toLowerCase();

  if (!this.cityMap.has(city)) this.cityMap.set(city, []);
  if (!this.stateMap.has(state)) this.stateMap.set(state, []);
  if (!this.nameMap.has(name)) this.nameMap.set(name, []);

  this.cityMap.get(city)!.push(contact);
  this.stateMap.get(state)!.push(contact);
  this.nameMap.get(name)!.push(contact);
}


 private removeFromMaps(contact: ContactPerson): void {
  const city = contact.city.toLowerCase();
  const state = contact.state.toLowerCase();
  const name = contact.getFullName().toLowerCase();

  this.cityMap.set(city, (this.cityMap.get(city) || []).filter(c => c !== contact));
  this.stateMap.set(state, (this.stateMap.get(state) || []).filter(c => c !== contact));
  this.nameMap.set(name, (this.nameMap.get(name) || []).filter(c => c !== contact));
}


  // --- CRUD Operations ---
  addContact(contact: ContactPerson): void {
    if (this.contacts.some((c) => c.getFullName() === contact.getFullName())) {
      IOUtils.log(`Duplicate contact: ${contact.getFullName()}`, false);
      return;
    }
    this.contacts.push(contact);
    this.updateMaps(contact);
    IOUtils.log(" Contact added successfully.");
  }

  getAllContacts(): ContactPerson[] {
    return this.contacts;
  }

  editContact(firstName: string): boolean {
    const contact = this.contacts.find((c) => c.firstName === firstName);
    if (!contact) {
      IOUtils.log(" Contact not found.", false);
      return false;
    }

    const confirm = IOUtils.prompt(
      "Do you want to edit this contact? (yes/no): "
    )
      .trim()
      .toLowerCase();
    if (confirm !== "yes") {
      IOUtils.log(" Edit cancelled.");
      return false;
    }

    try {
      const oldCity = contact.city.toLowerCase();
      const oldState = contact.state.toLowerCase();

      contact.firstName = ContactInputHelper.promptAndValidateOptional(
        `First Name (${contact.firstName}): `,
        ContactInputHelper.validateName,
        contact.firstName
      );
      contact.lastName = ContactInputHelper.promptAndValidateOptional(
        `Last Name (${contact.lastName}): `,
        ContactInputHelper.validateName,
        contact.lastName
      );
      contact.address = ContactInputHelper.promptAndValidateOptional(
        `Address (${contact.address}): `,
        ContactInputHelper.validateAddress,
        contact.address
      );

      const newCity = ContactInputHelper.promptAndValidateOptional(
        `City (${contact.city}): `,
        ContactInputHelper.validateName,
        contact.city
      );
      const newState = ContactInputHelper.promptAndValidateOptional(
        `State (${contact.state}): `,
        ContactInputHelper.validateName,
        contact.state
      );

      if (
        oldCity !== newCity.toLowerCase() ||
        oldState !== newState.toLowerCase()
      ) {
        this.removeFromMaps(contact);
        contact.city = newCity;
        contact.state = newState;
        this.updateMaps(contact);
      }

      const zipStr = ContactInputHelper.promptAndValidateOptional(
        `Zip (${contact.zip}): `,
        ContactInputHelper.validateZip,
        contact.zip.toString()
      );
      contact.zip = parseInt(zipStr);

      contact.phoneNumber = ContactInputHelper.promptAndValidateOptional(
        `Phone (${contact.phoneNumber}): `,
        ContactInputHelper.validatePhoneNumber,
        contact.phoneNumber
      );
      contact.email = ContactInputHelper.promptAndValidateOptional(
        `Email (${contact.email}): `,
        ContactInputHelper.validateEmail,
        contact.email
      );

      IOUtils.log(" Contact updated successfully.");
      return true;
    } catch (error: any) {
      IOUtils.log(` Error: ${error.message}`, false);
      return false;
    }
  }

  deleteContact(firstName: string): void {
    const index = this.contacts.findIndex((c) => c.firstName === firstName);
    if (index === -1) {
      IOUtils.log(" Contact not found.", false);
      return;
    }

    const contact = this.contacts[index];
    const confirmation = IOUtils.prompt(
      ` Are you sure you want to delete "${contact.getFullName()}"? (yes/no): `
    )
      .trim()
      .toLowerCase();

    if (confirmation !== "yes") {
      IOUtils.log(" Deletion cancelled.");
      return;
    }

    this.contacts.splice(index, 1);
    this.removeFromMaps(contact);
    IOUtils.log(" Contact deleted successfully.");
  }

  // --- Grouping & Filtering ---
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
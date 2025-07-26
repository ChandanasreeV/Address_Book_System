// File: src/utils/IOUtils.ts

import readlineSync from "readline-sync";
import { ContactPerson } from "../modal/ContactPerson";


export class IOUtils {
  static prompt(message: string): string {
    return readlineSync.question(` ${message}`);
  }

  static log(message: string, success: boolean = true): void {
    console.log(` ${message}`);
  }

  static displayContactsList(header: string, contacts: ContactPerson[]): void {
    if (contacts.length === 0) {
      this.log(` No contacts available for ${header}`, false);
      return;
    }

    console.log(` ${header} (${contacts.length} contact${contacts.length > 1 ? "s" : ""}):`);
    contacts.forEach((contact, index) => {
      console.log(`  ${index + 1}. 👤 ${contact.getFullName()}`);
    });
  }
}
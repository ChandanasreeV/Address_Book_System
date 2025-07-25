// File: src/main/AddressBookMain.ts
import { AddressBookManager } from "./manager/AddressBookManager";

class AddressBookMain {
  private addressBookManager = new AddressBookManager();

  welcomeToAddressBook(): void {
    console.log("Welcome to the Address Book Program");
  }

  run(): void {
    this.welcomeToAddressBook();
    while (true) {
      console.log("\n MAIN MENU");
      console.log("1. Create Address Book");
      console.log("2. Select Existing Address Book");
      console.log("3. Exit");

      const choice = parseInt(this.addressBookManager.prompt("Enter your choice: "));

      switch (choice) {
        case 1:
          this.addressBookManager.addAddressBook();
          break;
        case 2:
          const selectedBook = this.addressBookManager.selectAddressBook();
          if (selectedBook) {
            this.addressBookManager.manageAddressBook(selectedBook);
          }
          break;
        case 3:
          console.log(" Exiting Address Book Program.");
          return;
        default:
          console.log(" Invalid choice. Try again.");
      }
    }
  }
}

const addressApp = new AddressBookMain();
addressApp.run();
// File: src/main/AddressBookMain.ts
import { AddressBookManager } from "./manager/AddressBookManager";

// Main class that serves as the entry point for the Address Book Program
class AddressBookMain {
  // Creates an instance of AddressBookManager to manage multiple address books
  private addressBookManager = new AddressBookManager();

  // Displays a welcome message to the user
  welcomeToAddressBook(): void {
    console.log("Welcome to the Address Book Program");
  }

  // Main function that runs the application
  run(): void {

    this.welcomeToAddressBook(); // Display welcome message once at start

    // Infinite loop to keep displaying the main menu until user chooses to exit

    while (true) {
      console.log("\n MAIN MENU");
      console.log("1. Create Address Book");
      console.log("2. Select Existing Address Book");
      console.log("3. Exit");

      // Prompt user to enter their choice and convert input to number
      const choice = parseInt(this.addressBookManager.prompt("Enter your choice: "));

      // Perform action based on user's choice
      switch (choice) {
        case 1:
          // Add a new address book
          this.addressBookManager.addAddressBook();
          break;
        case 2:
          // Select an existing address book to manage
          const selectedBook = this.addressBookManager.selectAddressBook();
          if (selectedBook) {
            // Launch contact management options for the selected address book
            this.addressBookManager.manageAddressBook(selectedBook);
          }
          break;
        case 3:
          // Exit the program
          console.log(" Exiting Address Book Program.");
          return;
        default:
          // Handle invalid inputs
          console.log(" Invalid choice. Try again.");
      }
    }

   

  }
}

// Create an instance of the main class and start the program
const addressApp = new AddressBookMain();
addressApp.run();
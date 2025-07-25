
import { AddressBook } from './modal/AddressBook';
import { ContactPerson } from './modal/ContactPerson';
class AddressBookMain
{
    welcomeToAddressBook():void
   {
     console.log(" Welcome to the Address Book Program");
   }

   private addressBook = new AddressBook()
   run():void
   {
    this.welcomeToAddressBook()
     const contact1 = new ContactPerson(
      "Chandana",
      "sree",
      "korlagunta Main Road",
      "Tirupati",
      "AP",
      517418,
      9876543210,
      "chandana@gmail.com"
    );
    this.addressBook.addAccount(contact1)
    this.addressBook.getAllContacts()
    
   }
   
}
const addressApp =new AddressBookMain()
addressApp.run()
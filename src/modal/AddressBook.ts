import { ContactPerson } from "./ContactPerson";


export class AddressBook{

    private contacts:ContactPerson[]=[]

    addAccount(contact:ContactPerson):void
    {
        
        this.contacts.push(contact)
       
        
    }
    
    getAllContacts(): void {
    console.log(" Contact List:");
    this.contacts.forEach((contact, i) => console.log(`${i + 1}. ${contact.toString()}`));
  }
    

}
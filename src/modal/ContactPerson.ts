export class ContactPerson{

   constructor(
    public firstName:string,
    public lastName:string,
    public address:string,
    public city:string,
    public state:string,
    public zipcode:number,
    public phoneNumber:number,
    public email:string,
   ){}

   toString():string{

          return `${this.firstName} ${this.lastName}, ${this.city}, ${this.state}, ${this.zipcode}, ${this.phoneNumber}, ${this.email}`;
   }

   

}
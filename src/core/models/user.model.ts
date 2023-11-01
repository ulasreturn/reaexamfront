import { Comment } from "@angular/compiler";
import { Contact } from "./contact.model";
export class User{
  tcKimlikNo:string="";
  id?: number;
  userName: string="";
  userSurname: string="";
  passwordSalt: string="";
  country: string="";
  city: string="";
  email: string="";
  telephone: string="";
  userPhoto?: string;
  userType?: UserType;
  comment: Comment[]=[]
  contact?: Contact[]=[]
  
}
export enum UserType {
    Customer,
    Admin,
    Employee,
  }
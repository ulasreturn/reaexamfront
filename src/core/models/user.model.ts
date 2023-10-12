import { Comment } from "@angular/compiler";
import { Favourites } from "./favourites.model";
import { Sale } from "./sale.model";
import { Books } from "./books.model";
import { Orders } from "./orders.model";
import { Address } from "./address.model";
import { Contact } from "./contact.model";
export class User{
  id?: number;
  userName: string="";
  userSurname: string="";
  passwordSalt: string="";
  country: string="";
  city: string="";
  email: string="";
  telephone: string="";
  userPhoto?: string;
  basketId: number=0;
  userType?: UserType;
  comment: Comment[]=[]
  favourites: Favourites[]=[]
  sale?: Sale[]=[]
  books?: Books[]=[]
  orders?: Orders[]=[]
  address?: Address[]=[]
  contact?: Contact[]=[]
  
}
export enum UserType {
    Admin,
    User,
  }
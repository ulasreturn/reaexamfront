import { Comment } from "@angular/compiler";
import { Favourites } from "./favourites.model";
import { Sale } from "./sale.model";
import { Books } from "./books.model";
import { Orders } from "./orders.model";
import { Address } from "./address.model";
import { Contact } from "./contact.model";
export interface User{
  UserID: number;
  UserName: string;
  UserSurname: string;
  PasswordSalt: string;
  Country: string;
  City: string;
  Email: string;
  Telephone: string;
  BasketID: number;
  UserType: UserType;
  Comment: Comment[],
  Favourites: Favourites[],
  Sale: Sale[],
  Books: Books[],
  Orders: Orders[],
  Address: Address[],
  Contact: Contact[]
}

export enum UserType {
  admin,
  kullanici,
  ziyaretci,
}

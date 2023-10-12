import { User } from "./user.model";
export class Address{
  id: number=0;
  addressTitle: string="";
  country: string="";
  city: string="";
  postalCode: number=0;
  addressText: string="";
  userId: number=0;
  user?: User;
  }
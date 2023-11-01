import { User } from "./user.model";
export class Employee{
  id?:number;
  userid?: number;
  uzmanlikAlani?: string;
  cinsiyet?:string;
  dogumTarihi?: Date;
  doktorPhoto?: string;
  user?:User;
  userPhoto?: string;
  defaultImageUrl?:string;
}
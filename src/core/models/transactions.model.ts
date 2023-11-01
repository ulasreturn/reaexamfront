import { User } from "./user.model";
export class Transactions{
  id?:number;
  bankAccountId?: number;
  amount?: string;
  aciklama?:string;
  transactionDate?: Date;
  user?:User;
  userName?:string;
  senderCustomerId?:number;
  receiverCustomerId?:number;
}
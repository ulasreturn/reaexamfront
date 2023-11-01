export interface TransactionsRequest{
  userName: string;
  id:number;
  bankAccountId: number;
  amount: string;
  aciklama:string;
  transactionDate: Date;
  senderCustomerId:number;
  receiverCustomerId:number;
}
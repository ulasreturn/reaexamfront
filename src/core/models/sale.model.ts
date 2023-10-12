import { Books } from "./books.model"
export class Sale {
  id?: number;
  paymentMethod?: string;
  buyer?: string;
  salesInfo?: string;
  userId?: number;
  Books?: Books[]
}
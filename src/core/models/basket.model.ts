import {Books} from "./books.model"
export class Basket{
  id?: number;
  totalPrice?: number;
  piece?: number;
  userId?: number;
  bookId?: number;
  books?: Books[];
  }

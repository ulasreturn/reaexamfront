import {Books} from "./books.model"
export interface Basket{
  BasketID: number;
  TotalPrice: string;
  TotalPiece: string;
  UserID: string;
  books: Books[];
  }

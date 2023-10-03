import { Comment } from "@angular/compiler";
import { Favourites } from "./favourites.model";
import { Categories } from "./categories.model";
export interface Books{
  BookID: number,
  CoverPhoto: string,
  BookName: string,
  Price: number,
  Piece: number,
  BookStatus: string,
  Statement: string,
  SaleId: string,
  BasketID: string,
  UserID: number,
  Comment: Comment[],
  Categories: Categories[],
  Favourites: Favourites[]
}

import { Comment } from "@angular/compiler";
import { Favourites } from "./favourites.model";
import { Categories } from "./categories.model";
export class Books{
  id?: number;
  coverPhoto?: string;
  bookName?: string;
  price?: number;
  piece?: number;
  bookStatus?: string;
  statement?: string;
  saleId?: string;
  basketId?: string;
  userId?: number;
  Comment?: Comment[];
  Categories?: Categories[];
  Favourites?: Favourites[]
  
}

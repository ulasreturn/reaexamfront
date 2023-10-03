import { Books } from "./books.model";
export interface Categories{
  CategoryID: number,
  CategoryName: string,
  Books: Books[]
}

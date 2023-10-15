export interface CommentRequest{
  commentText?: string;
  commentDate: Date;
  booksId?: number;
  userId?: number;
  bookName?:string;
  userName?:string;
}
export interface CommentRequest{
  commentText?: string;
  commentDate: Date;
  userId?: number;
  bookName?:string;
  userName?:string;
  employeeId?: number;
}
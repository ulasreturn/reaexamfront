export class Comment{
  id?: number;
  commentText?: string;
  commentDate?: Date;
  bookId?: number;
  userId?: number;
  userName?: string;
  userSurname?: string;
  email?: string;
  userPhoto?: string;
  comments?: Comment[];
}
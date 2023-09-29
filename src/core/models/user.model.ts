export interface User{
  UserID: number;
  UserName: string;
  UserSurname: string;
  PasswordSalt: string;
  Country: string;
  City: string;
  Email: string;
  Telephone: string;
  BasketID: number;
  UserType: UserType;
}

export enum UserType {
  admin,
  kullanici,
  ziyaretci,
}

export class User {
  id: number = 0;
  userName: string = '';
  userSurname: string = '';
  email: string = '';
  password:string='';
  telephone: string='';
  country: string='';
  city: string='';
  userType: UserType = 0;
  }
export enum UserType {
    Admin,
    User,
  }
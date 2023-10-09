export class User {
  id: number = 0;
  userName: string = '';
  fullName: string = '';
  email: string = '';
  password:string='';
  userType: UserType=0;
}

export enum UserType {
  Admin,
  User,
}
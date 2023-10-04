import { Component, OnInit } from '@angular/core';

interface userType {
  name: string;
}
@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit{
  UserName!: string;
  UserSurname!: string;
  Email!: string;
  City!: string;
  Country!: string;
  Telephone!:string;
  Password!: string;
  role!: boolean;

  users: userType[] = [];

  selectedUsers: userType[] = [];
  ngOnInit() {

    this.users = [
      { name: 'Admin' },
      { name: 'Authors' },
      { name: 'User' },
    ];


  }
}

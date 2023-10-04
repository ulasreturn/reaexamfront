import { Component,OnInit } from '@angular/core';


interface userType {
  name: string;
}
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  Id!: string;
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

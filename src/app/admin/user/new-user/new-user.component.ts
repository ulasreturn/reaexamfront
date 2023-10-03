import { Component } from '@angular/core';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent {
  tc_no!: string;
  name!: string;
  email!: string;
  phone!: string;
  password!: string;
  role!: boolean;
}


import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/core/models/user.model';
import { AuthService } from 'src/core/services/auth/auth.service';
import { DataService } from 'src/core/services/data.service';
import { ConstructorProvider } from '@angular/core';
import { RegisterRequest } from 'src/core/models/request/register-request.model';
import { UserService } from 'src/core/services/user.service';
import { ApiService } from 'src/core/services/api/api.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
interface userType {
  name: string;
}
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  //users: userType[] = [];


 /*   this.users = [
      { name: 'Admin' },
      { name: 'Authors' },
      { name: 'User' },
    ];
  */



constructor(
  private readonly authService: AuthService,
  private readonly apiService: ApiService,
  private readonly router: Router,
  private readonly dataservice:DataService,
  private readonly route: ActivatedRoute,
  private readonly userService: UserService,
  private readonly http: HttpClient
) { }
public registerRequest: RegisterRequest =<RegisterRequest>{};
 //user: User[]=[];
 user:any
 userId = 5;
isLoggedIn: boolean = false; // Oturum durumunu takip eden değişken
  currentUser: User | null = null; // Mevcut kullanıcı bilgilerini tutan değişken
  openPanel: boolean = false;
  ngOnInit() {
    const userId = 6; // Replace with the ID of the user you want to fetch

    // Make the HTTP GET request to your backend API
    this.http.get(environment.api_url+'/User/GetById?id=' + userId).subscribe((data) => {
      this.user = data; // Store the retrieved user data in the 'user' property
    });
  }
}

  /*this.route.paramMap.subscribe({
    next: (params)=> {
      const id= params.get('id');
*/
   /*   if(id){
        this.userService.getAllEntities(User)
        .subscribe({
          next: (response) =>{
            this.user? = response;
          }


    },
  //this.getUser();
  },);
*/
//1.41
 /*getAllUser(){
  this.apiService.getAllEntities(User).subscribe((response) => {
    this.user = response.data;
    console.log(this.user);
  });
};


   /* updateData(value: any) {
      let body = {
        name: value.UserName,
        age: value.UserSurname
      }

      this.dataservice.updateData(body, `622ca8c59f6c668226f74f52`)
        .subscribe(response => {
          console.log(response)
        })
    }
*/




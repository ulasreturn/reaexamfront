import { Component } from '@angular/core';
import { ApiService } from 'src/core/services/api/api.service';
import { AuthService } from 'src/core/services/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router,CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Employee } from 'src/core/models/employee.model';
import { User } from 'src/core/models/user.model';
@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
menutoggle() {
throw new Error('Method not implemented.');
}
status: any;
currentUserSubject: any;
defaultImageUrl: string = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png';



constructor(private readonly authService: AuthService,private readonly apiservice: ApiService,private readonly httpClient: HttpClient,private router: Router ){}
employee: Employee[]=[];
users: User[]=[]


ngOnInit() {
  this.getDoktor();
}

getDoktor() {
  this.apiservice.getAllEntities(Employee).subscribe((response) => {
    this.employee = response.data;
    console.log("Employees",this.employee);
    console.log(this.employee[0].user?.userPhoto);
 
  
    
  });

  
 
}


canActivate(): boolean {
  if (this.authService.currentUserValue) { // currentUserValue kullanılacak
    
    return false;
  } else {
    // Kullanıcı girişi yapılmadıysa, login sayfasına yönlendir
    return true;
  }
}
}

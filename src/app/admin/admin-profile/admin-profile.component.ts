import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { User } from 'src/core/models/user.model';
import { ApiService } from 'src/core/services/api/api.service';
import { AuthService } from 'src/core/services/auth/auth.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent {
  constructor(private readonly authservice: AuthService,private readonly apiservice: ApiService,private readonly httpClient: HttpClient ){}

  user: User[]=[];
  ngOnInit() {
    this.getUser();
  }
  getUser() {
    this.apiservice.getAllEntities(User).subscribe((response) => {
      this.user = response.data;
      console.log(this.user);
    });
  }
}

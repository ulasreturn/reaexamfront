import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Authors } from 'src/core/models/authors.model';
import { ApiService } from 'src/core/services/api/api.service';
import { AuthService } from 'src/core/services/auth/auth.service';
@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent {
  constructor(private readonly authservice: AuthService,private readonly apiservice: ApiService,private readonly httpClient: HttpClient ){}
  authors: Authors[]=[];
  ngOnInit() {
    this.getAuthors();
  }
  getAuthors() {
    this.apiservice.getAllEntities(Authors).subscribe((response) => {
      this.authors = response.data;
      console.log(this.authors);
    });
  }
}

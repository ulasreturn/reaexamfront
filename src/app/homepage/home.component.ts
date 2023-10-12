import { Component } from '@angular/core';
import { ApiService } from 'src/core/services/api/api.service';
import { AuthService } from 'src/core/services/auth/auth.service';
import { Books } from 'src/core/models/books.model';
import { HttpClient } from '@angular/common/http';
import { Router,CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
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
books: Books[]=[];

ngOnInit() {
  this.getBooks();
}

getBooks() {
  this.apiservice.getAllEntities(Books).subscribe((response) => {
    this.books = response.data;
    console.log(this.books);

    if (this.books.length === 0) {
      // Eğer kitaplar dizisi boşsa, varsayılan resmi kullan
      this.books.push({ coverPhoto: this.defaultImageUrl });
    }
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

import { Component,OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { AuthService } from 'src/core/services/auth/auth.service';
import { User } from 'src/core/models/user.model';
import { Router } from '@angular/router';
import { ApiService } from 'src/core/services/api/api.service';
import { LoginRequest } from 'src/core/models/request/login-request.model';
import { BookRequest } from 'src/core/models/request/books-request.model';
import { Books } from 'src/core/models/books.model';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [MessageService]
})
export class NavbarComponent implements OnInit {
  public booksRequest: BookRequest = <BookRequest>{}
  searchTerm: string = '';
  searchResults: any[] = [];
  items: MenuItem[] | undefined;
  currentUser: User | null = null;
  isLoggedIn: boolean = false;
  user: User | null = null;
  filteredBooks: Books[] = [];
  searchKey: string = '';
  showResults: boolean = false; 
  books: any[] = [];
 
  

  constructor(private authService: AuthService, private router: Router, private readonly apiService: ApiService, private messageService: MessageService) { }
 
  navigateToProductDetail(productId: number) {
    // Seçilen ürünün detay sayfasına yönlendirin
    this.router.navigate(['/products-detail', productId]);
  }
  searchBooks() {
    this.filteredBooks = this.books.filter((book) => {
      const targetKey = book.id + ' ' + book.bookName;
      return targetKey.includes(this.searchKey);
    });
  }
  onSearchKeyChange() {
    if (this.searchKey.length > 2) {
      this.searchResults = this.books.filter((book) => {
        return book.bookName.toLowerCase().includes(this.searchKey.toLowerCase());
      });
      this.showResults = true; // Arama sonuçları mevcut olduğunda true
    } else {
      this.searchResults = []; // Arama sonuçları mevcut olmadığında boş bir dizi
      this.showResults = false; // Arama sonuçları mevcut olmadığında false
    }
  }
  
  selectBook(book: Books) {
    // Seçilen kitabı işlemek için burada kod ekleyin
    console.log('Seçilen Kitap: ', book);
    this.searchKey = ''; // Sonucu seçtikten sonra arama kutusunu temizle
    this.showResults = false; // Sonuçları gizle
  }
 
 
  //bu kod bize evlerin ekrana gelmesini sağlayan kod yapısı...
  refresh() {
    this.apiService.getAllEntities(Books).subscribe((response) => {
      this.books = response.data;
      this.filteredBooks=this.books;
      console.log(this.books)
    });
    //console.log(this.users)

  }


  ngOnInit() {
    
      this.authService.currentUser.subscribe((user: User | null) => {
        this.user = user;
      });
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
      this.isLoggedIn = user !== null;
    });
    this.refresh()
    this.items = [
      {
        items: [
          {
            label: 'Profile',
            icon: 'pi pi-user',
            routerLink: '/profile'
          },
          {
            label: 'Sign-Out',
            icon: 'pi pi-sign-out',
            command: () => {
              this.logOut();
            }
          }
        ]
      }
    ];
  }

  async logOut() {
    sessionStorage.clear();
    await this.router.navigate(['/home']);
    location.reload();


  }

}


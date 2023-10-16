import { Component, OnInit } from '@angular/core';
import { Books } from 'src/core/models/books.model';
import { ApiService } from 'src/core/services/api/api.service';
import { BookRequest } from 'src/core/models/request/books-request.model';
import { AuthService } from 'src/core/services/auth/auth.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit
{
  slideIndex = 0; // Başlangıçta gösterilen slaytın index'i
  intervalTime = 2500; // Otomatik geçiş süresi (milisaniye cinsinden)
  defaultImageUrl: string = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png';
  constructor(private apiService:ApiService, private authService:AuthService) {}

  ngOnInit(): void {
    this.autoSlide();
    this.getBooks();
  }
  
  
 


  books: Books[]=[];
  book: any;

  getBooks() {
    this.apiService.getAllEntities(Books).subscribe((response) => {
      this.books = response.data;
      console.log(this.books);
      if (this.books.length === 0) {
        // Eğer kitaplar dizisi boşsa, varsayılan resmi kullan
        this.books.push({ coverPhoto: this.defaultImageUrl });
      }
    });
  };
  //kitabı favorilere eklemek için onun bilgisi elimizde olmalı
  getBookDetail(Id: number) {
    this.apiService.getEntityById<Books>(Id, Books).then(
      (response: any) => {
        this.book = response.data;
        console.log(this.book);

        //sonradan veri tabanına ekle
       const status = this.authService.addFavourites(this.bookRequests);
       this.authService.addFavourites(this.bookRequests);
      },


       // this.refresh();

      (error: any) => {
        // Handle error if necessary
        console.error(error);
      }
    );
  }


  public bookRequests: BookRequest =<BookRequest>{};



  autoSlide() {
    const slides = document.getElementsByClassName("mySlides1") as HTMLCollectionOf<HTMLElement>; // Slider slaytlarının sınıfı

    // Tüm slaytları gizle
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

    this.slideIndex++ ;

    // Son slayta ulaştıysak ilk slayta dön
    if (this.slideIndex > slides.length) {
      this.slideIndex = 1;
    }

    // Belirtilen slaytı göster
    slides[this.slideIndex - 1].style.display = "block";

    // Otomatik geçiş süresi kadar bekletip bir sonraki slayta geç
    setTimeout(() => this.autoSlide(), this.intervalTime);
  }

}







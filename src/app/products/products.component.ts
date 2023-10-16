import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/core/services/api/api.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit
{
  slideIndex = 0; // Başlangıçta gösterilen slaytın index'i
  intervalTime = 2500; // Otomatik geçiş süresi (milisaniye cinsinden)
  booksId: any|number;
  comments: Comment[] = [];
  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
  
    this.route.params.subscribe(params => {
      this.booksId = params['booksId'];
      this.getUserBooks(this.booksId);
      this.autoSlide();
    });
  
}

  getUserBooks(productId: string) {
    this.apiService.getUserBooks(this.booksId).subscribe((response: any) => {
      this.comments = response.comments; // API'den gelen yorumları sakla
    });
  }

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




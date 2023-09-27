import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit
{
  slideIndex = 0; // Başlangıçta gösterilen slaytın index'i
  intervalTime = 2500; // Otomatik geçiş süresi (milisaniye cinsinden)

  constructor() {}

  ngOnInit(): void {
    this.autoSlide();
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







import { Component } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})

  export class AccountComponent {
    showLogin: boolean = true;
    countries: string[] = ['Ülke 1', 'Ülke 2', 'Ülke 3']; // Ülke verileri
    cities: string[] = ['İl 1', 'İl 2', 'İl 3']; // İl verileri
    indicatorPosition: number = 0;
  
    updateIndicatorPosition() {
      this.indicatorPosition = this.showLogin ? 0 : 100;
    }
  
    login() {
      // Login işlemleri burada gerçekleştirilir.
    }
  
    register() {
      // Register işlemleri burada gerçekleştirilir.
    }
}

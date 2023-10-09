import { Component } from '@angular/core';
import { AuthService } from 'src/core/services/auth/auth.service';
import { MessageService } from 'primeng/api';
import { ApiService } from 'src/core/services/api/api.service';
import { Router,CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MessageService]
})
export class HomeComponent {
currentUserSubject: any;
menutoggle() {
throw new Error('Method not implemented.');
}

constructor(private authService: AuthService,private router: Router) {} // AuthService'i buradan enjekte edin
canActivate(): boolean {
  if (this.authService.currentUserValue) { // currentUserValue kullanılacak
    
    return false;
  } else {
    // Kullanıcı girişi yapılmadıysa, login sayfasına yönlendir
    return true;
  }
}
}
  




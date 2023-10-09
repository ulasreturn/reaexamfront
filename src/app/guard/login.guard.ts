import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/core/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.currentUserValue) { // currentUserValue kullanılacak
      this.router.navigate(['/home']);
      return false;
    } else {
      // Kullanıcı girişi yapılmadıysa, login sayfasına yönlendir
      return true;
    }
  }
}
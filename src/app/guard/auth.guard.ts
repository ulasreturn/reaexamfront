import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/core/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.currentUserValue) {
      // Kullanıcı oturum açmışsa, geçişe izin ver
      return true;
    } else {
      // Kullanıcı oturum açmamışsa, giriş sayfasına yönlendir ve geçişe izin verme
      this.router.navigate(['/login']); // 'login' rotasını kendi giriş sayfasının rotasıyla değiştirin
      return false;
    }
  }
}


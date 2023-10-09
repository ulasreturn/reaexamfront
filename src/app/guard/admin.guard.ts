import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    // Kullanıcının yönetici yetkisine sahip olup olmadığını kontrol etmek için uygun bir mekanizma kullanın.
    // Örnek olarak, bir AuthService veya kullanıcı rolü kontrol edebilirsiniz.
    const userIsAdmin = this.checkIfUserIsAdmin();

    if (userIsAdmin) {
      return true; // Kullanıcı yöneticiyse rotaya erişim izni verilir.
    } else {
      // Kullanıcı yönetici değilse başka bir sayfaya yönlendirilebilir veya izin verilmeyebilir.
      return this.router.createUrlTree(['/login']); // Örneğin, giriş sayfasına yönlendirme yapabilirsiniz.
    }
  }

  private checkIfUserIsAdmin(): boolean {
    // Kullanıcının yönetici rolüne sahip olup olmadığını kontrol etmek için uygun bir mantık kullanın.
    // Bu örnek, herkesi yönetici olarak kabul eder.
    return true;
  }
}

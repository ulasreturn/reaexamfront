import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/core/models/request/login-request.model';
import { AuthService } from 'src/core/services/auth/auth.service';
import { ResponseStatus } from 'src/core/models/response/base-response.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  showLogin: boolean = true;
  countries: string[] = []; // Ülke verileri
  cities: string[] = [];
  loginSuccess: boolean = false; // Yeni değişken
  loginError: boolean = false; // Yeni değişken // İl verileri
  indicatorPosition: number = 0;
  
  updateIndicatorPosition() {
    this.indicatorPosition = this.showLogin ? 0 : 100;
  }
  
  public loginRequest: LoginRequest = <LoginRequest>{};

constructor(
  private readonly authService: AuthService,
  private readonly router: Router
) { }



ngOnInit(): void {
}

async login() {
  let status = await this.authService.login(this.loginRequest);

  if (status == ResponseStatus.Ok) {
    this.loginSuccess = true;
    this.loginError = false;
    // Başka bir sayfaya yönlendirme işlemi
    await this.router.navigate(['./home']); // Burada yönlendirmeyi uygun bir sayfa yoluna göre güncelleyin
  } else if (status == ResponseStatus.Invalid) {
    this.loginError = true;
    this.loginSuccess = false;
    this.loginRequest.PasswordSalt = '';
    
  }
}
}

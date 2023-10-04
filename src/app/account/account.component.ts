import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/core/models/request/login-request.model';
import { AuthService } from 'src/core/services/auth/auth.service';
import { ResponseStatus } from 'src/core/models/response/base-response.model';
import { RegisterRequest } from 'src/core/models/request/register-request.model';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})

  export class AccountComponent {
    showLogin: boolean = true;
    countries: string[] = []; // Ülke verileri
    cities: string[] = [];
    loginSuccess: boolean = false; // Yeni değişken
    loginError: boolean = false;
    registerSuccess: boolean = false; // Yeni değişken // İl verileri
    indicatorPosition: number = 0;

    updateIndicatorPosition() {
      this.indicatorPosition = this.showLogin ? 0 : 100;
    }
    
    public loginRequest: LoginRequest = <LoginRequest>{};

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  public registerRequest: RegisterRequest =<RegisterRequest>{};

  ngOnInit(): void {
  }

  async login() {
    let status = await this.authService.login(this.loginRequest);

    if (status == ResponseStatus.Ok) {
      this.loginSuccess = true;
      this.loginError = false;
      // Başka bir sayfaya yönlendirme işlemi
      await this.router.navigate(['']); // Burada yönlendirmeyi uygun bir sayfa yoluna göre güncelleyin
    } else if (status == ResponseStatus.Invalid) {
      this.loginError = true;
      this.loginSuccess = false;
      this.loginRequest.PasswordSalt = '';
    }
  }



    async register() {
      const status = await this.authService.register(this.registerRequest);

      if (status === ResponseStatus.Ok) {
        console.log('Kayıt başarılı! Yönlendiriliyorsunuz');
        await this.router.navigate(['']);// Başka bir sayfaya yönlendirme işlemi // Örneğin: await this.router.navigate(['']);
      }
        // Örneğin: await this.router.navigate(['']);
      

}
    }










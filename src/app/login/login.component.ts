
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/core/models/request/login-request.model';
import { AuthService } from 'src/core/services/auth/auth.service';
import { ResponseStatus } from 'src/core/models/response/base-response.model';
import { RegisterRequest } from 'src/core/models/request/register-request.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  showLogin: boolean = true;
  countries: string[] = ['Ülke 1', 'Ülke 2', 'Ülke 3']; // Ülke verileri
  cities: string[] = ['İl 1', 'İl 2', 'İl 3']; // İl verileri
  indicatorPosition: number = 0;


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
    await this.router.navigate(['']);
  } else if (status == ResponseStatus.Invalid)
    this.loginRequest.PasswordSalt = '';
}

  updateIndicatorPosition() {
    this.indicatorPosition = this.showLogin ? 0 : 100;
  }



  async register() {
    const status = await this.authService.register(this.registerRequest);

    if (status === ResponseStatus.Ok) {
      console.log('giriş başarılı');
    } else {
      console.log('giriş yapılamadı');
    }
  }

}

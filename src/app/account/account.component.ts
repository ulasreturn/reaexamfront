import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/core/models/request/login-request.model';
import { AuthService } from 'src/core/services/auth/auth.service';
import { ResponseStatus } from 'src/core/models/response/base-response.model';

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
      await this.router.navigate(['']);
    } else if (status == ResponseStatus.Invalid)
      this.loginRequest.PasswordSalt = '';
  }

    updateIndicatorPosition() {
      this.indicatorPosition = this.showLogin ? 0 : 100;
    }



    register() {
      // Register işlemleri burada gerçekleştirilir.
    }
}











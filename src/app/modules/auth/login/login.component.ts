import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/core/models/request/login-request.model';
import { AuthService } from 'src/core/services/auth/auth.service';
import { ResponseStatus } from 'src/core/models/response/base-response.model';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
  
})

export class LoginComponent implements OnInit {
  showLogin: boolean = true;
  indicatorPosition: number = 0;
  
  
  updateIndicatorPosition() {
    this.indicatorPosition = this.showLogin ? 0 : 100;
  }
  
  public loginRequest: LoginRequest = <LoginRequest>{};

constructor(
  private readonly authService: AuthService,
  private readonly router: Router,
  private messageService: MessageService,
) { }




async login() {
  
  let status = await this.authService.login(this.loginRequest);

  if (status == ResponseStatus.Ok) {
    this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Başarıyla giriş yaptınız!', life: 3000 });
    await this.router.navigate(['./home']); // Burada yönlendirmeyi uygun bir sayfa yoluna göre güncelleyin
  } else if (status == ResponseStatus.Invalid) {
    this.messageService.add({ severity: 'error', summary: 'Hata', detail: 'E-posta veya şifre hatalı' });
    this.loginRequest.PasswordSalt = '';    
  }
}
ngOnInit() {
  const switchers: Element[] = Array.from(document.querySelectorAll('.switcher'));

  switchers.forEach((item: Element) => {
    item.addEventListener('click', function() {
      const parentElement = (item.parentElement as HTMLElement);
      switchers.forEach((el: Element) => el.parentElement!.classList.remove('is-active'));
      parentElement.classList.add('is-active');
    });
  });
}
}


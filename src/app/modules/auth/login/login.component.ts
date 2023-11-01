import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/core/models/request/login-request.model';
import { AuthService } from 'src/core/services/auth/auth.service';
import { ResponseStatus } from 'src/core/models/response/base-response.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ApiService } from 'src/core/services/api/api.service';
import { UserService } from 'src/core/services/user.service';
import { EmailRequest } from 'src/core/models/request/email-request.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
  
})

export class LoginComponent implements OnInit {
  
  
  showLogin: boolean = true;
  indicatorPosition: number = 0;
  showForgotPassword: boolean = false;
  public resetPasswordEmail!: string;
  emails: string[] = [];
  filteredEmails: string[]=[];
  isValidEmail: boolean = false; // E-posta adresi doğru mu?
  emailExists: boolean = false; // E-posta adresi sistemde kayıtlı mı?
  enteredEmail: string = '';
  enteredCode: string = '';  
  private url: string = environment.api_url;
  randomGeneratedCode: string = '';
  resetPasswordVisible: boolean = false;
resetPasswordCode: string = ''; 
referenceCodeForm:boolean = false;
passwordChangeForm:boolean = false;
referencecode:string | null = null;
public passwordUpdated: boolean = false;




  updateIndicatorPosition() {
    this.indicatorPosition = this.showLogin ? 0 : 100;
  }
  showForgotPasswordForm(event: Event) {
    event.preventDefault();
    this.showLogin=false; // Sayfa yeniden yönlendirmesini engeller
    this.showForgotPassword = true;
  }
  public loginRequest: LoginRequest = <LoginRequest>{};
  public emailrequest: EmailRequest =<EmailRequest>{};
 
constructor(
  private readonly authService: AuthService,
  private readonly router: Router,
  private messageService: MessageService,
 private readonly apiService: ApiService,
 private userService: UserService,
private http: HttpClient
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
  
  this.refresh()
  const switchers: Element[] = Array.from(document.querySelectorAll('.switcher'));

  switchers.forEach((item: Element) => {
    item.addEventListener('click', function() {
      const parentElement = (item.parentElement as HTMLElement);
      switchers.forEach((el: Element) => el.parentElement!.classList.remove('is-active'));
      parentElement.classList.add('is-active');
    });
  });
}
refresh():void{
  this.http.get(`${this.url}/EmailInfo/GetAll`).subscribe((data: any) => {
    // API'den alınan verileri diziye atayın
    this.emails = data.data.map((item: { email: string }) => item.email.toLowerCase().trim());  
   
  console.log("Email",this.emails);
});
    

}
generateRandomCode(length: number) {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomCode = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    randomCode += charset[randomIndex];
  }
  return randomCode;
}

showResetPasswordCodeInput() {
    const correctReferenceCode = this.referencecode;
    const enteredCode = this.enteredCode;
    if (enteredCode === correctReferenceCode) {
      // Giriş yapılan kod, doğru referans koduyla eşleşiyorsa
      this.referenceCodeForm = false; // Şifre unutma ekranını gizle
      this.passwordChangeForm = true;
      this.messageService.add({ severity: 'success', summary: 'Başarılı!', detail: 'Başarılı!' });
    }
    else{
      this.messageService.add({ severity: 'error', summary: 'Hata!', detail: 'Referans Kodunuz Yanlış!' });
    } 
}
passwordChange() {
  if (this.emailrequest.Password.length >= 8) {
    this.userService.resetPassword(this.emailrequest).subscribe(response => {
      this.messageService.add({ severity: 'success', summary: 'Başarılı!', detail: 'Parola Güncellendi' });
      this.passwordUpdated = true;
      setTimeout(async () => {
        location.reload();
      }, 2300); 
      // Başarı durumunda kullanıcıya geri bildirim veya yönlendirme yapabilirsiniz.
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Hata!', detail: 'Parolanız minimum 8 karakter olmalıdır!' });
      // Hata durumunda kullanıcıya hata mesajı göstermek için işlem yapabilirsiniz.
    });
  } else {
    this.messageService.add({ severity: 'error', summary: 'Hata!', detail: 'Parola en az 8 karakter içermelidir!' });
  }
}


confirmToSend(){
  this.emailrequest.Email = this.enteredEmail;
  if(this.emails.includes(this.enteredEmail))
{
  if (this.referencecode === null) {
    this.referencecode = this.generateRandomCode(8);
  
   this.emailExists=true;
   const emailData = {
    subject: 'Şifre Sıfırlama İsteği',
    body: 'Şifre sıfırlama kodunuz: '+ this.referencecode, // Rastgele kod üretecek bir fonksiyon kullanın
    recepients: this.enteredEmail
  };

 // API çağrısı için verileri gönderin
 this.http.post(`${this.url}/Mail`, emailData).subscribe(response => {
  console.log('E-posta gönderildi', response);
  
  
  
}, error => {
  console.error('E-posta gönderme hatası', error);
});
  this.showForgotPassword=false;
  this.referenceCodeForm=true;
  
   this.messageService.add({ severity: 'success', summary: 'Başarılı!', detail: 'E-postanızı kontrol edin!' });
   console.log('Doğru',this.emailExists)
}
}
else{
  
  this.emailExists=false;
  this.messageService.add({ severity: 'error', summary: 'Hata', detail: 'E-posta kayıtlı değil!' });
  console.log('Yanlış',this.emailExists)
}

}
}


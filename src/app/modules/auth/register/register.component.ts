import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import { AuthService } from 'src/core/services/auth/auth.service';
import { ResponseStatus } from 'src/core/models/response/base-response.model';
import { RegisterRequest } from 'src/core/models/request/register-request.model';
import { ConfirmationService, MessageService } from 'primeng/api';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class RegisterComponent {
  showLogin: boolean = false;
  countries: string[] = []; // Ülke verileri
  cities: string[] = [];
  registerSuccess: boolean = false; // Yeni değişken // İl verileri
  indicatorPosition: number = 100;
  indicatorClass: string = 'register-inactive';
  updateIndicatorPosition() {
    this.indicatorPosition = this.showLogin ? 0 : 100;
  }
  

constructor(
  private readonly authService: AuthService,
  private readonly router: Router,
  private messageService: MessageService,
) { }

public registerRequest: RegisterRequest =<RegisterRequest>{};

ngOnInit(): void {
}

async register() {
  let status = await this.authService.register(this.registerRequest);
  if (status == ResponseStatus.Ok) {
    this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Kullanıcı başarılı bir şekilde eklendi', life: 3000 });
    await this.router.navigate(['/login']);
  } else if (status == ResponseStatus.Invalid)
  this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Kullanıcı oluşturulamadı' });
    this.registerRequest.Password = '';
}
}


import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import { AuthService } from 'src/core/services/auth/auth.service';
import { ResponseStatus } from 'src/core/models/response/base-response.model';
import { RegisterRequest } from 'src/core/models/request/register-request.model';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
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
  private readonly router: Router
) { }

public registerRequest: RegisterRequest =<RegisterRequest>{};

ngOnInit(): void {
}

async register() {
  const status = await this.authService.register(this.registerRequest);

  if (status === ResponseStatus.Ok) {
    this.registerSuccess = true;
    await this.router.navigate(['/home']);// Başka bir sayfaya yönlendirme işlemi // Örneğin: await this.router.navigate(['']);
  }
    // Örneğin: await this.router.navigate(['']);


}
}


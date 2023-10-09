import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/core/services/auth/auth.service';
import { ResponseStatus } from 'src/core/models/response/base-response.model';
import { RegisterRequest } from 'src/core/models/request/register-request.model';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
  public registerRequest: RegisterRequest = <RegisterRequest>{};
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }
  ngOnInit(): void {
  }

  async register() {
    let status = await this.authService.register(this.registerRequest);
    if (status == ResponseStatus.Ok) {
      await this.router.navigate(['']);
    } else if (status == ResponseStatus.Invalid)
      this.registerRequest.Password = '';
  }

}

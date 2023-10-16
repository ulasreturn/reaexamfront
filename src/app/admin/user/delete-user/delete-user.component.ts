import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/core/services/api/api.service';
import { AuthService } from 'src/core/services/auth/auth.service';
import { User } from 'src/core/models/user.model';
import { RegisterRequest } from 'src/core/models/request/register-request.model';
@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent {
 Id!:number;

 constructor(
  private readonly authService: AuthService,
  private readonly router: Router,
  private readonly apiService: ApiService,
) { }
public registerRequest: RegisterRequest =<RegisterRequest>{};


user:User[]=[];

 deleteUsers(id: number) {
  this.delete(id).then(response => {
   // if (response?.status == ResponseStatus.Ok) {
   //   this.refresh();
   //  this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Kullanıcı başarılı bir şekilde silindi', life: 3000 });
   //   this.openModel = false;
   console.log("kullanıcı başarıyla silindi")
    }
  )
}

delete(id: number) {
  this.Id=0;
  return this.apiService.deleteEntity(id, User);

}



}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterRequest } from 'src/core/models/request/register-request.model';
import { ResponseStatus } from 'src/core/models/response/base-response.model';
import { AuthService } from 'src/core/services/auth/auth.service';
import { User } from 'src/core/models/user.model';
import { MessageService } from 'primeng/api';
interface userType {
  name: string;
}
@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css'],
  providers: [MessageService]
})
export class NewUserComponent implements OnInit{
/*  UserName!: string;
  UserSurname!: string;
  Email!: string;
  City!: string;
  Country!: string;
  Telephone!:string;
  Password!: string;*/
 // role!: boolean;

  //users: userType[] = [];

  //selectedUsers: userType[] = [];

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private messageService: MessageService,
  ) { }

  public registerRequest: RegisterRequest =<RegisterRequest>{
    UserPhoto: '',
  };
  ngOnInit() {
    // Sayfa yüklendiğinde, rastgele bir internet resmi URL'sini alın ve registerRequest.UserPhoto'ya atayın
    this.getRandomImageURL().then((imageURL) => {
      
    });
  }
  async getRandomImageURL(): Promise<string | null> {
    // Lorem Picsum servisinden rastgele bir resim URL'si almak
    const response = await fetch('https://picsum.photos/200/300');
    if (response.ok) {
      const imageURL = response.url;
      return imageURL;
    } else {
      return null; // Resim alınamazsa null döner
    }
  }

  async addUser() {
    const status = await this.authService.addUser(this.registerRequest);

    if (status === ResponseStatus.Ok) {
      this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Kullanıcı başarılı bir şekilde eklendi', life: 3000 });
    setTimeout(async () => {
      await this.router.navigate(['./admin/profile']);
    }, 2300); 
    } else {
      this.messageService.add({ severity: 'error', summary: 'Hata', detail: 'Kullanıcı oluşturulamadı.', life: 3000 });
    }
  }
}

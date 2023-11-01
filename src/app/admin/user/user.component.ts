import { Component, OnInit } from '@angular/core';
import { ApiService } from "src/core/services/api/api.service";
import { AuthService } from 'src/core/services/auth/auth.service';
import { User } from "src/core/models/user.model";
import { UserRequest } from 'src/core/models/request/user-request.model';
import { Router } from "@angular/router";
import { ConfirmationService, MessageService } from 'primeng/api';
import { ResponseStatus } from 'src/core/models/response/base-response.model';
import { RegisterRequest } from 'src/core/models/request/register-request.model';
import { EmployeeRequest } from 'src/core/models/request/employee-request.model';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class UserComponent implements OnInit {
  public employeeRequest: EmployeeRequest = {
    dogumTarihi: new Date()
  };
 
  public registerRequest: RegisterRequest =<RegisterRequest>{
    UserPhoto: '',
  };
  public searchName: string = '';

  userEditDialog: boolean = false;//kapalı kalması için false
  userAddDialog: boolean = false;
 employeeAddDialog:boolean = false;
  dogumTarihi:string='';
  UserToEdit: User | null = null;
  user: User[] = [];
  openModel: boolean = false;

  filteredUsers: User[] = [];

  makeAdmin: User| null = null;
  userPassword: string | null = null;
  makeEmployee: User| null = null;
 
  

  //input alanına yazdığımı tanımlatacağım. inputa yazdığım an aktif olacak


  constructor(
    private readonly apiService: ApiService,
    private router: Router,
    private readonly authService: AuthService,
    private messageService: MessageService
  ) { }

  /* @Input() user: User = new User(); */
  searchPerson(searchKey: string) {
    this.filteredUsers = this.users.filter((user) => {
      const targetKey = user.userName + ' ' + user.userSurname;
      return targetKey.includes(searchKey);
    });
  }
  //versiyonla ilgili sanırım onu kabul etmemesi. 

  users: User[] = [];
  ngOnInit() {
    this.refresh()
    this.getRandomImageURL().then((imageURL) => {
      if (imageURL) {
        this.registerRequest.UserPhoto = imageURL;
        console.log("Rastgele resim URL'si başarıyla alındı: " + imageURL);
      } else {
        console.error("Rastgele resim alınamadı.");
      }
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

  refresh() {
    this.apiService.getAllEntities(User).subscribe((response) => {
      this.users = response.data;
      //ppipe için koyuldu
      this.filteredUsers = this.users;
      console.log(this.users)
    });
    //console.log(this.users)

  }

  async register() {
    this.userAddDialog = true;
    let status = await this.authService.register(this.registerRequest);
    if (status == ResponseStatus.Ok) {
      this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Kullanıcı başarılı bir şekilde eklendi', life: 3000 });
      window.location.reload();//sayfayı yenilemek için
      await this.router.navigate(['/admin']);
    } else if (status == ResponseStatus.Invalid) {
      
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Kullanıcı oluşturulamadı' }); 
      this.registerRequest.Password = '';
    }

    
    
  }
  employeeekle(entity: EmployeeRequest) {
    this.employeeAddDialog = true;
    this.createEntity<EmployeeRequest>(entity, 'Employee').then(response => {
      if (response?.status == ResponseStatus.Ok) {
        this.refresh();
        this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Employee ekleme başarılı', life: 3000 });
      }
    });
  }

  createEntity<TEntity>(entity: TEntity, entityType: string) {
    return this.apiService.createEntity<TEntity>(entity, entityType);
  }


  // editUsers() {
  //   this.userEditDialog = true;
  // }

  editUsers(id: number) {
    this.apiService.getEntityById<User>(id, User).then((response) => {
      if (response && response.data) {
        this.userEditDialog = true;
        this.UserToEdit = response.data; // API'den alınan aracı carToEdit değişkenine atıyoruz
      } else {
        console.error('Kullanıcı bulunamadı veya alınırken bir hata oluştu.');
      }
    }).catch((error) => {
      console.error('Kullanıcı alınırken bir hata oluştu:', error);
    });
  }

  updateToAdmin(id: number) {
    this.apiService.getEntityById<User>(id, User).then((response) => {
      if (response && response.data) {
        this.makeAdmin = response.data;
        if (this.makeAdmin.userType === 0) {
          this.makeAdmin.userType = 1;
          console.log('bak',this.makeAdmin.userType)  // 0'dan 1'e güncelle (0: Normal kullanıcı, 1: Admin)
        } else if (this.makeAdmin.userType === 2) {
          this.makeAdmin.userType = 1;
          console.log('bak',this.makeAdmin.userType) // 1'den 0'a güncelle (0: Normal kullanıcı, 1: Admin)
        }else if (this.makeAdmin.userType === 1) {
          this.makeAdmin.userType = 0;
          console.log('bak',this.makeAdmin.userType) // 1'den 0'a güncelle (0: Normal kullanıcı, 1: Admin)
        }


        this.onUpdate(id, this.makeAdmin);
      } else {
        console.log("Kullanıcı bulunamadı veya bir hata oluştu.");
      }
    });
  }

  updateToEmployee(id: number) {
    this.apiService.getEntityById<User>(id, User).then((response) => {
      if (response && response.data) {
        this.makeEmployee = response.data;
        if (this.makeEmployee.userType === 0) {
          this.makeEmployee.userType = 2;
          console.log('bak',this.makeEmployee.userType)  // 0'dan 1'e güncelle (0: Normal kullanıcı, 1: Admin)
        }  else if (this.makeEmployee.userType === 1) {
          this.makeEmployee.userType = 2;
          console.log('bak',this.makeEmployee.userType) // 1'den 0'a güncelle (0: Normal kullanıcı, 1: Admin)
        }else if (this.makeEmployee.userType === 2) {
          this.makeEmployee.userType = 0;
          console.log('bak',this.makeEmployee.userType) // 1'den 0'a güncelle (0: Normal kullanıcı, 1: Admin)
        }
        

        this.onUpdate(id, this.makeEmployee);
      } else {
        console.log("Kullanıcı bulunamadı veya bir hata oluştu.");
      }
    });
  }

  //Update işlemini gerçekleştiren kod
  onUpdate(id: number, updatedUser: User) {
    this.update(id, updatedUser).then(response => {
      if (response?.status == ResponseStatus.Ok) {
        this.refresh();
        this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Kullanıcı güncelleme başarılı', life: 3000 });
        this.hideDialog(); // Güncelleme işlemi tamamlandığında dialogu gizle
      }
    }).catch((error) => {
      console.error('Kullanıcı güncellenirken bir hata oluştu:', error);
    });
  }

  //Update işlemini gerçekleştiren kod
  update(id: number, updatedUser: User) {
    return this.apiService.updateEntity(id, updatedUser, User);
  }



  deleteUsers(id: number) {
    this.delete(id).then(response => {
      if (response?.status == ResponseStatus.Ok) {
        this.refresh();
        this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Kullanıcı başarılı bir şekilde silindi', life: 3000 });
        this.openModel = false;
      }
    })
  }

  delete(id: number) {
    return this.apiService.deleteEntity(id, User);
  }

  hideDialog() {
    this.userEditDialog = false;
  }

  closeModal() {
    this.openModel = false;
  }

  modelOpen() {
    this.openModel = true;
  }



}

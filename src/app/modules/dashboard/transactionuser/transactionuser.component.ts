import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ApiService } from "src/core/services/api/api.service";
import { ConfirmationService, MessageService } from 'primeng/api';
import { ResponseStatus } from 'src/core/models/response/base-response.model';
import { TransactionsRequest } from 'src/core/models/request/transactions-request.model ';
import { Transactions } from 'src/core/models/transactions.model';
import { BankAccountRequest } from 'src/core/models/request/bankaccount-request.model';
import { AuthService } from 'src/core/services/auth/auth.service';
import { UserService } from 'src/core/services/user.service';
import { BankAccount } from 'src/core/models/bankaccount.model';

@Component({
  selector: 'app-transactionuser',
  templateUrl: './transactionuser.component.html',
  styleUrls: ['./transactionuser.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class TransactionuserComponent implements OnInit {
  public transactionsRequest: TransactionsRequest=<TransactionsRequest>{
    transactionDate : new Date()
  }  
public bankaccountRequest: BankAccountRequest = {};
bankaccountAddDialog:boolean = false;
  transactionsAddDialog: boolean = false;
transactionsEditDialog: boolean = false;
  openModel: boolean = false;
  transactionDate:string='';
TransactionsToEdit: Transactions| null = null; // Sınavda düzenle
loggedInUserId?: number | null = null; 

  filteredRandevu: Transactions[] = [];
  filteredba: BankAccount[] = [];

  public searchRandevuName: string = ''; // Sınavda düzenle

  constructor(private readonly apiService: ApiService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private readonly authService: AuthService,
    private userService: UserService

  ) { }


  searchrandevular(searchKey: string) {
    this.filteredRandevu = this.transactions.filter((transactions) => {
      const targetKey = transactions.id + ' ' + transactions.userName;
      return targetKey.includes(searchKey);
    });
  }

 transactions: Transactions[] = [];
bankaccounts: BankAccount[] = [];
  ngOnInit() {
    this.refresh()
  }
  //bu kod bize evlerin ekrana gelmesini sağlayan kod yapısı...
  refresh() {const user = this.authService.getCurrentUser();
    if (user) {
      this.loggedInUserId = user.id ?? null;
    this.apiService.getAllEntities(Transactions).subscribe((response) => {
      this.transactions = response.data;
      this.filteredRandevu=this.transactions.filter(transactions => transactions.senderCustomerId === this.loggedInUserId);
      console.log(this.transactions)
      if (this.loggedInUserId !== null && this.loggedInUserId !== undefined) {
        this.transactionsRequest.senderCustomerId = this.loggedInUserId;
      } else {
        // this.loggedInUserId, null veya undefined ise, booksRequest.userId'i nasıl ayarlamak istediğinizi belirtmelisiniz.
        // Örnek olarak:
        // this.booksRequest.userId = 0; // veya herhangi bir varsayılan değer
      }
    });
    
    //console.log(this.users)

     
      
      console.log('Kullanıcı Kimliği:', this.loggedInUserId);
      
      // Kullanıcının kimliği ile kitapları getirin
      // userId 2 ol/ userId 2 olan kitapları al
      }
      if (user) {
        this.loggedInUserId = user.id ?? null;
      this.apiService.getAllEntities(BankAccount).subscribe((response) => {
        this.bankaccounts = response.data;
        this.filteredba=this.bankaccounts.filter(bankaccount => bankaccount.customerId === this.loggedInUserId);
        console.log(this.transactions)
        if (this.loggedInUserId !== null && this.loggedInUserId !== undefined) {
          this.bankaccountRequest.customerId = this.loggedInUserId;
        } else {
          // this.loggedInUserId, null veya undefined ise, booksRequest.userId'i nasıl ayarlamak istediğinizi belirtmelisiniz.
          // Örnek olarak:
          // this.booksRequest.userId = 0; // veya herhangi bir varsayılan değer
        }
      });
      
      //console.log(this.users)
  
       
        
        console.log('Kullanıcı Kimliği:', this.loggedInUserId);
        
        // Kullanıcının kimliği ile kitapları getirin
        // userId 2 ol/ userId 2 olan kitapları al
        }
}
  


  


  onCreate(entity: TransactionsRequest) {
    this.createEntity<TransactionsRequest>(entity, 'TransActions').then(response => {
      if (response?.status == ResponseStatus.Ok) {
        this.refresh();
        this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Transactions ekleme başarılı', life: 3000 });
      }
      else{
        this.messageService.add({ severity: 'error', summary: 'Hata', detail: 'Banka Hesabınız Yok veya Hatalı Transfer İşlemi Yaptınız', life: 3000 });
      }
    });
  }

  createEntity<TEntity>(entity: TEntity, entityType: string) {
    return this.apiService.createEntity<TEntity>(entity, entityType);
  }


  selectedFiles: File[] = [];

  onFileChange(event: any) {
    const fileList: FileList = event.target.files;
    for (let i = 0; i < fileList.length; i++) {
      this.selectedFiles.push(fileList[i]);
    }
  }

  deleteFile(file: File) {
    const index = this.selectedFiles.indexOf(file);
    if (index > -1) {
      this.selectedFiles.splice(index, 1);
    }
  }

  addNewTransactions() {
    this.transactionsAddDialog = true;
  }

  deleteTransactions(id: number) {
    this.delete(id).then(response => {
      if (response?.status == ResponseStatus.Ok) {
        this.refresh();
        this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Kullanıcı başarı ile silindi', life: 3000 });
      }
    })
  }

  delete(id: number) {
    return this.apiService.deleteEntity(id, Transactions);
  }

  // editHouse() {
  //   this.houseEditDialog = true;
  // }

  openEditDialog(id: number) {
    this.apiService.getEntityById<Transactions>(id, Transactions).then((response) => {
      if (response && response.data) {
        this.transactionsEditDialog = true;
        this.TransactionsToEdit = response.data;
         // API'den alınan aracı carToEdit değişkenine atıyoruz
      } else {
        console.error('Kitap bulunamadı veya alınırken bir hata oluştu.');
      }
    }).catch((error) => {
      console.error('Kitap alınırken bir hata oluştu:', error);
    });
  }

  onUpdate(id: number, updatedRandevu: Transactions) {
    this.update(id, updatedRandevu).then(response => {
      if (response?.status == ResponseStatus.Ok) {
        this.refresh();
        this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Transactions güncelleme başarılı', life: 3000 });
        this.hideDialog(); // Güncelleme işlemi tamamlandığında dialogu gizle
      }
    }).catch((error) => {
      console.error('Araç güncellenirken bir hata oluştu:', error);
    });
  }

  update(id: number, updatedRandevu: Transactions) {
    return this.apiService.updateEntity(id, updatedRandevu, Transactions);
  }

  bankaccountadd(entity: BankAccountRequest) {
    this.bankaccountAddDialog = true;
    this.createEntity<BankAccountRequest>(entity, 'BankAccount').then(response => {
      if (response?.status == ResponseStatus.Ok) {
        this.refresh();
        this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Employee ekleme başarılı', life: 3000 });
      }
    });
  }



  hideDialog() {

  }

  closeModal() {
    this.openModel = false;
  }

  modelOpen() {
    this.openModel = true;
  }

}

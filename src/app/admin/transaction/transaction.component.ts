import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ApiService } from "src/core/services/api/api.service";
import { ConfirmationService, MessageService } from 'primeng/api';
import { ResponseStatus } from 'src/core/models/response/base-response.model';
import { TransactionsRequest } from 'src/core/models/request/transactions-request.model ';
import { Transactions } from 'src/core/models/transactions.model';
import { BankAccountRequest } from 'src/core/models/request/bankaccount-request.model';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class TransactionComponent implements OnInit {
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

  filteredRandevu: Transactions[] = [];
  public searchRandevuName: string = ''; // Sınavda düzenle

  constructor(private readonly apiService: ApiService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,

  ) { }


  searchrandevular(searchKey: string) {
    this.filteredRandevu = this.transactions.filter((transactions) => {
      const targetKey = transactions.id + ' ' + transactions.userName;
      return targetKey.includes(searchKey);
    });
  }

 transactions: Transactions[] = [];
  ngOnInit() {
    this.refresh()
  }
  //bu kod bize evlerin ekrana gelmesini sağlayan kod yapısı...
  refresh() {
    this.apiService.getAllEntities(Transactions).subscribe((response) => {
      this.transactions = response.data;
      this.filteredRandevu=this.transactions;
      console.log(this.transactions)
    });
    //console.log(this.users)

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

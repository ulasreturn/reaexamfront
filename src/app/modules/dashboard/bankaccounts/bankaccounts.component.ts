import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ApiService } from "src/core/services/api/api.service";
import { ConfirmationService, MessageService } from 'primeng/api';
import { ResponseStatus } from 'src/core/models/response/base-response.model';
import { TransactionsRequest } from 'src/core/models/request/transactions-request.model ';
import { Transactions } from 'src/core/models/transactions.model';
import { BankAccountRequest } from 'src/core/models/request/bankaccount-request.model';
import { BankAccount } from 'src/core/models/bankaccount.model';


@Component({
  selector: 'app-bankaccounts',
  templateUrl: './bankaccounts.component.html',
  styleUrls: ['./bankaccounts.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class BankaccountsComponent implements OnInit {

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

  filteredRandevu: BankAccount[] = [];
  public searchRandevuName: string = ''; // Sınavda düzenle

  constructor(private readonly apiService: ApiService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,

  ) { }


  searchrandevular(searchKey: string) {
    this.filteredRandevu = this.bankaccount.filter((bankaccount) => {
      const targetKey = bankaccount.customerId + ' ' + bankaccount.accountNumber;
      return targetKey.includes(searchKey);
    });
  }

bankaccount: BankAccount[] = [];
  ngOnInit() {
    this.refresh()
  }
  //bu kod bize evlerin ekrana gelmesini sağlayan kod yapısı...
  refresh() {
    this.apiService.getAllEntities(BankAccount).subscribe((response) => {
      this.bankaccount = response.data;
      this.filteredRandevu=this.bankaccount;
      console.log(this.bankaccount)
    });
    //console.log(this.users)

  }


  


  


  selectedFiles: File[] = [];

  onFileChange(event: any) {
    const fileList: FileList = event.target.files;
    for (let i = 0; i < fileList.length; i++) {
      this.selectedFiles.push(fileList[i]);
    }
  }



  // editHouse() {
  //   this.houseEditDialog = true;
  // }

 



  hideDialog() {

  }

  closeModal() {
    this.openModel = false;
  }

  modelOpen() {
    this.openModel = true;
  }

}

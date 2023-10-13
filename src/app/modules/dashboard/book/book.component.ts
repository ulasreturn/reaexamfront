import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ApiService } from "../../../../core/services/api/api.service";
import { Books } from 'src/core/models/books.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BooksRequest } from '../../../../core/models/request/books-request.model';
import { ResponseStatus } from 'src/core/models/response/base-response.model';
import { AuthService } from 'src/core/services/auth/auth.service';
import { UserService } from 'src/core/services/user.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class BookComponent implements OnInit {
  public booksRequest: BooksRequest = <BooksRequest>{}

  booksAddDialog: boolean = false;
  booksEditDialog: boolean = false;
  openModel: boolean = false;

  BooksToEdit: Books | null = null;

  
  public searchBooksName: string = '';

  constructor(private readonly apiService: ApiService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private readonly authService: AuthService,
    private userService: UserService

  ) { }


  

  books: Books[] = [];
  userBooks: Books[] = [];
 
  loggedInUserId: number | null = null; 
  filteredBooks: Books[] = [];
  ngOnInit() {
    
    this.refresh();
     
  }
  //bu kod bize evlerin ekrana gelmesini sağlayan kod yapısı...
  refresh() {

    const user = this.authService.getCurrentUser();

    if (user) {
      this.loggedInUserId = user.id ?? null;

      this.apiService.getAllEntities<Books>(Books).subscribe((response) => {
        const booksData: Books[] = response.data; // API'den gelen veriyi al
        this.books = booksData;
        this.filteredBooks = this.books.filter(book => book.userId === this.loggedInUserId)
      });
      
      console.log('Kullanıcı Kimliği:', this.loggedInUserId);
      // Kullanıcının kimliği ile kitapları getirin
      // userId 2 ol/ userId 2 olan kitapları al
      }
}

searchbooks(searchKey: string) {
  
  if (this.loggedInUserId !== null) {
    this.filteredBooks = this.books.filter(book => {
      return book.userId === this.loggedInUserId && (book.id + ' ' + book.bookName).includes(searchKey);
    });
  
}
}




    //console.log(this.users)


  


  onCreate(entity: BooksRequest) {
    this.createEntity<BooksRequest>(entity, 'Books').then(response => {
      if (response?.status == ResponseStatus.Ok) {
        this.refresh();
        this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Ev ekleme başarılı', life: 3000 });
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

  addNewBook() {
    this.booksAddDialog = true;
  }

  deleteBook(id: number) {
    this.delete(id).then(response => {
      if (response?.status == ResponseStatus.Ok) {
        this.refresh();
        this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Kullanıcı başarı ile silindi', life: 3000 });
      }
    })
  }

  delete(id: number) {
    return this.apiService.deleteEntity(id, Books);
  }

  // editHouse() {
  //   this.houseEditDialog = true;
  // }

  openEditDialog(id: number) {
    this.apiService.getEntityById<Books>(id, Books).then((response) => {
      if (response && response.data) {
        this.booksEditDialog = true;
        this.BooksToEdit = response.data;
         // API'den alınan aracı carToEdit değişkenine atıyoruz
      } else {
        console.error('Ev bulunamadı veya alınırken bir hata oluştu.');
      }
    }).catch((error) => {
      console.error('Ev alınırken bir hata oluştu:', error);
    });
  }

  onUpdate(id: number, updatedBook: Books) {
    this.update(id, updatedBook).then(response => {
      if (response?.status == ResponseStatus.Ok) {
        this.refresh();
        this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Ev güncelleme başarılı', life: 3000 });
        this.hideDialog(); // Güncelleme işlemi tamamlandığında dialogu gizle
      }
    }).catch((error) => {
      console.error('Araç güncellenirken bir hata oluştu:', error);
    });
  }

  update(id: number, updatedBook: Books) {
    return this.apiService.updateEntity(id, updatedBook, Books);
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

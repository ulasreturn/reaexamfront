import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommentRequest } from 'src/core/models/request/comment-request.model';
import { ApiService } from 'src/core/services/api/api.service';
import { ActivatedRoute } from '@angular/router';
import { Comment } from 'src/core/models/comment.model';
import { AuthService } from 'src/core/services/auth/auth.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ResponseStatus } from 'src/core/models/response/base-response.model';
import { User } from 'src/core/models/user.model';
import { PaginationInstance } from 'ngx-pagination';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class ProductDetailsComponent implements OnInit {
  public config: PaginationInstance = {
    id: 'advanced',
    itemsPerPage: 3,
    currentPage: 1,
  };

  onPageChange(event: number) {
    this.config.currentPage = event;
  }

  public commentRequest: CommentRequest = {
    commentDate: new Date()
  };

  comments: Comment[] = [];
  loggedInUserId?: number | null = null; 
  currentUser: User | null = null;
  isLoggedIn = false;
  user: User | null = null;
  bookId: number | null = null;
  filteredComment: Comment[] = [];

  constructor(
    private apiService: ApiService,
    private readonly authService: AuthService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit() {
    
    this.authService.currentUser.subscribe((user: User | null) => {
      this.user = user;
    });
    this.authService.currentUser.subscribe((user) => {
      this.currentUser = user;
      this.isLoggedIn = user !== null;
    });
   this.refresh();
  


    this.route.paramMap.subscribe((params) => {
      const bookId = params.get('bookId');
      if (bookId !== null) {
        
          const bookIdNumber = +bookId; // bookId'yi sayıya çevir
          this.commentRequest.booksId = bookIdNumber;
          this.loadBookDetails(bookIdNumber);
          console.log('Deneme', this.commentRequest.booksId); // bookIdNumber'ı kullanarak ilgili kitap detaylarını getirin
      } else {
          // 'bookId' null olduğunda ne yapılacağını ele alın, örneğin bir hata mesajı gösterin veya yönlendirme yapın.
      }
  });
  
  }
  refresh(){
    const user = this.authService.getCurrentUser();
    if (user) {
      this.loggedInUserId = user.id ?? null;
      
        if (this.loggedInUserId !== null && this.loggedInUserId !== undefined) {
          this.commentRequest.userId = this.loggedInUserId;
        } else {
          // this.loggedInUserId, null veya undefined ise, booksRequest.userId'i nasıl ayarlamak istediğinizi belirtmelisiniz.
          // Örnek olarak:
          // this.commentRequest.userId = 0; // veya herhangi bir varsayılan değer
        }
      

      console.log('Kullanıcı Kimliği:', this.loggedInUserId);
      // Kullanıcının kimliği ile kitapları getirin
      // userId 2 ol/ userId 2 olan kitapları al
    }
  }

  loadBookDetails(bookId: number) {
    // bookId'yi kullanarak ilgili kitaba ait bilgileri API'dan alabilirsiniz
   // Verileri çekmek ve filtrelendikten sonra comments dizisine atamak
this.apiService.getAllEntitiesComments('Comment/GetAllComments').subscribe((response: any) => {
  const comments: Comment[] = response.$values;  // Verileri comments dizisine atama işlemi
  this.comments = comments;

  // İlgili bookId'ye sahip yorumları seçmek için bir filtreleme işlemi yapabilirsiniz
  const bookIdToFetch = bookId; // Almak istediğiniz bookId
  this.filteredComment = this.comments.filter(comment => comment.bookId === bookIdToFetch);

  console.log(this.filteredComment);
});

    
  }

  addComment() {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.loggedInUserId = user.id ?? null;
      this.apiService.addComment(this.commentRequest).subscribe((response) => {
        this.commentRequest = <CommentRequest>{};
        // Yorumlarınızı güncellemek için

        if (this.loggedInUserId !== null && this.loggedInUserId !== undefined) {
          this.commentRequest.userId = this.loggedInUserId;
        } else {
          // this.loggedInUserId, null veya undefined ise, booksRequest.userId'i nasıl ayarlamak istediğinizi belirtmelisiniz.
          // Örnek olarak:
          // this.commentRequest.userId = 0; // veya herhangi bir varsayılan değer
        }
      });

      console.log('Kullanıcı Kimliği:', this.loggedInUserId);
      // Kullanıcının kimliği ile kitapları getirin
      // userId 2 ol/ userId 2 olan kitapları al
    }
  }

  onCreate(entity: CommentRequest) {
    this.createEntity<CommentRequest>(entity, 'Comment')
      .then((response) => {
        if (response?.status == ResponseStatus.Ok) {
          this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Yorum ekleme başarılı', life: 3000 });
        } else {
          this.messageService.add({ severity: 'error', summary: 'Hata', detail: 'Yorum eklenirken bir hata oluştu', life: 3000 });
        }
      })
      .catch((error) => {
        console.error('Hata:', error); // Hata konsola yazdırılır
        this.messageService.add({ severity: 'error', summary: 'Hata', detail: 'Yorum eklenirken bir hata oluştu', life: 3000 });
      });
  }

  createEntity<TEntity>(entity: TEntity, entityType: string) {
    return this.apiService.createEntity<TEntity>(entity, entityType);
  }
}

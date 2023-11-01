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
import { Employee } from 'src/core/models/employee.model';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class DetailsComponent implements OnInit {
  public config: PaginationInstance = {
    // Yorumları sayfa şeklinde çağırdım.
    id: 'advanced',
    itemsPerPage: 3, // Bir sayfada 3 yorum
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
  doktorId: any[] | null = null;
  filteredComment: Comment[] = [];
  doktorlar: any[] | null = null;
  doktorDetails: Employee[] = [];// Tüm kitapları içeren dizi
  selectedDoktor: Employee | undefined; // 
  defaultImageUrl: string = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png';

  constructor(
    private apiService: ApiService,
    private readonly authService: AuthService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit() {
    // Kullanıcı bilgileri için işlemler
    this.authService.currentUser.subscribe((user: User | null) => {
      this.user = user;
    });
    this.authService.currentUser.subscribe((user) => {
      this.currentUser = user;
      this.isLoggedIn = user !== null;
    });
   this.refresh();
   // Paramsdan gelen book bilgilerini ekrana yansıttım.
   this.route.params.subscribe(params => {
    const Id = params['employeeId'];
    if (Id !== null) {
      this.apiService.getEmployeeInfo(Id).subscribe((data: any) => {
        console.log('API Yanıtı:', data); // Yanıtı konsola yazdırın
        this.selectedDoktor=data.data;// Seçilen kitabı bul
        console.log('control',  this.selectedDoktor); // Seçilen kitabı kontrol etmek için konsola yazdırın
       
      });
    }
  });
  
  this.route.paramMap.subscribe((params) => {
    const employeeId = params.get('employeeId');
    if (employeeId !== null) {
      
        const employeeIdNumber = +employeeId; // bookId'yi sayıya çevir
        this.commentRequest.employeeId = employeeIdNumber;
        this.loademployeeDetails(employeeIdNumber);
        
        console.log('Deneme', this.commentRequest.employeeId); 
    } else {
      
    }
});



 

  
  
  }
  
  refresh(){
    //Giriş yapan kullanıcı bilgisini loggedInUserId'de tutuyorum. Bu yorum eklemede veriyi gizli bir input olan commentRequest.userId'ye aktarıyorum. 
    const user = this.authService.getCurrentUser();
    if (user) {
      this.loggedInUserId = user.id ?? null;
      
        if (this.loggedInUserId !== null && this.loggedInUserId !== undefined) {
          this.commentRequest.userId = this.loggedInUserId;
        } else {
        
        }
      

      console.log('Kullanıcı Kimliği:', this.loggedInUserId);
    
    }
  }

  loademployeeDetails(employeeId:Number) {
    // bookId'yi kullanarak ilgili kitaba ait bilgileri API'dan alabilirsiniz
  
this.apiService.getAllEntitiesComments('Comment/GetAllComments').subscribe((response: any) => {
  const comments: Comment[] = response.$values;  // Verileri comments dizisine atama işlemi
  this.comments = comments;

  // İlgili bookId'ye sahip yorumları seçmek için bir filtreleme işlemi yapabilirsiniz
  const doktorIdToFetch = employeeId; // Almak istediğiniz bookId
  this.filteredComment = this.comments.filter(comment => comment.employeeId === doktorIdToFetch);

  console.log(this.filteredComment);
  console.log("bookıd",doktorIdToFetch) 

if (this.doktorlar) {
  const selectedDoktor = this.doktorlar.find(employee => employee.employeeId === employeeId);

  if (selectedDoktor) {
    // Kitapın bilgilerini kullanabilirsiniz
    const coverPhoto = selectedDoktor.user.userPhoto;
    const bookName = selectedDoktor.user.userName;
    const price = selectedDoktor.uzmanlikAlani;


    // Şimdi bu bilgileri kullanarak istediğiniz işlemleri yapabilirsiniz
    console.log('Kitap Resmi:', coverPhoto);
    console.log('Kitap Adı:', bookName);
    console.log('Fiyat:', price);

  } else {
    // Kitap bulunamadığında ne yapılacağını belirleyin (örneğin bir hata mesajı gösterin)
    console.log('Kitap bulunamadı.');
  }
} else {
  // this.books null ise ne yapılacağını belirleyin (örneğin bir hata mesajı gösterin)
  console.log('Kitap bilgileri yüklenemedi.');
}
});


    
  }
  // Yorum yapma
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

import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ApiService } from "src/core/services/api/api.service";
import { ResponseStatus } from 'src/core/models/response/base-response.model';
import { CommentRequest } from 'src/core/models/request/comment-request.model';

import { ConfirmationService, MessageService } from 'primeng/api';
import { Comment } from 'src/core/models/comment.model';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class CommentsComponent implements OnInit{

  public commentRequest: CommentRequest = {
    commentDate: new Date()
  };

  
  filteredComment: Comment[] = [];
  public searchCommentName: string = '';
  commentDate:string='';
  CommentToEdit: Comment | null = null;
  CommentAddDialog: boolean = false;
  CommentEditDialog: boolean = false;
  openModel: boolean = false;

  constructor(private readonly apiService: ApiService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    

    
  ) {  }


  searchComment(searchKey: string) {
    this.filteredComment = this.comments.filter((comment) => {
      const targetKey = comment.id + ' ' + comment.commentText;
      return targetKey.includes(searchKey);
    });
  }
Comments: Comment[] = [];
  comments: Comment[] = [];
  
  ngOnInit() {
     // Otomatik olarak tarihi inputa eklemek için ngOnInit() içinde aşağıdaki kodu kullanabilirsin   
     // Yorum tarihini input alanına yerleştirin
    

    this.refresh()
  }

  addNewComment() {
    this.CommentAddDialog = true;
  }

  openEditDialog(id: number) {
    this.apiService.getEntityById<Comment>(id, Comment).then((response) => {
      if (response && response.data) {
        this.CommentEditDialog = true;
        this.CommentToEdit = response.data; // API'den alınan aracı carToEdit değişkenine atıyoruz
      } else {
        console.error('Yorum bulunamadı veya alınırken bir hata oluştu.');
      }
    }).catch((error) => {
      console.error('Yorum alınırken bir hata oluştu:', error);
    });
  }


  onUpdate(id: number, updatedComment: Comment) {
    this.update(id, updatedComment).then(response => {
      if (response?.status == ResponseStatus.Ok) {
        this.refresh();
        this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Yorum güncelleme başarılı', life: 3000 });
        this.hideDialog(); // Güncelleme işlemi tamamlandığında dialogu gizle
      }
    }).catch((error) => {
      console.error('Araç güncellenirken bir hata oluştu:', error);
    });
  }

  update(id: number, updatedComment: Comment) {
    return this.apiService.updateEntity(id, updatedComment, Comment);
  }

  hideDialog() {

  }

  //bu kod bize evlerin ekrana gelmesini sağlayan kod yapısı...
  refresh() {
    
    this.apiService.getAllEntitiesComments('Comment/GetAllComments').subscribe((response: any) => {
      const comments: Comment[] = response.$values;  // Verileri comments dizisine atama işlemi
      this.comments = comments;
      this.filteredComment = this.comments;
      console.log(this.comments);
    });
  }
  

  modelOpen() {
    this.openModel = true;
  }

  closeModal() {
    this.openModel = false;
  }

  onCreate(entity: CommentRequest) {
    this.createEntity<CommentRequest>(entity, 'Comment').then(response => {
      if (response?.status == ResponseStatus.Ok) {
        this.refresh();
        this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Yorum ekleme başarılı', life: 3000 });
      }
    });
  }

  createEntity<TEntity>(entity: TEntity, entityType: string) {
    return this.apiService.createEntity<TEntity>(entity, entityType);
  }

  deleteComment(id: number) {
    this.delete(id).then(response => {
      if (response?.status == ResponseStatus.Ok) {
        this.refresh();
        this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Yorum başarı ile silindi', life: 3000 });
      }
    })
  }



  delete(id: number) {
    return this.apiService.deleteEntity(id, Comment);
  }
  
}

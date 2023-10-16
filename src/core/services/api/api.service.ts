import { Injectable, Type } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, map, share } from 'rxjs';

//import { environment } from '../../../../src/environments/environment.development';
//import { environment } from '../../../environments/environment';
import { environment } from 'src/environments/environment';
import { BaseDataResponse } from '../../models/response/base-data-response.model';
import { TokenResponse } from '../../models/response/token-response.model';
import { LoginRequest } from '../../models/request/login-request.model';
import { RegisterRequest } from '../../models/request/register-request.model';
import { User } from '../../models/user.model';
import { BaseResponse } from 'src/core/models/response/base-response.model';
import { BookRequest } from 'src/core/models/request/books-request.model';
import { Books } from 'src/core/models/books.model';
import { CommentRequest } from 'src/core/models/request/comment-request.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private endpoint = environment.api_url;

  constructor(private readonly http: HttpClient) { }

  login(request: LoginRequest): Observable<BaseDataResponse<TokenResponse>> {
    return this.http
      .post<BaseDataResponse<TokenResponse>>(
        this.endpoint + '/Auth/Login',
        request
      )
      .pipe(
        map((result) => {
          return result;
        })
      );
  }

  // register(
  //   request: RegisterRequest
  // ): Observable<BaseDataResponse<TokenResponse>> {
  //   return this.http
  //     .post<BaseDataResponse<TokenResponse>>(
  //       this.endpoint + '/Auth/Register',
  //       request
  //     )
  //     .pipe(
  //       map((result) => {
  //         return result;
  //       })
  //     );
  // }


  //Düzenleme

  register(
    request: RegisterRequest
  ): Observable<BaseDataResponse<TokenResponse>> {
    return this.http
      .post<BaseDataResponse<TokenResponse>>(
        //ENDPOINT DEĞİŞECEK (/signin olacak)
        this.endpoint + '/Auth/Register',
        request
      )
      .pipe(
        map((result) => {
          return result;
        })
      );
  }


  AddBook(
    request: BookRequest
  ): Observable<BaseDataResponse<TokenResponse>> {
    return this.http
      .post<BaseDataResponse<TokenResponse>>(
        //ENDPOINT DEĞİŞECEK (/signin olacak)
        this.endpoint + '/Books/Create',
        request
      )
      .pipe(
        map((result) => {
          return result;
        })
      );
  }

  AddFavourites(
    request: BookRequest
  ): Observable<BaseDataResponse<TokenResponse>> {
    return this.http
      .post<BaseDataResponse<TokenResponse>>(
        //ENDPOINT DEĞİŞECEK (/signin olacak)
        this.endpoint + '/Favourites/Create',
        request
      )
      .pipe(
        map((result) => {
          return result;
        })
      );
  }




  getEntityById<TEntity>(id: number, entityType: Type<TEntity>) {
    return this.http.get<BaseDataResponse<TEntity>>
    (`${environment.api_url}/${entityType.name}/GetById?id=${id}`)
    .pipe(share()).toPromise();
  }


  createEntity<TEntity>(entity: TEntity, entityType: string) {
    return this.http.post<BaseDataResponse<TEntity[]>>
      (environment.api_url + "/" + entityType + "/Create", entity)
      .pipe(share()).toPromise();
  }

  deleteEntity<TEntity>(id: number, entityType: Type<TEntity>) {
    return this.http.delete<BaseResponse>
      (environment.api_url + "/" + entityType.name + "/Delete?id=" + id)
      .pipe(share()).toPromise();
  }

  updateEntity<TEntity>(id: number, newEntity: TEntity, entityType: Type<TEntity>) {
    return this.http.put<BaseDataResponse<TEntity[]>>
      (environment.api_url + "/" + entityType.name + "/Update?id=" + id, newEntity)
      .pipe(share()).toPromise();
  }

  refreshToken(token: string): Observable<BaseDataResponse<TokenResponse>> {
    return this.http
      .get<BaseDataResponse<TokenResponse>>(
        this.endpoint + '/Auth/RefreshToken',
        { params: new HttpParams().append('token', token) }
      )
      .pipe(
        map((result) => {
          return result;
        })
      );
  }

  //Profil Getir
  getProfileInfo(): Observable<BaseDataResponse<User>> {
    return this.http
      .get<BaseDataResponse<User>>(this.endpoint + '/Auth/GetProfileInfo')
      .pipe(
        map((result) => {
          return result;
        })
      );
  }


  getAllEntities<TEntity>(entityType: Type<TEntity>) {
    return this.http.request<BaseDataResponse<TEntity[]>>
      ("get", environment.api_url + "/" + entityType.name + "/GetAll").pipe(share());

  }

  getBooksByUserId(userId: number): Observable<Books[]> {
    // Burada API'ye kullanıcı kimliği ile bir istek gönderin ve kitapları döndürün.
    // Örnek olarak:
    return this.http.get<Books[]>(`/api/books/user/${userId}`);
  }


  // Kullanıcıya ait kitapları getir
  getUserBooks(userId?: number): Observable<Books[]> {
    return this.http.get<Books[]>(`/api/books/user/${userId}`);
  }




  getAllEntitiesComments(endpoint: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(environment.api_url + '/' + endpoint);
  }
  

  

  // Kullanıcıya ait kitapları getir

  getBooksComments(bookId?: number): Observable<Books[]> {
    return this.http.get<Books[]>(`/api/books/comments/${bookId}`);
  }
  
  
  addComment(comment: CommentRequest) {
    // Sunucuya yeni yorum eklemek için HTTP POST isteği yapın.
    return this.http.post('/api/Comment/Create', comment);
  }

  getComments() {
    // Sunucudan yorumları almak için HTTP GET isteği yapın.
    return this.http.get<Comment[]>('/api/Comment');
  }
  getCommentsByBookId(bookId: number): Observable<Comment[]> {
    // API'den belirli bir bookId'ye sahip yorumları getiren HTTP isteği yapın
    return this.http.get<Comment[]>(`/api/Comment/GetAllComments/`);
  }

  getBookInfo(bookId: number): Observable<BaseDataResponse<Books>> {
    return this.http
      .get<BaseDataResponse<Books>>(`${this.endpoint}/Books/GetById?Id=${bookId}`)
      .pipe(
        map((result) => {
          return result;
        })
      );
  }



}

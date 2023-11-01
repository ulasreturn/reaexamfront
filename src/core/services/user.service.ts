import { Injectable, Type } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable, share } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { BaseDataResponse } from '../models/response/base-data-response.model';
import { map } from 'rxjs/operators';
import { EmailRequest } from '../models/request/email-request.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url: string = environment.api_url;

  constructor(private http: HttpClient, private route: ActivatedRoute ) {}

  public getUser() : Observable<User[]>{
    return this.http.get<User[]>(this.url+'/User/GetAll');
  }
  getAllEntities<TEntity>(entityType: Type<TEntity>) {
    return this.http.request<BaseDataResponse<TEntity[]>>
      ("get", environment.api_url + "/" + entityType.name + "/id").pipe(share());
  }

  deleteUser(id: number): Observable<User>{
    return this.http.delete<User>(environment.api_url+'/'+'User/Delete?id='+ id);
  }
  updateUser(user: User): Observable<User[]>{
    return this.http.put<User[]>(
      `${environment.api_url}/${this.url}`,
      user
    );
    
  }
  updateUserPhoto(id: number, photoUrl: string): Observable<User> {
    return this.http.put<User>(`${this.url}/${id}`, { userPhoto: photoUrl });
  }
  getCurrentUser(): Observable<User> {
    // Aktif kullanıcı bilgilerini getirme işlemleri
    return this.http.get<User>(`${this.url}/current`);
  }
   getUserEmail(): Observable<string[]> {
    return this.http.get<string[]>(`${this.url}/EmailInfo/GetAll`);
  }
  resetPassword(emailRequest: EmailRequest): Observable<any> {
    return this.http.put(`${this.url}/User/ChangePassword`, emailRequest);
  }
  }


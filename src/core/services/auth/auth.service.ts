import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api/api.service';
import { LoginRequest } from '../../models/request/login-request.model';
import { ResponseStatus } from '../../models/response/base-response.model';
import { TokenResponse } from '../../models/response/token-response.model';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { RegisterRequest } from 'src/core/models/request/register-request.model';
import { BookRequest } from 'src/core/models/request/books-request.model';



@Injectable({
  providedIn: 'root',
})
export class AuthService {
  

  
  
  public currentUser: Observable<User | null>;
  private currentUserSubject: BehaviorSubject<User | null>;


  //prettier-ignore
  constructor(private readonly apiService: ApiService, private router:Router) { //API çağrıları yapmak için kullanılır.
    this.currentUserSubject = new BehaviorSubject<User | null>(JSON.parse(<string>sessionStorage.getItem('current_user')));
  //currentUserSubject, sessionStorage'da saklanan mevcut kullanıcı bilgisini tutar.
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }
  
      //prettier-ignore
      public async login(request: LoginRequest): Promise<ResponseStatus> {
        const loginResponse = await this.apiService.login(request).toPromise();
  
        let status = loginResponse!.status;
  
        if (status == ResponseStatus.Ok) {
          this.setToken(loginResponse!.data);
  
          const profileResponse = await this.apiService
            .getProfileInfo()
            .toPromise();
  
          status = profileResponse!.status;
  
          if (status == ResponseStatus.Ok) {
            sessionStorage.setItem('current_user', JSON.stringify(profileResponse!.data));
  
            this.currentUserSubject.next(profileResponse!.data);
          } else {
            await this.logOut();
          }
        }
  
        return status;
      }
      public async addFavourites(request: BookRequest): Promise<ResponseStatus> {
        const bookResponse = await this.apiService.AddFavourites(request).toPromise();
        let status = bookResponse!.status;
      
        if (status === ResponseStatus.Ok) {
          this.router.navigate(['/favourites']);
          this.setToken(bookResponse!.data);
      
          // Kayıt işlemi başarılıysa, kullanıcının profil bilgilerini almak için apiService.getProfileInfo işlevini çağırın.
          const profileResponse = await this.apiService.getProfileInfo().toPromise();
          status = profileResponse!.status;
      
          if (status === ResponseStatus.Ok) {
            // Profil bilgilerini kaydedin ve kullanıcıyı oturum açık olarak işaretleyin.
      
          } else {
            await this.logOut();
          }
        }
        return status;
      }

  //prettier-ignore
  // public async login(request: LoginRequest): Promise<ResponseStatus> {    
  //   const loginResponse = await this.apiService.login(request).toPromise();

  //   let status = loginResponse!.status;

  //   if (status == ResponseStatus.Ok) {
  //     this.setToken(loginResponse!.data);
  //     //.getProfileInfo().toPromise();

  //     /* const profileResponse = await this.apiService
  //     .getProfileInfo()
  //     .toPromise();

        
  //     status = profileResponse!.status;

  //     if (status == ResponseStatus.Ok) {
  //       sessionStorage.setItem('current_user', JSON.stringify(profileResponse!.data));

  //       this.currentUserSubject.next(profileResponse!.data);
  //     } else {
  //       await this.logOut();
  //     }*/
  //     sessionStorage.setItem('current_user', JSON.stringify({}));
  //       this.currentUserSubject.next({} as User);
  //   } 


  //   return status;
  // }

//Register Kodu 
public async register(request: RegisterRequest): Promise<ResponseStatus> {


  const registerResponse = await this.apiService.register(request).toPromise();

  let status = registerResponse!.status;

  if (status == ResponseStatus.Ok) {

  }

  return status;
}

  public async refreshToken(): Promise<boolean> {
    const refreshTokenResponse = await this.apiService
      .refreshToken(<string>sessionStorage.getItem('refresh_token'))
      .toPromise();

    if (refreshTokenResponse!.status == ResponseStatus.Ok) {
      this.setToken(refreshTokenResponse!.data);

      return true;
    }

    return false;
  }

  //prettier-ignore
  private setToken(token: TokenResponse | null) {
    if (token != null) {
      sessionStorage.setItem('access_token', JSON.stringify(token.accessToken));
      sessionStorage.setItem('token_expiration', JSON.stringify(token.expiration));
      sessionStorage.setItem('refresh_token', JSON.stringify(token.refreshToken));
    }
  }

  async logOut() {
    sessionStorage.clear();
    this.currentUserSubject.next(null);
  }
  
  // Kullanıcı profil bilgilerini güncelleme işlevi
  async updateProfileInfo() {
    const profileResponse = await this.apiService.getProfileInfo().toPromise();
    const status = profileResponse!.status;

    if (status === ResponseStatus.Ok) {
      sessionStorage.setItem('current_user', JSON.stringify(profileResponse!.data));
      this.currentUserSubject.next(profileResponse!.data);
    } else {
      await this.logOut();
    }
  }
  public async addUser(request: RegisterRequest): Promise<ResponseStatus> {
    const registerResponse = await this.apiService.register(request).toPromise();
    let status = registerResponse!.status;

    if (status === ResponseStatus.Ok) {
      this.router.navigate(['/admin/admin-profile']);
      this.setToken(registerResponse!.data);

      // Kayıt işlemi başarılıysa, kullanıcının profil bilgilerini almak için apiService.getProfileInfo işlevini çağırın.
      const profileResponse = await this.apiService.getProfileInfo().toPromise();
      status = profileResponse!.status;

      if (status === ResponseStatus.Ok) {
        // Profil bilgilerini kaydedin ve kullanıcıyı oturum açık olarak işaretleyin.

      } else {
        await this.logOut();
      }
    }

    return status;
  }
  getCurrentUser(): User | null {
    // Kullanıcının oturum bilgilerini alın (örneğin, sessionStorage'dan)
    const userData = sessionStorage.getItem('current_user');
    if (userData) {
      return JSON.parse(userData) as User;
    }
    return null;
  }
}



//AuthService, kullanıcı kimlik doğrulama işlemlerini yönetmek ve kullanıcı oturum bilgilerini saklamak için kullanılır


//gerekli modüller ve servisler Angular'ın import ifadeleri ile içe akarılıyor

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from '../api/api.service';
import { LoginRequest } from '../../models/request/login-request.model';
import { ResponseStatus } from '../../models/response/base-response.model';
import { TokenResponse } from '../../models/response/token-response.model';
import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})


/*currentUser ve currentUserSubject adlı iki özellik tanımlanır. currentUser
bir şekilde mevcut kullanıcı bilgisi için tanımlanmıştır.
currentUserSubject ise mevcut kullanıcı bilgisini saklar. */


export class AuthService {
  public currentUser: Observable<User | null>;
  private currentUserSubject: BehaviorSubject<User | null>;
  private isLoggedIn: boolean = false;

  constructor(private readonly apiService: ApiService, private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User | null>(JSON.parse(<string>sessionStorage.getItem('current_user')));

    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  //KULLANICI OTURUM AÇTIYSA NAVBARDA LOGIN YERİNE PROFILE GELMESİ İÇİN EKLENDİ
  public get IsLoggedIn(): boolean {
    return this.currentUserValue !== null;
  }


  /*login fonksiyonu, kullanıcı girişi işlemini gerçekleştirir.
  Verilen bir LoginRequest nesnesiyle apiService.login işlevini çağırır ve giriş yanıtını alır.*/

  public async login(request: LoginRequest): Promise<ResponseStatus> {
    const loginResponse = await this.apiService.login(request).toPromise();

    let status = loginResponse!.status;


    if (status == ResponseStatus.Ok) {

      this.router.navigate(['/homepage']);

      this.setToken(loginResponse!.data);
      //Giriş yanıtı başarılı ise, oturum açma token'ını setToken fonksiyonuyla
      //ayarlar ve kullanıcının profil bilgilerini almak için apiService.getProfileInfo işlevini çağırır.
      const profileResponse = await this.apiService
        .getProfileInfo()
        .toPromise();
      status = profileResponse!.status;
      /* Profil bilgileri yanıtı başarılı ise, bu bilgileri sessionStorage'e kaydeder
       ve currentUserSubject'e yeni bir değer olarak atar.
 İşlem başarısız olursa, logOut işlevini çağırarak oturumu sonlandırır.*/
      if (status == ResponseStatus.Ok) {
        sessionStorage.setItem('current_user', JSON.stringify(profileResponse!.data));
        this.currentUserSubject.next(profileResponse!.data);
      } else {
        await this.logOut();
      }
    }

    return status;
  }

  /* refreshToken fonksiyonu, yenileme token'ını kullanarak token'ı yeniler. apiService.refreshToken işlevini
   çağırarak yenileme token'ını gönderir ve yanıtı alır.

     Yanıt başarılı ise, yeni token'ı setToken fonksiyonuyla ayarlar ve true değerini döndürür.
     İşlem başarısız olursa, false değerini döndürür. */



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
  /*setToken fonksiyonu, verilen bir token nesnesini alır ve sessionStorage'e ilgili token bilgilerini saklar.
logOut fonksiyonu, sessionStorage'deki tüm verileri temizler ve currentUserSubject'e null değerini atar.*/


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
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class DataService {
  private url: string = environment.api_url;

  constructor(private http: HttpClient) {}

  /*public getAddress() : Observable<Address[]>{
    return this.http.get<Address[]>(this.url+'/Address/GetAll');
  }*/
  updateData(data: any, id: string): Observable<any> {
    return this.http.patch(`${this.url}/update/${id}`, data)
}
}

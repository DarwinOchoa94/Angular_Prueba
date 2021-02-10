import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url = '';

  constructor(private http: HttpClient) {
  }

  buscar(params: any) {
    return this.http.get(`${this.url}/listar`, { params });
  }

  // obternerPais(): Observable<any> {
  //   return this.http.get('http://ipinfo.io')
  //   .map(response => response.json())
  //   .catch(error => {
  //       console.log(error);
  //       return Observable.throw(error.json());
  //   });
  // }

}

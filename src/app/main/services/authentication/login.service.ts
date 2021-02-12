import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs/';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url = 'http://10.150.200.106';

  constructor(private http: HttpClient) {
  }

  buscar(params: any) {
    return this.http.get(`${this.url}/listar`, { params });
  }

  obtenerPais() {
    let url = "https://api.ipgeolocation.io/ipgeo?apiKey=c6a53083691d4b05862f21fab76d275c&fields=country_name";
    return this.http
      .get(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  obtenerEmpresas(nombre_pais: string) {
    //console.log(params);
    return this.http
      .get(`${this.url}/seguridad/empresa/nombrePais=${nombre_pais}`)
      .pipe(
        map(response => response['data']),
        //tap(users => console.log("users array", users)),
        catchError(this.handleError)
      );
  }

  login(params: object) {
    return this.http
      .post(`${this.url}/seguridad/login`, { params })
      .pipe(
        map(response => response['data']),
        //tap(users => console.log("users array", users)),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

}

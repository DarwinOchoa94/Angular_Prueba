import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  valido: string

  constructor() { 
    this.valido = '';
  }

  login(usuario: string, contrasena: string){
    //console.log('*** en servicio', usuario, contrasena);
    if (usuario == 'admin' && contrasena == 'admin'){
      this.valido = 'ok'
      localStorage.setItem('logeado', this.valido)
      return this.valido 
      
    }
    else{
      return this.valido = 'error';
    }   
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  valido = ''

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required]
    });
    
    if (localStorage.getItem('logeado') == 'ok')
    { 
      this.router.navigate(['/pedidos'])
    }
  }

  get form() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.valido = this.loginService.login(this.form.usuario.value, this.form.contrasena.value)
    if (this.valido == 'ok'){
      this.router.navigate(['/lista-pedidos'])
      this.loading = false;  
    }
    else{
      Swal.fire({
        title: 'Error',
        text: 'Usuario o Contraseña Incorrecta',
        type: 'error',
        allowOutsideClick: false,
      });
      this.loading = false;  
    }
  }
}
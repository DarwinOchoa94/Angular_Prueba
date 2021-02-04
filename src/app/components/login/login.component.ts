import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { loginModel } from 'src/app/models/login.model';
import { LoginService } from 'src/app/services/login.service';

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
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required]
    });
    console.log(localStorage.getItem('logeado'));
    
    if (localStorage.getItem('logeado') == 'ok')
    {
      console.log('ya logeado');
      
      this.router.navigate(['/pedidos'])
    }
  }

  // convenience getter for easy access to form fields
  get form() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.valido = this.loginService.login(this.form.usuario.value, this.form.contrasena.value)
    if (this.valido == 'ok'){
      this.router.navigate(['/pedidos'])
      this.loading = true;
      console.log(localStorage.getItem('logeado'));
      
    }
    else{
      this.loading = false;
    }
  }
}
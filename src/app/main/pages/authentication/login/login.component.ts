import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';

import { EmpresaModel } from 'app/main/models/Seguridad/Empresa/empresa.model'
import { LoginModel } from '../../../models/Seguridad/Login/login.model'
import { LoginService } from 'app/main/services/authentication/login.service';
import { switchMap } from 'rxjs/operators';
import { isDate } from 'lodash';

@Component({
    selector     : 'login',
    templateUrl  : './login.component.html',
    styleUrls    : ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class LoginComponent implements OnInit
{
    loginForm: FormGroup;
    login = new LoginModel();
    empresas = new EmpresaModel();
    arrEmpresas: Array<EmpresaModel> = [];
    fechaHora = new Date;
    arrMenu: any = [];
    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private loginService: LoginService,
    )
    {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: true
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.loginForm = this._formBuilder.group({
            empresa     : ['', Validators.required],
            //empresa     : ['', Validators.required],
            usuario     : ['', Validators.required],
            //empresa   : ['', Validators.required],
            //email     : ['', [Validators.required, Validators.email]],
            password    : ['', Validators.required]
        });

        this.loginService.obtenerPais().subscribe(data => {
            this.empresas.nombre_pais = data['country_name']
            console.log(this.empresas.nombre_pais);
            this.loginService.obtenerEmpresas(this.empresas.nombre_pais).subscribe(data => {
                this.arrEmpresas = data
                console.log(this.arrEmpresas);              
            })
        });
    }

    ingresar(){
        this.obtenerFechaHora();
        this.llenarObjetoLogin();
        console.log(this.login);
        this.loginService.login(this.login).subscribe(data => {
            this.arrMenu = data
        })
        
    }

    obtenerFechaHora(){
        this.login.fecha = this.fechaHora.toISOString().slice(0, 10)
        this.login.hora = this.fechaHora.toISOString().slice(11, 16)
    }

    llenarObjetoLogin(){
        this.login.idEmpresa = this.loginForm.value['empresa'];
        this.login.usuario = this.loginForm.value['usuario'];
        this.login.password = this.loginForm.value['password'];
        this.login.idPais = this.arrEmpresas[0].id_pais;
        console.log(this.arrEmpresas);
    }

}

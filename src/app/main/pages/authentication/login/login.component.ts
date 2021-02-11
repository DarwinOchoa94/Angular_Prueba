import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';

import { EmpresaModel } from 'app/main/models/Seguridad/Empresa/empresa.model'
import { LoginService } from 'app/main/services/authentication/login.service';

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
    empresas = new EmpresaModel();
    arrEmpresas: Array<object> = [];

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
            usuario     : ['', Validators.required],
            //empresa   : ['', Validators.required],
            //email     : ['', [Validators.required, Validators.email]],
            password    : ['', Validators.required]
        });
       
        this.loginService.obtenerPais().subscribe(data => {
            this.empresas.nombre_pais = data['country_name']
            console.log(this.empresas.nombre_pais);
            this.loginService.obtenerEmpresas(this.empresas.nombre_pais).subscribe(data => {
                //this.arrEmpresas = data
            })
        });
    }

}

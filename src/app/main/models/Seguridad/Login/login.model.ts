export class LoginModel{
    usuario: string;
    password: string;
    idEmpresa: number;
    idPais: number;
    idAplicacion: number;
    fecha: string;
    hora: string;

    constructor(){
        this.usuario = '';
        this.password = '';
        this.idEmpresa = null;
        this.idPais = null;
        this.idAplicacion = 1;
        this.fecha = '';
        this.hora = '';
    }
}
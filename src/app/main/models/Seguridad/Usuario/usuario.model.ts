export class UsuarioModel{
    empresa: string;
    usuario: string;
    password: string;

    constructor(){
        this.usuario = '';
        this.password = '';
        this.empresa = '';
    }
}
export class EmpresaModel{
    icono: string;
    id_empresa: number;
    nombre_empresa: string;
    nombre_pais: string;
    id_pais: number;

    constructor(){
        this.icono = '';
        this.nombre_empresa = '';
        this.id_empresa = null;
        this.id_pais = null;
        this.nombre_pais = '';
    }
}
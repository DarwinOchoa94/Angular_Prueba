export class PedidosModel {

    id: number;
    nombre_cliente: string;
    cantidad_productos_ingresados: number;
    valor_subtotal_0: number;
    valor_subtotal_12: number;
    total_de_orden: number;
    fecha_hora: string;

    constructor() {
        this.id = null;
        this.nombre_cliente = null;
        this.cantidad_productos_ingresados = null;
        this.valor_subtotal_0 = null;
        this.valor_subtotal_12 = null;
        this.total_de_orden = null;
        this.fecha_hora = null;
    }
}
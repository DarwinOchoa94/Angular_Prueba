export class PedidoModel {

    id: number;
    nombre_producto: string;
    cantidad: number;
    precio: number;
    sujeto_iva: boolean;
    subtotal_0: number;
    subtotal_12: number;
    iva: number;
    subtotal: number;
    total: number;

    constructor() {
      this.id = null,
      this.nombre_producto = null,
      this.cantidad = null,
      this.precio = null,
      this.sujeto_iva = true,
      this.subtotal_0 = null,
      this.subtotal_12 = null,
      this.iva = null,
      this.subtotal = null,
      this.total = null
    }

}

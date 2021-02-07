import { PedidosModel } from "./pedidos.model";

export class PedidoModel {

    id: number;
    nombre_producto: string;
    cantidad: number;
    precio: number;
    sujeto_iva: boolean;
    subtotal_0: number;
    subtotal_12: number;
    iva: number;
    total: number;
    arrPedidos : Array<PedidosModel>

    constructor() {
      this.id = null,
      this.nombre_producto = null,
      this.cantidad = null,
      this.precio = null,
      this.sujeto_iva = null,
      this.subtotal_0 = 0,
      this.subtotal_12 = 0,
      this.iva = 0,
      this.total = 0
      this.arrPedidos = new Array<PedidosModel>();
    }

}

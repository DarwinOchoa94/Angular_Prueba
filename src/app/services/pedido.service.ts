import { Injectable } from '@angular/core';
import { PedidosModel } from '../models/pedidos.model';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  arrPedidos: PedidosModel[]

  constructor() {
    this.arrPedidos = []
   }

   crearPedido(pedido): any{
    this.arrPedidos.push(pedido);
    localStorage.setItem('arrPedidos', JSON.stringify(this.arrPedidos))
  }

   listar(): Promise<PedidosModel[]>{
    return new Promise((resolve, reject) => {
      resolve(this.arrPedidos);
    })
  }
}

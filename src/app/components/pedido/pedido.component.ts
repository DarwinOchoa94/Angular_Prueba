import { Component, OnInit } from '@angular/core';
import { PedidoModel } from 'src/app/models/pedido.model';
import { PedidosModel } from 'src/app/models/pedidos.model';
import { Router } from '@angular/router';
import { PedidoService } from 'src/app/services/pedido.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {

  valor_subtotal_0: number = 0;
  valor_subtotal_12: number = 0;
  total_de_orden: number = 0;
  fecha_hora = new Date;

  //objPedido: any = {}

  editField: string;

  pedidos: PedidosModel[] = [];

  listaProducto = new PedidoModel

  detallePedido = new PedidoModel

  constructor(private pedidoService: PedidoService, private router: Router) { }

  ngOnInit(): void {
  }

  nuevoV2() {
    //var objPedido: any = {}
    this.detallePedido.id = this.listaProducto.arrPedidos.length + 1
    this.listaProducto.arrPedidos.push(this.listaProducto.arrPedidos[0])
  }

  // actualizarCliente(event: any) {
  //   const editField = event.target.value;
  //   this.objPedido.nombre_cliente = editField
  // }

  actualizarLista(id: number, property: string, event: any) {
    const editField = event.target.textContent;
    this.listaProducto[id][property] = editField;
  }

  actualizarListaV2(id: number, property: string, event: any) {
    if (property == 'sujeto_iva') {
      const editField = event.target.checked;
      this.listaProducto[id][property] = editField;
    }
    else {
      const editField = event.target.value;
      this.listaProducto[id][property] = editField;
    }
  }

  eliminar(id: number) {
    this.listaProducto.arrPedidos.splice(id, 1)
  }

  calcularSubtotales(id: number, property: string) {
    if (this.listaProducto[id].sujeto_iva == true) {
      if(this.listaProducto[id].subtotal_0 != null){
        this.listaProducto[id].subtotal_0 = 0;
      }
      this.listaProducto[id].subtotal_12 = this.listaProducto[id].precio * this.listaProducto[id].cantidad;
      this.listaProducto[id].iva = this.listaProducto[id].subtotal_12 * 0.12;
      this.listaProducto[id].total = this.listaProducto[id].subtotal_12 + this.listaProducto[id].iva;
    }
    else {
      if(this.listaProducto[id].subtotal_12 != null){
        this.listaProducto[id].subtotal_12 = 0;
        this.listaProducto[id].iva = 0;
      }
      this.listaProducto[id].subtotal_0 = this.listaProducto[id].precio * this.listaProducto[id].cantidad;
      this.listaProducto[id].total = this.listaProducto[id].subtotal_0;
      this.listaProducto[id].subtotal_12 = 0;
      this.listaProducto[id].iva = 0;
    }
  }

  calcularTotales() {
    this.fecha_hora.toLocaleDateString();
    // this.listaProducto.forEach(element => {
    //   this.valor_subtotal_0 += element.subtotal_0;
    //   this.valor_subtotal_12 += element.subtotal_12;
    //   this.total_de_orden = element.total + this.total_de_orden;
    // });
  }

  llenarObjeto() {
    // this.pedidos[0] = {
    //   id: null,
    //   nombre_cliente: this.objPedido.nombre_cliente,
    //   cantidad_productos_ingresados: this.listaProducto.length,
    //   valor_subtotal_0: this.valor_subtotal_0,
    //   valor_subtotal_12: this.valor_subtotal_12,
    //   total_de_orden: this.total_de_orden,
    //   fecha_hora: this.fecha_hora.toString(),
    // }
  }

  guardar() {

    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      type: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();
    this.calcularTotales();
    this.llenarObjeto();
    this.pedidoService.crearPedido(this.pedidos[0])
    this.router.navigate(['/pedidos'])
    Swal.fire({
      text: 'Se guardo correctamente',
      type: 'success'
    });
  }

}

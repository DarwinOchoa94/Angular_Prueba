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

  //DETALLE PEDIDO
  detallePedido = new PedidoModel;
  arrDetallePedido = new Array;

  valor_subtotal_0: number = 0;
  valor_subtotal_12: number = 0;
  total_de_orden: number = 0;
  fecha_hora = new Date;

  editField: string;

  pedidos: PedidosModel[] = [];

  constructor(private pedidoService: PedidoService, private router: Router) { }

  ngOnInit(): void {
  }

  nuevoV2() {
    //var objPedido: any = {}
    console.log(this.detallePedido);
    this.detallePedido.id = this.arrDetallePedido.length +1
    this.arrDetallePedido.push(this.detallePedido)
    console.log(this.arrDetallePedido);
    
  }

  // actualizarCliente(event: any) {
  //   const editField = event.target.value;
  //   this.objPedido.nombre_cliente = editField
  // }

  actualizarListaV3(id: number, property: string, event: any) {
    if (property == 'sujeto_iva') {
      const editField = event.target.checked;
      this.arrDetallePedido[id][property] = editField;
    }
    else {
      const editField = event.target.value;
      this.arrDetallePedido[id][property] = editField;
    }
  }

  eliminar(id: number) {
    this.arrDetallePedido.splice(id, 1)
  }

  calcularSubtotales(id: number) {
    if (this.arrDetallePedido[id].sujeto_iva == true) {
      if(this.arrDetallePedido[id].subtotal_0 != null){
        this.arrDetallePedido[id].subtotal_0 = 0;
      }
      this.arrDetallePedido[id].subtotal_12 = this.arrDetallePedido[id].precio * this.arrDetallePedido[id].cantidad;
      this.arrDetallePedido[id].iva = this.arrDetallePedido[id].subtotal_12 * 0.12;
      this.arrDetallePedido[id].total = this.arrDetallePedido[id].subtotal_12 + this.arrDetallePedido[id].iva;
    }
    else {
      if(this.arrDetallePedido[id].subtotal_12 != null){
        this.arrDetallePedido[id].subtotal_12 = 0;
        this.arrDetallePedido[id].iva = 0;
      }
      this.arrDetallePedido[id].subtotal_0 = this.arrDetallePedido[id].precio * this.arrDetallePedido[id].cantidad;
      this.arrDetallePedido[id].total = this.arrDetallePedido[id].subtotal_0;
      this.arrDetallePedido[id].subtotal_12 = 0;
      this.arrDetallePedido[id].iva = 0;
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
    this.router.navigate(['/lista-pedidos'])
    Swal.fire({
      text: 'Se guardo correctamente',
      type: 'success'
    });
  }

}

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

  //CABECERA PEDIDO
  cabeceraPedido = new PedidosModel;
  arrCabezeraPedido = new Array;
  fecha_hora = new Date

  editField: string;

  constructor(private pedidoService: PedidoService, private router: Router) { }

  ngOnInit(): void {
  }

  nuevoV2() {
    console.log(this.detallePedido);
    this.detallePedido.id = this.arrDetallePedido.length +1
    this.arrDetallePedido.push(this.detallePedido)
    console.log(this.arrDetallePedido); 
  }

  actualizarListaV3(id: number, property: string, event: any) {
    if (property == 'sujeto_iva') {
      const editField = event.target.checked;
      this.arrDetallePedido[id][property] = editField;
    }
    else if (property == 'nombre_cliente'){
      const editField = event.target.value;
      this.cabeceraPedido.nombre_cliente = editField
      console.log(this.cabeceraPedido);
      
    }
    else{
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
    let stringFecha: string = this.fecha_hora.toISOString();
    this.arrDetallePedido.forEach(element => {
      this.cabeceraPedido.valor_subtotal_0 += element.subtotal_0;
      this.cabeceraPedido.valor_subtotal_12 += element.subtotal_12;
      this.cabeceraPedido.total_de_orden += element.total;
    });
    this.cabeceraPedido = {
      id: this.arrCabezeraPedido.length + 1,
      nombre_cliente: this.cabeceraPedido.nombre_cliente,
      cantidad_productos_ingresados: this.arrDetallePedido.length,
      valor_subtotal_0: this.cabeceraPedido.valor_subtotal_0,
      valor_subtotal_12: this.cabeceraPedido.valor_subtotal_12,
      total_de_orden: this.cabeceraPedido.total_de_orden,
      fecha_hora: stringFecha
    }
    console.log(this.cabeceraPedido);
    
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
    this.pedidoService.crearPedido(this.cabeceraPedido)
    this.router.navigate(['/lista-pedidos'])
    Swal.fire({
      text: 'Se guardo correctamente',
      type: 'success'
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { PedidoModel } from 'src/app/models/pedido.model';
import { PedidosModel } from 'src/app/models/pedidos.model';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {

  valor_subtotal_0: number = null;
  valor_subtotal_12: number = null;
  total_de_orden: number = null;
  fecha_hora = new Date;

  editField: string;
  personList: Array<any> = [];

  pedidos: PedidosModel[] = [];

  listaProducto: PedidoModel[] = [
    {
      id: 1,
      nombre_producto: 'TEST',
      cantidad: 10,
      precio: 5,
      sujeto_iva: true,
      subtotal_0: 50,
      subtotal_12: null,
      iva: 5,
      subtotal: 20,
      total: 25
    }
  ]

  awaitingPersonList: Array<any> = [
    //{id: 1}, {id: 2}, {id:3}
    //{ id: 6, name: 'George Vega', age: 28, companyName: 'Classical', country: 'Russia', city: 'Moscow' },
  ];

  constructor(private pedidoService: PedidoService, private router: Router) { }

  ngOnInit(): void {
  }

  updateList(id: number, property: string, event: any) {
    const editField = event.target.textContent;
    this.personList[id][property] = editField;
    console.log(this.personList);

  }

  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.textContent;
  }

  remove(id: any) {
    this.awaitingPersonList.push(this.personList[id]);
    this.personList.splice(id, 1);
  }

  add() {
    //if (this.awaitingPersonList.length > 0) {
    const person = this.awaitingPersonList[0];
    this.personList.push(person);
    this.awaitingPersonList.splice(0, 1);
    //}
  }

  nuevo() {
    var producto = this.listaProducto[0];
    producto.id = this.listaProducto.push(producto);
    //this.listaProducto.splice(0, 1);
    console.log(producto);
  }

  actualizarLista(id: number, property: string, event: any) {
    const editField = event.target.textContent;
    this.listaProducto[id][property] = editField;
    console.log(this.listaProducto);
  }

  eliminar(id: number) {
    this.listaProducto.splice(id, 1)
  }

  calcularSubtotales(id: number, property: string){
    if (this.listaProducto[id].precio != null && this.listaProducto[id].cantidad != null){
      console.log('en true');
    }
    else{
      console.log('en false');
      
    }
  }

  calcularTotales() {
    this.fecha_hora.toLocaleDateString();
    console.log(this.fecha_hora);
    
    this.listaProducto.forEach(element => {
      this.valor_subtotal_0 += element.subtotal_0;
      this.valor_subtotal_12 += element.subtotal_12;
      this.total_de_orden = element.total + this.total_de_orden;
    });
    console.log(this.valor_subtotal_0, this.valor_subtotal_12, this.total_de_orden);
  }

  llenarObjeto() {
    this.pedidos[0] = {
      id: null,
      nombre_cliente: null,
      cantidad_productos_ingresados: this.listaProducto.length,
      valor_subtotal_0: this.valor_subtotal_0,
      valor_subtotal_12: this.valor_subtotal_12,
      total_de_orden: this.total_de_orden,
      fecha_hora: this.fecha_hora.toString(),
    }
  }

  llenarPedidos() {
    console.log(this.pedidos[0]);

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
    console.log(this.pedidos[0]);

    Swal.fire({
      //title: this.pedido.descripcion,
      text: 'Se guardo correctamente',
      type: 'success'
    });
  }

}

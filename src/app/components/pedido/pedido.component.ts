import { Component, OnInit } from '@angular/core';
import { PedidoModel } from 'src/app/models/pedido.model';
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
  

  editField: string;
  personList: Array<any> = [];

  listaProducto: PedidoModel[] = [
    {
      id: 1,
      nombre_producto: 'Lapices',
      cantidad: null,
      precio: null,
      sujeto_iva: true,
      subtotal_0: null,
      subtotal_12: null,
      iva: null,
      subtotal: null,
      total: null
    }
  ]

  awaitingPersonList: Array<any> = [ {id: 1}, {id: 2}, {id:3}
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
    // const producto = this.listaProducto[0];
    this.listaProducto.push(this.listaProducto[0]);
    //this.listaProducto.splice(0, 1);
    console.log(this.listaProducto);
  }

  actualizarLista(id: number, property: string, event: any) {
    const editField = event.target.textContent;
    this.listaProducto[id][property] = editField;
    console.log(this.listaProducto);
  }

  eliminar(id: number){
    this.listaProducto.splice(id, 1)
  }

  calcularTotal(formProducto: NgForm){
    
  }
  
  guardar(formProducto: NgForm){

    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      type: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    this.pedidoService.crearPedido(formProducto.value)
    this.router.navigate(['/pedidos'])
    console.log(formProducto.value);

    Swal.fire({
      //title: this.pedido.descripcion,
      text: 'Se guardo correctamente',
      type: 'success'
    });
  }

  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.textContent;
  }
}

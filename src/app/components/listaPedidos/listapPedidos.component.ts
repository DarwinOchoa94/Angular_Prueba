import { Component, OnInit } from '@angular/core';
import { PedidosModel } from 'src/app/models/pedidos.model';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
  selector: 'app-listapPedidos',
  templateUrl: './listapPedidos.component.html',
  styleUrls: ['./listapPedidos.component.css']
})
export class ListaPedidosComponent implements OnInit {

  cargando = false;
  pedidos: PedidosModel[] = [];
  pedidosLocal: PedidosModel[] = [];

  constructor(private pedidoService: PedidoService) { }

  ngOnInit(): void {
    this.pedidosLocal = JSON.parse(localStorage.getItem('arrPedidos')) 
    this.cargando = true;
    this.pedidoService.listar()
    .then((arrPedidos) =>{
      if (arrPedidos.length < 0){
        this.pedidos = this.pedidosLocal
        this.cargando = false;
      }
      else{
        this.pedidos = arrPedidos
        this.cargando = false;
      }
    })
  }
}

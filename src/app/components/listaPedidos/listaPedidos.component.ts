import { Component, OnInit } from '@angular/core';
import { PedidosModel } from 'src/app/models/pedidos.model';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
  selector: 'app-listaPedidos',
  templateUrl: './listaPedidos.component.html',
  styleUrls: ['./listaPedidos.component.css']
})
export class ListaPedidosComponent implements OnInit {

  cargando = false;
  pedidos: PedidosModel[] = [];
  pedidosLocal: PedidosModel[] = [];

  constructor(private pedidoService: PedidoService) { }

  ngOnInit(): void {
    this.pedidosLocal = JSON.parse(localStorage.getItem('arrPedidos')) 
    console.log(this.pedidosLocal);
    this.cargando = true;
    this.pedidoService.listar()
    .then((arrPedidos) =>{
      if (arrPedidos.length == 0){
        console.log("en true");
        
        this.pedidos = this.pedidosLocal
        this.cargando = false;
      }
      else{
        console.log("en false");
        
        this.pedidos = arrPedidos
        this.cargando = false;
      }
    })
  }
}

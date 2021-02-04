import { Component, OnInit } from '@angular/core';
import { PedidosModel } from 'src/app/models/pedidos.model';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  cargando = false;
  pedidos: PedidosModel[] = []

  constructor(private pedidoService: PedidoService) { }

  ngOnInit(): void {
    localStorage.getItem('logeado')
    this.cargando = true;
    this.pedidoService.listar()
    .then((arrPedidos) =>{
      this.pedidos = arrPedidos
      this.cargando = false;
      console.log(this.pedidos);
    })
  }

}

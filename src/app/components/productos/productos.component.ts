import { Component, OnInit } from '@angular/core';
import { ProductoModel } from 'src/app/models/producto.model';
import { ProductoService } from 'src/app/services/producto.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productos: ProductoModel[] = [];
  cargando = false;


  constructor(private productoService: ProductoService) { }


  ngOnInit() {
    this.cargando = true;
    this.productoService.listar()
    .then((arrProductos) =>{
      this.productos = arrProductos
      this.cargando = false;
      console.log(this.productos);
    })

  }

  borrarProducto(producto: ProductoModel, i: number) {

    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro que desea borrar a ${producto.descripcion}`,
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true
    })
    // .then(resp => {

    //   if (resp.value) {
    //     this.producto.splice(i, 1);
    //     this.productoService.borrarProducto(producto.id).subscribe();
    //   }
    // });
  }

}


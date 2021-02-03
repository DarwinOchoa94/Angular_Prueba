import { Component, OnInit } from '@angular/core';
import { ProductoModel } from 'src/app/models/producto.model';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { ProductoService } from 'src/app/services/producto.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  producto: ProductoModel = new ProductoModel();

  constructor(
    private productoService: ProductoService, 
    private route: ActivatedRoute,
    private router: Router) { 
  }

  ngOnInit() {

  }

  guardar(formProducto: NgForm){

    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      type: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    this.productoService.crearProducto(formProducto.value)
    this.router.navigate(['/productos'])
    console.log(formProducto.value);

    Swal.fire({
      title: this.producto.descripcion,
      text: 'Se guardo correctamente',
      type: 'success'
    });
  }
}
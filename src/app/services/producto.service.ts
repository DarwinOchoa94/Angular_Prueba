import { Injectable } from '@angular/core';
import { ProductoModel } from '../models/producto.model'

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  arrProductos: ProductoModel[];

  constructor() { 
    this.arrProductos = []
  }

  crearProducto(Producto): any{
    this.arrProductos.push(Producto);
    console.log(this.arrProductos);
  }

  listar(): Promise<ProductoModel[]>{
   return new Promise((resolve, reject) => {
     resolve(this.arrProductos);
   })
 }
}

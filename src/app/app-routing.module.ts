import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatatableComponent } from './components/datatable/datatable.component';
import { LoginComponent } from './components/login/login.component';
import { PedidoComponent } from './components/pedido/pedido.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { ProductoComponent } from './components/producto/producto.component';
import { ProductosComponent } from './components/productos/productos.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'producto', component: ProductoComponent},
  {path: 'productos', component: ProductosComponent},
  {path: 'pedidos', component: PedidosComponent},
  {path: 'pedido', component: PedidoComponent},
  {path: 'datatable', component: DatatableComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

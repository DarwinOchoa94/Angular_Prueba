import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PedidoComponent } from './components/pedido/pedido.component';
import { ListaPedidosComponent } from './components/listaPedidos/listapPedidos.component';

const routes: Routes = [
  {path: '', pathMatch:'full', redirectTo:'login'},
  {path: 'login', component: LoginComponent},
  {path: 'lista-pedidos', component: ListaPedidosComponent},
  {path: 'pedido', component: PedidoComponent},
  {path: '**', redirectTo:'login'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

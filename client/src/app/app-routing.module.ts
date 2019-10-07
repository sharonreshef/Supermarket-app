import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ProductsComponent } from './products/products.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { ProductPageComponent } from './components/product/product-page/product-page.component';
import { OrderComponent } from './components/order/order.component';

const routes: Routes = [
  { path: 'products', component: ProductPageComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'order', component: OrderComponent },

  { path: '', component: HomePageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

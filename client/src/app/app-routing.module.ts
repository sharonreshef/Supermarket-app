import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ProductPageComponent } from './components/product/product-page/product-page.component';
import { OrderComponent } from './components/order/order.component';
import { EditComponent } from './components/admin/product/edit/edit.component';
import { CreateComponent } from './components/admin/product/create/create.component';
import { AuthGuard } from './core/guards/auth-guard.service';
import { AdminGuard } from './core/guards/admin-guard.service';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: HomePageComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: 'products',
    component: ProductPageComponent,
    canActivate: [AuthGuard]
  },
  { path: 'order', component: OrderComponent, canActivate: [AuthGuard] },
  { path: 'edit/:id', component: EditComponent, canActivate: [AdminGuard] },
  { path: 'create', component: CreateComponent, canActivate: [AdminGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

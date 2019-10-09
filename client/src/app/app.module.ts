import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import {
  MatCardModule,
  MatSelectModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatStepperModule,
  MatNativeDateModule
} from '@angular/material';
import { CreditCardDirectivesModule } from 'angular-cc-library';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './components/auth/register/register.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NavigationComponent } from './components/shared/navigation/navigation.component';
import { CardComponent } from './components/shared/card/card.component';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { appReducers } from './core/store/app.reducers';
import { ProductPageComponent } from './components/product/product-page/product-page.component';
import { CartComponent } from './components/product/cart/cart.component';
import { CartItemComponent } from './components/product/cart-item/cart-item.component';
import { StartShoppingComponent } from './components/auth/start-shopping/start-shopping.component';
import { NotificationsComponent } from './components/home-page/notifications/notifications.component';
import { OrderComponent } from './components/order/order.component';
import { OrderListComponent } from './components/order/order-list/order-list.component';
import { ProductFilterComponent } from './components/product/product-filter/product-filter.component';
import { EditComponent } from './components/admin/product/edit/edit.component';
import { CreateComponent } from './components/admin/product/create/create.component';
import { AuthGuard } from './core/guards/auth-guard.service';
import { AuthService } from './core/services/auth.service';
import { AdminGuard } from './core/guards/admin-guard.service';
import { InvoicePageComponent } from './components/invoice-page/invoice-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomePageComponent,
    NavigationComponent,
    CardComponent,
    ProductListComponent,
    ProductPageComponent,
    CartComponent,
    CartItemComponent,
    StartShoppingComponent,
    NotificationsComponent,
    OrderComponent,
    OrderListComponent,
    ProductFilterComponent,
    EditComponent,
    CreateComponent,
    InvoicePageComponent
  ],
  imports: [
    BrowserModule,
    MatDatepickerModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CreditCardDirectivesModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({}),
    MDBBootstrapModule.forRoot(),
    MatInputModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatToolbarModule,
    HttpClientModule,
    MatSelectModule,
    MatSidenavModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatStepperModule
  ],
  entryComponents: [HomePageComponent],
  providers: [
    AuthService,
    AuthGuard,
    AdminGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

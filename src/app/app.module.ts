import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { ProductDetailComponent } from './product/product-detail.component';
import { ProductListComponent } from './product/product-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryListComponent } from './category/category-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpInterceptorModule } from './security/http-interceptors';
import { HasClaimDirective } from './security/has-claim.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductDetailComponent,
    ProductListComponent,
    DashboardComponent,
    CategoryListComponent,
    HasClaimDirective,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    HttpInterceptorModule // interceptors;
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

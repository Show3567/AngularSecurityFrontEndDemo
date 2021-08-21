import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CategoryListComponent } from "./category/category-list.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { LoginComponent } from "./login/login.component";
import { ProductDetailComponent } from "./product/product-detail.component";
import { ProductListComponent } from "./product/product-list.component";
import { SharedModule } from "../shared/shared.module";
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    LoginComponent,
    ProductDetailComponent,
    ProductListComponent,
    DashboardComponent,
    CategoryListComponent,
    RegisterComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [
    LoginComponent,
    ProductDetailComponent,
    ProductListComponent,
    DashboardComponent,
    CategoryListComponent,
  ],
})
export class ComponentsModule {}

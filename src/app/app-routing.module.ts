import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CategoryListComponent } from "./components/category/category-list.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { LoginComponent } from "./components/login/login.component";
import { ProductDetailComponent } from "./components/product/product-detail.component";
import { ProductListComponent } from "./components/product/product-list.component";
import { AuthGuard } from "./core/guards/auth.guard";

const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent,
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "products",
    component: ProductListComponent,
    canActivate: [AuthGuard],
    data: { claimType: "canAccessProducts" },
  },
  {
    path: "productDetail/:id",
    component: ProductDetailComponent,
    canActivate: [AuthGuard],
    data: { claimType: "canAccessProducts" },
  },
  {
    path: "categories",
    component: CategoryListComponent,
    canActivate: [AuthGuard],
    data: { claimType: "canAccessCategories" },
  },
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full",
  },
  {
    path: "**",
    component: DashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

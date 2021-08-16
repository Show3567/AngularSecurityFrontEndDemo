import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { Product } from "./product";
import { ProductService } from "./product.service";
import { SecurityService } from "../../core/services/security.service";
import { AppUserAuth } from "../../shared/interfaces/app-user-auth";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";

@Component({
  templateUrl: "./product-list.component.html",
})
export class ProductListComponent implements OnInit {
  products: Product[];
  securityObject: AppUserAuth = new AppUserAuth();

  trash = faTrash;
  pencil = faPencilAlt;

  constructor(
    private productService: ProductService,
    private router: Router,
    private securityService: SecurityService
  ) {
    this.securityObject = this.securityService.securityObject;
  }

  ngOnInit() {
    this.getProducts();
  }

  private getProducts(): void {
    this.productService
      .getProducts()
      // tslint:disable-next-line: deprecation
      .subscribe((products) => {
        console.log("product list: getProduct: ", products);
        this.products = products;
      });
  }

  addProduct(): void {
    this.router.navigate(["/productDetail", -1]);
  }

  editProduct(id: string) {
    this.router.navigate(["/productDetail", id]);
  }

  deleteProduct(id: string): void {
    if (confirm("Delete this product?")) {
      this.productService.deleteProduct(id).subscribe((data: any) => {
        this.products = data.map((ele: any) => ({
          _id: ele._id,
          productName: ele.productName,
          introductionDate: ele.introductionDate,
          price: ele.price,
          url: ele.url,
          categoryId: ele.categoryId,
        }));
      });
    }
  }
}

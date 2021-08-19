import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { ComponentsModule } from "./components/components.module";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { HttpInterceptorModule } from "./core/interceptors/http-interceptors";
import { HasClaimDirective } from "./shared/directives/has-claim.directive";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SharedModule } from "./shared/shared.module";

@NgModule({
  declarations: [AppComponent, HasClaimDirective],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    HttpInterceptorModule,
    BrowserAnimationsModule, // interceptors;
    ComponentsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

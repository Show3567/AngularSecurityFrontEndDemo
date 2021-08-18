import { Component, OnInit } from "@angular/core";
import { AppUserAuth } from "./shared/interfaces/app-user-auth";
import { SecurityService } from "./core/services/security.service";
import { Router, RouterStateSnapshot } from "@angular/router";
import jwt_decode from "jwt-decode";

@Component({
  selector: "ptc-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "Antra's Training";
  securityObj: AppUserAuth = null;

  constructor(
    private securityService: SecurityService,
    private router: Router
  ) {
    this.securityObj = this.securityService.securityObj;
  }

  ngOnInit(): void {
    const token = localStorage.getItem("bearerToken");
    if (token) {
      const decoded: any = jwt_decode(token);
      console.log(decoded);

      const newSecurityObj = {
        userName: decoded.userName,
        isAuthenticated: decoded.isAdmin,
        claim: decoded.claim,
      };
      this.securityService.securityObj = newSecurityObj;
      this.securityObj = newSecurityObj;
    }
  }

  print() {
    console.log(this.securityObj);
  }

  logout(): void {
    this.securityService.logout();
    this.router.navigate(["dashboard"]);
  }
}

import { Component, OnInit } from "@angular/core";
import { AppUser } from "../../shared/interfaces/app-user";
import { AppUserAuth } from "../../shared/interfaces/app-user-auth";
import { SecurityService } from "../../core/services/security.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "ptc-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  hide = true;

  user: AppUser = new AppUser();
  securityObject: AppUserAuth = null;
  returnUrl: string;

  constructor(
    private securityService: SecurityService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParamMap.get("returnUrl");
  }

  login() {
    // tslint:disable-next-line: deprecation
    this.securityService.login(this.user).subscribe(
      (info) => {
        console.log(info);
        this.securityObject = info.body;
        if (this.returnUrl) {
          this.router.navigateByUrl(this.returnUrl);
        }
      },
      () => {
        this.securityObject = new AppUserAuth();
      }
    );
  }
}
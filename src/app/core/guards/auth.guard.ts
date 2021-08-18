import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { SecurityService } from "../../core/services/security.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(
    private securityService: SecurityService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const claimType: string = next.data.claimType;
    const isAuthenticated = this.securityService.securityObj.isAuthenticated;
    const claim = this.securityService.securityObj.claim[claimType];

    console.log("authguard: ", this.securityService.securityObj);

    if (isAuthenticated && claim) {
      return true;
    } else {
      this.router.navigate(["login"], {
        queryParams: { returnUrl: state.url },
      });
    }
  }
}

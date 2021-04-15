import { Component, OnInit } from '@angular/core';
import { AppUser } from '../security/app-user';
import { AppUserAuth } from '../security/app-user-auth';
import { SecurityService } from '../security/security.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ptc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: AppUser = new AppUser();
  securityObject: AppUserAuth = null;
  returnUrl: string;

  constructor(
    private securityService: SecurityService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  login() {
    // tslint:disable-next-line: deprecation
    this.securityService.login(this.user).subscribe(
      info => {
        this.securityObject = info;
        if (this.returnUrl) {
          this.router.navigateByUrl(this.returnUrl);
        }
      },
      () => { this.securityObject = new AppUserAuth(); }
    );
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
  }

}

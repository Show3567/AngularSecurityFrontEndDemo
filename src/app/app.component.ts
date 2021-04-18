import { Component, OnInit } from '@angular/core';
import { AppUserAuth } from './security/app-user-auth';
import { SecurityService } from './security/security.service';

@Component({
  selector: 'ptc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Antra\'s Training';
  securityObject: AppUserAuth = null;

  constructor(private securityService: SecurityService) {
    console.log('app.ts: ', this.securityService.securityObject);
    this.securityObject = this.securityService.securityObject;
  }

  ngOnInit(): void {

  }

  logout(): void {
    this.securityService.logout();
  }
}

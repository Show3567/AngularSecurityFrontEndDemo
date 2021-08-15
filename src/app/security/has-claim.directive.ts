import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";
import { SecurityService } from "../core/services/security.service";

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: "[hasClaim]",
})
export class HasClaimDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private securityService: SecurityService
  ) {}

  @Input() set hasClaim(claimType: string) {
    if (this.securityService.securityObject.claim[claimType]) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}

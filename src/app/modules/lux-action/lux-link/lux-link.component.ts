import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LuxActionComponentBaseClass } from '../lux-action-model/lux-action-component-base.class';

@Component({
  selector: 'lux-link',
  templateUrl: './lux-link.component.html',
  styleUrls: ['./lux-link.component.scss']
})
export class LuxLinkComponent extends LuxActionComponentBaseClass {
  public readonly iconSize: string = '2x';

  @Input() luxHref: string;
  @Input() luxBlank = false;

  constructor(private router: Router, public cdr: ChangeDetectorRef) {
    super();
  }

  auxClicked($event) {
    if ($event.which === 2) {
      this.redirectToHref($event);
    }
  }

  redirectToHref($event: any) {
    this.luxClicked.emit($event);

    if (this.luxHref) {
      this.luxHref = this.luxHref.trim();
      if (!this.luxHref.startsWith('http')) {
        if (this.luxBlank || $event.ctrlKey || $event.metaKey || $event.which === 2) {
          let newRelativeUrl = this.router.createUrlTree([this.luxHref]);
          let baseUrl = window.location.href.replace(this.router.url, '');

          window.open(baseUrl + newRelativeUrl, '_blank');
        } else {
          this.router.navigate([this.luxHref]).then(() => {});
        }
      } else {
        window.open(this.luxHref, this.luxBlank || $event.ctrlKey || $event.metaKey || $event.which === 2 ? '_blank' : '_self');
      }
    }
  }
}

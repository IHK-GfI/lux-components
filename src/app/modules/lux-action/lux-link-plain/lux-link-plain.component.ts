import { ChangeDetectorRef, Component, HostBinding, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LuxActionComponentBaseClass } from '../lux-action-model/lux-action-component-base.class';

@Component({
  selector: 'lux-link-plain',
  templateUrl: './lux-link-plain.component.html',
  styleUrls: ['./lux-link-plain.component.scss']
})
export class LuxLinkPlainComponent extends LuxActionComponentBaseClass implements OnInit {
  @HostBinding('class') classes = '';
  @Input() luxHref = '';
  @Input() luxBlank = false;

  private _customClass = '';
  get luxCustomClass() {
    return this._customClass;
  }
  @Input() set luxCustomClass(customClass: string) {
    if (customClass) {
      this._customClass = customClass;
      this.updateHostClasses();
    }
  }

  constructor(private router: Router, public cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
    this.updateHostClasses();
  }

  private updateHostClasses() {
    if (this.luxCustomClass) {
      this.classes = this.luxCustomClass;
    } else {
      this.classes = 'default-style';
    }
  }

  auxClicked(event: MouseEvent) {
    if (event.which === 2) {
      this.redirectToHref(event);
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

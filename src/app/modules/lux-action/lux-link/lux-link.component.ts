import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LuxActionComponentBaseClass } from '../lux-action-model/lux-action-component-base.class';

@Component({
  selector: 'lux-link',
  templateUrl: './lux-link.component.html',
  styleUrls: ['./lux-link.component.scss']
})
export class LuxLinkComponent extends LuxActionComponentBaseClass implements OnInit, OnDestroy {
  public readonly iconSize: string = '2x';

  @Input() luxHref: string;
  @Input() luxBlank: boolean = false;

  constructor(private router: Router, public cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {}

  ngOnDestroy() {}

  redirectToHref($event: any) {
    this.luxClicked.emit($event);
    if (this.luxHref) {
      this.luxHref = this.luxHref.trim();
      if (!this.luxHref.startsWith('http')) {
        this.router.navigate([this.luxHref]).then(() => {});
      } else {
        window.open(this.luxHref, this.luxBlank ? '_blank' : '_self');
      }
    }
  }
}

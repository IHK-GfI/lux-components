import { Component, OnDestroy, OnInit } from '@angular/core';
import { LuxComponentsConfigService } from '../../../lux-components-config/lux-components-config.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lux-step-header',
  template: `
    <div [ngClass]="{ 'lux-uppercase': labelUppercase }">
      <ng-content></ng-content>
    </div>
  `
})
export class LuxStepHeaderComponent implements OnInit, OnDestroy {
  private configSubscription?: Subscription;

  labelUppercase?: boolean;

  constructor(public componentsConfigService: LuxComponentsConfigService) {}

  ngOnInit() {
    this.configSubscription = this.componentsConfigService.config.subscribe(() => {
      this.labelUppercase = this.componentsConfigService.isLabelUppercaseForSelector('lux-step');
    });
  }

  ngOnDestroy() {
    if (this.configSubscription) {
      this.configSubscription.unsubscribe();
    }
  }
}

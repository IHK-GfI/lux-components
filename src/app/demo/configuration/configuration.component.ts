import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LuxComponentsConfigService } from '../../modules/lux-components-config/lux-components-config.service';
import { LuxComponentsConfigParameters } from '../../modules/lux-components-config/lux-components-config-parameters.interface';
import { LuxAppFooterButtonInfo } from '../../modules/lux-layout/lux-app-footer/lux-app-footer-button-info';
import { LuxAppFooterButtonService } from '../../modules/lux-layout/lux-app-footer/lux-app-footer-button.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lux-configuration',
  templateUrl: './configuration.component.html'
})
export class ConfigurationComponent implements OnDestroy {
  configSubscription: Subscription;

  notAppliedToOptions: string[] = ['lux-link', 'lux-button', 'lux-menu-item', 'lux-side-nav-item', 'lux-tab', 'lux-step'];
  currentConfig: LuxComponentsConfigParameters;

  constructor(
    public componentsConfigService: LuxComponentsConfigService,
    private router: Router,
    private footerService: LuxAppFooterButtonService
  ) {
    this.currentConfig = componentsConfigService.currentConfig;

    this.footerService.pushButtonInfos(
      LuxAppFooterButtonInfo.generateInfo({
        label: 'Dokumentation',
        iconName: 'lux-interface-arrows-expand-5',
        cmd: 'documentation-btn',
        color: 'primary',
        flat: true,
        alwaysVisible: false,
        onClick: () => {
          window.open('https://github.com/IHK-GfI/lux-components/wiki/config', '_blank');
        }
      }),
      LuxAppFooterButtonInfo.generateInfo({
        label: 'Overview',
        iconName: 'lux-interface-arrows-button-left',
        cmd: 'back-btn',
        color: 'primary',
        flat: true,
        alwaysVisible: true,
        onClick: () => {
          this.router.navigate(['/']);
        }
      })
    );

    this.configSubscription = this.componentsConfigService.config.subscribe((newConfig: LuxComponentsConfigParameters) => {
      if (this.currentConfig !== newConfig) {
        this.currentConfig = newConfig;
      }
    });
  }

  ngOnDestroy() {
    this.configSubscription.unsubscribe();
    this.footerService.clearButtonInfos();
  }

  updateConfig() {
    this.componentsConfigService.updateConfiguration(this.currentConfig);
  }
}

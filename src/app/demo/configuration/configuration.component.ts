import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LuxComponentsConfigService } from '../../modules/lux-components-config/lux-components-config.service';
import { LuxComponentsConfigParameters } from '../../modules/lux-components-config/lux-components-config-parameters.interface';
import { LuxAppFooterButtonInfo } from '../../modules/lux-layout/lux-app-footer/lux-app-footer-button-info';
import { LuxAppFooterButtonService } from '../../modules/lux-layout/lux-app-footer/lux-app-footer-button.service';
import { LuxSnackbarService } from '../../modules/lux-popups/lux-snackbar/lux-snackbar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lux-configuration',
  templateUrl: './configuration.component.html'
})
export class ConfigurationComponent implements OnInit, OnDestroy {
  private configSubscription: Subscription;

  notAppliedToOptions: string[] = [
    'lux-link',
    'lux-button',
    'lux-menu-item',
    'lux-side-nav-item',
    'lux-tab',
    'lux-step'
  ];
  modifiedConfig: LuxComponentsConfigParameters;
  previousConfig: LuxComponentsConfigParameters;

  constructor(
    public componentsConfigService: LuxComponentsConfigService,
    private router: Router,
    private footerService: LuxAppFooterButtonService,
    public snackbarService: LuxSnackbarService
  ) {
    this.configSubscription = componentsConfigService.config.subscribe((newConfig: LuxComponentsConfigParameters) => {
      this.modifiedConfig = newConfig;
      this.previousConfig = JSON.parse(JSON.stringify(newConfig));

      this.snackbarService.open(2000, {
        text: 'Konfiguration aktualisiert.',
        iconName: 'fa-info',
        iconSize: '2x'
      });
    });
  }

  ngOnInit() {
    this.footerService.pushButtonInfos(
      LuxAppFooterButtonInfo.generateInfo({
        label: 'Dokumentation',
        iconName: 'fas fa-external-link-alt',
        cmd: 'documentation-btn',
        color: 'primary',
        raised: true,
        alwaysVisible: false,
        onClick: () => {
          window.open('https://github.com/IHK-GfI/lux-components/wiki/config', '_blank');
        }
      }),
      LuxAppFooterButtonInfo.generateInfo({
        label: 'Overview',
        iconName: 'fas fa-caret-left',
        cmd: 'back-btn',
        color: 'primary',
        raised: true,
        alwaysVisible: true,
        onClick: () => {
          this.router.navigate(['/']);
        }
      })
    );
  }

  ngOnDestroy() {
    this.configSubscription.unsubscribe();
    this.footerService.clearButtonInfos();
  }

  updateConfig() {
    this.componentsConfigService.updateConfiguration(this.modifiedConfig);
  }
}

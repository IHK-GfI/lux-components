import { Component, OnDestroy } from '@angular/core';
import { LuxComponentsConfigService } from '../../../modules/lux-components-config/lux-components-config.service';
import { LuxComponentsConfigParameters } from '../../../modules/lux-components-config/lux-components-config-parameters.interface';
import { logResult } from '../../example-base/example-base-util/example-base-helper';
import { Subscription } from 'rxjs';
import { LuxThemePalette } from '../../../modules/lux-util/lux-colors.enum';

@Component({
  selector: 'app-button-example',
  templateUrl: './button-example.component.html'
})
export class ButtonExampleComponent implements OnDestroy {

  showOutputEvents = false;
  config: LuxComponentsConfigParameters;
  log = logResult;

  colors: any[] = [
    { value: '', label: 'default' },
    { value: 'primary', label: 'primary' },
    { value: 'warn', label: 'warn' },
    { value: 'accent', label: 'accent' }
  ];

  badgeColors: any[] = [
    { value: 'primary', label: 'primary' },
    { value: 'warn', label: 'warn' },
    { value: 'accent', label: 'accent' }
  ];

  label = 'Button';
  iconName = 'lux-interface-delete-1';
  iconShowRight = false;
  disabled = false;
  backgroundColor = '';
  buttonBadge = '';
  buttonBadgeColor: LuxThemePalette = 'primary';
  subscription: Subscription;

  get allUpperCase() {
    return this.config.labelConfiguration!.allUppercase;
  }

  set allUpperCase(value: boolean) {
    this.config.labelConfiguration!.allUppercase = value;
    this.updateConfiguration();
  }


  constructor(private configService: LuxComponentsConfigService) {
    this.config = configService.currentConfig;

    this.subscription =  this.configService.config.subscribe((config: LuxComponentsConfigParameters) => {
      this.config = config;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  updateConfiguration() {
    // Hart das Array leeren, wir triggern die Uppercase Umstellung demo-mäßig einfach für alle entsprechenden Components.
    // Beim Zerstören der Component wird die Konfiguration sowieso wieder resettet (siehe example-base-structure.component.ts).
    this.config.labelConfiguration!.notAppliedTo = [];
    this.configService.updateConfiguration(this.config);
  }

  onBadgeColorChanged(badgeColor: { label: string; value: LuxThemePalette }) {
    this.buttonBadgeColor = badgeColor.value;
  }
}

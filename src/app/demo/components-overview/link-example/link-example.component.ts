import { Component, OnDestroy } from '@angular/core';
import { LuxComponentsConfigParameters } from '../../../modules/lux-components-config/lux-components-config-parameters.interface';
import { LuxComponentsConfigService } from '../../../modules/lux-components-config/lux-components-config.service';
import { LuxThemePalette } from '../../../modules/lux-util/lux-colors.enum';
import { logResult } from '../../example-base/example-base-util/example-base-helper';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-link-example',
  templateUrl: './link-example.component.html'
})
export class LinkExampleComponent implements OnDestroy {

  showOutputEvents = false;
  colors: any[] = [
    { value: '', label: 'default' },
    { value: 'primary', label: 'primary' },
    { value: 'warn', label: 'warn' },
    { value: 'accent', label: 'accent' }
  ];
  config: LuxComponentsConfigParameters;
  log = logResult;
  label = 'LOGIN';
  color: LuxThemePalette = 'primary';
  iconName = 'lux-interface-login-circle';
  iconShowRight = false;
  raised = true;
  round = false;
  disabled = false;
  blank = true;
  href = 'https://www.ihk-gfi.de/';
  subscription: Subscription;

  constructor(private configService: LuxComponentsConfigService) {
    this.config = this.configService.currentConfig;

    this.subscription =  this.configService.config.subscribe((config: LuxComponentsConfigParameters) => {
      if (this.config !== config) {
        this.config = config;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  pickValue(option: any) {
    return option.value;
  }

  updateConfiguration() {
    // Hart das Array leeren, wir triggern die Uppercase Umstellung demo-mäßig einfach für alle entsprechenden Components.
    // Beim Zerstören der Component wird die Konfiguration sowieso wieder resettet (siehe example-base-structure.component.ts).
    this.config.labelConfiguration!.notAppliedTo = [];
    this.configService.updateConfiguration(this.config);
  }

  click(event: Event) {
    this.log(this.showOutputEvents, 'luxClicked', event);
  }
}

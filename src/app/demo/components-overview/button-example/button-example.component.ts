import { Component, OnDestroy } from '@angular/core';
import { LuxComponentsConfigService } from '../../../modules/lux-components-config/lux-components-config.service';
import { LuxComponentsConfigParameters } from '../../../modules/lux-components-config/lux-components-config-parameters.interface';
import { logResult } from '../../example-base/example-base-util/example-base-helper';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-button-example',
  templateUrl: './button-example.component.html'
})
export class ButtonExampleComponent implements OnDestroy {
  // region Helper-Properties für das Beispiel

  showOutputEvents = false;
  config: LuxComponentsConfigParameters;
  log = logResult;

  colors: any[] = [
    { value: '', label: 'default' },
    { value: 'primary', label: 'primary' },
    { value: 'warn', label: 'warn' },
    { value: 'accent', label: 'accent' }
  ];

  // endregion

  // region Properties der Component

  label = 'Button';
  iconName = 'fas fa-save';
  iconShowRight = false;
  align = false;
  disabled = false;
  backgroundColor = '';

  subscription: Subscription;

  // endregion

  constructor(private configService: LuxComponentsConfigService) {
    this.subscription =  this.configService.config.subscribe((config: LuxComponentsConfigParameters) => {
      this.config = config;
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
    this.config.labelConfiguration.notAppliedTo = [];
    this.configService.updateConfiguration(this.config);
  }
}

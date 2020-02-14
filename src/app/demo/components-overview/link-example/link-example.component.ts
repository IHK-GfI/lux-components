import { Component, OnInit } from '@angular/core';
import { LuxComponentsConfigParameters } from '../../../modules/lux-components-config/lux-components-config-parameters.interface';
import { LuxComponentsConfigService } from '../../../modules/lux-components-config/lux-components-config.service';
import { logResult } from '../../example-base/example-base-util/example-base-helper';

@Component({
  selector: 'app-link-example',
  templateUrl: './link-example.component.html'
})
export class LinkExampleComponent implements OnInit {
  // region Helper-Properties für das Beispiel

  showOutputEvents: boolean = false;
  colors: any[] = [
    { value: '', label: 'default' },
    { value: 'primary', label: 'primary' },
    { value: 'warn', label: 'warn' },
    { value: 'accent', label: 'accent' }
  ];
  config: LuxComponentsConfigParameters;
  log = logResult;

  // endregion

  // region Properties der Component

  label: string = 'Beispiel-Link';
  color: string = 'primary';
  iconName: string = '';
  raised: boolean = true;
  round: boolean = false;
  align: boolean = false;
  disabled: boolean = false;
  blank: boolean = true;
  href: string = 'https://www.ihk-gfi.de/';

  // endregion

  constructor(private configService: LuxComponentsConfigService) {}

  ngOnInit() {
    this.configService.config.subscribe((config: LuxComponentsConfigParameters) => {
      this.config = config;
    });
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

  click($event) {
    this.log(this.showOutputEvents, 'luxClicked', $event);
  }
}

import { Component, OnDestroy } from '@angular/core';
import { LuxComponentsConfigParameters } from '../../../modules/lux-components-config/lux-components-config-parameters.interface';
import { LuxComponentsConfigService } from '../../../modules/lux-components-config/lux-components-config.service';
import { logResult } from '../../example-base/example-base-util/example-base-helper';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-link-plain-example',
  templateUrl: './link-plain-example.component.html',
  styleUrls: ['./link-plain-example.component.scss']
})
export class LinkPlainExampleComponent implements OnDestroy {
  // region Helper-Properties für das Beispiel

  showOutputEvents = false;
  config: LuxComponentsConfigParameters;
  log = logResult;

  // endregion

  // region Properties der Component

  label = 'Beispiel-Link';
  iconName = 'lux-interface-link';
  iconShowRight = true;
  disabled = false;
  blank = true;
  href = 'https://www.ihk-gfi.de/';

  // endregion

  subscription: Subscription;

  constructor(private configService: LuxComponentsConfigService, private router: Router) {
    this.config = this.configService.currentConfig;

    this.subscription = this.configService.config.subscribe((config: LuxComponentsConfigParameters) => {
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
    this.config.labelConfiguration!.notAppliedTo = [];
    this.configService.updateConfiguration(this.config);
  }

  click(event: Event) {
    this.log(this.showOutputEvents, 'luxClicked', event);
  }

  goTo(target: string) {
    switch (target) {
      case 'Components':
        this.router.navigate(['/components-overview']);
        break;
      case 'Form':
        this.router.navigate(['/form']);
        break;
      case 'Configuration':
        this.router.navigate(['/configuration']);
        break;
      case 'Baseline':
        this.router.navigate(['/baseline']);
        break;
      case 'Home':
        this.router.navigate(['/home']);
        break;
    }
  }
}

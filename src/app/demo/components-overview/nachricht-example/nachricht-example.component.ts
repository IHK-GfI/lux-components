import { Component, ViewChild } from '@angular/core';
import { LuxComponentsConfigService } from 'app/modules/lux-components-config/lux-components-config.service';
import { LuxNachrichtPflegenComponent } from '../../../modules/lux-nachricht/lux-nachricht-subcomponents/lux-nachricht-pflegen/lux-nachricht-pflegen.component';
import { LuxNachrichtController } from '../../../modules/lux-nachricht/lux-nachricht-controller';
import { ILuxNachrichtConfig } from '../../../modules/lux-nachricht/lux-nachricht-model/lux-nachricht-config.interface';
import { LuxSnackbarService } from '../../../modules/lux-popups/lux-snackbar/lux-snackbar.service';
import { MockLuxNachrichtService } from './mock-nachricht-service';
import { LuxNachrichtComponent } from 'app/modules/lux-nachricht/lux-nachricht.component';

@Component({
    selector: 'app-nachricht-example',
    templateUrl: './nachricht-example.component.html'
  })
export class LuxNachrichtExampleComponent {
  @ViewChild(LuxNachrichtController, { static: true }) nachrichtController: LuxNachrichtController;

  useMock: boolean = false;
  originalService: any = null;

  nachrichtConfig: ILuxNachrichtConfig = {
    anwendungKuerzel: 'euzv2',
    ihkNr: 112,
    userRole: 'ROLE_GfIAdmin',
    empfaenger: ['User A', 'User B', 'User C', 'User D']
  };

  constructor(protected snackbar: LuxSnackbarService,
              protected componentsConfigService: LuxComponentsConfigService) {
  }

  start() {
    if (this.useMock) {
      this.nachrichtController.read(null, null, null);
      this.snackbar.open(3000, {
        text: 'Mock-Daten geladen.',
        action: 'OK',
        actionColor: 'green'
      });
    }
  }

  changeUseMock($event) {
    if ($event) {
      const mockNachrichtService = new MockLuxNachrichtService(null, this.componentsConfigService);

      this.originalService = this.nachrichtController.nachrichtService;
      this.nachrichtController.nachrichtService = mockNachrichtService;

    } else {
      this.nachrichtController.nachrichtService = this.originalService;
      this.originalService = null;
    }
    this.useMock = $event;
  }

}

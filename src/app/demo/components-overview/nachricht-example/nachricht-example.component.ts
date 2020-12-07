import { Component } from '@angular/core';
import { LuxComponentsConfigService } from 'app/modules/lux-components-config/lux-components-config.service';
import { ILuxNachrichtConfig } from '../../../modules/lux-nachricht/lux-nachricht-model/lux-nachricht-config.interface';
import { LuxSnackbarService } from '../../../modules/lux-popups/lux-snackbar/lux-snackbar.service';
import { MockLuxNachrichtService } from './mock-nachricht-service';
import { NachrichtService } from '../../../modules/lux-nachricht/lux-nachricht-services/lux-nachricht.service';

@Component({
  selector: 'app-nachricht-example',
  templateUrl: './nachricht-example.component.html',
  providers: [{ provide: NachrichtService, useClass: MockLuxNachrichtService }]
})
export class LuxNachrichtExampleComponent {
  nachrichtConfig: ILuxNachrichtConfig = {
    anwendungKuerzel: 'euzv2',
    ihkNr: 112,
    userRole: 'ROLE_GfIAdmin',
    empfaenger: ['User A', 'User B', 'User C', 'User D']
  };

  constructor(protected snackbar: LuxSnackbarService, protected componentsConfigService: LuxComponentsConfigService) {
  }
}

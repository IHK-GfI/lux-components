import { Component } from '@angular/core';
import { LuxDialogRef } from '../../../../modules/lux-popups/lux-dialog/lux-dialog-model/lux-dialog-ref.class';

@Component({
  selector: 'app-dialog-component-example',
  templateUrl: './dialog-component-example.component.html'
})
export class DialogComponentExampleComponent {
  constructor(public luxDialogRef: LuxDialogRef) {}
}

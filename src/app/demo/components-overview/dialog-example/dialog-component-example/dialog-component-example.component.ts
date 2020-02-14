import { Component, Inject, OnInit } from '@angular/core';
import { LuxDialogRef } from '../../../../modules/lux-popups/lux-dialog/lux-dialog-model/lux-dialog-ref.class';

@Component({
  selector: 'app-dialog-component-example',
  templateUrl: './dialog-component-example.component.html'
})
export class DialogComponentExampleComponent implements OnInit {
  constructor(public luxDialogRef: LuxDialogRef) {}

  ngOnInit() {}
}

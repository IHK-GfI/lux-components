import { Component } from '@angular/core';
import { LuxTourHintRef } from '../lux-tour-hint-model/lux-tour-hint-ref.class';

@Component({
  selector: 'lux-tour-hint-preset',
  templateUrl: './lux-tour-hint-preset.component.html',
  styleUrls: ['./lux-tour-hint-preset.component.scss']
})
export class LuxTourHintPresetComponent {
  public dontShowAgainChecked = false;

  constructor(public tourRef: LuxTourHintRef) {}

  public close() {
    this.tourRef.close(this.dontShowAgainChecked);
  }
}

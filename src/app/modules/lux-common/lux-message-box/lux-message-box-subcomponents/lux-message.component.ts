import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ILuxMessage } from '../lux-message-box-model/lux-message.interface';
import { LuxUtil } from '../../../lux-util/lux-util';

@Component({
  selector: 'lux-message',
  templateUrl: './lux-message.component.html'
})
export class LuxMessageComponent {
  private _luxMessage?: ILuxMessage;

  backgroundCSSClass = 'lux-bg-color-blue';
  fontCSSClass = 'lux-font-color-white';

  @Output() luxMessageClosed: EventEmitter<ILuxMessage> = new EventEmitter<ILuxMessage>();

  @Input() set luxMessage(message: ILuxMessage | undefined) {
    this._luxMessage = message;
    if (this.luxMessage) {
      this.updateColor();
    }
  }

  get luxMessage(): ILuxMessage | undefined {
    return this._luxMessage;
  }

  constructor() {}

  /**
   * Setzt die Messages auf ein leeres Array um so die MessageBox auszublenden.
   */
  close() {
    this.luxMessageClosed.emit(this.luxMessage);
  }

  /**
   * Aktualisiert die Farbe dieser Box passend zur Farbe der Nachricht.
   */
  private updateColor() {
    if (this.luxMessage) {
      const color  = this.luxMessage.color;
      const result = LuxUtil.getColorsByBgColorsEnum(color);

      this.fontCSSClass       = result.fontCSSClass;
      this.backgroundCSSClass = result.backgroundCSSClass;
    }
  }
}

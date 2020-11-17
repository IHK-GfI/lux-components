import { Component, OnInit } from '@angular/core';
import { LuxBackgroundColorsEnum, LuxMessageBoxColors } from '../../../modules/lux-util/lux-colors.enum';
import { ILuxMessage } from '../../../modules/lux-common/lux-message-box/lux-message-box-model/lux-message.interface';
import { ILuxMessageCloseEvent } from '../../../modules/lux-common/lux-message-box/lux-message-box-model/lux-message-events.interface';
import { logResult } from '../../example-base/example-base-util/example-base-helper';

@Component({
  selector: 'app-message-box-example',
  templateUrl: './message-box-example.component.html',
  styleUrls: ['./message-box-example.component.scss']
})
export class MessageBoxExampleComponent implements OnInit {
  // region Helper-Properties für das Beispiel

  showOutputEvents: boolean = false;
  log = logResult;

  // endregion

  // region Properties der Component

  messages: ILuxMessage[] = [];
  colors = Object.keys(LuxBackgroundColorsEnum);
  positions = ['unterhalb', 'oberhalb'];
  selectedPosition = 'oberhalb';
  newMessage: ILuxMessage = { text: '', iconName: '', color: LuxBackgroundColorsEnum.blue };
  messageIndex: number = 1;
  maximumDisplayed: number = 10;

  // endregion

  constructor() {}

  ngOnInit() {
    this.setMessages();
  }

  setMessages() {
    this.messages = [];

    LuxMessageBoxColors.forEach((color, index) => {
      this.messages.push({
        text: 'Message #' + (index + 1),
        iconName: 'fas fa-bell',
        color: LuxBackgroundColorsEnum[color.toString()]
      });
    });
  }

  add() {
    this.messages = [...this.messages, JSON.parse(JSON.stringify(this.newMessage))];
    this.newMessage = { text: '', iconName: '', color: LuxBackgroundColorsEnum.blue };
    this.log(this.showOutputEvents, 'Messages updated', this.messages);
  }

  remove(i: number) {
    this.messages = this.messages.filter((value, index) => index !== i);
  }

  logChanged($event: any) {
    this.log(this.showOutputEvents, '[Output-Event] Message wurde geändert:', $event);
  }

  logClosed($event: ILuxMessageCloseEvent) {
    this.log(this.showOutputEvents, '[Output-Event] Message wurde geschlossen', $event);
    if (Array.isArray($event)) {
      $event.forEach((eventValue: ILuxMessageCloseEvent) => {
        this.messages = this.messages.filter((compareMessage: ILuxMessage) => compareMessage !== eventValue.message);
      });
    } else {
      this.messages = this.messages.filter((compareMessage: ILuxMessage) => compareMessage !== $event.message);
    }
  }

  logBoxClosed() {
    this.log(this.showOutputEvents, '[Output-Event] MessageBox wurde geschlossen');
  }
}

import { Component, OnInit } from '@angular/core';
import { LuxMessageBoxColors } from '../../../modules/lux-util/lux-colors.enum';
import { ILuxMessage } from '../../../modules/lux-common/lux-message-box/lux-message-box-model/lux-message.interface';
import {
  ILuxMessageChangeEvent,
  ILuxMessageCloseEvent
} from '../../../modules/lux-common/lux-message-box/lux-message-box-model/lux-message-events.interface';
import { logResult } from '../../example-base/example-base-util/example-base-helper';

@Component({
  selector: 'app-message-box-example',
  templateUrl: './message-box-example.component.html',
  styleUrls: ['./message-box-example.component.scss']
})
export class MessageBoxExampleComponent implements OnInit {
  showOutputEvents = false;
  log = logResult;
  messages: ILuxMessage[] = [];
  colors = LuxMessageBoxColors;
  newMessage: ILuxMessage = { text: '', iconName: '', color: 'blue' };
  messageIndex = 1;
  maximumDisplayed = 10;

  constructor() {}

  ngOnInit() {
    this.setMessages();
  }

  setMessages() {
    this.messages = [];

    LuxMessageBoxColors.forEach((color, index) => {
      this.messages.push({
        text: 'Message #' + (index + 1),
        iconName: 'lux-interface-alert-alarm-bell-2',
        color: color
      });
    });
  }

  add() {
    this.messages = [...this.messages, JSON.parse(JSON.stringify(this.newMessage))];
    this.newMessage = { text: '', iconName: '', color: 'blue' };
    this.log(this.showOutputEvents, 'Messages updated', this.messages);
  }

  remove(i: number) {
    this.messages = this.messages.filter((value, index) => index !== i);
  }

  logChanged(messageChangeEvent: ILuxMessageChangeEvent) {
    this.log(this.showOutputEvents, '[Output-Event] Message wurde geändert:', messageChangeEvent);
  }

  logClosed(messageCloseEvent: ILuxMessageCloseEvent) {
    this.log(this.showOutputEvents, '[Output-Event] Message wurde geschlossen', messageCloseEvent);
    if (Array.isArray(messageCloseEvent)) {
      messageCloseEvent.forEach((eventValue: ILuxMessageCloseEvent) => {
        this.messages = this.messages.filter((compareMessage: ILuxMessage) => compareMessage !== eventValue.message);
      });
    } else {
      this.messages = this.messages.filter((compareMessage: ILuxMessage) => compareMessage !== messageCloseEvent.message);
    }
  }

  logBoxClosed() {
    this.log(this.showOutputEvents, '[Output-Event] MessageBox wurde geschlossen');
  }
}

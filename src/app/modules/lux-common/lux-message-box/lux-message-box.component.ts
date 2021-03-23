import { Component, ElementRef, EventEmitter, HostBinding, Input, Output, ViewChild } from '@angular/core';
import { visibilityTrigger } from './lux-message-box-model/lux-message-box.animations';
import { ILuxMessageChangeEvent, ILuxMessageCloseEvent } from './lux-message-box-model/lux-message-events.interface';
import { ILuxMessage } from './lux-message-box-model/lux-message.interface';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { LuxPaginatorIntl } from '../../lux-util/lux-paginator-intl';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'lux-message-box',
  templateUrl: './lux-message-box.component.html',
  styleUrls: ['./lux-message-box.component.scss'],
  animations: [visibilityTrigger],
  providers: [{ provide: MatPaginatorIntl, useClass: LuxPaginatorIntl }]
})
export class LuxMessageBoxComponent {
  private _luxMessages: ILuxMessage[] = [];
  private _luxMaximumDisplayed = 1;
  private _luxIndex = 0;

  displayedMessages: ILuxMessage[] = [];

  @HostBinding('class.mat-elevation-z4') boxShadow = true;

  @ViewChild('messagebox') messageBoxElRef: ElementRef;

  @Output() luxMessageChanged: EventEmitter<ILuxMessageChangeEvent> = new EventEmitter<ILuxMessageChangeEvent>();
  @Output() luxMessageClosed: EventEmitter<ILuxMessageCloseEvent> = new EventEmitter<ILuxMessageCloseEvent>();
  @Output() luxMessageBoxClosed: EventEmitter<void> = new EventEmitter<void>();

  @Input() luxGrabFocus = false;
  @Input() set luxIndex(index: number) {
    if (index < 0) {
      index = 0;
    }
    if (index > this.luxMessages.length) {
      index = this.luxMessages.length;
    }

    this._luxIndex = index;
    this.updateDisplayedMessages(index);
  }

  get luxIndex(): number {
    return this._luxIndex;
  }

  @Input() set luxMaximumDisplayed(max: number) {
    if (max < 0) {
      max = 0;
    }
    this._luxMaximumDisplayed = max;

    this.updateDisplayedMessages(this.luxIndex);
  }

  get luxMaximumDisplayed(): number {
    return this._luxMaximumDisplayed;
  }

  @Input() set luxMessages(messages: ILuxMessage[]) {
    if (messages && messages.length > 0) {
      this._luxMessages = messages;
      this.updateDisplayedMessages(this.luxIndex);

      setTimeout(() => {
        if (this.luxGrabFocus) {
          if (this.messageBoxElRef) {
            this.messageBoxElRef.nativeElement.focus();
          }
        } else {
          let messageText = '';
          if (messages.length === 1) {
            messageText += $localize `:@@luxc.message.announce.1_message:Es gibt eine Meldung.`;
          } else {
            messageText += $localize `:@@luxc.message.announce.x_messages:Es gibt ${messages.length}:messageCount: Meldungen.`;
          }
          messages.forEach((message) => messageText += message.text + '\n');
          this.liveAnnouncer.announce(messageText);
        }
      });
    } else {
      // Wenn es vorher Werte gab, ein Closed-Event ausgeben
      if (this.luxMessages.length > 0) {
        this.luxMessageBoxClosed.emit();
      }
      this._luxMessages = [];
      this.liveAnnouncer.announce($localize `:@@luxc.message.announce.0_messages:Es gibt keine Meldungen.`);
    }
  }

  get luxMessages(): ILuxMessage[] {
    return this._luxMessages;
  }

  constructor(private liveAnnouncer: LiveAnnouncer) {}

  /**
   * Wird aufgerufen, wenn der Close-Button für eine MessageBox aufgerufen wurde.
   *
   * Gibt eine Event-Payload mit der betroffenen Nachricht mit Index weiter.
   *
   * @param $event
   */
  messageClosed($event: ILuxMessage) {
    const eventPayload: ILuxMessageCloseEvent = {
      index: this.luxMessages.findIndex((compareMessage: ILuxMessage) => compareMessage === $event),
      message: $event
    };
    this.luxMessageClosed.emit(eventPayload);

    this.luxMessages = this.luxMessages.filter((message: ILuxMessage) => message !== $event);
  }

  /**
   * Aktualisiert die angezeigten Nachrichten und den Paginator,
   * gibt außerdem das Change-Event mit den angezeigten/vorherigen Nachrichten.
   *
   * @param $event
   */
  pageChanged($event: PageEvent) {
    const previousDisplayedMessages = [...this.displayedMessages];
    const previousIndex = this.luxIndex;

    this.updateDisplayedMessages($event.pageIndex);

    const messageChangePayload: ILuxMessageChangeEvent = {
      currentPage: {
        index: this.luxIndex,
        messages: [...this.displayedMessages]
      },
      previousPage: {
        index: previousIndex,
        messages: previousDisplayedMessages
      }
    };

    this.luxMessageChanged.emit(messageChangePayload);
  }

  /**
   * Aktualisiert die aktuell angezeigten Nachrichten anhand des Index.
   *
   * @param pageIndex
   * @param pageSize
   */
  updateDisplayedMessages(pageIndex: number) {
    const start = pageIndex * this.luxMaximumDisplayed;
    const end = start + this.luxMaximumDisplayed;

    // Wenn der luxIndex und der PageIndex ungleich sind, den luxIndex aktualisieren
    if (this.luxIndex !== pageIndex) {
      this._luxIndex = pageIndex;
    }

    // Checken, ob der Index nicht die Array-Größe sprengt
    if (this.luxIndex > this.luxMessages.length) {
      this._luxIndex = this.luxMessages.length;
    }

    if (this.luxIndex < 0) {
      this._luxIndex = 0;
    }

    // Nachrichten aktualisieren
    this.displayedMessages = this.luxMessages.slice(start, end);

    // Wenn die angezeigten Nachrichten leer sind, aber noch weitere vorhanden sind, die vorherige Seite anzeigen
    if (this.displayedMessages.length === 0 && this.luxMessages.length > 0 && this.luxIndex > 0) {
      this.updateDisplayedMessages(this.luxIndex - 1);
    }
  }
}

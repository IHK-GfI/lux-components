import { ILuxMessage } from './lux-message.interface';

/**
 * Event-Interface, welches beim Klick auf den next- und previous-Button über einen EventEmitter
 * ausgegeben wird.
 */
export interface ILuxMessageChangeEvent {
  currentPage: {
    index: number;
    messages: ILuxMessage[];
  };

  previousPage: {
    index: number;
    messages: ILuxMessage[];
  };
}

/**
 * Event-Interface, welches vom LuxMessageChangeEvent und beim Klick auf den close-Button über einen
 * Event-Emitter ausgegeben wird.
 */
export interface ILuxMessageCloseEvent {
  index: number;
  message: ILuxMessage;
}

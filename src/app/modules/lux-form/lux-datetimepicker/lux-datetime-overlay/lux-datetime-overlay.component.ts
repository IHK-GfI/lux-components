import { Directionality } from '@angular/cdk/bidi';
import { ESCAPE } from '@angular/cdk/keycodes';
import { Overlay, OverlayConfig, OverlayRef, PositionStrategy, ScrollStrategy } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import {
  Component,
  ComponentRef,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  NgZone,
  Optional,
  Output,
  ViewContainerRef
} from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MAT_DATEPICKER_SCROLL_STRATEGY } from '@angular/material/datepicker';
import { MatDateSelectionModel } from '@angular/material/datepicker/date-selection-model';
import { MatDatepickerControl, MatDatepickerPanel } from '@angular/material/datepicker/datepicker-base';
import { MatFormField } from '@angular/material/form-field';
import { merge, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { LuxDateFilterFn, LuxDateTimePickerComponent } from '../lux-datetimepicker.component';
import { LuxDatetimeOverlayContentComponent } from './lux-datetime-overlay-content.component';

@Component({
  selector: 'lux-datetime-overlay',
  template: ''
})
export class LuxDatetimeOverlayComponent implements MatDatepickerPanel<MatDatepickerControl<any>, any, any> {
  @Input() luxPickerInput: HTMLInputElement;
  @Input() luxStartView: 'month' | 'year' | 'multi-year' = 'month';
  @Input() luxCustomFilter: LuxDateFilterFn = undefined;
  @Input() luxStartDate: Date = null;
  @Input() luxStartTime: number[] = null;
  @Input() luxMinDate: Date = null;
  @Input() luxMaxDate: Date = null;

  @Output() luxSelected: EventEmitter<Date> = new EventEmitter<Date>();
  @Output() openedStream: EventEmitter<void> = new EventEmitter<void>();
  @Output() closedStream: EventEmitter<void> = new EventEmitter<void>();

  stateChanges = new Subject<void>();
  hasBackdrop = true;
  opened = false;
  scrollStrategy: () => ScrollStrategy;
  _selectedDate: string;

  // Code des Interfaces "MatDatepickerPanel<MatDatepickerControl<any>, any, any>" - Start
  id: string;
  disabled: boolean;
  color: ThemePalette;
  registerInput(input: any): MatDateSelectionModel<any> {
    return null;
  }
  // Code des Interfaces "MatDatepickerPanel<MatDatepickerControl<any>, any, any>" - Ende

  get selectedDate() {
    return this._selectedDate;
  }

  @Input()
  set selectedDate(date) {
    this._selectedDate = date;
  }

  dateTimePortal: ComponentPortal<LuxDatetimeOverlayContentComponent>;
  lastFocusedElement: HTMLElement | null = null;
  overlayRef: OverlayRef;
  overlayComponentRef: ComponentRef<LuxDatetimeOverlayContentComponent> | null;
  datepickerInput: LuxDateTimePickerComponent;

  constructor(
    private elementRef: ElementRef<HTMLInputElement>,
    private ngZone: NgZone,
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
    @Inject(MAT_DATEPICKER_SCROLL_STRATEGY) scrollStrategy: any,
    @Inject(DOCUMENT) @Optional() private document: any,
    @Optional() private _dir: Directionality,
    @Optional() private _formField: MatFormField
  ) {
    this.scrollStrategy = scrollStrategy;
  }

  onOk(date: Date) {
    this.luxSelected.emit(date);
    this.close();
  }

  open(): void {
    if (this.opened) {
      return;
    }

    if (this.document) {
      this.lastFocusedElement = this.document.activeElement;
    }

    this.openOverlay();
    this.opened = true;
  }

  private openOverlay(): void {
    if (!this.dateTimePortal) {
      this.dateTimePortal = new ComponentPortal<LuxDatetimeOverlayContentComponent>(
        LuxDatetimeOverlayContentComponent,
        this.viewContainerRef
      );
    }

    if (!this.overlayRef) {
      this.createOverlay();
    }

    if (!this.overlayRef.hasAttached()) {
      this.overlayComponentRef = this.overlayRef.attach(this.dateTimePortal);
      this.overlayComponentRef.instance.dateTimePicker = this;
    }
  }

  private createOverlay(): void {
    const overlayConfig = new OverlayConfig({
      positionStrategy: this._createOverlayPositionStrategy(),
      hasBackdrop: this.hasBackdrop,
      backdropClass: 'mat-overlay-transparent-backdrop',
      direction: this._dir,
      scrollStrategy: this.scrollStrategy(),
      panelClass: 'lux-datetimepicker-overlay'
    });

    this.overlayRef = this.overlay.create(overlayConfig);
    this.overlayRef.overlayElement.setAttribute('role', 'dialog');

    merge(
      this.overlayRef.backdropClick(),
      this.overlayRef.detachments(),
      this.overlayRef.keydownEvents().pipe(
        filter((event) => {
          return event.keyCode === ESCAPE;
        })
      )
    ).subscribe((event) => {
      if (event) {
        event.preventDefault();
      }

      this.hasBackdrop && event ? this.cancel() : this.close();
    });
  }

  public cancel(): void {
    this.close();
  }

  close(): void {
    if (!this.opened) {
      return;
    }
    if (this.overlayRef && this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    }

    if (this.dateTimePortal && this.dateTimePortal.isAttached) {
      this.dateTimePortal.detach();
    }

    if (this.lastFocusedElement) {
      this.lastFocusedElement.focus();
    }

    setTimeout(() => {
      if (this.opened) {
        this.opened = false;
        this.lastFocusedElement = null;
      }
    });
  }

  private _createOverlayPositionStrategy(): PositionStrategy {
    return this.overlay
      .position()
      .flexibleConnectedTo(this.luxPickerInput)
      .withTransformOriginOn('.lux-datetime-overlay-content')
      .withFlexibleDimensions(true)
      .withViewportMargin(8)
      .withLockedPosition()
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top'
        },
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'bottom'
        },
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top'
        },
        {
          originX: 'end',
          originY: 'top',
          overlayX: 'end',
          overlayY: 'bottom'
        }
      ]);
  }
}

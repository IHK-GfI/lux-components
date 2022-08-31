import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges, OnDestroy,
  OnInit,
  Optional,
  Output, SimpleChanges,
  ViewChild
} from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { MatSlider, MatSliderChange } from '@angular/material/slider';
import { LuxFormComponentBase } from '../lux-form-model/lux-form-component-base.class';
import { LuxConsoleService } from '../../lux-util/lux-console.service';
import { LuxComponentsConfigService } from '../../lux-components-config/lux-components-config.service';
import { Subscription } from 'rxjs';

export declare type LuxDisplayWithFnType = (value: number | null) => string | number;
export declare type SLIDER_TICK_INTERVAL = 'auto' | number;
export declare type SLIDER_COLORS = 'primary' | 'accent' | 'warn';

// @dynamic Erklärung steht in der Datei "lux-decorators.ts".
@Component({
  selector: 'lux-slider',
  templateUrl: './lux-slider.component.html',
  styleUrls: ['./lux-slider.component.scss']
})
export class LuxSliderComponent extends LuxFormComponentBase<number> implements OnInit, OnChanges, OnDestroy {
  @ViewChild(MatSlider) matSlider?: MatSlider;

  @Output() luxChange: EventEmitter<MatSliderChange> = new EventEmitter<MatSliderChange>();
  @Output() luxInput: EventEmitter<MatSliderChange> = new EventEmitter<MatSliderChange>();
  @Output() luxValueChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() luxValuePercent: EventEmitter<number> = new EventEmitter<number>();

  @Input() luxColor: SLIDER_COLORS = 'primary';
  @Input() luxVertical = false;
  @Input() luxInvert = false;
  @Input() luxShowThumbLabel = true;
  @Input() luxShowThumbLabelAlways = true;
  @Input() luxTickInterval: SLIDER_TICK_INTERVAL = 0;
  @Input() luxTagId?: string;
  @Input() luxNoLabels = false;
  @Input() luxNoTopLabel = false;
  @Input() luxNoBottomLabel = false;

  get luxValue(): number {
    let value = this.getValue();
    return value ?? 0;
  }

  @Input() set luxValue(value: number) {
    if (!this.luxReadonly && !this.luxDisabled) {
      this.setValue(value);
    }
  }

  _luxMax = 100;
  _luxRequired = false;
  _luxMin = 0;
  _luxStep = 1;
  _luxDisplayWith: LuxDisplayWithFnType = (value) => value ?? 0;

  subscription?: Subscription;

  get luxDisplayWith() {
    return this._luxDisplayWith;
  }

  @Input()
  set luxDisplayWith(displayFn: LuxDisplayWithFnType | undefined) {
    this._luxDisplayWith = displayFn ?? ((value) => value ?? 0);
  }

  get luxMax() {
    return this._luxMax;
  }

  @Input() set luxMax(value: number) {
    this._luxMax = value;

    if (value > 0 && value > this.luxMin) {
      this._luxMax = value;
    }
  }

  get luxMin() {
    return this._luxMin;
  }

  @Input() set luxMin(value: number) {
    this._luxMin = value;

    if (value >= 0 && value < this.luxMax) {
      this._luxMin = value;
    }
  }

  get luxStep() {
    return this._luxStep;
  }

  @Input() set luxStep(value: number) {
    this._luxStep = value;

    if (value <= this.luxMax - this.luxMin) {
      this._luxStep = value;
    }
  }

  get luxRequired() {
    return this._luxRequired;
  }

  @Input() set luxRequired(value: boolean) {
    this._luxRequired = value;

    if (value) {
      this.logger.error('The LuxSlider cannot be marked as required.');
    }
  }

  constructor(
    @Optional() controlContainer: ControlContainer,
    cdr: ChangeDetectorRef,
    logger: LuxConsoleService,
    config: LuxComponentsConfigService
  ) {
    super(controlContainer, cdr, logger, config);
  }

  ngOnInit() {
    super.ngOnInit();

    this.subscription = this.formControl.statusChanges.subscribe((status: string) => {
      if (status === 'DISABLED') {
        this.redrawSliderWorkaround();
      }
    });
  }

  ngOnDestroy() {
    super.ngOnDestroy();

    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges.luxDisabled) {
      this.redrawSliderWorkaround();
    }
  }

  /**
   * Wird beim Ändern des Slider-Wertes aufgerufen.
   *
   * @param changeEvent
   */
  onChange(changeEvent: MatSliderChange) {
    this.luxValue = changeEvent.value ?? 0;
    this.luxChange.emit(changeEvent);
  }

  /**
   * Wird beim Bewegen des Sliders aufgerufen.
   *
   * @param inputEvent
   */
  onInput(inputEvent: MatSliderChange) {
    this.luxValue = inputEvent.value ?? 0;
    this.luxInput.emit(inputEvent);
    if (!this.formControl.touched) {
      this.formControl.markAsTouched();
    }
  }

  // region Overridden methods
  notifyFormValueChanged(formValue: any) {
    if (this.luxValue < this.luxMin) {
      setTimeout(() => {
        this.luxValue = this.luxMin;
      });
    } else if (this.luxValue > this.luxMax) {
      setTimeout(() => {
        this.luxValue = this.luxMax;
      });
    } else {
      this.luxValueChange.emit(formValue);
      this.luxValuePercent.emit(((formValue - this.luxMin) * 100) / (this.luxMax - this.luxMin));
    }
  }
  // endregion

  /**
   * Workaround, ohne den der Slider leider nicht beim Wechsel zum disabled-State den Gab
   * um den Thumb herum zeichnet.
   */
  private redrawSliderWorkaround() {
    if (this.matSlider) {
      this.matSlider.step = this.luxStep - 1;
      setTimeout(() => {
        if (this.matSlider) {
          this.matSlider.step = this.luxStep;
        }
      });
    }
  }
}

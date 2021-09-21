import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LuxInputComponent } from '../../lux-input/lux-input.component';
import { LuxDatetimeOverlayComponent } from './lux-datetime-overlay.component';

@Component({
  selector: 'lux-datetime-overlay-content',
  templateUrl: './lux-datetime-overlay-content.component.html',
  styleUrls: ['./lux-datetime-overlay-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LuxDatetimeOverlayContentComponent implements OnInit, AfterViewInit {
  @ViewChild('hoursinput') hoursInputComponent: LuxInputComponent;
  @ViewChild('minutesinput') minutesInputComponent: LuxInputComponent;

  dateTimePicker: LuxDatetimeOverlayComponent;
  selected: any;
  _initial: Date = null;
  _hours = '00';
  _minutes = '00';

  get hours() {
    return this._hours;
  }

  set hours(hours) {
    let newHours = hours;

    if (+newHours > 24) {
      newHours = '24';
    }

    if (+newHours < 0) {
      newHours = '00';
    }

    this._hours = newHours;
  }

  get minutes() {
    return this._minutes;
  }

  set minutes(minutes) {
    let newMinutes = minutes;

    if (+newMinutes > 59) {
      newMinutes = '59';
    }

    if (+newMinutes < 0) {
      newMinutes = '00';
    }

    this._minutes = newMinutes;
  }

  get initialDate() {
    return this.selected;
  }

  set initialDate(value) {
    this._initial = new Date(value);

    this.selected = new Date(value);
    this.selected.setUTCHours(0, 0, 0, 0);

    if (this.dateTimePicker.luxStartDate) {
      this.hours =
        this.dateTimePicker.luxStartDate.getUTCHours() < 10
          ? '0' + this.dateTimePicker.luxStartDate.getUTCHours()
          : '' + this.dateTimePicker.luxStartDate.getUTCHours();
      this.minutes =
        this.dateTimePicker.luxStartDate.getUTCMinutes() < 10
          ? '0' + this.dateTimePicker.luxStartDate.getUTCMinutes()
          : '' + this.dateTimePicker.luxStartDate.getUTCMinutes();
    } else {
      this.hours = this._initial.getUTCHours() < 10 ? '0' + this._initial.getUTCHours() : '' + this._initial.getUTCHours();
      this.minutes = this._initial.getUTCMinutes() < 10 ? '0' + this._initial.getUTCMinutes() : '' + this._initial.getUTCMinutes();
    }
  }

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.initialDate = this.dateTimePicker.selectedDate;
  }

  ngAfterViewInit() {
    let activeCell = this.elementRef.nativeElement.querySelector('.mat-calendar-body-active');
    if (activeCell) {
      activeCell.focus();
    }
  }

  incrementHour() {
    let hoursAsNumber = +this.hours + 1;

    if (hoursAsNumber > 24) {
      hoursAsNumber = 0;
    }

    this.hours = hoursAsNumber < 10 ? '0' + hoursAsNumber : '' + hoursAsNumber;
    this.selectHours();
  }

  decrementHour() {
    let hoursAsNumber = +this.hours - 1;

    if (hoursAsNumber < 0) {
      hoursAsNumber = 24;
    }

    this.hours = hoursAsNumber < 10 ? '0' + hoursAsNumber : '' + hoursAsNumber;
    this.selectHours();
  }

  incrementMinutes() {
    let minutesAsNumber = +this.minutes + 1;

    if (minutesAsNumber > 59) {
      minutesAsNumber = 0;
    }

    this.minutes = minutesAsNumber < 10 ? '0' + minutesAsNumber : '' + minutesAsNumber;
    this.selectMinutes();
  }

  decrementMinutes() {
    let minutesAsNumber = +this.minutes - 1;

    if (minutesAsNumber < 0) {
      minutesAsNumber = 59;
    }

    this.minutes = minutesAsNumber < 10 ? '0' + minutesAsNumber : '' + minutesAsNumber;
    this.selectMinutes();
  }

  fillHours() {
    let hoursAsNumber = +this.hours;
    this.hours = hoursAsNumber < 10 ? '0' + hoursAsNumber : '' + hoursAsNumber;
  }

  fillMinutes() {
    let minutesAsNumber = +this.minutes;
    this.minutes = minutesAsNumber < 10 ? '0' + minutesAsNumber : '' + minutesAsNumber;
  }

  onOk() {
    const resultDate = new Date(0);
    resultDate.setUTCFullYear(this.selected.getFullYear(), this.selected.getMonth(), this.selected.getDate());
    resultDate.setUTCHours(+this.hours, +this.minutes);

    this.dateTimePicker.onOk(resultDate);
  }

  selectHours() {
    setTimeout(() => {
      this.hoursInputComponent.inputElement.nativeElement.select();
    });
  }

  selectMinutes() {
    setTimeout(() => {
      this.minutesInputComponent.inputElement.nativeElement.select();
    });
  }
}

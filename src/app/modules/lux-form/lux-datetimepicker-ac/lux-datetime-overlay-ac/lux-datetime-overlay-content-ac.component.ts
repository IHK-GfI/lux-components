import { ComponentType } from '@angular/cdk/portal';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LuxThemeService } from '../../../lux-theme/lux-theme.service';
import { LuxDatepickerAcCustomHeaderComponent } from '../../lux-datepicker-ac/lux-datepicker-ac-custom-header/lux-datepicker-ac-custom-header.component';
import { LuxInputAcComponent } from '../../lux-input-ac/lux-input-ac.component';
import { LuxDatetimeOverlayAcComponent } from './lux-datetime-overlay-ac.component';

@Component({
  selector: 'lux-datetime-overlay-content-ac',
  templateUrl: './lux-datetime-overlay-content-ac.component.html',
  styleUrls: ['./lux-datetime-overlay-content-ac.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LuxDatetimeOverlayContentAcComponent implements OnInit, AfterViewInit {
  @ViewChild('hoursInput') hoursInputComponent!: LuxInputAcComponent;
  @ViewChild('minutesInput') minutesInputComponent!: LuxInputAcComponent;

  dateTimePicker!: LuxDatetimeOverlayAcComponent;
  selected: Date | null = null;
  startDate: Date | null = null;
  minCalendarDate: Date | null = null;
  maxCalendarDate: Date | null = null;
  _hours = '00';
  _minutes = '00';
  touched = false;
  customHeader?: ComponentType<any>;

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

  initDate(value?: string) {
    if (value) {
      this.selected = new Date(value);
      this.hours = this.selected.getUTCHours() < 10 ? '0' + this.selected.getUTCHours() : '' + this.selected.getUTCHours();
      this.minutes = this.selected.getUTCMinutes() < 10 ? '0' + this.selected.getUTCMinutes() : '' + this.selected.getUTCMinutes();
      this.selected.setUTCHours(0, 0, 0, 0);
      this.startDate = new Date(this.selected.getTime());
    } else {
      if (this.dateTimePicker.luxStartDate) {
        this.startDate = this.dateTimePicker.luxStartDate;
        this.selected = this.startDate;
      }

      if (Array.isArray(this.dateTimePicker.luxStartTime) && this.dateTimePicker.luxStartTime.length === 2) {
        this.hours =
          this.dateTimePicker.luxStartTime[0] < 10 ? '0' + this.dateTimePicker.luxStartTime[0] : '' + this.dateTimePicker.luxStartTime[0];
        this.minutes =
          this.dateTimePicker.luxStartTime[1] < 10 ? '0' + this.dateTimePicker.luxStartTime[1] : '' + this.dateTimePicker.luxStartTime[1];
      } else {
        this.hours = '';
        this.minutes = '';
      }
    }

    if (this.dateTimePicker.luxMinDate) {
      this.minCalendarDate = new Date(0);
      this.minCalendarDate.setUTCFullYear(
        this.dateTimePicker.luxMinDate.getUTCFullYear(),
        this.dateTimePicker.luxMinDate.getUTCMonth(),
        this.dateTimePicker.luxMinDate.getUTCDate()
      );
    }

    if (this.dateTimePicker.luxMaxDate) {
      this.maxCalendarDate = new Date(0);
      this.maxCalendarDate.setUTCFullYear(
        this.dateTimePicker.luxMaxDate.getUTCFullYear(),
        this.dateTimePicker.luxMaxDate.getUTCMonth(),
        this.dateTimePicker.luxMaxDate.getUTCDate()
      );
    }
  }

  constructor(private elementRef: ElementRef, private themeService: LuxThemeService) {
    if (this.themeService.getTheme().name === 'green') {
      this.customHeader = LuxDatepickerAcCustomHeaderComponent;
    }
  }

  ngOnInit(): void {
    this.initDate(this.dateTimePicker.selectedDate);
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
    this.touched = true;

    if (this.selected && this.hours && this.minutes) {
      const resultDate = new Date(0);
      resultDate.setUTCFullYear(this.selected.getFullYear(), this.selected.getMonth(), this.selected.getDate());
      resultDate.setUTCHours(+this.hours, +this.minutes);

      this.dateTimePicker.onOk(resultDate);
    }
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

  // für dem Customheader für das "Green"-Theme
  getHeaderByTheme(){
    const customHeader = LuxDatepickerAcCustomHeaderComponent;
    return this.themeService.getTheme().name === 'green' ? customHeader : null as any;
  }
}

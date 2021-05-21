import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { LuxInputComponent } from '../../../lux-form/lux-input/lux-input.component';
import { LuxDialogRef } from '../../../lux-popups/lux-dialog/lux-dialog-model/lux-dialog-ref.class';
import { LuxFilter } from '../../lux-filter-base/lux-filter';

@Component({
  selector: 'lux-filter-save-dialog',
  templateUrl: './lux-filter-save-dialog.component.html',
  styleUrls: ['./lux-filter-save-dialog.component.scss']
})
export class LuxFilterSaveDialogComponent implements OnInit, AfterViewInit {
  @ViewChild(LuxInputComponent) filterNameComponent: LuxInputComponent;

  currentFilters: LuxFilter[];

  filterName = '';

  constructor(public luxDialogRef: LuxDialogRef) {}

  ngOnInit(): void {
    this.currentFilters = this.luxDialogRef.data.luxStoredFilters ? this.luxDialogRef.data.luxStoredFilters : [];
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.filterNameComponent) {
        this.filterNameComponent.inputElement.nativeElement.focus();
      }
    });
  }

  onSave() {
    // Damit die Fehler direkt angezeigt werden und nicht erst, wenn man das Feld verlässt.
    this.filterNameComponent.formControl.markAsTouched();

    if (!this.checkIfFilterNameExists()) {
      this.luxDialogRef.closeDialog(this.filterName);
    }
  }

  validateForbiddenName(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      return this.checkIfFilterNameExists() ? { forbiddenName: { value: control.value } } : null;
    };
  }

  filterErrorCallback = (value, errors) => {
    if (errors.forbiddenName) {
      return 'Der Name existiert bereits.';
    } else if (errors.required) {
      return 'Pflichtfeld';
    }
    return 'Es ist ein Fehler aufgetreten.';
  };

  private checkIfFilterNameExists() {
    const filters = this.luxDialogRef.data.luxStoredFilters;
    return filters && filters.find((filter) => filter.name.toLowerCase().trim() === this.filterName.toLowerCase().trim());
  }
}

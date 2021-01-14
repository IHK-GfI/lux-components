import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LuxSelectComponent } from '../../lux-form/lux-select/lux-select.component';
import { LuxDialogService } from '../../lux-popups/lux-dialog/lux-dialog.service';
import { LuxFilterSaveDialogComponent } from '../lux-filter-dialog/lux-filter-save-dialog/lux-filter-save-dialog.component';
import { ILuxDialogConfig } from '../../lux-popups/lux-dialog/lux-dialog-model/lux-dialog-config.interface';
import { LuxFilter } from '../lux-filter-base/lux-filter';
import { LuxFilterLoadDialogComponent } from '../lux-filter-dialog/lux-filter-load-dialog/lux-filter-load-dialog.component';
import { LuxFilterItemDirective } from '../lux-filter-base/lux-filter-item.directive';
import { LuxFilterItem } from '../lux-filter-base/lux-filter-item';
import { LuxLookupComboboxComponent } from '../../lux-lookup/lux-lookup-combobox/lux-lookup-combobox.component';

@Component({
  selector: 'lux-filter-form',
  templateUrl: './lux-filter-form.component.html',
  styleUrls: ['./lux-filter-form.component.scss']
})
export class LuxFilterFormComponent implements OnInit, AfterContentInit, OnDestroy {
  dialogConfig: ILuxDialogConfig = {
    width: Math.min(600, window.innerWidth - 50) + 'px',
    height: 'auto',
    panelClass: []
  };

  @ContentChildren(LuxFilterItemDirective, { descendants: true }) formElementes: QueryList<LuxFilterItemDirective>;

  _luxFilterValues = {};
  _luxFilterExpanded = false;

  @Input() luxTitle = 'Filter';
  @Input() luxButtonRaised = false;
  @Input() luxButtonFilterLabel = 'Filtern';
  @Input() luxButtonResetLabel = 'Zurücksetzen';
  @Input() luxButtonSaveLabel = 'Speichen...';
  @Input() luxButtonLoadLabel = 'Laden...';
  @Input() luxDefaultFilterMessage = 'Es wird nach den Standardeinstellungen gefiltert.';
  @Input() luxShowChips = true;
  @Input() luxStoredFilters: LuxFilter[] = [];

  @Input()
  get luxFilterExpanded() {
    return this._luxFilterExpanded;
  }

  set luxFilterExpanded(expanded: boolean) {
    this._luxFilterExpanded = expanded;

    this.luxFilterExpandedChange.emit(expanded);
  }

  @Input()
  get luxFilterValues() {
    return this._luxFilterValues;
  }

  set luxFilterValues(filter: any) {
    this._luxFilterValues = JSON.parse(JSON.stringify(filter));

    if (this.formElementes) {
      this.filterForm.patchValue(this._luxFilterValues);

      this.onFilter();
    }
  }

  @Output() luxOnFilter: EventEmitter<string> = new EventEmitter<string>();
  @Output() luxOnSave: EventEmitter<LuxFilter> = new EventEmitter<LuxFilter>();
  @Output() luxOnLoad: EventEmitter<string> = new EventEmitter<string>();
  @Output() luxOnDelete: EventEmitter<LuxFilter> = new EventEmitter<LuxFilter>();
  @Output() luxOnReset: EventEmitter<void> = new EventEmitter<void>();
  @Output() luxFilterExpandedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  filterForm: FormGroup;
  subscriptions: Subscription[] = [];
  filterItems: LuxFilterItem[] = [];
  hasSaveAction: boolean;
  hasLoadAction: boolean;

  constructor(private formBuilder: FormBuilder, private dialogService: LuxDialogService) {}

  ngOnInit(): void {
    this.filterForm = this.formBuilder.group({});

    if (this.luxOnSave.observers && this.luxOnSave.observers.length > 0) {
      this.hasSaveAction = true;
    }

    if (this.luxOnLoad.observers && this.luxOnLoad.observers.length > 0) {
      this.hasLoadAction = true;
    }
  }

  private updateFilterChips() {
    this.filterItems = [];

    this.formElementes.forEach((formItem) => {
      const value = this.filterForm.get(formItem.filterItem.binding).value;

      if (
        !formItem.filterItem.component.formControl.disabled &&
        formItem.filterItem.defaultValues.findIndex((defaultValue) => defaultValue === value) === -1
      ) {
        if (Array.isArray(value)) {
          let i = 0;
          value.forEach((selected) => {
            const newFilterItem = new LuxFilterItem();
            Object.assign(newFilterItem, formItem.filterItem);
            newFilterItem.value = newFilterItem.renderFn(newFilterItem, selected);
            newFilterItem['index'] = i++;
            this.filterItems.push(newFilterItem);
          });
        } else {
          formItem.filterItem.value = formItem.filterItem.renderFn(formItem.filterItem, value);
          this.filterItems.push(formItem.filterItem);
        }
      }
    });
  }

  ngAfterContentInit(): void {
    this.formElementes.forEach((item) => {
      this.filterForm.addControl(item.filterItem.binding, item.filterItem.component.formControl);
    });

    this.filterForm.patchValue(this.luxFilterValues);

    this.updateFilterChips();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  openSaveDialog() {
    const dialogRef = this.dialogService.openComponent(LuxFilterSaveDialogComponent, this.dialogConfig);

    this.subscriptions.push(
      dialogRef.dialogClosed.subscribe((result: any) => {
        if (typeof result === 'string') {
          this.onSave(result);
        }
      })
    );
  }

  openLoadDialog() {
    const dialogRef = this.dialogService.openComponent(LuxFilterLoadDialogComponent, this.dialogConfig, this);

    this.subscriptions.push(
      dialogRef.dialogClosed.subscribe((result: any) => {
        if (typeof result === 'string') {
          this.onLoad(result);
        }
      })
    );
  }

  onDelete(filter: LuxFilter) {
    this.luxOnDelete.emit(filter);
  }

  onSave(filterName: string) {
    const newFilter = new LuxFilter();
    newFilter.name = filterName;
    newFilter.data = JSON.parse(JSON.stringify(this.filterForm.value));

    this.onFilter();

    this.luxOnSave.emit(newFilter);
  }

  onLoad(filtername: string) {
    // Hier werden sicherheitshalber alle Filter zurückgesetzt, für den Fall,
    // dass der Aufrufer nicht alle Filterwerte überschreibt. Vielleicht sind auch neue
    // Filterwerte hinzugekommen, etc.
    this.formElementes.forEach((item) => {
      this.filterForm.get(item.filterItem.binding).setValue(item.filterItem.defaultValues[0]);
    });

    // Filter zuklappen.
    this.luxFilterExpanded = false;

    // Hier wird nur ein Event mit dem zu ladenden Filternamen verschickt.
    // Der Empfänger hat jetzt die Aufgabe, die entsprechenden Filterdaten zu laden und
    // über luxFilterValues setzen.
    this.luxOnLoad.emit(filtername);
  }

  onReset() {
    // Hier werden alle Filter zurückgesetzt.
    this.formElementes.forEach((item) => {
      this.filterForm.get(item.filterItem.binding).setValue(item.filterItem.defaultValues[0]);
    });

    // Filtern...
    this.onFilter();

    // Die Interessenten darüber informieren, dass ein Filterreset durchgeführt wurde.
    this.luxOnReset.emit();
  }

  filterChipRemoved(indexRemoved: number) {
    // Ermittle den Filterchip, der entfernt werden soll.
    const removedFilterItem: LuxFilterItem = this.filterItems.splice(indexRemoved, 1)[0];

    if (
      (removedFilterItem.component instanceof LuxSelectComponent ||
        removedFilterItem.component instanceof LuxLookupComboboxComponent) &&
      removedFilterItem.component.luxMultiple
    ) {
      // Fall: Multiselect
      // Kopie erstellen und nicht nur das bestehende Array manipulieren.
      const newSelected = [...this.filterForm.get(removedFilterItem.binding).value];
      // Gelöschten Wert entfernen.
      newSelected.splice(removedFilterItem['index'], 1);
      // Das neue Array in das Formularcontrol setzen.
      this.filterForm.get(removedFilterItem.binding).setValue(newSelected);
    } else {
      // Fall: Einfacher Wert
      this.filterForm.get(removedFilterItem.binding).setValue(removedFilterItem.defaultValues[0]);
    }

    // Filtern...
    this.onFilter();
  }

  onFilter() {
    // Filter zuklappen.
    this.luxFilterExpanded = false;

    // Filterchips aktualisieren.
    this.updateFilterChips();

    // Die Interessenten darüber informieren, dass gefiltert werden soll.
    this.luxOnFilter.emit(JSON.parse(JSON.stringify(this.filterForm.value)));
  }
}

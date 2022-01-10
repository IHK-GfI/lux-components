import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Subscription } from 'rxjs';
import { LuxMediaQueryObserverService } from '../../lux-util/lux-media-query-observer.service';
import { LuxFilter } from '../lux-filter-base/lux-filter';
import { LuxFilterItem } from '../lux-filter-base/lux-filter-item';
import { LuxFilterModule } from '../lux-filter.module';

import { LuxFilterFormComponent } from './lux-filter-form.component';
import { LuxTestHelper } from '../../lux-util/testing/lux-test-helper';

describe('LuxFilterFormComponent', () => {
  let component: TestFilterFormComponent;
  let fixture: ComponentFixture<TestFilterFormComponent>;

  beforeEach(async () => {
    LuxTestHelper.configureTestModule([], [TestFilterFormComponent], [LuxFilterModule]);
  });

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(TestFilterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    tick(500);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Sollte ohne Validierungsfehler filtern', () => {
    // Init
    const spy = spyOn(component, 'onFilter').and.callThrough();

    // Vorbedingungen prüfen
    expect(component.filterComponent.filterForm.get('input').value).toBeUndefined();

    // Änderungen durchführen
    component.initFilter = { input: 'Not empty' };
    fixture.detectChanges();

    // Nachbedingungen prüfen
    expect(component.filterComponent.filterForm.valid).toBeTrue();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('Sollte mit Validierungsfehlern nicht filtern', () => {
    // Init
    const spy = spyOn(component, 'onFilter').and.callThrough();

    // Vorbedingungen prüfen
    expect(component.filterComponent.filterForm.get('input').value).toBeUndefined();

    // Änderungen durchführen
    // Validierungsfehler: Das Feld 'input' ist required und darf somit nicht leer sein.
    component.initFilter = { input: '' };
    fixture.detectChanges();

    // Nachbedingungen prüfen
    expect(component.filterComponent.filterForm.valid).toBeFalse();
    expect(spy).toHaveBeenCalledTimes(0);
  });
});

@Component({
  template: `
    <lux-filter-form
      fxFlex="1 1 auto"
      (luxOnFilter)="onFilter($event)"
      [(luxFilterExpanded)]="expanded"
      [luxFilterValues]="initFilter"
      (luxOnSave)="onSave($event)"
      (luxOnLoad)="onLoad($event)"
      (luxOnReset)="onReset()"
      (luxOnDelete)="onDelete($event)"
      [luxShowChips]="showFilterChips"
      [luxStoredFilters]="storedFilters"
      class="lux-ml-1 lux-mr-1 lux-mb-3"
    >
      <div fxLayout="row wrap" fxLayoutGap="12px grid" fxLayout.xs="column" fxLayoutGap.xs="0px" fxLayout.md="column" fxLayoutGap.md="0px">
        <lux-input
          fxFlex="1 1 calc(33% - 12px)"
          fxFlex.xs="1 1 auto"
          fxFlex.md="1 1 auto"
          luxLabel="Input"
          luxName="filter_input"
          luxAutocomplete="off"
          luxControlBinding="input"
          [luxRequired]="true"
          [luxFilterDisabled]="inputDisabled"
          [luxFilterHidden]="inputHidden"
          luxFilterItem
        ></lux-input>
        <lux-autocomplete
          fxFlex="1 1 calc(33% - 12px)"
          fxFlex.xs="1 1 auto"
          fxFlex.md="1 1 auto"
          luxLabel="Autocomplete"
          luxName="filter_autocomplete"
          [luxOptions]="autoCompleteOptions"
          luxControlBinding="autocomplete"
          [luxFilterDisabled]="autoCompleteDisabled"
          [luxFilterHidden]="autoCompleteHidden"
          luxFilterItem
        ></lux-autocomplete>
        <lux-datepicker
          fxFlex="1 1 calc(33% - 12px)"
          fxFlex.xs="1 1 auto"
          fxFlex.md="1 1 auto"
          luxLabel="Datepicker"
          luxName="filter_datepicker"
          luxControlBinding="datepicker"
          [luxFilterDisabled]="datepickerDisabled"
          [luxFilterHidden]="datepickerHidden"
          luxFilterItem
        ></lux-datepicker>
        <lux-select
          fxFlex="1 1 calc(33% - 12px)"
          fxFlex.xs="1 1 auto"
          fxFlex.md="1 1 auto"
          luxLabel="Single-Select"
          luxControlBinding="singleSelect"
          luxOptionLabelProp="label"
          [luxMultiple]="false"
          [luxOptions]="singleSelectOptions"
          [luxCompareWith]="compareValueFn"
          [luxFilterDisabled]="singleSelectDisabled"
          [luxFilterHidden]="singleSelectHidden"
          luxFilterColor="accent"
          luxFilterItem
        ></lux-select>
        <lux-select
          fxFlex="1 1 calc(33% - 12px)"
          fxFlex.xs="1 1 auto"
          fxFlex.md="1 1 auto"
          luxLabel="Multi-Select"
          luxControlBinding="multiSelect"
          luxOptionLabelProp="label"
          [luxMultiple]="true"
          [luxOptions]="multiSelectOptions"
          [luxCompareWith]="compareValueFn"
          [luxFilterDisabled]="multiSelectDisabled"
          [luxFilterHidden]="multiSelectHidden"
          luxFilterColor="accent"
          luxFilterItem
        ></lux-select>
        <lux-toggle
          fxFlex="1 1 calc(33% - 12px)"
          fxFlex.xs="1 1 auto"
          fxFlex.md="1 1 auto"
          luxLabel="Toggle"
          luxName="filter_toggle"
          luxControlBinding="toggle"
          [luxFilterRenderFn]="renderToggleFn"
          [luxFilterDisabled]="toggleSelectDisabled"
          [luxFilterHidden]="toggleSelectHidden"
          luxFilterColor="warn"
          luxFilterItem
        ></lux-toggle>
      </div>
    </lux-filter-form>
  `
})
class TestFilterFormComponent implements OnInit, OnDestroy {
  @ViewChild(LuxFilterFormComponent) filterComponent: LuxFilterFormComponent;

  autoCompleteOptions: any[] = [
    { label: 'Auto A', value: 'a' },
    { label: 'Auto B', value: 'b' },
    { label: 'Auto C', value: 'c' }
  ];

  singleSelectOptions: any[] = [
    { label: 'Single 4711', value: '4711' },
    { label: 'Single 4712', value: '4712' },
    { label: 'Single 4713', value: '4713' }
  ];

  multiSelectOptions: any[] = [
    { label: 'Multi 1', value: 1 },
    { label: 'Multi 2', value: 2 },
    { label: 'Multi 3', value: 3 }
  ];

  initFilter: any = {};
  currentFilter: any = this.initFilter;

  expanded = false;
  showFilterChips = true;

  storedFilters = [];

  mediaQuerySubscription: Subscription;

  inputDisabled = false;
  inputHidden = false;
  autoCompleteDisabled = false;
  autoCompleteHidden = false;
  datepickerDisabled = false;
  datepickerHidden = false;
  singleSelectDisabled = false;
  singleSelectHidden = false;
  multiSelectDisabled = false;
  multiSelectHidden = false;
  toggleSelectDisabled = false;
  toggleSelectHidden = false;

  constructor(private mediaQuery: LuxMediaQueryObserverService) {}

  ngOnInit(): void {
    this.mediaQuerySubscription = this.mediaQuery.getMediaQueryChangedAsObservable().subscribe(() => {
      if (this.mediaQuery.isSmallerOrEqual('xs')) {
        this.showFilterChips = false;
      } else {
        this.showFilterChips = true;
      }
    });
  }

  ngOnDestroy(): void {
    this.mediaQuerySubscription.unsubscribe();
  }

  compareValueFn = (o1: any, o2: any) => {
    return o1.value === o2.value;
  };

  renderToggleFn(filterItem: LuxFilterItem, value: any) {
    return value ? 'aktiviert' : 'deaktiviert';
  }

  onFilter(filter: any) {
    this.currentFilter = filter;
  }

  onSave(filter: LuxFilter) {
    this.saveFilter(filter);
  }

  onDelete(filter: LuxFilter) {}

  onReset() {}

  onLoad(filterName: string) {
    this.initFilter = this.loadFilter(filterName);
  }

  private saveFilter(filter: LuxFilter) {
    // Hier müssten die Filtereinstellungen (z.B. in die Datenbank) geschrieben werden.
    this.storedFilters.push(filter);
  }

  private loadFilter(filterName: string) {
    // Hier müssten die Filtereinstellungen (z.B. aus der Datenbank) gelesen und zurückgeliefert werden.
    return JSON.parse(JSON.stringify(this.storedFilters.find((filter) => filter.name === filterName).data));
  }
}

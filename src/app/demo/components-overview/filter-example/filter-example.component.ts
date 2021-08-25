import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { LuxFilter } from '../../../modules/lux-filter/lux-filter-base/lux-filter';
import { LuxFilterItem } from '../../../modules/lux-filter/lux-filter-base/lux-filter-item';
import { LuxFilterFormComponent } from '../../../modules/lux-filter/lux-filter-form/lux-filter-form.component';
import { LuxMediaQueryObserverService } from '../../../modules/lux-util/lux-media-query-observer.service';
import { Subscription } from 'rxjs';
import {
  LuxFieldValues,
  LuxLookupParameters
} from '../../../modules/lux-lookup/lux-lookup-model/lux-lookup-parameters';

@Component({
  selector: 'lux-filter-example',
  templateUrl: './filter-example.component.html',
  styleUrls: ['./filter-example.component.scss']
})
export class FilterExampleComponent implements OnInit, OnDestroy {
  @ViewChild(LuxFilterFormComponent) filterComponent: LuxFilterFormComponent;

  parameters = new LuxLookupParameters({
    knr: 101,
    fields: [LuxFieldValues.kurz, LuxFieldValues.lang1, LuxFieldValues.lang2]
  });

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

  initFilter: any = { input: 'Lorem ipsum' };
  currentFilter: any = this.initFilter;

  expanded = false;
  showFilterChips = true;

  storedFilters = [
    {
      name: 'Vollständig',
      data: {
        autocompleteLookup: {
          key: '1',
          kurzText: 'Frankreich',
          langText1: 'Frankreich',
          isUngueltig: false
        },
        comboboxLookup: [
          {
            key: '4',
            kurzText: 'Deutschland',
            langText1: 'Deutschland',
            isUngueltig: false
          }
        ],
        input: 'Max Mustermann',
        autocomplete: {
          label: 'Auto A',
          value: 'a'
        },
        datepicker: '2020-07-21T00:00:00.000Z',
        singleSelect: {
          label: 'Single 4711',
          value: '4711'
        },
        multiSelect: [
          {
            label: 'Multi 1',
            value: 1
          },
          {
            label: 'Multi 2',
            value: 2
          },
          {
            label: 'Multi 3',
            value: 3
          }
        ],
        toggle: true
      }
    }
  ];

  mediaQuerySubscription: Subscription;

  inputDisabled = false;
  inputHidden = false;
  autoCompleteDisabled = false;
  autoCompleteHidden = false;
  autoCompleteLookupDisabled = false;
  autoCompleteLookupHidden = false;
  datepickerDisabled = false;
  datepickerHidden = false;
  singleSelectDisabled = false;
  singleSelectHidden = false;
  multiSelectDisabled = false;
  multiSelectHidden = false;
  selectLookupDisabled = false;
  selectLookupHidden = false;
  toggleSelectDisabled = false;
  toggleSelectHidden = false;

  buttonColorOptions = ['default', 'primary', 'accent', 'warn'];
  buttonRaised = false;
  buttonFilterColor = 'primary';
  buttonDialogSave = 'primary';
  buttonDialogLoad = 'primary';
  buttonDialogDelete = 'warn';
  buttonDialogCancel = 'default';
  buttonDialogClose = 'default';

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

  compareValueFn = (o1: any, o2: any) => o1.value === o2.value;

  renderToggleFn(filterItem: LuxFilterItem, value: any) {
    return value ? 'aktiviert' : 'deaktiviert';
  }

  onFilter(filter: any) {
    this.currentFilter = filter;
    console.log('Please filter...', filter);
  }

  onSave(filter: LuxFilter) {
    this.saveFilter(filter);
  }

  onDelete(filter: LuxFilter) {
    console.log('Filter deleted.', filter);
  }

  onReset() {
    console.log('Filter reset.');
  }

  onLoad(filterName: string) {
    this.initFilter = this.loadFilter(filterName);
  }

  private saveFilter(filter: LuxFilter) {
    // Hier müssten die Filtereinstellungen (z.B. in die Datenbank) geschrieben werden.
    this.storedFilters.push(filter);
    console.log('Filter saved.', filter);
  }

  private loadFilter(filterName: string) {
    // Hier müssten die Filtereinstellungen (z.B. aus der Datenbank) gelesen und zurückgeliefert werden.
    return JSON.parse(JSON.stringify(this.storedFilters.find((filter) => filter.name === filterName).data));
  }
}

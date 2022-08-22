import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { LuxActionColorType } from '../../../modules/lux-action/lux-action-model/lux-action-component-base.class';
import { LuxFilter } from '../../../modules/lux-filter/lux-filter-base/lux-filter';
import { LuxFilterItem } from '../../../modules/lux-filter/lux-filter-base/lux-filter-item';
import { LuxFilterFormComponent } from '../../../modules/lux-filter/lux-filter-form/lux-filter-form.component';
import { LuxFieldValues, LuxLookupParameters } from '../../../modules/lux-lookup/lux-lookup-model/lux-lookup-parameters';
import { LuxMediaQueryObserverService } from '../../../modules/lux-util/lux-media-query-observer.service';
import { LuxUtil } from '../../../modules/lux-util/lux-util';

@Component({
  selector: 'lux-filter-example',
  templateUrl: './filter-example.component.html',
  styleUrls: ['./filter-example.component.scss']
})
export class FilterExampleComponent implements OnInit, OnDestroy {
  @ViewChild(LuxFilterFormComponent) filterComponent!: LuxFilterFormComponent;

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

  initFilter: any = {};
  currentFilter: any = {};
  replaceFilterJson = `{
  "input": "Lorem ipsum",
  "datepicker": "${LuxUtil.newDateWithoutTime().toISOString()}",
  "toggle": true
  }`;

  expanded = false;
  showFilterChips = true;

  storedFilters: LuxFilter[] = [
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
  datetimepickerDisabled = false;
  datetimepickerHidden = false;
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
  buttonFilterColor: LuxActionColorType = 'primary';
  buttonDialogSave: LuxActionColorType = 'primary';
  buttonDialogLoad: LuxActionColorType = 'primary';
  buttonDialogDelete: LuxActionColorType = 'warn';
  buttonDialogCancel: LuxActionColorType = '';
  buttonDialogClose: LuxActionColorType = '';

  markdownData = `
  Html
  \`\`\`
  <lux-filter-form>
  ...
    <lux-layout-form-row [luxGap]="{ row: '16px', rowItem: '24px', column: '8px' }" luxWrapAt="md">
      <lux-select
        luxFilterItem
        [luxNoBottomLabel]="true"
        *luxLayoutRowItem="{}"
      ></lux-select>
      <lux-select
        luxFilterItem
        [luxNoBottomLabel]="true"
        *luxLayoutRowItem="{}"
      ></lux-select>
    </lux-layout-form-row>
  ...
  </lux-filter-form>
  \`\`\`
  `;

  disableShortcut = false;

  constructor(private mediaQuery: LuxMediaQueryObserverService) {
    this.mediaQuerySubscription = this.mediaQuery.getMediaQueryChangedAsObservable().subscribe(() => {
      this.showFilterChips = !this.mediaQuery.isSmallerOrEqual('xs');
    });
  }

  ngOnInit(): void {
    // Hier wird die setTimeout-Methode verwendet, um einen Backend-Call zu simulieren.
    setTimeout(() => {
      this.initFilter    = { input: "Lorem ipsum" };
      this.currentFilter = this.initFilter;
    }, 100);
  }

  ngOnDestroy(): void {
    this.mediaQuerySubscription.unsubscribe();
  }

  compareValueFn = (o1: any, o2: any) => o1.value === o2.value;

  renderToggleFn(filterItem: LuxFilterItem<boolean>, value: boolean) {
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

  onSetFilter() {
    this.initFilter = JSON.parse(this.replaceFilterJson);
  }

  private saveFilter(filter: LuxFilter) {
    // Hier müssten die Filtereinstellungen (z.B. in die Datenbank) geschrieben werden.
    this.storedFilters.push(filter);
    console.log('Filter saved.', filter);
  }

  private loadFilter(filterName: string) {
    // Hier müssten die Filtereinstellungen (z.B. aus der Datenbank) gelesen und zurückgeliefert werden.
    const luxFilter = this.storedFilters.find((filter) => filter.name === filterName);

    if (!luxFilter) {
      throw Error(`Es konnte kein Filter mit dem Namen "${filterName}" gefunden werden.`);
    }

    return JSON.parse(JSON.stringify(luxFilter.data));
  }
}

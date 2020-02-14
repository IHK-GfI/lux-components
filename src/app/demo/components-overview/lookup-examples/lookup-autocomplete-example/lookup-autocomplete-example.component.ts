// tslint:disable:max-line-length
import { AfterViewInit, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MockLuxLookupService } from '../mock-lookup-service';
import { LuxLookupAutocompleteComponent } from '../../../../modules/lux-lookup/lux-lookup-autocomplete/lux-lookup-autocomplete.component';
import { LuxLookupHandlerService } from '../../../../modules/lux-lookup/lux-lookup-service/lux-lookup-handler.service';
import { LookupExampleComponent } from '../lookup-example.component';
import { LuxSnackbarService } from '../../../../modules/lux-popups/lux-snackbar/lux-snackbar.service';

@Component({
  selector: 'app-lookup-autocomplete-example',
  templateUrl: './lookup-autocomplete-example.component.html',
  styleUrls: ['../lookup-example.component.scss']
})
export class LookupAutocompleteExampleComponent extends LookupExampleComponent implements OnInit, AfterViewInit {
  @ViewChildren(LuxLookupAutocompleteComponent) lookupAutocompleteCmp: QueryList<LuxLookupAutocompleteComponent>;

  debounceTime: number = 250;
  maximumDisplayed: number = 50;

  constructor(lookupHandler: LuxLookupHandlerService, snackbar: LuxSnackbarService, fb: FormBuilder) {
    super(lookupHandler, snackbar, fb);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngAfterViewInit() {}

  start() {
    this.lookupHandler.reloadData('normalautocomplete');
    this.lookupHandler.reloadData('reactiveautocomplete');
    if (this.useMock) {
      this.showSnackbar('Mock-Daten geladen.');
    }
  }

  /**
   * Schreibt in den Mock-Service einen Flag, der das Laden von invaliden Daten ermöglicht.
   * @param $event
   */
  changeMockInvalid($event) {
    this.mockInvalid = $event;
    if (this.mockInvalid) {
      this.lookupAutocompleteCmp.forEach(cmp => {
        cmp['lookupService']['mockInvalid'] = this.mockInvalid;
      });
    }
  }

  /**
   * Überschreibt/Resettet den Lookup-Service mit einer Mock-Implementierung um eigene Daten zu laden.
   * @param $event
   */
  changeUseMock($event) {
    if ($event) {
      this.lookupAutocompleteCmp.forEach(cmp => {
        this.originalServices.push(cmp['lookupService']);
        cmp['lookupService'] = new MockLuxLookupService(null);
      });
    } else {
      this.lookupAutocompleteCmp.forEach((cmp, index) => {
        cmp['lookupService'] = this.originalServices[index];
      });
      this.originalServices = [];
    }

    this.useMock = $event;
  }
}

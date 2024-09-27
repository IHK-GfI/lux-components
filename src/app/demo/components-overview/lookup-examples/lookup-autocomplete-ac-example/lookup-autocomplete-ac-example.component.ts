/* eslint-disable max-len */
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import {
  LuxLookupAutocompleteAcComponent
} from '../../../../modules/lux-lookup/lux-lookup-autocomplete-ac/lux-lookup-autocomplete-ac.component';
import { LuxLookupHandlerService } from '../../../../modules/lux-lookup/lux-lookup-service/lux-lookup-handler.service';
import { LookupExampleComponent } from '../lookup-example.component';
import { LuxSnackbarService } from '../../../../modules/lux-popups/lux-snackbar/lux-snackbar.service';

@Component({
  selector: 'app-lookup-autocomplete-ac-example',
  templateUrl: './lookup-autocomplete-ac-example.component.html'
})
export class LookupAutocompleteAcExampleComponent extends LookupExampleComponent implements OnInit {
  @ViewChildren(LuxLookupAutocompleteAcComponent) lookupAutocompleteCmp!: QueryList<LuxLookupAutocompleteAcComponent>;

  debounceTime = 250;
  maximumDisplayed = 50;
  labelLongFormat = false;
  denseFormat = false;

  constructor(lookupHandler: LuxLookupHandlerService, snackbar: LuxSnackbarService) {
    super(lookupHandler);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  reloadDataIntern() {
    this.lookupHandler.reloadData('normalautocomplete');
    this.lookupHandler.reloadData('reactiveautocomplete');
  }
}

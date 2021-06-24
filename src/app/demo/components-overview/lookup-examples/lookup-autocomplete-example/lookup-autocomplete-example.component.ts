/* eslint-disable max-len */
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LuxLookupAutocompleteComponent } from '../../../../modules/lux-lookup/lux-lookup-autocomplete/lux-lookup-autocomplete.component';
import { LuxLookupHandlerService } from '../../../../modules/lux-lookup/lux-lookup-service/lux-lookup-handler.service';
import { LookupExampleComponent } from '../lookup-example.component';
import { LuxSnackbarService } from '../../../../modules/lux-popups/lux-snackbar/lux-snackbar.service';

@Component({
  selector: 'app-lookup-autocomplete-example',
  templateUrl: './lookup-autocomplete-example.component.html',
  styleUrls: ['../lookup-example.component.scss']
})
export class LookupAutocompleteExampleComponent extends LookupExampleComponent implements OnInit {
  @ViewChildren(LuxLookupAutocompleteComponent) lookupAutocompleteCmp: QueryList<LuxLookupAutocompleteComponent>;

  debounceTime = 250;
  maximumDisplayed = 50;

  constructor(lookupHandler: LuxLookupHandlerService, snackbar: LuxSnackbarService, fb: FormBuilder) {
    super(lookupHandler, fb);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  start() {
    this.lookupHandler.reloadData('normalautocomplete');
    this.lookupHandler.reloadData('reactiveautocomplete');
  }
}

import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { LuxLookupHandlerService } from '../../../../modules/lux-lookup/lux-lookup-service/lux-lookup-handler.service';
import { LuxLookupComboboxComponent } from '../../../../modules/lux-lookup/lux-lookup-combobox/lux-lookup-combobox.component';
import { UntypedFormBuilder } from '@angular/forms';
import { LookupExampleComponent } from '../lookup-example.component';

@Component({
  selector: 'app-lookup-combobox-example',
  templateUrl: './lookup-combobox-example.component.html',
  styleUrls: ['../lookup-example.component.scss']
})
export class LookupComboboxExampleComponent extends LookupExampleComponent implements OnInit {
  multiValue;
  entryBlockSize = 25;
  bLuxWithEmptyEntry = true;
  labelLongFormat = false;
  
  @ViewChildren(LuxLookupComboboxComponent) lookupComboboxCmp: QueryList<LuxLookupComboboxComponent>;

  constructor(lookupHandler: LuxLookupHandlerService, fb: UntypedFormBuilder) {
    super(lookupHandler, fb);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  start() {
    this.lookupHandler.reloadData('normalcombobox');
    this.lookupHandler.reloadData('multicombobox');
    this.lookupHandler.reloadData('reactivecombobox');
  }
}

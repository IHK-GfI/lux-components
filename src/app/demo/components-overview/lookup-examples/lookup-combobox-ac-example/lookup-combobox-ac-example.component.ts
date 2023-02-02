import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { LuxLookupComboboxAcComponent } from '../../../../modules/lux-lookup/lux-lookup-combobox-ac/lux-lookup-combobox-ac.component';
import { LuxLookupTableEntry } from '../../../../modules/lux-lookup/lux-lookup-model/lux-lookup-table-entry';
import { LuxLookupHandlerService } from '../../../../modules/lux-lookup/lux-lookup-service/lux-lookup-handler.service';
import { LuxLookupComboboxComponent } from '../../../../modules/lux-lookup/lux-lookup-combobox/lux-lookup-combobox.component';
import { FormBuilder } from '@angular/forms';
import { LookupExampleComponent } from '../lookup-example.component';

@Component({
  selector: 'app-lookup-combobox-ac-example',
  templateUrl: './lookup-combobox-ac-example.component.html'
})
export class LookupComboboxAcExampleComponent extends LookupExampleComponent implements OnInit {
  multiValue: LuxLookupTableEntry | LuxLookupTableEntry[] | null = null;
  entryBlockSize = 25;
  bLuxWithEmptyEntry = true;
  labelLongFormat = false;

  @ViewChildren(LuxLookupComboboxAcComponent) lookupComboboxCmp!: QueryList<LuxLookupComboboxAcComponent>;

  constructor(lookupHandler: LuxLookupHandlerService) {
    super(lookupHandler);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  reloadDataIntern() {
    this.lookupHandler.reloadData('normalcombobox');
    this.lookupHandler.reloadData('multicombobox');
    this.lookupHandler.reloadData('reactivecombobox');
  }
}

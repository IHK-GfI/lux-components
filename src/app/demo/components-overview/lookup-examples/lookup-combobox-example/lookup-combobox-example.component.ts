import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { LuxLookupTableEntry } from '../../../../modules/lux-lookup/lux-lookup-model/lux-lookup-table-entry';
import { LuxLookupHandlerService } from '../../../../modules/lux-lookup/lux-lookup-service/lux-lookup-handler.service';
import { LuxLookupComboboxComponent } from '../../../../modules/lux-lookup/lux-lookup-combobox/lux-lookup-combobox.component';
import { LookupExampleComponent } from '../lookup-example.component';

@Component({
  selector: 'app-lookup-combobox-example',
  templateUrl: './lookup-combobox-example.component.html',
  styleUrls: ['../lookup-example.component.scss']
})
export class LookupComboboxExampleComponent extends LookupExampleComponent implements OnInit {
  multiValue: LuxLookupTableEntry | LuxLookupTableEntry[] | null = null;
  entryBlockSize = 25;
  bLuxWithEmptyEntry = true;
  labelLongFormat = false;

  @ViewChildren(LuxLookupComboboxComponent) lookupComboboxCmp!: QueryList<LuxLookupComboboxComponent>;

  constructor(lookupHandler: LuxLookupHandlerService) {
    super(lookupHandler);
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

import { AfterViewInit, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { LuxLookupHandlerService } from '../../../../modules/lux-lookup/lux-lookup-service/lux-lookup-handler.service';
import { LuxLookupComboboxComponent } from '../../../../modules/lux-lookup/lux-lookup-combobox/lux-lookup-combobox.component';
import { FormBuilder } from '@angular/forms';
import { MockLuxLookupService } from '../mock-lookup-service';
import { LookupExampleComponent } from '../lookup-example.component';
import { LuxSnackbarService } from '../../../../modules/lux-popups/lux-snackbar/lux-snackbar.service';

@Component({
  selector: 'app-lookup-combobox-example',
  templateUrl: './lookup-combobox-example.component.html',
  styleUrls: ['../lookup-example.component.scss']
})
export class LookupComboboxExampleComponent extends LookupExampleComponent implements OnInit, AfterViewInit {
  multiValue;
  entryBlockSize: number = 25;

  @ViewChildren(LuxLookupComboboxComponent) lookupComboboxCmp: QueryList<LuxLookupComboboxComponent>;

  constructor(lookupHandler: LuxLookupHandlerService, snackbar: LuxSnackbarService, fb: FormBuilder) {
    super(lookupHandler, snackbar, fb);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngAfterViewInit() {}

  start() {
    this.lookupHandler.reloadData('normalcombobox');
    this.lookupHandler.reloadData('multicombobox');
    this.lookupHandler.reloadData('reactivecombobox');
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
    if (this.useMock) {
      this.lookupComboboxCmp.forEach(cmp => {
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
      this.lookupComboboxCmp.forEach(cmp => {
        this.originalServices.push(cmp['lookupService']);
        cmp['lookupService'] = new MockLuxLookupService(null);
      });
    } else {
      this.lookupComboboxCmp.forEach((cmp, index) => {
        cmp['lookupService'] = this.originalServices[index];
      });
      this.originalServices = [];
    }

    this.useMock = $event;
  }
}

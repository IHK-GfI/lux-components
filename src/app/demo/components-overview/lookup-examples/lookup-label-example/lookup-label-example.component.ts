import { Component } from '@angular/core';
import { LuxLookupHandlerService } from '../../../../modules/lux-lookup/lux-lookup-service/lux-lookup-handler.service';

@Component({
  selector: 'app-lookup-label-example',
  templateUrl: './lookup-label-example.component.html',
  styleUrls: ['./lookup-label-example.component.scss']
})
export class LookupLabelExampleComponent {
  knr = 101;
  tableKey = 4;
  tableNo = 1002;
  bezeichnung = 'kurz';

  constructor(private lookupHandler: LuxLookupHandlerService) {}

  start() {
    this.lookupHandler.reloadData('label-example');
  }
}

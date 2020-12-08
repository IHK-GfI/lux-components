import { Component, OnInit } from '@angular/core';
import { LuxLookupHandlerService } from '../../../../modules/lux-lookup/lux-lookup-service/lux-lookup-handler.service';

@Component({
  selector: 'app-lookup-label-example',
  templateUrl: './lookup-label-example.component.html',
  styleUrls: ['./lookup-label-example.component.scss']
})
export class LookupLabelExampleComponent implements OnInit {
  knr: number = 101;
  tableKey: number = 4;
  tableNo: number = 1002;
  bezeichnung: string = 'kurz';

  constructor(private lookupHandler: LuxLookupHandlerService) {}

  ngOnInit() {}

  start() {
    this.lookupHandler.reloadData('label-example');
  }
}

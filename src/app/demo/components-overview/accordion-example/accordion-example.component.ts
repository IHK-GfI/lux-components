import { Component } from '@angular/core';
import { LuxModeType } from "../../../modules/lux-layout/lux-accordion/lux-accordion.component";
import { logResult } from '../../example-base/example-base-util/example-base-helper';

@Component({
  selector: 'app-accordion-example',
  templateUrl: './accordion-example.component.html',
  styleUrls: ['./accordion-example.component.scss']
})
export class AccordionExampleComponent {
  // region Helper-Properties für das Beispiel

  showOutputEvents = false;
  log = logResult;
  displayModes = ['flat', 'default'];

  // endregion

  // region Properties der Component

  disabled = false;
  disabled1Panel = false;
  disabled2Panel = false;
  disabled3Panel = false;
  hideToggle = false;
  hideToggle1Panel = false;
  hideToggle2Panel = false;
  hideToggle3Panel = false;
  multiMode = true;
  expandedHeaderHeight = '64px';
  collapsedHeaderHeight = '64px';
  expandedHeaderHeight1Panel = '64px';
  collapsedHeaderHeight1Panel = '64px';
  expandedHeaderHeight2Panel = '64px';
  collapsedHeaderHeight2Panel = '64px';
  expandedHeaderHeight3Panel = '64px';
  collapsedHeaderHeight3Panel = '64px';
  displayMode: LuxModeType = 'default';
  // Properties für die Form-Controls
  testHint = 'Hinweis';
  testValue = '';
  testOption: any = null;
  testDate = '';
  testDate2 = '';
  options = [
    {label: 'Option 1', value: 'A'},
    {label: 'Option 2', value: 'B'},
    {label: 'Option 3', value: 'C'},
    {label: 'Option 4', value: 'D'}
  ];
  chipItems: string[] = [ 'Chip 0', 'Chip 1', 'Chip 2'];
  // endregion

  constructor() {}

  chipRemoved($event: any) {
    console.log($event);
  }


  chipAdded($event: string) {
      console.log($event);
  }


  chipItemClicked($event: any) {
      console.log($event);
  }
}

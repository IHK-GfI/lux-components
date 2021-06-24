import { Component } from '@angular/core';
import { logResult } from '../../example-base/example-base-util/example-base-helper';

@Component({
  selector: 'app-chip-example',
  templateUrl: './chip-example.component.html'
})
export class ChipExampleComponent {
  // region Helper-Properties für das Beispiel

  showOutputEvents = false;
  log = logResult;

  colors = ['Keine Farbe', 'warn', 'accent', 'primary'];

  chips = [
    { label: 'Chip #1', color: 'Keine Farbe', removable: true, disabled: false, selected: true },
    { label: 'Chip #2', color: 'primary', removable: true, disabled: false, selected: true },
    { label: 'Chip #3', color: 'warn', removable: true, disabled: false, selected: true },
    { label: 'Chip #4', color: 'accent', removable: true, disabled: false, selected: true }
  ];

  openedPanel: number;

  // endregion

  // region Properties der Component

  disabled = false;
  inputAllowed = true;
  inputLabel = 'Neu';
  chipOrientation = 'horizontal';
  autocomplete = true;
  autocompleteOptions = ['Neuer Chip #1', 'Neuer Chip #2', 'Neuer Chip #3'];
  multiple = true;

  groupSelected = true;
  groupRemovable = true;
  groupDisabled = false;
  groupColor = 'Keine Farbe';
  groupLabels = ['Group Chip #1', 'Group Chip #2', 'Group Chip #3'];

  // endregion

  constructor() {}

  chipAdded($event: string) {
    this.chips.push({
      label: $event,
      color: 'warn',
      removable: true,
      disabled: false,
      selected: true
    });
    this.log(this.showOutputEvents, 'Chip added', $event);
  }

  chipRemoved($event: number) {
    this.chips = this.chips.filter((value: any, index: number) => index !== $event);
    this.log(this.showOutputEvents, 'Chip removed', $event);
  }
}

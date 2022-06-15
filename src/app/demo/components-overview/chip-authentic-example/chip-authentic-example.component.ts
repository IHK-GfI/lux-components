import { Component } from '@angular/core';
import { ThemePalette } from "@angular/material/core";
import { LuxChipsAcOrientation } from "../../../modules/lux-form/lux-chips-ac/lux-chips-ac.component";
import { logResult } from '../../example-base/example-base-util/example-base-helper';

@Component({
  selector: 'lux-chip-authentic-example',
  templateUrl: './chip-authentic-example.component.html'
})
export class ChipAuthenticExampleComponent {
  // region Helper-Properties für das Beispiel

  showOutputEvents = false;
  log = logResult;

  colors = ['Keine Farbe', 'warn', 'accent', 'primary'];

  chips: {label: string; color: ThemePalette; removable: boolean; disabled: boolean; selected: boolean}[] = [
    { label: 'Chip #1', color: undefined, removable: true, disabled: false, selected: true },
    { label: 'Chip #2', color: 'primary', removable: true, disabled: false, selected: true },
    { label: 'Chip #3', color: 'warn', removable: true, disabled: false, selected: true },
    { label: 'Chip #4', color: 'accent', removable: true, disabled: false, selected: true }
  ];

  openedPanel: number;
  longOpitionLabel='Lorem ipsum dolor \n sit amet consectetur adipisicing elit. Nulla officiis consectetur natus id iusto asperiores cum eum sint esse in?';
  // endregion

  // region Properties der Component

  disabled = false;
  inputAllowed = true;
  inputLabel = 'Neu';
  placeholder = 'eingeben oder auswählen';
  chipOrientation: LuxChipsAcOrientation = 'horizontal';
  autocomplete = true;
  autocompleteOptions = ['Neuer Chip #1', 'Neuer Chip #2', 'Neuer Chip #3',  this.longOpitionLabel];
  multiple = true;
  optionMultiline = false;
  
  groupSelected = true;
  groupRemovable = true;
  groupDisabled = false;
  groupColor: ThemePalette = undefined;
  groupLabels = ['Group Chip #1', 'Group Chip #2', 'Group Chip #3'];

  labelLongFormat = false;

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

import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from "@angular/material/core";
import { LuxChipsAcOrientation } from "../../../modules/lux-form/lux-chips-ac/lux-chips-ac.component";
import { logResult, setRequiredValidatorForFormControl } from '../../example-base/example-base-util/example-base-helper';

@Component({
  selector: 'lux-chip-authentic-example',
  templateUrl: './chip-authentic-example.component.html'
})
export class ChipAuthenticExampleComponent {
  // region Helper-Properties für das Beispiel

  showOutputEvents = false;
  log = logResult;

  colors = ['Keine Farbe', 'warn', 'accent', 'primary'];

  chips: { label: string; color: ThemePalette; removable: boolean; disabled: boolean; selected: boolean }[] = [
    { label: 'Chip #1', color: undefined, removable: true, disabled: false, selected: true },
    { label: 'Chip #2', color: 'primary', removable: true, disabled: false, selected: true },
    { label: 'Chip #3', color: 'warn', removable: true, disabled: false, selected: true },
    { label: 'Chip #4', color: 'accent', removable: true, disabled: false, selected: true }
  ];

  openedPanel: number;
  longOpitionLabel =
    'Lorem ipsum dolor \n sit amet consectetur adipisicing elit. Nulla officiis consectetur natus id iusto asperiores cum eum sint esse in?';
  // endregion

  // region Properties der Component

  disabled = false;
  inputAllowed = true;
  inputLabel = 'Neu';
  placeholder = 'eingeben oder auswählen';
  chipOrientation: LuxChipsAcOrientation = 'horizontal';
  autocomplete = true;
  autocompleteOptions = ['Neuer Chip #1', 'Neuer Chip #2', 'Neuer Chip #3', this.longOpitionLabel];
  autocompleteNoGroupAllOptions = ['Neuer Chip #1', 'Neuer Chip #2', 'Neuer Chip #3'];
  autocompleteNoGroupOptions = [...this.autocompleteNoGroupAllOptions];
  multiple = true;
  optionMultiline = false;

  strict = false;
  required = false;
  form: FormGroup;
  controlBinding = 'names';
  requiredValidatorFn = Validators.required;

  groupSelected = true;
  groupRemovable = true;
  groupDisabled = false;
  groupColor: ThemePalette = undefined;
  groupLabels = ['Group Chip #1', 'Group Chip #2', 'Group Chip #3'];

  labelLongFormat = false;

  // endregion

  constructor() {
    this.form = new FormGroup({
      names: new FormControl(null)
    });
  }

  chipAdded($event: string) {
    const add = !this.strict || (this.strict && this.shouldAddChip($event));

    if (add) {
      this.chips.push({
        label: $event,
        color: 'warn',
        removable: true,
        disabled: false,
        selected: true
      });
      this.log(this.showOutputEvents, `Der Chip "${$event}" wurde hinzugefügt.`);

      this.updateChipOptions();
    } else {
      if (this.hasChip($event)) {
        this.log(this.showOutputEvents, `Der Chip "${$event}" ist bereits ausgewählt.`);
      } else {
        this.log(
          this.showOutputEvents,
          `Der Chip "${$event}" kann nicht hinzugefügt werden, da dieser nicht Teil der Optionen ist (siehe luxStrict).`
        );
      }
    }
  }

  chipRemoved($event: number) {
    this.chips = this.chips.filter((value: any, index: number) => index !== $event);
    this.log(this.showOutputEvents, `Der Chip "${$event}" wurde entfernt.`);
    this.updateChipOptions();
  }

  changeRequired($event: boolean) {
    this.required = $event;
    setRequiredValidatorForFormControl($event, this.form, this.controlBinding);
  }

  private hasChip(newChip: string): boolean {
    const selectedChips = this.chips.map((chip) => chip.label);

    return !!selectedChips.find((chip) => chip === newChip);
  }

  private shouldAddChip(newChip: string): boolean {
    const selectedChips = this.chips.map((chip) => chip.label);
    const found = this.autocomplete ? !!this.autocompleteNoGroupAllOptions.find((option) => option === newChip) : true;
    const foundLabel = !!selectedChips.find((label) => label === newChip);

    return found && !foundLabel;
  }

  private updateChipOptions() {
    const selectedChips = this.chips.map((chip) => chip.label);
    this.autocompleteNoGroupOptions = this.autocompleteNoGroupAllOptions.filter((option) => !selectedChips.includes(option));
  }
}

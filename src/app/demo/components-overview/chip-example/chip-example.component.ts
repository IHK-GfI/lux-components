import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { LuxChipsOrientation } from '../../../modules/lux-form/lux-chips/lux-chips.component';
import { logResult, setRequiredValidatorForFormControl } from '../../example-base/example-base-util/example-base-helper';

@Component({
  selector: 'app-chip-example',
  templateUrl: './chip-example.component.html'
})
export class ChipExampleComponent {
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

  openedPanel = 0;
  longOptionLabel =
    'Lorem ipsum dolor \n sit amet consectetur adipisicing elit. Nulla officiis consectetur natus id iusto asperiores cum eum sint esse in?';
  // endregion

  // region Properties der Component

  disabled = false;
  inputAllowed = true;
  inputLabel = 'Neu';
  placeholder = 'eingeben oder auswählen';
  chipOrientation: LuxChipsOrientation = 'horizontal';
  autocomplete = true;
  autocompleteOptions = ['Neuer Chip #1', 'Neuer Chip #2', 'Neuer Chip #3', this.longOptionLabel];
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

  chipAdded(newChip: string) {
    const add = !this.strict || (this.strict && this.shouldAddChip(newChip));

    if (add) {
      this.chips.push({
        label: newChip,
        color: 'warn',
        removable: true,
        disabled: false,
        selected: true
      });
      this.log(this.showOutputEvents, `Der Chip "${newChip}" wurde hinzugefügt.`);

      this.updateChipOptions();
    } else {
      if (this.hasChip(newChip)) {
        this.log(this.showOutputEvents, `Der Chip "${newChip}" ist bereits ausgewählt.`);
      } else {
        this.log(
          this.showOutputEvents,
          `Der Chip "${newChip}" kann nicht hinzugefügt werden, da dieser nicht Teil der Optionen ist (siehe luxStrict).`
        );
      }
    }
  }

  chipRemoved(chipIndex: number) {
    this.chips = this.chips.filter((value: any, index: number) => index !== chipIndex);
    this.log(this.showOutputEvents, `Der Chip "${chipIndex}" wurde entfernt.`);
    this.updateChipOptions();
  }

  changeRequired(required: boolean) {
    this.required = required;
    setRequiredValidatorForFormControl(required, this.form, this.controlBinding);
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

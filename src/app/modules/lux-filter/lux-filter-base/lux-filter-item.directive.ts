import { Directive, ElementRef, Input, OnChanges, OnInit, Optional, Renderer2, SimpleChanges } from '@angular/core';
import { ThemePalette } from "@angular/material/core";
import { LuxDateTimePickerComponent } from '../../lux-form/lux-datetimepicker/lux-datetimepicker.component';
import { LuxFormSelectableBase } from "../../lux-form/lux-form-model/lux-form-selectable-base.class";
import { LuxLookupComponent } from "../../lux-lookup/lux-lookup-model/lux-lookup-component";
import { LuxFilterItem } from './lux-filter-item';
import { LuxInputComponent } from '../../lux-form/lux-input/lux-input.component';
import { LuxDatepickerComponent } from '../../lux-form/lux-datepicker/lux-datepicker.component';
import { LuxToggleComponent } from '../../lux-form/lux-toggle/lux-toggle.component';
import { LuxSelectComponent } from '../../lux-form/lux-select/lux-select.component';
import { LuxFormComponentBase } from '../../lux-form/lux-form-model/lux-form-component-base.class';
import { LuxAutocompleteComponent } from '../../lux-form/lux-autocomplete/lux-autocomplete.component';
import { LuxCheckboxComponent } from '../../lux-form/lux-checkbox/lux-checkbox.component';
import { LuxLookupComboboxComponent } from '../../lux-lookup/lux-lookup-combobox/lux-lookup-combobox.component';
import { LuxLookupAutocompleteComponent } from '../../lux-lookup/lux-lookup-autocomplete/lux-lookup-autocomplete.component';

@Directive({
  selector: '[luxFilterItem]'
})
export class LuxFilterItemDirective implements OnInit, OnChanges {
  filterItem: LuxFilterItem<any>;

  @Input() luxFilterColor: ThemePalette = undefined;
  @Input() luxFilterDefaultValues = [...LuxFilterItem.DEFAULT_VALUES];
  @Input() luxFilterRenderFn = undefined;
  @Input() luxFilterHidden = false;
  @Input() luxFilterDisabled = false;

  constructor(
    @Optional() public input: LuxInputComponent,
    @Optional() public autoComplete: LuxAutocompleteComponent,
    @Optional() public autoCompleteLookup: LuxLookupAutocompleteComponent,
    @Optional() public datepicker: LuxDatepickerComponent,
    @Optional() public datetimepicker: LuxDateTimePickerComponent,
    @Optional() public toggle: LuxToggleComponent,
    @Optional() public checkbox: LuxCheckboxComponent,
    @Optional() public select: LuxSelectComponent,
    @Optional() public selectLookup: LuxLookupComboboxComponent,
    private elRef: ElementRef,
    private renderer: Renderer2
  ) {
    let formComponent: LuxFormComponentBase;
    if (this.input) {
      formComponent = this.input;
    } else if (this.datepicker) {
      formComponent = this.datepicker;
    } else if (this.datetimepicker) {
      formComponent = this.datetimepicker;
    } else if (this.toggle) {
      formComponent = this.toggle;
    } else if (this.checkbox) {
      formComponent = this.checkbox;
    } else if (this.select) {
      formComponent = this.select;
    } else if (this.autoComplete) {
      formComponent = this.autoComplete;
    } else if (this.autoCompleteLookup) {
      formComponent = this.autoCompleteLookup;
    } else if (this.selectLookup) {
      formComponent = this.selectLookup;
    } else {
      throw Error(`Die verwendete Formularkomponente ist unbekannt!`);
    }

    this.filterItem = new LuxFilterItem<any>(formComponent.luxLabel, formComponent.luxControlBinding, formComponent);
  }

  ngOnInit(): void {
    this.filterItem.color = this.luxFilterColor;
    this.filterItem.defaultValues = this.luxFilterDefaultValues;
    this.filterItem.value = this.luxFilterDefaultValues[0];
    this.filterItem.component.formControl.setValue(this.filterItem.value);
    this.filterItem.hidden = this.luxFilterHidden;
    this.filterItem.disabled = this.luxFilterDisabled;

    if (this.luxFilterRenderFn) {
      this.filterItem.renderFn = this.luxFilterRenderFn;
    } else {
      if (
        this.filterItem.component instanceof LuxToggleComponent ||
        this.filterItem.component instanceof LuxCheckboxComponent
      ) {
        this.filterItem.renderFn = this.renderToggleFn;
      } else if (this.filterItem.component instanceof LuxDatepickerComponent) {
        this.filterItem.renderFn = this.renderDateFn;
      } else if (this.filterItem.component instanceof LuxDateTimePickerComponent) {
        this.filterItem.renderFn = this.renderDateTimeFn;
      } else if (
        this.filterItem.component instanceof LuxSelectComponent ||
        this.filterItem.component instanceof LuxAutocompleteComponent ||
        this.filterItem.component instanceof LuxLookupComboboxComponent ||
        this.filterItem.component instanceof LuxLookupAutocompleteComponent
      ) {
        this.filterItem.renderFn = this.renderLabelFn;
      } else {
        this.filterItem.renderFn = this.renderIdentityFn;
      }
    }

    this.updateHiddenState(this.luxFilterHidden);
    this.updateDisabledState(this.luxFilterDisabled);
  }

  private updateHiddenState(hidden: boolean) {
    if (this.filterItem) {
      // Wenn ein Filterelement ausgeblendet wird, wird es zusätzlich deaktiviert,
      // um es in der Filterkomponente leichter behandeln zu können. An die CSS-Klasse 'lux-display-none'
      // kommt man dynamisch nicht so einfach heran.
      if (hidden) {
        this.renderer.addClass(this.elRef.nativeElement, 'lux-display-none-important');
        this.filterItem.component.formControl.disable();
      } else {
        this.renderer.removeClass(this.elRef.nativeElement, 'lux-display-none-important');
        this.filterItem.component.formControl.enable();
      }
    }
  }

  private updateDisabledState(disabled: boolean) {
    if (this.filterItem) {
      if (disabled) {
        this.filterItem.component.formControl.disable();
      } else {
        this.filterItem.component.formControl.enable();
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.filterItem) {
      if (this.filterItem.component && changes && changes.luxFilterHidden) {
        this.updateHiddenState(changes[ 'luxFilterHidden' ].currentValue);
      } else if (this.filterItem.component && changes && changes.luxFilterDisabled) {
        this.updateDisabledState(changes[ 'luxFilterDisabled' ].currentValue);
      }
    }
  }

  renderLabelFn<T>(filterItem: LuxFilterItem<T>, value: T) {
    if (typeof value === 'string') {
      return value;
    } else if (typeof value === "object" &&
               (filterItem.component instanceof LuxFormSelectableBase || filterItem.component instanceof LuxAutocompleteComponent)) {
      return (value as any)[filterItem.component.luxOptionLabelProp];
    } else if (filterItem.component instanceof  LuxLookupComponent) {
      return filterItem.component.getLabel(value);
    } else {
      return value;
    }
  }

  renderDateFn<T>(filterItem: LuxFilterItem<T>) {
    return (filterItem.component as LuxDatepickerComponent).datepickerInput.nativeElement.value;
  }

  renderDateTimeFn<T>(filterItem: LuxFilterItem<T>) {
    return (filterItem.component as LuxDateTimePickerComponent).dateTimePickerInputEl.nativeElement.value;
  }

  renderToggleFn<T>(filterItem: LuxFilterItem<T>, value: any) {
    return value ? 'an' : 'aus';
  }

  renderIdentityFn<T>(filterItem: LuxFilterItem<T>, value: any) {
    return value;
  }
}

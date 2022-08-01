import { ThemePalette } from "@angular/material/core";
import { LuxFormComponentBase } from '../../lux-form/lux-form-model/lux-form-component-base.class';

export class LuxFilterItem<T> {
  public static DEFAULT_VALUES = [undefined, null, false, ''];

  label: string;
  binding: string;
  component: LuxFormComponentBase;
  defaultValues: any[] = [...LuxFilterItem.DEFAULT_VALUES];
  value: T = this.defaultValues[0];
  color: ThemePalette = undefined;
  disabled = false;
  hidden = false;
  multiValueIndex = -1;
  renderFn: (filter: LuxFilterItem<T>, value: T) => string = (filterItem: LuxFilterItem<T>, value: any) => value;

  constructor(label: string, binding: string, component: LuxFormComponentBase) {
    this.label = label;
    this.binding = binding;
    this.component = component;
  }
}

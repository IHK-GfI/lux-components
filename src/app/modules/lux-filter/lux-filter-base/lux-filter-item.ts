import { LuxFormComponentBase } from '../../lux-form/lux-form-model/lux-form-component-base.class';
import { LuxThemePalette } from '../../lux-util/lux-colors.enum';

export class LuxFilterItem<T = any> {
  public static DEFAULT_VALUES = [undefined, null, false, ''];

  label: string;
  binding: string;
  component: LuxFormComponentBase<T>;
  defaultValues: any[] = [...LuxFilterItem.DEFAULT_VALUES];
  value: T = this.defaultValues[0];
  color: LuxThemePalette = undefined;
  disabled = false;
  hidden = false;
  multiValueIndex = -1;
  renderFn: (filter: LuxFilterItem<T>, value: T) => string = (filterItem: LuxFilterItem<T>, value: any) => value;

  constructor(label: string, binding: string, component: LuxFormComponentBase<T>) {
    this.label = label;
    this.binding = binding;
    this.component = component;
  }
}

import { LuxFormComponentBase } from '../../lux-form/lux-form-model/lux-form-component-base.class';

export class LuxFilterItem {
  label: string;
  binding: string;
  component: LuxFormComponentBase;
  value: any;
  defaultValues: any[];
  color: string;
  disabled: boolean;
  hidden: boolean;
  renderFn: (filter: LuxFilterItem, value: any) => string;
}

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'example-form-value',
  templateUrl: './example-form-value.component.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class ExampleFormValueComponent {
  @Input() showValue = true;
  @Input() form!: FormGroup<any>;
  @Input() controlBinding!: string;
  @Input() suffix = '';
}

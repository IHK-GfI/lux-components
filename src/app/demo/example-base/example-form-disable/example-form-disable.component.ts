import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'example-form-disable',
  templateUrl: './example-form-disable.component.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class ExampleFormDisableComponent {
  @Input() form!: FormGroup<any>;
  @Input() controlBinding!: string;
  @Output() disabledChange = new EventEmitter<boolean>();

  _disabled = false;

  get disabled(): boolean {
    return this._disabled;
  }

  @Input() set disabled(disabled: boolean) {
    this._disabled = disabled;

    this.disabledChange.emit(this._disabled);
  }
}

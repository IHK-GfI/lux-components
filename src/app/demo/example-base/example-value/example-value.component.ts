import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'example-value',
  templateUrl: './example-value.component.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class ExampleValueComponent {
  @Input() value: any;
  @Input() suffix = '';
}

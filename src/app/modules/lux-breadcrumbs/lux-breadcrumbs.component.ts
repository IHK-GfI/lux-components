import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ILuxBreadcrumbsEntry } from './lux-breadcrumbs-model/lux-breadcrumbs-entry.interface';

@Component({
  selector: 'lux-breadcrumbs',
  templateUrl: './lux-breadcrumbs.component.html',
  styleUrls: ['./lux-breadcrumbs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LuxBreadcrumbsComponent {
  @Input()
  luxEntries?: ILuxBreadcrumbsEntry[] = [];

  @Input()
  luxEmitEntry?: boolean = false;

  @Output()
  luxClicked: EventEmitter<ILuxBreadcrumbsEntry> = new EventEmitter();

  constructor() {}

  clicked(item: ILuxBreadcrumbsEntry) {
    this.luxClicked.emit(item);
  }
}

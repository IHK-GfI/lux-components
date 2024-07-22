import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ILuxBreadcrumbsEntry } from './lux-breadcrumbs-model/lux-breadcrumbs-entry.interface';

@Component({
  selector: 'lux-breadcrumbs',
  templateUrl: './lux-breadcrumbs.component.html',
  styleUrls: ['./lux-breadcrumbs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LuxBreadcrumbsComponent {
  @Input()
  luxEntries?: ILuxBreadcrumbsEntry [] = [];

  constructor() {

   }

}

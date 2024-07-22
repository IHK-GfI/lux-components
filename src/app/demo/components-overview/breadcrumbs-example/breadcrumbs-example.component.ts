import { Component, OnInit } from '@angular/core';
import { ILuxBreadcrumbsEntry } from 'src/app/modules/lux-breadcrumbs/lux-breadcrumbs-model/lux-breadcrumbs-entry.interface';

@Component({
  selector: 'lux-breadcrumbs-example',
  templateUrl: './breadcrumbs-example.component.html',
  styleUrls: ['./breadcrumbs-example.component.scss']
})
export class BreadcrumbsExampleComponent {
  public entries: ILuxBreadcrumbsEntry[] = [
    { name: 'Startseite', url: '/home' },
    { name: 'Komponenten', url: '/components-overview' },
    { name: 'lux-breadcrumbs', url: '' }
  ];

  constructor() {}

  updateView() {
    this.entries = [...this.entries];
  }
}

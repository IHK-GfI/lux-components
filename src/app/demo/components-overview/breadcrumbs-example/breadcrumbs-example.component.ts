import { Component, OnInit } from '@angular/core';
import { ILuxBreadcrumbsEntry } from 'src/app/modules/lux-breadcrumbs/lux-breadcrumbs-model/lux-breadcrumbs-entry.interface';

@Component({
  selector: 'lux-breadcrumbs-example',
  templateUrl: './breadcrumbs-example.component.html'
})
export class BreadcrumbsExampleComponent {
  public entries: ILuxBreadcrumbsEntry[] = [
    { name: 'Startseite', url: '/home' },
    { name: 'Komponenten', url: '/components-overview' },
    { name: 'lux-breadcrumbs', url: '' }
  ];

  public toggleEntryEvent: boolean = false;

  public clickedEntry?: ILuxBreadcrumbsEntry;

  constructor() {}

  updateView() {
    this.entries = [...this.entries];
  }

  addEntry() {
    let newEntry = {
      name: '',
      url: ''
    };
    this.entries.push(newEntry);
  }

  onClickedEntry(entry: ILuxBreadcrumbsEntry) {
    this.clickedEntry = entry;
  }
}

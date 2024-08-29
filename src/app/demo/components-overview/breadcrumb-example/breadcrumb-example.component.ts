import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ILuxBreadcrumbEntry } from 'src/app/modules/lux-breadcrumb/lux-breadcrumb-model/lux-breadcrumb-entry.interface';

@Component({
  selector: 'lux-breadcrumb-example',
  templateUrl: './breadcrumb-example.component.html'
})
export class BreadcrumbExampleComponent {
  public entries: ILuxBreadcrumbEntry[] = [
    { name: 'Startseite', url: '/home' },
    { name: 'Komponenten', url: '/components-overview' },
    { name: 'lux-breadcrumb', url: '' }
  ];

  public enableUrl: boolean = false;

  public clickedEntry?: ILuxBreadcrumbEntry;

  currentArea?: string = 'Übersicht' ;

  entriesExample: ILuxBreadcrumbEntry[] = [{name: 'Übersicht', url: 'Übersicht'}];

  constructor(public router: Router) {}

  updateView() {
    this.entries = [...this.entries];
  }

  addEntry() {
    let newEntry = {
      name: '',
      url: ''
    };
    this.entries = [...this.entries,newEntry];
  }

  onClickedEntry(entry: ILuxBreadcrumbEntry) {
    this.clickedEntry = entry;

    this.entries = this.entries.slice( 0 , this.entries.findIndex((e) => e.name === entry.name) + 1 );

    if (this.enableUrl && entry.url) {
      this.router.navigate([entry.url]);
    }
  }

  onBreadcrumbClick(entry: ILuxBreadcrumbEntry) {
    this.currentArea = entry.url;
    this.entriesExample = this.entriesExample.slice( 0 , this.entriesExample.findIndex((e) => e.name === entry.name) + 1 );
  }

  onSwitchArea(area: string) {
    this.currentArea = area;
    let newEntry = {
      name: area,
      url: area
    };

    this.entriesExample = [...this.entriesExample,newEntry];
  }

}

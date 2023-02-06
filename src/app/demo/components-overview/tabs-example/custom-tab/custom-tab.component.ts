import { AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { LuxTabComponent } from '../../../../modules/lux-layout/lux-tabs/lux-tabs-subcomponents/lux-tab.component';

@Component({
  selector: 'custom-tab',
  templateUrl: './custom-tab.component.html',
  providers: [{ provide: LuxTabComponent, useExisting: CustomTabComponent }]
})
export class CustomTabComponent extends LuxTabComponent implements OnInit, AfterViewInit {
  @ViewChild(TemplateRef) myContentTemplate!: TemplateRef<any>;

  constructor(public elementRef: ElementRef) {
    super();
  }

  ngOnInit() {
    this.luxTitle = 'Beispiel 3';
    this.luxTagIdHeader = 'tab-beispiel3-header';
    this.luxTagIdContent = 'tab-beispiel3-content';
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.contentTemplate = this.myContentTemplate;
    });
  }
}

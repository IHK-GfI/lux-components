import { AfterViewInit, Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';

@Component({
  selector: 'lux-detail-wrapper',
  template: '<ng-container *ngTemplateOutlet="luxDetailTemplate; context: luxDetailContext"></ng-container>'
})
export class LuxDetailWrapperComponent implements AfterViewInit {
  private _luxDetailTemplate: TemplateRef<any>;

  @Output() luxDetailRendered: EventEmitter<void> = new EventEmitter();

  @Input() luxDetailContext;

  @Input() set luxDetailTemplate(ref: TemplateRef<any>) {
    this._luxDetailTemplate = ref;
  }

  get luxDetailTemplate(): TemplateRef<any> {
    return this._luxDetailTemplate;
  }

  constructor() {}

  ngAfterViewInit() {
    this.luxDetailRendered.emit();
  }
}

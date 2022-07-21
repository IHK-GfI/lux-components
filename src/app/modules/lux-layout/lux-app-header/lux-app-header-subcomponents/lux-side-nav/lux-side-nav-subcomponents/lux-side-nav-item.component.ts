import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  QueryList,
  TemplateRef,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'lux-side-nav-item',
  templateUrl: './lux-side-nav-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LuxSideNavItemComponent implements AfterViewInit, OnChanges {
  @ViewChild(TemplateRef) templateRef: TemplateRef<any>;

  @Input() luxLabel: string;
  @Input() luxDisabled = false;
  @Input() luxTagId: string | null = null;
  @Input() luxSelected = false;
  @Input() luxCloseOnClick = true;
  @Input() luxIconName: string;
  @Input() luxExpandable = false;
  @Input() luxExpanded = true;

  @Output() luxClicked: EventEmitter<any> = new EventEmitter();

  @ContentChildren(LuxSideNavItemComponent) sideNavItems: QueryList<LuxSideNavItemComponent>;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges() {
    // Bei Input Änderungen die CD anstossen
    this.cdr.detectChanges();
  }

  ngAfterViewInit() {
    // Nach Abschluss der Initialisierung die CD anstossen
    this.cdr.detectChanges();
  }

  onClick($event) {
    this.luxClicked.emit($event);
    if (this.luxExpandable) {
      this.luxExpanded = !this.luxExpanded;
    }
  }
}

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  forwardRef,
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
  @ViewChild(TemplateRef) templateRef?: TemplateRef<any>;

  @Input() luxLabel?: string;
  @Input() luxDisabled = false;
  @Input() luxTagId?: string;
  @Input() luxSelected = false;
  @Input() luxCloseOnClick = true;
  @Input() luxIconName?: string;
  @Input() luxExpandable = false;
  @Input() luxExpanded = true;

  @Output() luxClicked = new EventEmitter<Event>();

  /* eslint-disable-next-line @angular-eslint/no-forward-ref */
  @ContentChildren(forwardRef(() => LuxSideNavItemComponent)) sideNavItems!: QueryList<LuxSideNavItemComponent>;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges() {
    // Bei Input Änderungen die CD anstossen
    this.cdr.detectChanges();
  }

  ngAfterViewInit() {
    // Nach Abschluss der Initialisierung die CD anstossen
    this.cdr.detectChanges();
  }

  onClick(event: Event) {
    this.luxClicked.emit(event);
    if (this.luxExpandable) {
      this.luxExpanded = !this.luxExpanded;
    }
  }
}

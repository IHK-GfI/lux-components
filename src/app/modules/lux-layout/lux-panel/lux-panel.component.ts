import {
  AfterViewInit,
  Component,
  EventEmitter,
  Host,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  SkipSelf,
  ViewChild
} from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { LuxUtil } from '../../lux-util/lux-util';
import { LuxAccordionComponent } from '../lux-accordion/lux-accordion.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lux-panel',
  templateUrl: './lux-panel.component.html',
  styleUrls: ['./lux-panel.component.scss']
})
export class LuxPanelComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() luxDisabled?: boolean;
  @Input() luxExpanded = false;
  @Input() luxHideToggle?: boolean;

  @Input() luxCollapsedHeaderHeight?: string;
  @Input() luxExpandedHeaderHeight?: string;

  @Output() luxOpened = new EventEmitter<void>();
  @Output() luxClosed = new EventEmitter<void>();
  @Output() luxExpandedChange: EventEmitter<boolean> = new EventEmitter();

  @ViewChild(MatExpansionPanel, { static: true }) matExpansionPanel!: MatExpansionPanel;

  @HostBinding('class.lux-pr-1') pr1 = true;
  @HostBinding('class.lux-pl-1') pl1 = true;

  subscription?: Subscription;

  constructor(@Optional() @Host() @SkipSelf() private parent: LuxAccordionComponent) {}

  ngOnInit() {
    if (this.parent) {
      if (this.luxHideToggle === undefined) {
        this.luxHideToggle = this.parent.luxHideToggle;
      }
      if (this.luxDisabled === undefined) {
        this.luxDisabled = this.parent.luxDisabled;
      }
      if (this.luxExpandedHeaderHeight === undefined) {
        this.luxExpandedHeaderHeight = this.parent.luxExpandedHeaderHeight;
      }
      if (this.luxCollapsedHeaderHeight === undefined) {
        this.luxCollapsedHeaderHeight = this.parent.luxCollapsedHeaderHeight;
      }

      // Um eine zyklische Abhängigkeit mit dem lux-accordion zu vermeiden,
      // wurde hier ein Event verwendet.
      this.subscription = this.parent.changed$.subscribe((propertyName) => {
        if (propertyName === 'luxHideToggle') {
          this.luxHideToggle = this.parent.luxHideToggle;
        } else if (propertyName === 'luxDisabled') {
          this.luxDisabled = this.parent.luxDisabled;
        } else if (propertyName === 'luxExpandedHeaderHeight') {
          this.luxExpandedHeaderHeight = this.parent.luxExpandedHeaderHeight;
        } else if (propertyName === 'luxCollapsedHeaderHeight') {
          this.luxCollapsedHeaderHeight = this.parent.luxCollapsedHeaderHeight;
        }
      });
    }
  }

  ngAfterViewInit() {
    LuxUtil.assertNonNull('matExpansionPanel', this.matExpansionPanel);

    if (this.parent) {
      // Diese Zeile wird benötigt, damit der Multi-Mode (nur ein Abschnitt darf geöffnet sein)
      // des Accordions funktioniert. Die Zuweisung des übergeordneten Accordions an dieses Panel
      // muss einen Zyklus später stattfinden, um einen ExpressionChangedAfterItHasBeenCheckedError
      // zu vermeiden.
      setTimeout(() => {
        this.matExpansionPanel.accordion = this.parent.matAccordion;
      });
    }
  }

  ngOnDestroy() {
    if (this.parent && this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onOpened() {
    this.luxOpened.emit();
    this.luxExpanded = true;
    this.luxExpandedChange.emit(this.luxExpanded);
  }

  onClosed() {
    this.luxClosed.emit();
    this.luxExpanded = false;
    this.luxExpandedChange.emit(this.luxExpanded);
  }
}

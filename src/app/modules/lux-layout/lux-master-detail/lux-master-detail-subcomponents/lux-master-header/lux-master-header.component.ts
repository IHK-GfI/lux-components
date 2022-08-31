import { Component, EventEmitter, HostBinding, Input, OnDestroy, Output } from '@angular/core';
import { LuxMasterDetailMobileHelperService } from '../../lux-master-detail-mobile-helper.service';
import { LuxButtonComponent } from '../../../../lux-action/lux-button/lux-button.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lux-master-header',
  templateUrl: './lux-master-header.component.html',
  styleUrls: ['./lux-master-header.component.scss']
})
export class LuxMasterHeaderComponent implements OnDestroy {
  iconName?: string;
  open?: boolean;
  subscription: Subscription;

  @Input() luxToggleHidden?: boolean;
  @Output() luxClicked: EventEmitter<any> = new EventEmitter();

  @HostBinding('class.lux-no-toggle') isMobile?: boolean;

  constructor(private masterDetailMobileHelperService: LuxMasterDetailMobileHelperService) {
    this.subscription = this.masterDetailMobileHelperService.masterCollapsedObservable.subscribe((isOpen: boolean) => {
      if (this.masterDetailMobileHelperService.isMobile()) {
        this.iconName = 'keyboard_arrow_right';
      } else {
        if (isOpen) {
          this.iconName = 'keyboard_arrow_left';
        } else {
          this.iconName = 'keyboard_arrow_right';
        }
      }
      this.open = isOpen;
      this.isMobile = this.luxToggleHidden;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getAriaLabelForOpenCloseButton(iconName?: string): string {
    if (iconName === 'keyboard_arrow_left') {
      return $localize `:@@luxc.master-detail.header.close.btn:Masterliste zuklappen`;
    } else {
      return $localize `:@@luxc.master-detail.header.open.btn:Masterliste aufklappen`;
    }
  }

  clicked(that: LuxButtonComponent) {
    if (this.open) {
      this.masterDetailMobileHelperService.closeMaster();
    } else {
      this.masterDetailMobileHelperService.openMaster();
    }
    this.luxClicked.emit(this.open);
    that.elementRef.nativeElement.focus();
  }
}

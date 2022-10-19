import { Component, EventEmitter, HostBinding, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { LuxButtonComponent } from '../../../lux-action/lux-button/lux-button.component';
import { LuxMediaQueryObserverService } from '../../../lux-util/lux-media-query-observer.service';

@Component({
  selector: 'lux-master-header-light',
  templateUrl: './lux-master-header-light.component.html',
  styleUrls: ['./lux-master-header-light.component.scss']
})
export class LuxMasterHeaderLightComponent implements OnDestroy {
  iconName?: string;
  open?: boolean;
  subscription: Subscription;

  @Input() luxToggleHidden?: boolean;
  @Output() luxOpened = new EventEmitter<boolean>();

  @HostBinding('class.lux-no-toggle') isMobile?: boolean;

  constructor(private mediaObserver: LuxMediaQueryObserverService) {
    this.isMobile = this.mediaObserver.isXS() || this.mediaObserver.isSM();
    this.open = true;

    this.subscription = this.mediaObserver.getMediaQueryChangedAsObservable().subscribe(() => {
      setTimeout(() => {
        this.isMobile = this.mediaObserver.isXS() || this.mediaObserver.isSM();
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getAriaLabelForOpenCloseButton(iconName?: string): string {
    if (iconName === 'lux-interface-arrows-button-left') {
      return $localize`:@@luxc.master-detail.header.close.btn:Masterliste zuklappen`;
    } else {
      return $localize`:@@luxc.master-detail.header.open.btn:Masterliste aufklappen`;
    }
  }

  clicked(that: LuxButtonComponent) {
    // if (this.open) {
    //   this.masterDetailMobileHelperService.closeMaster();
    // } else {
    //   this.masterDetailMobileHelperService.openMaster();
    // }
    // this.luxOpened.emit(!!this.open);
    // that.elementRef.nativeElement.focus();
  }
}

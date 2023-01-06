import { Component, ElementRef, EventEmitter, HostBinding, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { LuxButtonComponent } from '../../../lux-action/lux-button/lux-button.component';
import { LuxMediaQueryObserverService } from '../../../lux-util/lux-media-query-observer.service';

@Component({
  selector: 'lux-master-header-ac',
  templateUrl: './lux-master-header-ac.component.html'
})
export class LuxMasterHeaderAcComponent implements OnDestroy {
  iconName?: string = 'lux-interface-arrows-button-left';
  open?: boolean;
  subscription: Subscription;

  @Input() luxToggleHidden?: boolean;
  @Output() luxOpened = new EventEmitter<boolean>();
  
  @ViewChild('headerContentContainer', { read: ElementRef, static: true }) headerContentContainer!:  ElementRef;
  
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
    if (this.iconName === 'lux-interface-arrows-button-left') {
      this.iconName ='lux-interface-arrows-button-right';
      this.open = false;
    } else {
      this.iconName = 'lux-interface-arrows-button-left';
      this.open = true;
    }

    this.luxOpened.emit(!!this.open);
  }
}

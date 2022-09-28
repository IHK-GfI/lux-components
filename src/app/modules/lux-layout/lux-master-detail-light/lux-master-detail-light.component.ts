import { Component, ContentChild, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { LuxMediaQueryObserverService } from '../../lux-util/lux-media-query-observer.service';
import { LuxDetailContentLightComponent } from './lux-detail-content-light/lux-detail-content-light.component';
import { LuxDetailHeaderLightComponent } from './lux-detail-header-light/lux-detail-header-light.component';
import { LuxMasterContentLightComponent } from './lux-master-content-light/lux-master-content-light.component';
import { LuxMasterHeaderLightComponent } from './lux-master-header-light/lux-master-header-light.component';
import { LuxMasterFooterLightComponent } from './lux-master-footer-light/lux-master-footer-light.component';
import { animate, style, transition, trigger, query, group } from '@angular/animations';

const left = [
  query(':enter, :leave', style({ width: '100%', height: '100%' }), { optional: true }),
  group([
    query(':enter', [style({ transform: 'translateX(-100%)' }), animate('.3s cubic-bezier(0.35, 0, 0.25, 1)', style({ transform: 'translateX(0%)' }))], {
      optional: true,
    }),
    query(':leave', [style({ transform: 'translateX(0%)' }), animate('.3s cubic-bezier(0.35, 0, 0.25, 1)', style({ transform: 'translateX(100%)', opacity: 0 }))], {
      optional: true,
    }),
  ]),
];

const right = [
  query(':enter, :leave', style({ width: '100%', height: '100%' }), { optional: true }),
  group([
    query(':enter', [style({ transform: 'translateX(100%)' }), animate('.3s cubic-bezier(0.35, 0, 0.25, 1)', style({ transform: 'translateX(0%)' }))], {
      optional: true,
    }),
    query(':leave', [style({ transform: 'translateX(0%)' }), animate('.3s cubic-bezier(0.35, 0, 0.25, 1)', style({ transform: 'translateX(-100%)', opacity: 0 }))], {
      optional: true,
    }),
  ]),
];
@Component({
  selector: 'lux-master-detail-light',
  animations: [ 
    trigger('toggleMaster', [
      transition(':increment', right),
      transition(':decrement', left),
    ])
  ],
  templateUrl: './lux-master-detail-light.component.html',
  styleUrls: ['./lux-master-detail-light.component.scss']
})
export class LuxMasterDetailLightComponent implements OnDestroy {
  @ContentChild(LuxMasterHeaderLightComponent) masterHeader: LuxMasterHeaderLightComponent;
  @ContentChild(LuxMasterContentLightComponent) masterContent: LuxMasterContentLightComponent;
  @ContentChild(LuxMasterFooterLightComponent) masterFooter: LuxMasterFooterLightComponent;
  @ContentChild(LuxDetailHeaderLightComponent) detailHeader: LuxDetailHeaderLightComponent;
  @ContentChild(LuxDetailContentLightComponent) detailContent: LuxDetailContentLightComponent;
  
  iconName = 'lux-interface-arrows-button-left'; // icon für den MasterToggleButton
  //luxToggleHidden = false; //Relikt ?!
  luxMasterOpen = true; //Master geöffnet
  counter = 1; // wird für die Animation benötigt
  isExpanded = true; // Master ist expanded

  //wichtig für mobile Ansicht dort ist immer nur eins sichtbar
  showMaster = true; 
  
  isMobile: boolean;
  private subscription: Subscription;

  constructor(private mediaObserver: LuxMediaQueryObserverService) {
    this.subscription = this.mediaObserver.getMediaQueryChangedAsObservable().subscribe(() => {
      setTimeout(() => {
        this.isMobile = this.mediaObserver.isXS() || this.mediaObserver.isSM();
      });
    });
  }

  ngOnDestroy(): void {
    console.log('LuxMasterDetailMobileHelperService.ngOnDestroy called');
    this.subscription.unsubscribe();
  }

  toggleMaster() { // wenn der Master geschlossen oder geöffnet wird
    console.log("Toggel-Master-Button clicked", this.luxMasterOpen);
    this.isExpanded = !this.isExpanded;
    if(this.isExpanded) {
      this.counter--;
      this.iconName = 'lux-interface-arrows-button-left';
    } else {
      this.counter++;
      this.iconName = 'lux-interface-arrows-button-right';
    }
  }

  getAriaLabelForOpenCloseButton(iconName: string) {
    if (this.iconName === 'lux-interface-arrows-button-left') {
      return $localize `:@@luxc.master-detail.header.close.btn:Masterliste zuklappen`;
    } else {
      return $localize `:@@luxc.master-detail.header.open.btn:Masterliste aufklappen`;
    }
  }
  // für die Mobile Ansicht, um von der Detail-Ansicht zum Master zurück zu kommen
  toggleMobileView() {
    this.showMaster = !this.showMaster;
  }
}

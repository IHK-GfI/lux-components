import { Component, ContentChild, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { LuxMediaQueryObserverService } from '../../lux-util/lux-media-query-observer.service';
import { LuxDetailContentLightComponent } from './lux-detail-content-light/lux-detail-content-light.component';
import { LuxDetailHeaderLightComponent } from './lux-detail-header-light/lux-detail-header-light.component';
import { LuxMasterContentLightComponent } from './lux-master-content-light/lux-master-content-light.component';
import { LuxMasterHeaderLightComponent } from './lux-master-header-light/lux-master-header-light.component';

@Component({
  selector: 'lux-master-detail-light',
  templateUrl: './lux-master-detail-light.component.html',
  styleUrls: ['./lux-master-detail-light.component.scss']
})
export class LuxMasterDetailLightComponent {
  @ContentChild(LuxMasterHeaderLightComponent) masterHeader: LuxMasterHeaderLightComponent;
  @ContentChild(LuxMasterContentLightComponent) masterContent: LuxMasterContentLightComponent;
  @ContentChild(LuxDetailHeaderLightComponent) detailHeader: LuxDetailHeaderLightComponent;
  @ContentChild(LuxDetailContentLightComponent) detailContent: LuxDetailContentLightComponent;
  
  iconName = 'keyboard_arrow_left'; // icon für den MasterToggleButton
  luxToggleHidden = false; //Relikt ?!
  luxMasterOpen = true; //Master geöffnet

  private _showMaster = true; //wichtig für mobile Ansicht dort ist immer nur eins sichtbar
  set showMaster(show: boolean) {
    this._showMaster = show;
  }
  get showMaster() { 
    return (this._showMaster && !this.isMobile); 
  }  
  
showDetail = true;
  
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

    if (this.luxMasterOpen) {
     this.luxMasterOpen = false;
     this.iconName = 'keyboard_arrow_right';
    } else {
      this.luxMasterOpen = true;
      this.iconName = 'keyboard_arrow_left';
    }

    // if (this.tabsComponent) {
    //   this.tabsComponent.rerenderTabs();
    // }
  }


  getAriaLabelForOpenCloseButton(iconName: string) {
    if (this.iconName === 'keyboard_arrow_left') {
      return $localize `:@@luxc.master-detail.header.close.btn:Masterliste zuklappen`;
    } else {
      return $localize `:@@luxc.master-detail.header.open.btn:Masterliste aufklappen`;
    }
  }
  // für die Mobile Ansicht, um von der Detail-Ansicht zum Master zurück zu kommen
  backToMaster() {
    this.showMaster = true;
  }
}

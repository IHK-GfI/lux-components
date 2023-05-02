import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { LuxInputAcComponent } from '../../modules/lux-form/lux-input-ac/lux-input-ac.component';
import { LuxAppFooterButtonService } from '../../modules/lux-layout/lux-app-footer/lux-app-footer-button.service';
import { LuxUtil } from '../../modules/lux-util/lux-util';
import { ComponentsOverviewNavigationService } from './components-overview-navigation.service';

@Component({
  selector: 'lux-components-overview-authentic',
  templateUrl: './components-overview-authentic.component.html',
  styleUrls: ['./components-overview-authentic.component.scss']
})
export class ComponentsOverviewAuthenticComponent implements OnInit, AfterViewInit {
  @ViewChild(LuxInputAcComponent) filterInput!: LuxInputAcComponent;

  filterValue = '';

  constructor(private buttonService: LuxAppFooterButtonService, public navigationService: ComponentsOverviewNavigationService) {}

  ngOnInit() {
    this.buttonService.buttonInfos = [];
  }

  ngAfterViewInit() {
    LuxUtil.goToTop();
    this.filterInput.inputElement.nativeElement.focus();
  }
}

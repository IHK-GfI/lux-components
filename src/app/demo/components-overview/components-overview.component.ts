import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LuxInputAcComponent } from '../../modules/lux-form/lux-input-ac/lux-input-ac.component';
import { LuxAppFooterButtonService } from '../../modules/lux-layout/lux-app-footer/lux-app-footer-button.service';
import { LuxUtil } from '../../modules/lux-util/lux-util';
import { ComponentsOverviewNavigationService } from './components-overview-navigation.service';

@Component({
  selector: 'app-components',
  templateUrl: './components-overview.component.html',
  styleUrls: ['./components-overview.component.scss']
})
export class ComponentsOverviewComponent implements OnInit, AfterViewInit {

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

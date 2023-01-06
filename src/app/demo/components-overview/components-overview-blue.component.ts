import { Component, OnInit } from '@angular/core';
import { LuxAppFooterButtonService } from '../../modules/lux-layout/lux-app-footer/lux-app-footer-button.service';
import { ComponentsOverviewNavigationService } from './components-overview-navigation.service';

@Component({
  selector: 'lux-components-overview-blue',
  templateUrl: './components-overview-blue.component.html',
  styleUrls: ['./components-overview-blue.component.scss']
})
export class ComponentsOverviewBlueComponent implements OnInit {

  constructor(private buttonService: LuxAppFooterButtonService, public navigationService: ComponentsOverviewNavigationService) {}

  ngOnInit() {
    this.buttonService.buttonInfos = [];
  }

}

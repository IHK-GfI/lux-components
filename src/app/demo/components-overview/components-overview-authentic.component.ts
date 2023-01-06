import { Component, OnInit } from '@angular/core';
import { LuxAppFooterButtonService } from '../../modules/lux-layout/lux-app-footer/lux-app-footer-button.service';
import { ComponentsOverviewNavigationService } from './components-overview-navigation.service';

@Component({
  selector: 'lux-components-overview-authentic',
  templateUrl: './components-overview-authentic.component.html',
  styleUrls: ['./components-overview-authentic.component.scss']
})
export class ComponentsOverviewAuthenticComponent implements OnInit {
  constructor(private buttonService: LuxAppFooterButtonService, public navigationService: ComponentsOverviewNavigationService) {}

  ngOnInit() {
    this.buttonService.buttonInfos = [];
  }
}

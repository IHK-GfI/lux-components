import { Component, OnDestroy, OnInit } from '@angular/core';
import { LuxAppFooterButtonService } from '../../modules/lux-layout/lux-app-footer/lux-app-footer-button.service';
import { ComponentsOverviewNavigationService } from './components-overview-navigation.service';

@Component({
  selector: 'app-components',
  templateUrl: './components-overview.component.html',
  styleUrls: ['./components-overview.component.scss']
})
export class ComponentsOverviewComponent implements OnInit, OnDestroy {
  constructor(
    private buttonService: LuxAppFooterButtonService,
    public navigationService: ComponentsOverviewNavigationService
  ) {}

  ngOnInit() {
    this.buttonService.buttonInfos = [];
  }

  ngOnDestroy() {}
}

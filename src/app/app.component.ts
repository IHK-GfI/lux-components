import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LuxAppFooterLinkInfo } from './modules/lux-layout/lux-app-footer/lux-app-footer-link-info';
import { LuxAppFooterLinkService } from './modules/lux-layout/lux-app-footer/lux-app-footer-link.service';
import { LuxAppFooterButtonService } from './modules/lux-layout/lux-app-footer/lux-app-footer-button.service';
import { LuxSnackbarService } from './modules/lux-popups/lux-snackbar/lux-snackbar.service';
import { ComponentsOverviewNavigationService } from './demo/components-overview/components-overview-navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  window = window;

  constructor(
    private router: Router,
    private linkService: LuxAppFooterLinkService,
    private buttonService: LuxAppFooterButtonService,
    private snackbarService: LuxSnackbarService,
    public navigationService: ComponentsOverviewNavigationService
  ) {}

  ngOnInit() {
    this.linkService.pushLinkInfos(
      new LuxAppFooterLinkInfo('Datenschutz', 'datenschutz', true),
      new LuxAppFooterLinkInfo('Impressum', 'impressum')
    );
  }

  goToHome() {
    this.router.navigate(['home']);
  }

  goToComponents() {
    this.router.navigate(['components-overview']);
  }

  goToMasterDetail() {
    this.router.navigate(['components-overview/example/master-detail']);
  }

  goToStepper() {
    this.router.navigate(['components-overview/example/stepper']);
  }

  goToTabs() {
    this.router.navigate(['components-overview/example/tabs']);
  }

  goToForm() {
    this.router.navigate(['form']);
  }

  goToConfig() {
    this.router.navigate(['configuration']);
  }

  goToBaseline() {
    this.router.navigate(['baseline']);
  }

  actionClicked(text: string) {
    this.snackbarService.open(2000, {
      text: text
    });
  }

  onModuleClicked(moduleName: string) {
    // den expanded zustand im service merken
    this.navigationService.currentModules.set(moduleName, !this.navigationService.currentModules.get(moduleName));
  }
}

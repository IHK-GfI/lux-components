import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { ComponentsOverviewNavigationService } from './demo/components-overview/components-overview-navigation.service';
import { LuxAppFooterButtonService } from './modules/lux-layout/lux-app-footer/lux-app-footer-button.service';
import { LuxAppFooterLinkInfo } from './modules/lux-layout/lux-app-footer/lux-app-footer-link-info';
import { LuxAppFooterLinkService } from './modules/lux-layout/lux-app-footer/lux-app-footer-link.service';
import { LuxSideNavComponent } from './modules/lux-layout/lux-app-header/lux-app-header-subcomponents/lux-side-nav/lux-side-nav.component';
import { LuxSnackbarService } from './modules/lux-popups/lux-snackbar/lux-snackbar.service';
import { LuxThemeService } from './modules/lux-theme/lux-theme.service';
import { LuxAppService } from './modules/lux-util/lux-app.service';
import { LuxConsoleService } from './modules/lux-util/lux-console.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild(LuxSideNavComponent) sideNavComp!: LuxSideNavComponent;

  @Input() luxAppHeader: 'normal' | 'minimal' | 'none' = 'normal';
  @Input() luxAppFooter: 'normal' | 'minimal' | 'none' = 'normal';
  @Input() luxMode: 'stand-alone' | 'portal' = 'stand-alone';

  window = window;
  jsonDataResult: any;
  demoUserName = "Susanne Sonnenschein";
  demoLoginBtn = "Abmelden";
  themeName: string;
  url = '/';

  constructor(
    public router: Router,
    private linkService: LuxAppFooterLinkService,
    private buttonService: LuxAppFooterButtonService,
    private snackbarService: LuxSnackbarService,
    public navigationService: ComponentsOverviewNavigationService,
    private sanitizer: DomSanitizer,
    private themeService: LuxThemeService,
    private elementRef: ElementRef,
    private appService: LuxAppService,
  ) {
    themeService.loadTheme();
    this.themeName = themeService.getTheme().name;
    router.initialNavigation();
    this.appService.appEl = elementRef.nativeElement;

    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.url = event.url;
      }
    });
  }

  ngOnInit() {
    this.linkService.pushLinkInfos(
      new LuxAppFooterLinkInfo('Datenschutz', 'datenschutz', true),
      new LuxAppFooterLinkInfo('Impressum', 'impressum'),
      new LuxAppFooterLinkInfo('Lizenzhinweis', 'license-hint')
    );
  }

  onSideNavExpandedChange(expanded: boolean) {
    LuxConsoleService.LOG(`SideNav ${expanded ? 'opened' : 'closed'}`);
  }

  onChangeTheme(themeName: string) {
    this.themeService.setTheme(themeName);
    this.themeName = themeName;
    this.router.navigate(['/home']);
  }

  toggleLogin(){
    if (this.demoUserName){
      this.demoUserName='';
      this.demoLoginBtn='Anmelden';
    } else {
      this.demoUserName="Susanne Sonnenschein"
      this.demoLoginBtn='Abmelden'
    }
  }

  goToHome() {
    this.router.navigate(['home']);
  }

  goToComponents() {
    this.router.navigate(['components-overview']);
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
  goToIconSearch() {
    this.router.navigate(['components-overview/example/icon-overview']);
  }

  goToHomepage() {
    window.open('https://www.ihk-gfi.de/');
  }

  goToImpressum() {
    this.sideNavComp.close();
    this.router.navigate(['impressum']);
  }

  goToLicenseHint() {
    this.sideNavComp.close();
    this.router.navigate(['license-hint']);
  }

  actionClicked(text: string, iconName?: string ) {
    this.snackbarService.open(3000, {
      text,
      iconName,
      iconColor: 'orange',
      action: 'OK',
      actionColor: 'green'
    });
  }

  onModuleClicked(moduleName: string) {
    // den expanded zustand im service merken
    this.navigationService.currentModules.set(moduleName, !this.navigationService.currentModules.get(moduleName));
  }
}

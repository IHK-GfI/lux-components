import { Component, ElementRef, HostBinding, HostListener, Input, OnDestroy } from "@angular/core";
import { LuxAppService } from "../../lux-util/lux-app.service";
import { LuxAppFooterFixedService } from "../lux-app-footer/lux-app-footer-fixed.service";
import { Subscription } from "rxjs";
import { LuxThemeService } from "../../lux-theme/lux-theme.service";

@Component({
  selector: 'lux-app-content',
  templateUrl: './lux-app-content.component.html',
  styleUrls: ['./lux-app-content.component.scss']
})
export class LuxAppContentComponent implements OnDestroy  {
  @Input() luxAriaRoleMainLabel = $localize `:@@luxc.app_content.ariarolemain:Inhaltsbereich`;

  @HostListener('window:resize') windowResize() {
    this.appService.onResize();
  }

  @HostBinding('class.lux-app-footer-no-fixed') get getNoStickModeClass() {
    return !this.fixedMode;
  }

  fixedMode: boolean;
  themeName: string;
  subscriptions: Subscription[] = [];

  constructor(private elementRef: ElementRef, private appService: LuxAppService, private footerService: LuxAppFooterFixedService, public themeService: LuxThemeService) {
    this.appService.appContentEl = elementRef.nativeElement;

    this.fixedMode = this.footerService.fixedMode;
    this.subscriptions.push(this.footerService.fixedModeAsObservable.subscribe((fixedMode) => {
      this.fixedMode = fixedMode; 
    }));

    this.themeName = this.themeService.getTheme().name;
    this.subscriptions.push(this.themeService.getThemeAsObservable().subscribe((theme) => {
      this.themeName = theme.name;
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe(); 
    });
  }

}

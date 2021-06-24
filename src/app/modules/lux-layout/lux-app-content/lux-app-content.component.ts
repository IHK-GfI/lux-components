import { Component, ElementRef, HostListener, Input } from "@angular/core";
import { LuxAppService } from "../../lux-util/lux-app.service";

@Component({
  selector: 'lux-app-content',
  templateUrl: './lux-app-content.component.html',
  styleUrls: ['./lux-app-content.component.scss']
})
export class LuxAppContentComponent  {
  @Input() luxAriaRoleMainLabel = $localize `:@@luxc.app_content.ariarolemain:Inhaltsbereich`;

  @HostListener('window:resize') windowResize() {
    this.appService.onResize();
  }

  constructor(private elementRef: ElementRef, private appService: LuxAppService) {
    this.appService.appContentEl = elementRef.nativeElement;
  }

}

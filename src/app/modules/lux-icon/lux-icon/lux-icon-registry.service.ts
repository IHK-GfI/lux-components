import { Injectable } from "@angular/core";
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from "@angular/material/icon";
import { LuxComponentsConfigService } from "../../lux-components-config/lux-components-config.service";
import { LuxSvgIcon } from "./lux-svg-icon";
import iconFilesJson from '@ihk-gfi/lux-components-icons-and-fonts/assets/icons/lux-icons.json';

@Injectable({
  providedIn: "root"
})
export class LuxIconRegistryService {

  private registeredIcons = new Array<string>();
  private svgIcons: LuxSvgIcon[] = iconFilesJson;
  private iconBasePath = '';

  constructor(
    private matIconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private configService: LuxComponentsConfigService
  ) {
    this.iconBasePath = this.configService.currentConfig.iconBasePath ?? '';
    if (this.iconBasePath.endsWith('/')) {
      this.iconBasePath = this.iconBasePath.substring(0, this.iconBasePath.length - 1);
    }
  }

  registerIcon(_iconName: string){
    let icon = this.svgIcons.find( item => item.iconName.split('--')[0].toLowerCase() === _iconName );

    if (icon) {
      if (!this.registeredIcons.includes(_iconName)) {
        const iconPath = this.iconBasePath + icon.iconPath;
        this.matIconRegistry.addSvgIcon(
          _iconName,
          this.sanitizer.bypassSecurityTrustResourceUrl(iconPath)
        );
        this.registeredIcons.push(_iconName);
      }
    } else {
      throw new Error(`Unbekanntes Icon: ${_iconName}`);
    }
  }

  getSvgIconList(): LuxSvgIcon[] {
    return this.svgIcons;
  }

}

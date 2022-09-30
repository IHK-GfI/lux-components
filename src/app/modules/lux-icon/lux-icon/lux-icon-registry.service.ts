import { Injectable } from "@angular/core";
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from "@angular/material/icon";
import { LuxSvgIcon } from "./lux-svg-icon";
import iconFilesJson from 'assets/svg/lux-icons/lux-icons.json';
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class LuxIconRegistryService {

  private registeredIcons = new Array<string>();
  private svgIcons: LuxSvgIcon[] = iconFilesJson;
 
  constructor(    
    private matIconRegistry: MatIconRegistry,  
    private sanitizer: DomSanitizer
  ) { }
  
  registerIcon(_iconName: string){
    let icon = this.svgIcons.find( item => item.iconName.split('--')[0].toLowerCase() === _iconName );

    if (icon) {
      if (!this.registeredIcons.includes(_iconName)) {

        this.matIconRegistry.addSvgIcon(
          _iconName,
          this.sanitizer.bypassSecurityTrustResourceUrl(icon.iconPath)
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
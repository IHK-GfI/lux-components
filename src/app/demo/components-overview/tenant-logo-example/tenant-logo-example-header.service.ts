import {ElementRef, EventEmitter, Injectable} from "@angular/core";
import {TenantLogoExampleConfigData} from "./tenant-logo-example-config/tenant-logo-example-config-data";

@Injectable({
  providedIn: 'root'
})
export class TenantLogoExampleHeaderService {

  public tenantConfigChange: EventEmitter<TenantLogoExampleConfigData> = new EventEmitter<TenantLogoExampleConfigData>();

  public showBorderForTenantImage(el: ElementRef, toggle: boolean){
    let c = el.nativeElement;
    //<lux-image>...
    c = c.childNodes.item(0);
    //<div>...
    c = c.childNodes.item(0);
    //<img>...
    c = c.childNodes.item(0);

    if(toggle){
      c.style.border = "2px solid red";
    } else {
      c.style.border = "";
    }
  }
}

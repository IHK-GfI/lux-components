import {Component, ElementRef, ViewChild} from "@angular/core";
import {TenantLogoExampleConfigData} from "./tenant-logo-example-config/tenant-logo-example-config-data";
import {TenantLogoExampleHeaderService} from "./tenant-logo-example-header.service";

@Component({
  selector: 'app-tenant-logo-example',
  templateUrl: './tenant-logo-example.component.html'
})
export class TenantLogoExampleComponent {

  @ViewChild("exampleLogo", {read: ElementRef})
  private tenantRef!: ElementRef;


  public useTenantLogoForHeader = false;

  public headerTenantLogoConfig: TenantLogoExampleConfigData = {
    luxTenantKey: "100",
    luxTenantVariant: "",
    luxTenantLogoHeight: "",
    luxTenantLogoClicked: undefined
  };

  public localTenantLogoConfig: TenantLogoExampleConfigData = {
    luxTenantKey: "100",
    luxTenantVariant: "",
    luxTenantLogoHeight: "100px",
    luxTenantLogoClicked: undefined
  };

  constructor(private tenantLogoHeaderService: TenantLogoExampleHeaderService) {
  }

  public onChangeUseTenantLogoForHeader(toggle: boolean) {
    this.useTenantLogoForHeader = toggle;
    if(toggle) {
      this.tenantLogoHeaderService.tenantConfigChange.emit(this.headerTenantLogoConfig);
    } else {
      this.tenantLogoHeaderService.tenantConfigChange.emit(undefined);
    }
  }

  public onChangeShowBorderForImages(toggle: boolean) {
    this.tenantLogoHeaderService.showBorderForTenantImage(this.tenantRef, toggle);
  }

  public onTenenatLogoClicked(config: TenantLogoExampleConfigData){
    if(config.luxTenantLogoClicked){
      config.luxTenantLogoClicked();
    }
  }

}

import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import { TenantLogoExampleConfigData } from "./tenant-logo-example-config-data";
import { LuxComponentsConfigParameters, LuxComponentsConfigService, LuxMediaQueryObserverService } from "public_api";
import { Subscription } from "rxjs";
import {LuxTenantLogoComponent} from "../../../../modules/lux-tenant-logo/lux-tenant-logo.component";

@Component({
  selector: 'app-tenant-logo-example-config',
  templateUrl: './tenant-logo-example-config.component.html'
})
export class TenantLogoExampleConfigComponent implements OnInit, OnDestroy {

  @Input()
  public title!: string;

  @Input()
  public tenantLogoConfig!: TenantLogoExampleConfigData;

  public tenantKeyArr: string[] = [
    "100",
    "202",
    "341"
  ];

  public tenantVariantArr: string[] = [
    "",
    "lang",
    "kurz",
    "unten"
  ];

  public apiPath = "";
  public actualTenantVariant?: string = "";
  private mediaQuery?: string;

  private subscriptions: Subscription[] = [];

  constructor(
    private componentsConfigService: LuxComponentsConfigService,
    private queryObserver: LuxMediaQueryObserverService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(this.componentsConfigService.config.subscribe(
      (newConfig: LuxComponentsConfigParameters) => {
        this.apiPath = newConfig.tenantLogoLookupServiceUrl ?? LuxComponentsConfigService.DEFAULT_CONFIG.tenantLogoLookupServiceUrl;
      }
    ));

    this.subscriptions.push(this.queryObserver.getMediaQueryChangedAsObservable().subscribe(mediaQuery => {
        this.mediaQuery = mediaQuery;
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  public onShowLogoClickedEvents(toggle: boolean){
    if(toggle){
      this.tenantLogoConfig.luxTenantLogoClicked = () => {
        console.log("Logo [" + this.tenantLogoConfig.luxTenantKey + "_" + this.actualTenantVariant + "] clicked!");
      };
    } else {
      this.tenantLogoConfig.luxTenantLogoClicked = () => {};
    }
  }

  public get logoTenantSrc(): string | undefined {
    if(!this.apiPath) return;
    if(!this.mediaQuery) return;

    this.actualTenantVariant = this.tenantLogoConfig.luxTenantVariant || LuxTenantLogoComponent.getVariantByMediaQuery(this.mediaQuery);
    return LuxTenantLogoComponent.buildTenantLogoUrl(this.apiPath, this.tenantLogoConfig.luxTenantKey, this.actualTenantVariant);
  }

}

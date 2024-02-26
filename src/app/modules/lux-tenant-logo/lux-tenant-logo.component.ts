import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from "rxjs";
import {LuxComponentsConfigService} from "../lux-components-config/lux-components-config.service";
import {LuxComponentsConfigParameters} from "../lux-components-config/lux-components-config-parameters.interface";
import {LuxMediaQueryObserverService} from '../lux-util/lux-media-query-observer.service';

@Component({
  selector: 'lux-tenant-logo',
  templateUrl: './lux-tenant-logo.component.html',
  styleUrls: ['./lux-tenant-logo.component.scss']
})
export class LuxTenantLogoComponent implements OnInit, OnDestroy {

  /*
   * Statische Methoden, die beschreiben, wie (z.B.) die Url aufgebaut wird und sich diese je nach Media Query verändert
   * Kann eventuell durch konfigurierbare Breakpoints ersetzt werden in der Zukunft.
   */

  public static buildTenantLogoUrlFromMediaQuery(baseUrl: string, tenantKey: string, tenantVariant: string | undefined, mediaQuery: string): string {
    let actualTenantVariant = tenantVariant || LuxTenantLogoComponent.getVariantByMediaQuery(mediaQuery);
    return LuxTenantLogoComponent.buildTenantLogoUrl(baseUrl, tenantKey, actualTenantVariant);
  }

  public static getVariantByMediaQuery(mediaQuery: string): string {
    if(mediaQuery === "xs" || mediaQuery === "sm"){
      return "kurz";
    } else {
      return "lang";
    }
  }

  public static buildTenantLogoUrl(baseUrl: string, tenantKey: string, tenantVariant: string): string {
    return baseUrl + tenantKey + "_" + tenantVariant + '.svg';
  }




  private _luxTenantKey!: string;

  @Input()
  public set luxTenantKey(luxTenantKey: string){
    this._luxTenantKey = luxTenantKey;
    this.updateSrc();
    this.updateAriaLabel();
  }

  public get luxTenantKey(): string {
    return this._luxTenantKey;
  }

  private _luxTenantVariant: string | undefined;

  @Input()
  public set luxTenantVariant(luxTenantVariant: string | undefined){
    this._luxTenantVariant = luxTenantVariant;
    this.updateSrc();
  }

  public get luxTenantVariant(): string | undefined {
    return this._luxTenantVariant;
  }


  public actualLuxTenantLogoHeight = "";
  private _luxTenantLogoHeight = "";

  @Input()
  public set luxTenantLogoHeight(luxTenantLogoHeight: string){
    this._luxTenantLogoHeight = luxTenantLogoHeight;

    this.updateHeight();
  }

  public get luxTenantLogoHeight(): string {
    return this._luxTenantLogoHeight;
  }

  @Output() luxTenantLogoClicked: EventEmitter<Event> = new EventEmitter();

  private apiPath?: string;
  private mediaQuery?: string;

  public tenantLogoSrc: any;
  public luxTenantLogoAriaLabel?: string;
  public luxTenantLogoAlt = "Tenant Logo";

  private subscriptions: Subscription[] = [];

  constructor(
    private componentsConfigService: LuxComponentsConfigService,
    private queryObserver: LuxMediaQueryObserverService
  ) {
  }

  ngOnInit(): void {
    this.subscriptions.push(this.componentsConfigService.config.subscribe(
      (newConfig: LuxComponentsConfigParameters) => {
        this.apiPath = newConfig.tenantLogoLookupServiceUrl ?? LuxComponentsConfigService.DEFAULT_CONFIG.tenantLogoLookupServiceUrl;
        this.updateSrc();
      }
    ));

    this.subscriptions.push(this.queryObserver.getMediaQueryChangedAsObservable().subscribe(mediaQuery => {
        this.mediaQuery = mediaQuery;
        this.updateSrc();
        this.updateHeight();
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private updateSrc(): void {
    if(!this.apiPath) return;
    if(!this.mediaQuery) return;

    this.tenantLogoSrc = LuxTenantLogoComponent.buildTenantLogoUrlFromMediaQuery(this.apiPath, this.luxTenantKey, this.luxTenantVariant, this.mediaQuery);
  }

  private updateHeight(): void {
    if(!this.luxTenantLogoHeight){
      if(!this.mediaQuery) return;
      else if(this.mediaQuery === "xs" || this.mediaQuery === "sm"){
        this.actualLuxTenantLogoHeight = "32px";
      } else {
        this.actualLuxTenantLogoHeight = "40px";
      }
    } else {
      this.actualLuxTenantLogoHeight = this.luxTenantLogoHeight;
    }
  }

  private updateAriaLabel(): void {
    this.luxTenantLogoAriaLabel = "Logo " + this.luxTenantKey;
    this.luxTenantLogoAlt = "Logo " + this.luxTenantKey;
  }

  public onImageClicked(event: any): void {
    this.luxTenantLogoClicked.emit(event);
  }

}

import { CUSTOM_ELEMENTS_SCHEMA, DoBootstrap, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DseComponent } from './demo/abstract/dse/dse.component';
import { ImpressumComponent } from './demo/abstract/impressum/impressum.component';
import { LicenseHintComponent } from './demo/base/license-hint/license-hint.component';
import { BaselineModule } from './demo/baseline/baseline.module';
import { MockLuxLookupService } from './demo/components-overview/lookup-examples/mock-lookup-service';
import { ConfigurationModule } from './demo/configuration/configuration.module';
import { ExampleBaseModule } from './demo/example-base/example-base.module';
import { HomeModule } from './demo/home/home.module';
import { LuxActionModule } from './modules/lux-action/lux-action.module';
import { LuxBreadcrumbModule } from './modules/lux-breadcrumb/lux-breadcrumb.module';
import { LuxCommonModule } from './modules/lux-common/lux-common.module';
import { LuxComponentsConfigParameters } from './modules/lux-components-config/lux-components-config-parameters.interface';
import { LuxComponentsConfigModule } from './modules/lux-components-config/lux-components-config.module';
import { LuxDirectivesModule } from './modules/lux-directives/lux-directives.module';
import { LuxErrorModule } from './modules/lux-error/lux-error.module';
import { LuxFilePreviewModule } from './modules/lux-file-preview/lux-file-preview.module';
import { LuxFormModule } from './modules/lux-form/lux-form.module';
import { LuxLayoutModule } from './modules/lux-layout/lux-layout.module';
import { LuxLookupService } from './modules/lux-lookup/lux-lookup-service/lux-lookup.service';
import { LuxMarkdownModule } from './modules/lux-markdown/lux-markdown.module';
import { LuxPipesModule } from './modules/lux-pipes/lux-pipes.module';
import { LuxPopupsModule } from './modules/lux-popups/lux-popups.module';
import { LuxTenantLogoModule } from './modules/lux-tenant-logo/lux-tenant-logo.module';
import { LuxTourHintModule } from './modules/lux-tour-hint/lux-tour-hint.module';
import { LuxConsoleService } from './modules/lux-util/lux-console.service';

const myConfiguration: LuxComponentsConfigParameters = {
  generateLuxTagIds: environment.generateLuxTagIds,
  iconBasePath: 'https://cdn.gfi.ihk.de/lux-components/icons-and-fonts/v1.10.0/',
  labelConfiguration: {
    allUppercase: true,
    notAppliedTo: ['lux-link', 'lux-menu-item', 'lux-side-nav-item', 'lux-tab', 'lux-step']
  }
};

@NgModule({
  declarations: [AppComponent, DseComponent, ImpressumComponent, LicenseHintComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HammerModule,
    LuxLayoutModule,
    LuxActionModule,
    LuxPopupsModule,
    LuxFormModule,
    LuxPipesModule,
    LuxDirectivesModule,
    LuxCommonModule,
    LuxErrorModule,
    LuxFilePreviewModule,
    HomeModule,
    ConfigurationModule,
    BaselineModule,
    ExampleBaseModule,
    LuxComponentsConfigModule.forRoot(myConfiguration),
    LuxMarkdownModule,
    LuxTenantLogoModule,
    LuxTourHintModule,
    LuxBreadcrumbModule
  ],
  providers: [{ provide: LuxLookupService, useClass: MockLuxLookupService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    (window as any).pdfWorkerSrc = '/assets/pdf/pdf.worker.min.mjs';

    const ce = createCustomElement(AppComponent, { injector: this.injector });
    customElements.define('lux-components-demo', ce);
  }
}

LuxConsoleService.LOG('Modul "AppModule" geladen...');

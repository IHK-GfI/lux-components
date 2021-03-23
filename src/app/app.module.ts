import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './demo/home/home.module';
import { LuxActionModule } from './modules/lux-action/lux-action.module';
import { LuxDirectivesModule } from './modules/lux-directives/lux-directives.module';
import { LuxFilePreviewComponent } from './modules/lux-file-preview/lux-file-preview.component';
import { LuxFilePreviewModule } from './modules/lux-file-preview/lux-file-preview.module';
import { LuxAppFooterButtonService } from './modules/lux-layout/lux-app-footer/lux-app-footer-button.service';
import { LuxAppFooterLinkService } from './modules/lux-layout/lux-app-footer/lux-app-footer-link.service';
import { LuxErrorService } from './modules/lux-error/lux-error-page/lux-error-services/lux-error-service';
import { LuxLayoutModule } from './modules/lux-layout/lux-layout.module';
import { LuxMasterDetailMobileHelperService } from './modules/lux-layout/lux-master-detail/lux-master-detail-mobile-helper.service';
import { LuxStepperHelperService } from './modules/lux-layout/lux-stepper/lux-stepper-helper.service';
import { LuxPopupsModule } from './modules/lux-popups/lux-popups.module';
import { LuxSnackbarComponent } from './modules/lux-popups/lux-snackbar/lux-snackbar-component/lux-snackbar.component';
import { LuxSnackbarService } from './modules/lux-popups/lux-snackbar/lux-snackbar.service';
import { LuxConsoleService } from './modules/lux-util/lux-console.service';
import { LuxStorageService } from './modules/lux-util/lux-storage.service';
import { LuxComponentsConfigModule } from './modules/lux-components-config/lux-components-config.module';
import { LuxComponentsConfigParameters } from './modules/lux-components-config/lux-components-config-parameters.interface';
import { environment } from '../environments/environment';
import { ConfigurationModule } from './demo/configuration/configuration.module';
import { LuxFormModule } from './modules/lux-form/lux-form.module';
import { BaselineModule } from './demo/baseline/baseline.module';
import { LuxPipesModule } from './modules/lux-pipes/lux-pipes.module';
import { ExampleBaseModule } from './demo/example-base/example-base.module';
import { LuxCommonModule } from './modules/lux-common/lux-common.module';
import { LuxErrorModule } from './modules/lux-error/lux-error.module';
import 'hammerjs';
import { PlaceholderComponent } from './demo/abstract/placeholder/placeholder.component';
import { RedirectComponent } from './demo/abstract/redirect/redirect.component';

const myConfiguration: LuxComponentsConfigParameters = {
  generateLuxTagIds: environment.generateLuxTagIds,
  displayLuxConsoleLogs: true,
  lookupServiceUrl: '/lookup/',
  labelConfiguration: {
    allUppercase: true,
    notAppliedTo: ['lux-link', 'lux-side-nav-item', 'lux-menu-item', 'lux-tab', 'lux-step']
  }
};

@NgModule({
  declarations: [AppComponent, PlaceholderComponent, RedirectComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HammerModule,
    FlexLayoutModule,
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
    LuxComponentsConfigModule.forRoot(myConfiguration)
  ],
  entryComponents: [LuxSnackbarComponent, LuxFilePreviewComponent],
  providers: [
    LuxAppFooterButtonService,
    LuxAppFooterLinkService,
    LuxSnackbarService,
    LuxErrorService,
    LuxStepperHelperService,
    LuxMasterDetailMobileHelperService,
    LuxStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

LuxConsoleService.LOG('Modul "AppModule" geladen...');

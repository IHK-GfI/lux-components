import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LuxTenantLogoComponent } from './lux-tenant-logo.component';
import { LuxIconModule } from "../lux-icon/lux-icon.module";
import { LuxDirectivesModule } from "../lux-directives/lux-directives.module";



@NgModule({
  declarations: [
    LuxTenantLogoComponent
  ],
  exports: [
    LuxTenantLogoComponent
  ],
  imports: [
    CommonModule,
    LuxIconModule,
    LuxDirectivesModule
  ]
})
export class LuxTenantLogoModule { }

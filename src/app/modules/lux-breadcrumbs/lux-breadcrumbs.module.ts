import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LuxBreadcrumbsComponent } from './lux-breadcrumbs.component';
import { LuxActionModule } from "../lux-action/lux-action.module";
import { LuxIconModule } from "../lux-icon/lux-icon.module";

@NgModule({
  declarations: [
    LuxBreadcrumbsComponent
  ],
  imports: [
    CommonModule,
    LuxActionModule,
    LuxIconModule
],
  exports: [
    LuxBreadcrumbsComponent
  ]
})
export class LuxBreadcrumbsModule {

}

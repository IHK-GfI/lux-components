import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LuxBreadcrumbComponent } from './lux-breadcrumb.component';
import { LuxActionModule } from "../lux-action/lux-action.module";
import { LuxIconModule } from "../lux-icon/lux-icon.module";

@NgModule({
  declarations: [
    LuxBreadcrumbComponent
  ],
  imports: [
    CommonModule,
    LuxActionModule,
    LuxIconModule
],
  exports: [
    LuxBreadcrumbComponent
  ]
})
export class LuxBreadcrumbModule {

}

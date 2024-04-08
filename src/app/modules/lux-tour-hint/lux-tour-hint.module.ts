import { NgModule } from "@angular/core";
import { LuxFormModule } from "../lux-form/lux-form.module";
import { CommonModule } from "@angular/common";
import { LuxTourHintComponent } from "./lux-tour-hint.component";
import { LuxTourHintPresetComponent } from "./lux-tour-hint-preset/lux-tour-hint-preset.component";
import { LuxActionModule } from "../lux-action/lux-action.module";
import { LuxIconModule } from "../lux-icon/lux-icon.module";

@NgModule({
  imports: [
    CommonModule,
    LuxActionModule,
    LuxIconModule,
    LuxFormModule
  ],
  declarations: [
    LuxTourHintComponent,
    LuxTourHintPresetComponent
  ],
  exports: [
    LuxTourHintComponent,
    LuxTourHintPresetComponent
  ]
})
export class LuxTourHintModule { }
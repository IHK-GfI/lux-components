import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LuxIconModule } from '../../modules/lux-icon/lux-icon.module';
import { LuxLayoutModule } from '../../modules/lux-layout/lux-layout.module';
import { BaselineComponent } from './baseline.component';
import { LuxFormModule } from '../../modules/lux-form/lux-form.module';
import { LuxActionModule } from '../../modules/lux-action/lux-action.module';
import { LuxDirectivesModule } from '../../modules/lux-directives/lux-directives.module';

@NgModule({
  imports: [
    CommonModule,
    LuxLayoutModule,
    LuxIconModule,
    LuxDirectivesModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    LuxFormModule,
    LuxActionModule
  ],
  declarations: [BaselineComponent],
  exports: [BaselineComponent]
})
export class BaselineModule {}

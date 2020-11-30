import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationComponent } from './configuration.component';
import { LuxConsoleService } from '../../modules/lux-util/lux-console.service';
import { LuxFormModule } from '../../modules/lux-form/lux-form.module';
import { LuxActionModule } from '../../modules/lux-action/lux-action.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LuxIconModule } from '../../modules/lux-icon/lux-icon.module';
import { LuxLayoutModule } from '../../modules/lux-layout/lux-layout.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LuxDirectivesModule } from '../../modules/lux-directives/lux-directives.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    LuxFormModule,
    LuxActionModule,
    LuxIconModule,
    LuxLayoutModule,
    LuxDirectivesModule,
    FlexLayoutModule
  ],
  declarations: [ConfigurationComponent],
  exports: [ConfigurationComponent]
})
export class ConfigurationModule {}

LuxConsoleService.LOG('Modul "ConfigurationModule" geladen...');

/* eslint-disable max-len */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LuxLayoutModule } from '../../modules/lux-layout/lux-layout.module';
import { ExampleBaseContentComponent } from './example-base-root/example-base-subcomponents/example-base-content/example-base-content.component';
import { ExampleBaseSimpleOptionsComponent } from './example-base-root/example-base-subcomponents/example-base-options/example-base-simple-options.component';
import { ExampleBaseAdvancedOptionsComponent } from './example-base-root/example-base-subcomponents/example-base-options/example-base-advanced-options.component';
import { ExampleBaseContentActionsComponent } from './example-base-root/example-base-subcomponents/example-base-content/example-base-content-actions.component';
import { ExampleBaseOptionsActionsComponent } from './example-base-root/example-base-subcomponents/example-base-options/example-base-options-actions.component';
import { LuxPipesModule } from '../../modules/lux-pipes/lux-pipes.module';
import { LuxIconModule } from '../../modules/lux-icon/lux-icon.module';
import { RouterModule } from '@angular/router';
import { ExampleRootComponent } from './example-base-root/example-root.component';
import { ExampleBaseStructureComponent } from './example-base-root/example-base-subcomponents/example-base-structure/example-base-structure.component';
import { LuxDirectivesModule } from '../../modules/lux-directives/lux-directives.module';
import { LuxCommonModule } from '../../modules/lux-common/lux-common.module';
import { ExampleFormValueComponent } from './example-form-value/example-form-value.component';
import { ExampleValueComponent } from './example-value/example-value.component';
import { ExampleFormDisableComponent } from './example-form-disable/example-form-disable.component';
import { LuxFormModule } from '../../modules/lux-form/lux-form.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LuxActionModule } from '../../modules/lux-action/lux-action.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    LuxActionModule,
    LuxLayoutModule,
    LuxFormModule,
    LuxPipesModule,
    LuxIconModule,
    LuxDirectivesModule,
    LuxCommonModule
  ],
  declarations: [
    ExampleRootComponent,
    ExampleBaseContentComponent,
    ExampleBaseSimpleOptionsComponent,
    ExampleBaseAdvancedOptionsComponent,
    ExampleBaseContentActionsComponent,
    ExampleBaseOptionsActionsComponent,
    ExampleBaseStructureComponent,
    ExampleFormValueComponent,
    ExampleValueComponent,
    ExampleFormDisableComponent
  ],
  exports: [
    ExampleRootComponent,
    ExampleBaseContentComponent,
    ExampleBaseSimpleOptionsComponent,
    ExampleBaseAdvancedOptionsComponent,
    ExampleBaseContentActionsComponent,
    ExampleBaseOptionsActionsComponent,
    ExampleBaseStructureComponent,
    ExampleFormValueComponent,
    ExampleValueComponent,
    ExampleFormDisableComponent
  ]
})
export class ExampleBaseModule {}

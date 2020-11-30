// tslint:disable:max-line-length
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
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

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    LuxLayoutModule,
    LuxPipesModule,
    LuxIconModule,
    LuxDirectivesModule
  ],
  declarations: [
    ExampleRootComponent,
    ExampleBaseContentComponent,
    ExampleBaseSimpleOptionsComponent,
    ExampleBaseAdvancedOptionsComponent,
    ExampleBaseContentActionsComponent,
    ExampleBaseOptionsActionsComponent,
    ExampleBaseStructureComponent
  ],
  exports: [
    ExampleRootComponent,
    ExampleBaseContentComponent,
    ExampleBaseSimpleOptionsComponent,
    ExampleBaseAdvancedOptionsComponent,
    ExampleBaseContentActionsComponent,
    ExampleBaseOptionsActionsComponent,
    ExampleBaseStructureComponent
  ]
})
export class ExampleBaseModule {}

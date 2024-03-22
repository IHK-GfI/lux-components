import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LuxFilterFormComponent } from './lux-filter-form/lux-filter-form.component';
import { LuxActionModule } from '../lux-action/lux-action.module';
import { LuxLayoutModule } from '../lux-layout/lux-layout.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LuxFormModule } from '../lux-form/lux-form.module';
import { LuxPopupsModule } from '../lux-popups/lux-popups.module';
import { LuxFilterSaveDialogComponent } from './lux-filter-dialog/lux-filter-save-dialog/lux-filter-save-dialog.component';
import { LuxFilterLoadDialogComponent } from './lux-filter-dialog/lux-filter-load-dialog/lux-filter-load-dialog.component';
import { LuxFilterItemDirective } from './lux-filter-base/lux-filter-item.directive';
import { LuxFilterFormExtendedComponent } from './lux-filter-form/lux-filter-form-extended/lux-filter-form-extended.component';
import { LuxDirectivesModule } from '../lux-directives/lux-directives.module';

@NgModule({
  declarations: [
    LuxFilterFormComponent,
    LuxFilterItemDirective,
    LuxFilterSaveDialogComponent,
    LuxFilterLoadDialogComponent,
    LuxFilterFormExtendedComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LuxLayoutModule,
    LuxFormModule,
    LuxActionModule,
    LuxPopupsModule,
    LuxDirectivesModule
  ],
  exports: [
    LuxFilterFormComponent,
    LuxFilterItemDirective,
    LuxFilterSaveDialogComponent,
    LuxFilterLoadDialogComponent,
    LuxFilterFormExtendedComponent
  ],
  providers: []
})
export class LuxFilterModule {}

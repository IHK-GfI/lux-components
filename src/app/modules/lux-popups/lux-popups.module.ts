/* eslint-disable max-len */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LuxIconModule } from '../lux-icon/lux-icon.module';
import { LuxSnackbarComponent } from './lux-snackbar/lux-snackbar-component/lux-snackbar.component';
import { LuxActionModule } from '../lux-action/lux-action.module';
import { LuxComponentsConfigModule } from '../lux-components-config/lux-components-config.module';
import { LuxDialogPresetComponent } from './lux-dialog/lux-dialog-preset/lux-dialog-preset.component';
import { LuxLayoutModule } from '../lux-layout/lux-layout.module';
import { A11yModule } from '@angular/cdk/a11y';
import { LuxDirectivesModule } from '../lux-directives/lux-directives.module';
import { LuxDialogStructureComponent } from './lux-dialog/lux-dialog-structure/lux-dialog-structure.component';
import { LuxDialogTitleComponent } from './lux-dialog/lux-dialog-structure/lux-dialog-structure-subcomponents/lux-dialog-title.component';
import { LuxDialogContentComponent } from './lux-dialog/lux-dialog-structure/lux-dialog-structure-subcomponents/lux-dialog-content.component';
import { LuxDialogActionsComponent } from './lux-dialog/lux-dialog-structure/lux-dialog-structure-subcomponents/lux-dialog-actions.component';

@NgModule({
  imports: [
    CommonModule,
    LuxIconModule,
    LuxActionModule,
    MatSnackBarModule,
    MatButtonModule,
    LuxComponentsConfigModule,
    LuxLayoutModule,
    MatDialogModule,
    A11yModule,
    LuxDirectivesModule
  ],
  declarations: [
    LuxSnackbarComponent,
    LuxDialogPresetComponent,
    LuxDialogStructureComponent,
    LuxDialogTitleComponent,
    LuxDialogContentComponent,
    LuxDialogActionsComponent
  ],
  exports: [
    LuxSnackbarComponent,
    LuxDialogPresetComponent,
    LuxDialogStructureComponent,
    LuxDialogTitleComponent,
    LuxDialogContentComponent,
    LuxDialogActionsComponent
  ],
  providers: []
})
export class LuxPopupsModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LuxFormModule } from '../lux-form/lux-form.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { LuxComponentsConfigModule } from '../lux-components-config/lux-components-config.module';
import { LuxSpinnerComponent } from './lux-spinner/lux-spinner.component';
import { LuxLabelComponent } from './lux-label/lux-label.component';
import { LuxBadgeComponent } from './lux-badge/lux-badge.component';
import { LuxProgressComponent } from './lux-progress/lux-progress.component';
import { LuxTableComponent } from './lux-table/lux-table.component';
import { LuxTableColumnFooterComponent } from './lux-table/lux-table-subcomponents/lux-table-column-footer.component';
import { LuxTableColumnComponent } from './lux-table/lux-table-subcomponents/lux-table-column.component';
import { LuxMessageBoxComponent } from './lux-message-box/lux-message-box.component';
import { LuxMessageComponent } from './lux-message-box/lux-message-box-subcomponents/lux-message.component';
import { LuxTableColumnHeaderComponent } from './lux-table/lux-table-subcomponents/lux-table-column-header.component';
import { LuxTableColumnContentComponent } from './lux-table/lux-table-subcomponents/lux-table-column-content.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LuxActionModule } from '../lux-action/lux-action.module';
import { LuxIconModule } from '../lux-icon/lux-icon.module';
import { LuxDirectivesModule } from '../lux-directives/lux-directives.module';
import { LuxTextboxComponent } from './lux-textbox/lux-textbox.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    LuxFormModule,
    LuxActionModule,
    LuxIconModule,
    LuxDirectivesModule,
    LuxComponentsConfigModule
  ],
  declarations: [
    LuxSpinnerComponent,
    LuxLabelComponent,
    LuxBadgeComponent,
    LuxProgressComponent,
    LuxTableComponent,
    LuxTableColumnFooterComponent,
    LuxTableColumnComponent,
    LuxTableColumnHeaderComponent,
    LuxTableColumnContentComponent,
    LuxMessageBoxComponent,
    LuxMessageComponent,
    LuxTextboxComponent
  ],
  exports: [
    LuxSpinnerComponent,
    LuxLabelComponent,
    LuxBadgeComponent,
    LuxProgressComponent,
    LuxTableComponent,
    LuxTableColumnFooterComponent,
    LuxTableColumnComponent,
    LuxTableColumnHeaderComponent,
    LuxTableColumnContentComponent,
    LuxMessageBoxComponent,
    LuxMessageComponent,
    LuxTextboxComponent
  ]
})
export class LuxCommonModule {}

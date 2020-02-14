import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatMenuModule } from '@angular/material';
import { LuxDirectivesModule } from '../lux-directives/lux-directives.module';
import { LuxIconModule } from '../lux-icon/lux-icon.module';
import { LuxButtonComponent } from './lux-button/lux-button.component';
import { LuxLinkComponent } from './lux-link/lux-link.component';
import { LuxMenuItemComponent } from './lux-menu/lux-menu-subcomponents/lux-menu-item.component';
import { LuxComponentsConfigModule } from '../lux-components-config/lux-components-config.module';
import { LuxMenuComponent } from './lux-menu/lux-menu.component';
import { LuxMenuTriggerComponent } from './lux-menu/lux-menu-subcomponents/lux-menu-trigger.component';

@NgModule({
  imports: [
    CommonModule,
    LuxIconModule,
    MatButtonModule,
    MatMenuModule,
    LuxDirectivesModule,
    FlexLayoutModule,
    LuxComponentsConfigModule
  ],
  declarations: [LuxButtonComponent, LuxMenuItemComponent, LuxLinkComponent, LuxMenuComponent, LuxMenuTriggerComponent],
  exports: [LuxButtonComponent, LuxLinkComponent, LuxMenuComponent, LuxMenuItemComponent, LuxMenuTriggerComponent],
  entryComponents: [LuxButtonComponent]
})
export class LuxActionModule {}

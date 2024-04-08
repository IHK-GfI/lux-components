import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { LuxDirectivesModule } from '../lux-directives/lux-directives.module';
import { LuxIconModule } from '../lux-icon/lux-icon.module';
import { LuxButtonComponent } from './lux-button/lux-button.component';
import { LuxLinkComponent } from './lux-link/lux-link.component';
import { LuxMenuItemComponent } from './lux-menu/lux-menu-subcomponents/lux-menu-item.component';
import { LuxComponentsConfigModule } from '../lux-components-config/lux-components-config.module';
import { LuxMenuComponent } from './lux-menu/lux-menu.component';
import { LuxMenuTriggerComponent } from './lux-menu/lux-menu-subcomponents/lux-menu-trigger.component';
import { LuxLinkPlainComponent } from './lux-link-plain/lux-link-plain.component';

@NgModule({
  imports: [CommonModule, LuxIconModule, MatButtonModule, MatMenuModule, LuxDirectivesModule, LuxComponentsConfigModule],
  declarations: [
    LuxButtonComponent,
    LuxMenuItemComponent,
    LuxLinkComponent,
    LuxMenuComponent,
    LuxMenuTriggerComponent,
    LuxLinkPlainComponent
  ],
  exports: [LuxButtonComponent, LuxLinkComponent, LuxMenuComponent, LuxMenuItemComponent, LuxMenuTriggerComponent, LuxLinkPlainComponent]
})
export class LuxActionModule {}

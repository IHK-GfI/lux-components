/* eslint-disable max-len */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { MatStepperModule } from '@angular/material/stepper';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { LuxActionModule } from '../lux-action/lux-action.module';
import { LuxDirectivesModule } from '../lux-directives/lux-directives.module';
import { LuxIconModule } from '../lux-icon/lux-icon.module';
import { LuxPipesModule } from '../lux-pipes/lux-pipes.module';
import { LuxAccordionComponent } from './lux-accordion/lux-accordion.component';
import { LuxAppFooterComponent } from './lux-app-footer/lux-app-footer.component';
import { LuxAppHeaderActionNavItemCustomComponent } from './lux-app-header/lux-app-header-subcomponents/lux-app-header-action-nav/lux-app-header-action-nav-item/lux-app-header-action-nav-item-custom.component';
import { LuxAppHeaderRightNavComponent } from './lux-app-header/lux-app-header-subcomponents/lux-app-header-right-nav/lux-app-header-right-nav.component';
import { LuxAppHeaderAcUserMenuComponent } from './lux-app-header-ac/lux-app-header-ac-subcomponents/lux-app-header-ac-user-menu.component';
import { LuxLangSelectComponent } from './lux-app-header/lux-app-header-subcomponents/lux-lang-select/lux-lang-select.component';
import { LuxAppHeaderComponent } from './lux-app-header/lux-app-header.component';
import { LuxCardActionsComponent } from './lux-card/lux-card-subcomponents/lux-card-actions.component';
import { LuxCardContentExpandedComponent } from './lux-card/lux-card-subcomponents/lux-card-content-expanded.component';
import { LuxCardContentComponent } from './lux-card/lux-card-subcomponents/lux-card-content.component';
import { LuxCardInfoComponent } from './lux-card/lux-card-subcomponents/lux-card-info.component';
import { LuxCardComponent } from './lux-card/lux-card.component';
import { LuxDividerComponent } from './lux-divider/lux-divider.component';
import { LuxListItemContentComponent } from './lux-list/lux-list-subcomponents/lux-list-item-content.component';
import { LuxListItemIconComponent } from './lux-list/lux-list-subcomponents/lux-list-item-icon.component';
import { LuxListItemComponent } from './lux-list/lux-list-subcomponents/lux-list-item.component';
import { LuxListComponent } from './lux-list/lux-list.component';
import { LuxDetailViewAcComponent } from './lux-master-detail-ac/lux-detail-view-ac/lux-detail-view-ac.component';
import { LuxDetailWrapperAcComponent } from './lux-master-detail-ac/lux-detail-view-ac/lux-detail-wrapper-ac.component';
import { LuxMasterDetailAcComponent } from './lux-master-detail-ac/lux-master-detail-ac.component';
import { LuxMasterFooterAcComponent } from './lux-master-detail-ac/lux-master-footer-ac/lux-master-footer-ac.component';
import { LuxMasterHeaderContentAcComponent } from './lux-master-detail-ac/lux-master-header-ac/lux-master-header-content-ac.component';
import { LuxMasterHeaderAcComponent } from './lux-master-detail-ac/lux-master-header-ac/lux-master-header-ac.component';
import { LuxMasterListAcComponent } from './lux-master-detail-ac/lux-master-list-ac/lux-master-list-ac.component';
import { LuxPanelActionComponent } from './lux-panel/lux-panel-subcomponents/lux-panel-action.component';
import { LuxPanelContentComponent } from './lux-panel/lux-panel-subcomponents/lux-panel-content.component';
import { LuxPanelHeaderDescriptionComponent } from './lux-panel/lux-panel-subcomponents/lux-panel-header-description.component';
import { LuxPanelHeaderTitleComponent } from './lux-panel/lux-panel-subcomponents/lux-panel-header-title.component';
import { LuxPanelComponent } from './lux-panel/lux-panel.component';
import { LuxStepContentComponent } from './lux-stepper/lux-stepper-subcomponents/lux-step-content.component';
import { LuxStepHeaderComponent } from './lux-stepper/lux-stepper-subcomponents/lux-step-header.component';
import { LuxStepComponent } from './lux-stepper/lux-stepper-subcomponents/lux-step.component';
import { LuxStepperComponent } from './lux-stepper/lux-stepper.component';
import { LuxTabComponent } from './lux-tabs/lux-tabs-subcomponents/lux-tab.component';
import { LuxTabsComponent } from './lux-tabs/lux-tabs.component';
import { LuxSideNavComponent } from './lux-app-header/lux-app-header-subcomponents/lux-side-nav/lux-side-nav.component';
import { LuxSideNavFooterComponent } from './lux-app-header/lux-app-header-subcomponents/lux-side-nav/lux-side-nav-subcomponents/lux-side-nav-footer.component';
import { LuxSideNavHeaderComponent } from './lux-app-header/lux-app-header-subcomponents/lux-side-nav/lux-side-nav-subcomponents/lux-side-nav-header.component';
import { LuxSideNavItemComponent } from './lux-app-header/lux-app-header-subcomponents/lux-side-nav/lux-side-nav-subcomponents/lux-side-nav-item.component';
import { LuxComponentsConfigModule } from '../lux-components-config/lux-components-config.module';
import { LuxAppContentComponent } from './lux-app-content/lux-app-content.component';
import { LuxStepperHorizontalComponent } from './lux-stepper/lux-stepper-subcomponents/lux-stepper-horizontal/lux-stepper-horizontal.component';
import { LuxStepperNavButtonsComponent } from './lux-stepper/lux-stepper-subcomponents/lux-stepper-nav-buttons/lux-stepper-nav-buttons.component';
import { LuxStepperVerticalComponent } from './lux-stepper/lux-stepper-subcomponents/lux-stepper-vertical/lux-stepper-vertical.component';
import { LuxAppHeaderActionNavComponent } from './lux-app-header/lux-app-header-subcomponents/lux-app-header-action-nav/lux-app-header-action-nav.component';
import { LuxAppHeaderActionNavItemComponent } from './lux-app-header/lux-app-header-subcomponents/lux-app-header-action-nav/lux-app-header-action-nav-item/lux-app-header-action-nav-item.component';
import { RouterModule } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { LuxStepperLargeComponent } from './lux-stepper-large/lux-stepper-large.component';
import { LuxStepperLargeStepComponent } from './lux-stepper-large/lux-stepper-large-subcomponents/lux-stepper-large-step/lux-stepper-large-step.component';
import { LuxStepperLargeMobileOverlayComponent } from './lux-stepper-large/lux-stepper-large-subcomponents/lux-stepper-large-mobile-overlay/lux-stepper-large-mobile-overlay.component';
import { LuxAppHeaderAcComponent } from './lux-app-header-ac/lux-app-header-ac.component';
import { LuxAppHeaderAcNavMenuComponent } from './lux-app-header-ac/lux-app-header-ac-subcomponents/lux-app-header-ac-nav-menu/lux-app-header-ac-nav-menu.component';
import { LuxTileAcComponent } from './lux-tile-ac/lux-tile-ac.component';
import { LuxLangSelectAcComponent } from './lux-app-header-ac/lux-app-header-ac-subcomponents/lux-lang-select-ac/lux-lang-select-ac.component';
import { LuxAppHeaderAcNavMenuItemComponent } from './lux-app-header-ac/lux-app-header-ac-subcomponents/lux-app-header-ac-nav-menu/lux-app-header-ac-nav-menu-item/lux-app-header-ac-nav-menu-item.component';
import { LuxAppHeaderAcActionNavComponent } from './lux-app-header-ac/lux-app-header-ac-subcomponents/lux-app-header-ac-action-nav/lux-app-header-ac-action-nav.component';
import { LuxAppHeaderAcActionNavItemComponent } from './lux-app-header-ac/lux-app-header-ac-subcomponents/lux-app-header-ac-action-nav/lux-app-header-ac-action-nav-item/lux-app-header-ac-action-nav-item.component';
import { LuxAppHeaderAcActionNavItemCustomComponent } from './lux-app-header-ac/lux-app-header-ac-subcomponents/lux-app-header-ac-action-nav/lux-app-header-ac-action-nav-item/lux-app-header-ac-action-nav-item-custom.component';
import { LuxDetailHeaderAcComponent } from './lux-master-detail-ac/lux-detail-header-ac/lux-detail-header-ac.component';
import { LuxCheckboxContainerAcComponent } from './lux-checkbox-container-ac/lux-checkbox-container-ac.component';
import { LuxTileComponent } from './lux-tile/lux-tile.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatTabsModule,
    MatExpansionModule,
    MatStepperModule,
    MatDividerModule,
    LuxIconModule,
    LuxActionModule,
    LuxDirectivesModule,
    LuxPipesModule,
    LuxComponentsConfigModule,
    MatProgressSpinnerModule,
    MatGridListModule
  ],
  declarations: [
    LuxAppHeaderComponent,
    LuxAppFooterComponent,
    LuxListItemComponent,
    LuxListItemIconComponent,
    LuxListItemContentComponent,
    LuxListComponent,
    LuxTabComponent,
    LuxTabsComponent,
    LuxCardComponent,
    LuxCardInfoComponent,
    LuxCardContentComponent,
    LuxCardContentExpandedComponent,
    LuxCardActionsComponent,
    LuxAccordionComponent,
    LuxPanelComponent,
    LuxPanelContentComponent,
    LuxPanelActionComponent,
    LuxPanelHeaderTitleComponent,
    LuxPanelHeaderDescriptionComponent,
    LuxStepperComponent,
    LuxStepComponent,
    LuxStepHeaderComponent,
    LuxStepContentComponent,
    LuxDividerComponent,
    LuxAppHeaderRightNavComponent,
    LuxSideNavComponent,
    LuxSideNavFooterComponent,
    LuxSideNavHeaderComponent,
    LuxSideNavItemComponent,
    LuxAppContentComponent,
    LuxStepperHorizontalComponent,
    LuxStepperNavButtonsComponent,
    LuxStepperVerticalComponent,
    LuxAppHeaderActionNavComponent,
    LuxAppHeaderActionNavItemComponent,
    LuxAppHeaderActionNavItemCustomComponent,
    LuxLangSelectComponent,
    LuxStepperLargeComponent,
    LuxStepperLargeStepComponent,
    LuxStepperLargeMobileOverlayComponent,
    LuxAppHeaderAcComponent,
    LuxAppHeaderAcUserMenuComponent,
    LuxAppHeaderAcNavMenuComponent,
    LuxTileComponent,
    LuxTileAcComponent,
    LuxLangSelectAcComponent,
    LuxAppHeaderAcNavMenuItemComponent,
    LuxAppHeaderAcActionNavComponent,
    LuxAppHeaderAcActionNavItemComponent,
    LuxAppHeaderAcActionNavItemCustomComponent,
    LuxDetailViewAcComponent,
    LuxDetailWrapperAcComponent,
    LuxMasterFooterAcComponent,
    LuxMasterHeaderContentAcComponent,
    LuxMasterHeaderAcComponent,
    LuxMasterDetailAcComponent,
    LuxMasterListAcComponent,
    LuxDetailHeaderAcComponent,
    LuxCheckboxContainerAcComponent
  ],
  exports: [
    LuxAppHeaderComponent,
    LuxAppFooterComponent,
    LuxListItemComponent,
    LuxListItemIconComponent,
    LuxListItemContentComponent,
    LuxListComponent,
    LuxTabComponent,
    LuxTabsComponent,
    LuxCardComponent,
    LuxCardInfoComponent,
    LuxCardContentComponent,
    LuxCardContentExpandedComponent,
    LuxCardActionsComponent,
    LuxAccordionComponent,
    LuxPanelComponent,
    LuxPanelContentComponent,
    LuxPanelActionComponent,
    LuxPanelHeaderTitleComponent,
    LuxPanelHeaderDescriptionComponent,
    LuxStepperComponent,
    LuxStepComponent,
    LuxStepHeaderComponent,
    LuxStepContentComponent,
    LuxDividerComponent,
    LuxAppHeaderRightNavComponent,
    LuxSideNavComponent,
    LuxSideNavFooterComponent,
    LuxSideNavHeaderComponent,
    LuxSideNavItemComponent,
    LuxAppContentComponent,
    LuxStepperHorizontalComponent,
    LuxStepperNavButtonsComponent,
    LuxStepperVerticalComponent,
    LuxStepperLargeComponent,
    LuxAppHeaderActionNavComponent,
    LuxAppHeaderActionNavItemComponent,
    LuxAppHeaderActionNavItemCustomComponent,
    LuxLangSelectComponent,
    LuxStepperLargeComponent,
    LuxStepperLargeStepComponent,
    LuxStepperLargeMobileOverlayComponent,
    LuxAppHeaderAcComponent,
    LuxAppHeaderAcUserMenuComponent,
    LuxAppHeaderAcNavMenuComponent,
    LuxTileComponent,
    LuxTileAcComponent,
    LuxAppHeaderActionNavItemCustomComponent,
    LuxAppHeaderAcNavMenuItemComponent,
    LuxAppHeaderAcActionNavComponent,
    LuxAppHeaderAcActionNavItemComponent,
    LuxAppHeaderAcActionNavItemCustomComponent,
    LuxDetailViewAcComponent,
    LuxDetailWrapperAcComponent,
    LuxMasterFooterAcComponent,
    LuxMasterHeaderContentAcComponent,
    LuxMasterHeaderAcComponent,
    LuxMasterDetailAcComponent,
    LuxMasterListAcComponent,
    LuxDetailHeaderAcComponent,
    LuxCheckboxContainerAcComponent
  ],
  providers: []
})
export class LuxLayoutModule {}

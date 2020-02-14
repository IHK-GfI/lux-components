import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LuxAriaLabelDirective } from './lux-aria/lux-aria-label.directive';
import { MatBadgeModule, MatRippleModule, MatTooltipModule } from '@angular/material';
import { LuxInfiniteScrollDirective } from './lux-infinite-scroll/lux-infinite-scroll.directive';
import { LuxTagIdDirective } from './lux-tag-id/lux-tag-id.directive';
import { LuxTooltipDirective } from './lux-tooltip/lux-tooltip.directive';
import { LuxTabIndexDirective } from './lux-tabindex/lux-tab-index.directive';
import { LuxComponentsConfigModule } from '../lux-components-config/lux-components-config.module';
import { LuxRippleDirective } from './lux-ripple/lux-ripple.directive';
import { LuxAriaExpandedDirective } from './lux-aria/lux-aria-expanded.directive';
import { LuxAriaRoleDirective } from './lux-aria/lux-aria-role.directive';
import { LuxAriaHaspopupDirective } from './lux-aria/lux-aria-haspopup.directive';
import { LuxAriaHiddenDirective } from './lux-aria/lux-aria-hidden.directive';
import { LuxAriaDescribedbyDirective } from './lux-aria/lux-aria-describedby.directive';
import { LuxAriaInvalidDirective } from './lux-aria/lux-aria-invalid.directive';
import { LuxAriaRequiredDirective } from './lux-aria/lux-aria-required.directive';
import { LuxAriaLabelledbyDirective } from './lux-aria/lux-aria-labelledby.directive';
import { LuxBadgeNotificationDirective } from './lux-badge-notification/lux-badge-notification.directive';

@NgModule({
  imports: [CommonModule, MatTooltipModule, MatBadgeModule, MatRippleModule, LuxComponentsConfigModule],
  declarations: [
    LuxInfiniteScrollDirective,
    LuxTagIdDirective,
    LuxTooltipDirective,
    LuxTabIndexDirective,
    LuxRippleDirective,
    LuxTabIndexDirective,
    LuxAriaLabelDirective,
    LuxAriaExpandedDirective,
    LuxAriaRoleDirective,
    LuxAriaHaspopupDirective,
    LuxAriaHiddenDirective,
    LuxAriaDescribedbyDirective,
    LuxAriaInvalidDirective,
    LuxAriaRequiredDirective,
    LuxAriaLabelledbyDirective,
    LuxTabIndexDirective,
    LuxBadgeNotificationDirective
  ],
  exports: [
    LuxInfiniteScrollDirective,
    LuxTagIdDirective,
    LuxTooltipDirective,
    LuxTabIndexDirective,
    LuxAriaLabelDirective,
    LuxAriaExpandedDirective,
    LuxAriaRoleDirective,
    LuxAriaHaspopupDirective,
    LuxAriaHiddenDirective,
    LuxAriaDescribedbyDirective,
    LuxAriaInvalidDirective,
    LuxAriaRequiredDirective,
    LuxAriaLabelledbyDirective,
    LuxTabIndexDirective,
    LuxBadgeNotificationDirective,
    LuxAriaLabelledbyDirective,
    LuxTabIndexDirective,
    LuxRippleDirective
  ]
})
export class LuxDirectivesModule {}

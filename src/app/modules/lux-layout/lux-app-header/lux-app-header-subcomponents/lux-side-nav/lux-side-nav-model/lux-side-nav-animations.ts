import { animate, state, style, transition, trigger } from '@angular/animations';

const ANIMATION_DURATION = '200ms';

/**
 * Animation für das Herein-Sliden der Seitennavigation von Links in den Contentbereich hinein und wieder zurück.
 */
export const sideNavAnimation = trigger('expandHide', [
  state(
    'void',
    style({
      opacity: '0'
    }),
    { params: { width: '100%' } }
  ),
  state(
    'expanded',
    style({
      opacity: '1'
    }),
    { params: { width: '100%' } }
  ),
  transition('void => expanded', [animate(ANIMATION_DURATION)]),
  transition('expanded => void', [animate(ANIMATION_DURATION)])
]);

/**
 * Animation um das Overlay für die Sidebar ein- und auszublenden.
 */
export const sideNavOverlayAnimation = trigger('expandHideOverlay', [
  state(
    'void',
    style({
      opacity: '0'
    })
  ),
  state(
    'expanded',
    style({
      opacity: '1'
    })
  ),
  transition('void => expanded', [animate(ANIMATION_DURATION)]),
  transition('expanded => void', [animate(ANIMATION_DURATION)])
]);

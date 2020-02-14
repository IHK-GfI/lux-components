import { animate, style, transition, trigger } from '@angular/animations';

/**
 * Animation für das Aus- und Einklappen des erweiterten Karteninhalts.
 */
export const expansionAnim = trigger('expansionAnim', [
  transition(
    'void => expand',
    [
      style({ height: '0', opacity: 0 }),
      animate(
        '{{ duration }}ms',
        style({
          height: '*',
          opacity: 1
        })
      )
    ],
    { params: { duration: '300ms', startHeight: '0' } }
  ),

  transition(
    'expand => void',
    [
      style({ height: '*', opacity: 1 }),
      animate(
        '{{ duration }}ms',
        style({
          height: '0',
          opacity: 0
        })
      )
    ],
    { params: { duration: '300ms', startHeight: '0' } }
  )
]);

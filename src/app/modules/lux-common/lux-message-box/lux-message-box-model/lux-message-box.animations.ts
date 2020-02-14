import { animate, style, transition, trigger } from '@angular/animations';

/**
 * Animation für das Aus- und Einklappen der LuxMessageBox.
 */
export const visibilityTrigger = trigger('messageBoxVisibility', [
  transition(':enter', [
    style({ transform: 'translateY(-100%)', height: 0 }),
    animate('.5s', style({ transform: 'translateY(0)', height: '*' }))
  ]),
  transition(':leave', [
    style({ transform: 'translateY(0)', height: '*' }),
    animate('.5s', style({ transform: 'translateY(-100%)', height: 0 }))
  ])
]);

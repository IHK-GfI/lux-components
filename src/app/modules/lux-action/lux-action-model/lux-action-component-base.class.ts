import { EventEmitter, Input, Output, Directive } from '@angular/core';

/**
 * Base-Klasse der LuxActionComponents.
 *
 * Enthält die Inputs/Outputs, die allen Action-Components gleich sind.
 */
export class LuxActionComponentBaseClass {
  @Input() luxLabel: string;
  @Input() luxColor: 'primary' | 'accent' | 'warn' | '' = '';
  @Input() luxRaised: boolean;
  @Input() luxIconName: string;
  @Input() luxTagId: string;
  @Input() luxDisabled: boolean;
  @Input() luxRounded: boolean;
  @Input() luxIconAlignWithLabel: boolean = false;

  @Output() luxClicked: EventEmitter<any> = new EventEmitter();
}

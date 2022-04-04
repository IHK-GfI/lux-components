import {Directive, EventEmitter, Input, Output} from '@angular/core';

/**
 * Base-Klasse der LuxActionComponents.
 *
 * Enthält die Inputs/Outputs, die allen Action-Components gleich sind.
 */
@Directive() // Angular 9 (Ivy) ignoriert @Input(), @Output() in Klassen ohne @Directive() oder @Component().
export class LuxActionComponentBaseClass {
  @Input() luxLabel: string;
  @Input() luxColor: 'primary' | 'accent' | 'warn' | '' = '';
  @Input() luxRaised: boolean;
  @Input() luxIconName: string;
  @Input() luxIconShowRight = false;
  @Input() luxTagId: string;
  @Input() luxDisabled: boolean;
  @Input() luxRounded: boolean;
  @Input() luxStroked: boolean;
  @Input() luxIconAlignWithLabel = false;

  @Output() luxClicked: EventEmitter<any> = new EventEmitter();
}

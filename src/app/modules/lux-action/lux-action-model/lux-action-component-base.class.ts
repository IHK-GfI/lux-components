import { Directive, EventEmitter, Input, Output } from '@angular/core';

export declare type LuxActionColorType = 'primary' | 'accent' | 'warn' | undefined;

/**
 * Base-Klasse der LuxActionComponents.
 *
 * Enthält die Inputs/Outputs, die allen Action-Components gleich sind.
 */
@Directive() // Angular 9 (Ivy) ignoriert @Input(), @Output() in Klassen ohne @Directive() oder @Component().
export class LuxActionComponentBaseClass {
  @Input() luxLabel = '';
  @Input() luxColor?: LuxActionColorType;
  @Input() luxRaised = false;
  @Input() luxIconName = '';
  @Input() luxIconShowRight = false;
  @Input() luxTagId: string | null = null;
  @Input() luxDisabled = false;
  @Input() luxRounded = false;
  @Input() luxIconAlignWithLabel = false;

  @Output() luxClicked: EventEmitter<MouseEvent> = new EventEmitter();
}

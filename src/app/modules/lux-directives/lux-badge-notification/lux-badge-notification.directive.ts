import {
  Directive,
  DoCheck,
  ElementRef,
  Input,
  NgZone,
  OnChanges,
  Optional,
  Renderer2,
  SimpleChanges
} from '@angular/core';
import { MatBadge } from '@angular/material';
import { AriaDescriber } from '@angular/cdk/a11y';
import { LuxUtil } from '../../lux-util/lux-util';

@Directive({
  selector: '[luxBadgeNotification], [lux-badge-notification]',
  host: {
    class: 'mat-badge',
    '[class.mat-badge-overlap]': 'overlap',
    '[class.mat-badge-above]': 'isAbove()',
    '[class.mat-badge-below]': '!isAbove()',
    '[class.mat-badge-before]': '!isAfter()',
    '[class.mat-badge-after]': 'isAfter()',
    '[class.mat-badge-small]': 'size === "small"',
    '[class.mat-badge-medium]': 'size === "medium"',
    '[class.mat-badge-large]': 'size === "large"',
    '[class.mat-badge-hidden]': 'hidden || isHidden()',
    '[class.mat-badge-disabled]': 'disabled',
    '[class.lux-badge-color-default]': 'color !== "primary" && color !== "warn" && color !== "accent"'
  }
})
export class LuxBadgeNotificationDirective extends MatBadge implements OnChanges, DoCheck {
  @Input() luxBadgeNotification: string;
  @Input() luxBadgeColor: 'primary' | 'warn' | 'accent' | string = 'default';
  @Input() luxBadgeSize: 'small' | 'medium' | 'large' = 'medium';
  @Input() luxBadgePosition: 'above after' | 'above before' | 'below before' | 'below after' = 'above after';
  @Input() luxBadgeDisabled: boolean = false;
  @Input() luxBadgeHidden: boolean = false;
  @Input() luxBadgeOverlap: boolean = true;
  @Input() luxBadgeCap: number;

  constructor(
    private luxNgZone: NgZone,
    private luxElementRef: ElementRef<HTMLElement>,
    private luxAriaDescriber: AriaDescriber,
    @Optional() private luxRenderer: Renderer2
  ) {
    super(luxNgZone, luxElementRef, luxAriaDescriber, luxRenderer);

    luxElementRef.nativeElement.classList.add('lux-badge-notification');
  }

  ngOnChanges(changes: SimpleChanges) {
    this.updateContent(this.luxBadgeNotification);
    this.color = <any>this.luxBadgeColor;
    this.size = this.luxBadgeSize;
    this.position = this.luxBadgePosition;
    this.disabled = this.luxBadgeDisabled;
    this.hidden = !!this.luxBadgeHidden;
    this.overlap = this.luxBadgeOverlap;
  }

  ngDoCheck() {
    this.checkMaxNumber();
  }

  updateContent(value: any) {
    let newContent = value;

    if (typeof newContent === 'number') {
      // Wenn der Wert eine Zahl ist, muss dieser für die Weiterverarbeitung in einen String umgewandelt werden.
      newContent = '' + newContent;
    } else if (!newContent) {
      // Die Werte "undefined" und "null" zum Leerstring umwandeln,
      // damit diese nicht angezeigt werden.
      newContent = '';
    }

    this.content = newContent;
    this.description = newContent;
  }

  isHidden(): boolean {
    return this.hidden || !this.content;
  }

  /**
   * Prüft ob der Inhalt eine Zahl, eine Maximalzahl gegeben und diese überschritten worden ist.
   * Wenn ja, wird der Inhalt mit einem "+" abgekürzt.
   */
  private checkMaxNumber() {
    if (this.luxBadgeNotification && this.luxBadgeCap && LuxUtil.isNumber(this.luxBadgeNotification)) {
      if (+this.luxBadgeNotification > this.luxBadgeCap) {
        this.updateContent(this.luxBadgeCap + '+');
      }
    }
  }
}

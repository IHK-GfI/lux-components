import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'lux-step',
  template: `
    <ng-template #header>
      <ng-content select="lux-step-header"></ng-content>
    </ng-template>
    <ng-template #content>
      <ng-content select="lux-step-content"></ng-content>
    </ng-template>
  `
})
export class LuxStepComponent {
  private _iconChange: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private _luxIconName: string = undefined;

  @ViewChild('header', { static: true }) headerTemplate: TemplateRef<any>;
  @ViewChild('content', { static: true }) contentTemplate: TemplateRef<any>;

  @Input() luxIconSize = '1x';
  @Input() luxOptional = false;
  @Input() luxEditable = true;
  @Input() luxCompleted = true;
  @Input() luxStepControl: FormGroup;

  get luxIconName(): string {
    return this._luxIconName;
  }

  @Input()
  set luxIconName(iconName: string) {
    this._luxIconName = iconName;
    this._iconChange.next(true);
  }

  getIconChangeObsv(): Observable<boolean> {
    return this._iconChange.asObservable();
  }

  constructor() {}

  /**
   * Gibt an, ob der Step als abgeschlossen gilt.
   *
   * Möglichkeiten:
   *  1. Hat ein luxStepControl, welches valid ist
   *  2. Der Wert luxCompleted ist true
   *  3. Der Wert luxOptional ist true
   */
  isCompleted() {
    if (this.luxStepControl) {
      return this.luxStepControl.valid;
    }
    return this.luxCompleted || this.luxOptional;
  }
}

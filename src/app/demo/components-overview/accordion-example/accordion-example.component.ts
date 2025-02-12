import { Component } from '@angular/core';
import { LuxModeType, LuxTogglePosition } from '../../../modules/lux-layout/lux-accordion/lux-accordion.component';
import { logResult } from '../../example-base/example-base-util/example-base-helper';
import { LuxAccordionColor } from 'src/app/modules/lux-util/lux-colors.enum';

@Component({
  selector: 'app-accordion-example',
  templateUrl: './accordion-example.component.html',
  styleUrls: ['./accordion-example.component.scss']
})
export class AccordionExampleComponent {
  showOutputEvents = false;
  log = logResult;
  displayModes = ['flat', 'default'];
  disabled = false;
  disabled1Panel = false;
  disabled2Panel = false;
  hideToggle = false;
  hideToggle1Panel = false;
  hideToggle2Panel = false;
  expanded = true;
  expandedHeaderHeight = '4em';
  collapsedHeaderHeight = '4em';
  expandedHeaderHeight1Panel = '4em';
  collapsedHeaderHeight1Panel = '4em';
  expandedHeaderHeight2Panel = '4em';
  collapsedHeaderHeight2Panel = '4em';
  _displayMode: LuxModeType = 'default';
  colorOptions = ['primary', 'accent', 'warn', 'neutral'];
  color: LuxAccordionColor = 'primary';
  togglePositions = ['after', 'before'];
  _togglePosition: LuxTogglePosition = 'after';

  set displayMode(mode: LuxModeType) {
    // Der Multimode muss auf true gesetzt werden damit immer alle Panels aufgeklappt werden. Sonst wird nur das Custom Panel aufgeklappt wenn der Multimode vorher deaktiviert wurde.
    this.multiMode = true;
    this.expanded = false;
    this._displayMode = mode;
    setTimeout(() => (this.expanded = true));
  }

  get displayMode() {
    return this._displayMode;
  }

  set togglePosition(position: LuxTogglePosition) {
    this._togglePosition = position;
  }

  get togglePosition(){
    return this._togglePosition;
  }

  onColorChanged(_color: LuxAccordionColor ) {
      this.color = _color;
    }

  panelConfigArr: { title: string; description: string }[] = [
    { title: 'Panel #1 -  Hauptüberschrift im Panel', description: 'Optionale zusätzliche Beschreibung' },
    { title: 'Panel #2', description: 'Beschreibung Panel #2' }
  ];
  _multiMode = true;

  get multiMode() {
    return this._multiMode;
  }

  set multiMode(multiMode: boolean) {
    this._multiMode = multiMode;

    if (!multiMode) {
      this.expanded = false;
    }
  }

  constructor() {}
}

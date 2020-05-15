import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { LuxSanitizeConfig } from '../lux-sanitize/lux-sanitize-config';

@Component({
  selector: 'lux-html',
  templateUrl: './lux-html.component.html',
  styleUrls: ['./lux-html.component.scss']
})
export class LuxHtmlComponent {
  @Input() luxData = '';
  @Input() luxSanitizeConfig: LuxSanitizeConfig;
  @Input() luxFlex = 'flex';
  @Input() luxStyle = '';
  @Input() luxClass = '';

  @ViewChild('content', { read: ElementRef }) contentRef: ElementRef;

  constructor() {}
}

import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { marked } from 'marked';
import { LuxHtmlComponent } from '../../lux-html/lux-html/lux-html.component';
import { LuxSanitizeConfig } from '../../lux-html/lux-sanitize/lux-sanitize-config';
import { LuxUtil } from '../../lux-util/lux-util';

@Component({
  selector: 'lux-markdown',
  templateUrl: './lux-markdown.component.html',
  styleUrls: ['./lux-markdown.component.scss']
})
export class LuxMarkdownComponent implements AfterViewInit {
  @Input() luxSanitizeConfig?: LuxSanitizeConfig;
  @Input() luxFlex = 'flex';
  @Input() luxStyle = '';
  @Input() luxClass = '';

  _luxData = '';

  @Input()
  set luxData(markdownData: string) {
    this._luxData = markdownData ? marked(markdownData) : '';
  }

  get luxData() {
    return this._luxData;
  }

  @ViewChild('content') contentComponent!: LuxHtmlComponent;
  @ViewChild('content', { read: ElementRef }) contentRef!: ElementRef;

  constructor() {}

  ngAfterViewInit() {
    LuxUtil.assertNonNull('contentComponent', this.contentComponent);
    LuxUtil.assertNonNull('contentRef', this.contentRef);
  }
}

import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import marked from 'marked/lib/marked';
import { LuxHtmlComponent } from '../../lux-html/lux-html/lux-html.component';
import { LuxSanitizeConfig } from '../../lux-html/lux-sanitize/lux-sanitize-config';

@Component({
  selector: 'lux-markdown',
  templateUrl: './lux-markdown.component.html',
  styleUrls: ['./lux-markdown.component.scss']
})
export class LuxMarkdownComponent implements OnInit {
  @Input() luxSanitizeConfig: LuxSanitizeConfig;
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

  @ViewChild('content') contentComponent: LuxHtmlComponent;
  @ViewChild('content', { read: ElementRef }) contentRef: ElementRef;

  constructor() {}

  ngOnInit(): void {}
}

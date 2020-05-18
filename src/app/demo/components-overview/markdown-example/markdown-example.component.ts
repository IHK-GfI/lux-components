import { Component, OnInit, ViewChild } from '@angular/core';
import { LuxMarkdownComponent } from '../../../modules/lux-markdown/lux-markdown/lux-markdown.component';
import { LuxSanitizeConfig } from '../../../modules/lux-html/lux-sanitize/lux-sanitize-config';

@Component({
  selector: 'lux-markdown-example',
  templateUrl: './markdown-example.component.html'
})
export class MarkdownExampleComponent implements OnInit {
  @ViewChild(LuxMarkdownComponent) markdownComponent: LuxMarkdownComponent;

  flex = 'flex';
  style = '';
  class = '';

  sanitizeConfig: LuxSanitizeConfig;

  _forbiddenTagsToggle = false;
  forbiddenTags = 'a,b';
  forbiddenAttributes = 'style,class';

  _allowedTagsToggle = false;
  allowedTags = 'h1,p,span';
  allowedAttributes = 'class,style';

  _addAllowedTagsToggle = false;
  addAllowedTags = '';
  addAllowedAttributes = 'target';

  markdownData = `# Title
## Subtitle
Show doch mal bei der [IHK-GfI](https://www.ihk-gfi.de) vorbei!

Hier ist noch einmal der LinK <a href="https://www.ihk-gfi.de" target="_blank">IHK-GfI</a> aber diesen Mal mit
Target-Attribut. Das Target-Attribut ist im Standard deaktiviert, kann über den Tab "Erweitert" aktiviert werden.

### Tabelle

| Name | Version | Beschreibung |
| --- | --- | --- |
| Lorem ipsum | dolor sit amet | consetetur sadipscing elitr |
| sed diam | nonumy eirmod tempor | invidunt ut labore et dolore magna aliquyam |

### Aufzählung
1. A
1. B
 1. B1
 1. B2
1. C

- A
- B
 - B1
 - B2
- C`;

  set forbiddenTagsToggle(toggle: boolean) {
    this._forbiddenTagsToggle = toggle;

    if (this._forbiddenTagsToggle) {
      this._allowedTagsToggle = false;
      this._addAllowedTagsToggle = false;
    }
    this.updateTags();
  }

  get forbiddenTagsToggle() {
    return this._forbiddenTagsToggle;
  }

  set allowedTagsToggle(toggle: boolean) {
    this._allowedTagsToggle = toggle;

    if (this._allowedTagsToggle) {
      this._forbiddenTagsToggle = false;
      this._addAllowedTagsToggle = false;
    }
    this.updateTags();
  }

  get allowedTagsToggle() {
    return this._allowedTagsToggle;
  }

  set addAllowedTagsToggle(toggle: boolean) {
    this._addAllowedTagsToggle = toggle;

    if (this._addAllowedTagsToggle) {
      this._forbiddenTagsToggle = false;
      this._allowedTagsToggle = false;
    }
    this.updateTags();
  }

  get addAllowedTagsToggle() {
    return this._addAllowedTagsToggle;
  }

  constructor() {}

  ngOnInit(): void {}

  updateTags() {
    const newConfig: LuxSanitizeConfig = {};
    if (this.forbiddenTagsToggle) {
      newConfig.forbiddenTags = this.forbiddenTags.split(',');
      newConfig.forbiddenAttrs = this.forbiddenAttributes.split(',');
    }

    if (this.allowedTagsToggle) {
      newConfig.allowedTags = this.allowedTags.split(',');
      newConfig.allowedAttrs = this.allowedAttributes.split(',');
    }

    if (this.addAllowedTagsToggle) {
      newConfig.addAllowedTags = this.addAllowedTags.split(',');
      newConfig.addAllowedAttrs = this.addAllowedAttributes.split(',');
    }

    if (JSON.stringify(this.sanitizeConfig) !== JSON.stringify(newConfig)) {
      this.sanitizeConfig = newConfig;
      console.log(this.sanitizeConfig);
    }
  }
}

import { Component } from '@angular/core';
import { LuxSanitizeConfig } from '../../../modules/lux-html/lux-sanitize/lux-sanitize-config';

@Component({
  selector: 'lux-html-example',
  templateUrl: './html-example.component.html'
})
export class HtmlExampleComponent {
  htmlData = `<h1>Lorem ipsum</h1>
<p>
  <b>Lorem ipsum</b> dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
   dolore magna aliquyam erat, sed diam voluptua.<script>alert('Unsicher!!!!')</script>
   At vero eos et accusam et justo duo dolores et ea rebum.
</p>

<p>Stet clita kasd gubergren, no sea takimata sanctus est
  <span style="color: #b01211; font-weight: bold">Lorem ipsum</span> dolor sit amet. Lorem ipsum dolor sit amet,
  consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et doloremagna aliquyam erat,
  sed diam voluptua.</p>

<p>Schau doch mal bei der <a href="https://www.ihk-gfi.de" target="_blank">IHK-Gfi</a> vorbei. </p>`;

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

import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import DOMPurify from 'dompurify';
import { LuxSanitizeConfig } from './lux-sanitize-config';

@Pipe({
  name: 'luxSanitize'
})
export class LuxSanitizePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  public transform(value: any, config?: LuxSanitizeConfig): SafeHtml {
    // Hier wird zuerst eine Kopie des Config-Objekts erstellt,
    // damit keiner nachträglich die Werte ändern kann.
    // Die Properties in DOMPurify sind nämlich readonly.
    const newConfig: LuxSanitizeConfig = {};
    Object.assign(newConfig, config);

    if (value) {
      if (newConfig && newConfig.allowedTags) {
        newConfig['ALLOWED_TAGS'] = newConfig.allowedTags;
      }

      if (newConfig && newConfig.allowedAttrs) {
        newConfig['ALLOWED_ATTR'] = newConfig.allowedAttrs;
      }

      if (newConfig && newConfig.addAllowedTags) {
        newConfig['ADD_TAGS'] = newConfig.addAllowedTags;
      }

      if (newConfig && newConfig.addAllowedAttrs) {
        newConfig['ADD_ATTR'] = newConfig.addAllowedAttrs;
      }

      if (newConfig && newConfig.forbiddenTags) {
        newConfig['FORBID_TAGS'] = newConfig.forbiddenTags;
      }

      if (newConfig && newConfig.forbiddenAttrs) {
        newConfig['FORBID_ATTR'] = newConfig.forbiddenAttrs;
      }

      return this.sanitizer.bypassSecurityTrustHtml(DOMPurify.sanitize(value, newConfig));
    } else {
      return '';
    }
  }
}

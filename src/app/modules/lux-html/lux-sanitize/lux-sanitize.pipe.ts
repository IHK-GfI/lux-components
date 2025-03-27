import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
//@ts-ignore ToDo: Wenn man wieder auf NpmJs zugreifen kann, dass Package "@types/dompurify" ergänzen
import DOMPurify, { Config } from 'dompurify';
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
      return this.sanitizer.bypassSecurityTrustHtml(DOMPurify.sanitize(value, this.createConfig(newConfig)));
    } else {
      return '';
    }
  }

  createConfig(config: LuxSanitizeConfig): Config & { RETURN_DOM_FRAGMENT?: false; RETURN_DOM?: false } {
    const domPurifyConfig: Config & { RETURN_DOM_FRAGMENT?: false; RETURN_DOM?: false } = { RETURN_DOM: false, RETURN_DOM_FRAGMENT: false };

    if (config && config.allowedTags) {
      domPurifyConfig.ALLOWED_TAGS = config.allowedTags;
    }

    if (config && config.allowedAttrs) {
      domPurifyConfig.ALLOWED_ATTR = config.allowedAttrs;
    }

    if (config && config.addAllowedTags) {
      domPurifyConfig.ADD_TAGS = config.addAllowedTags;
    }

    if (config && config.addAllowedAttrs) {
      domPurifyConfig.ADD_ATTR = config.addAllowedAttrs;
    }

    if (config && config.forbiddenTags) {
      domPurifyConfig.FORBID_TAGS = config.forbiddenTags;
    }

    if (config && config.forbiddenAttrs) {
      domPurifyConfig.FORBID_ATTR = config.forbiddenAttrs;
    }

    return domPurifyConfig;
  }
}

import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'parselink'
})
export class ParseLinkPipe implements PipeTransform {

  constructor(protected sanitizer: DomSanitizer) {}

  // Format [link|Text|URL] z.B [link|Spiegel-Online|https://www.spiegel.de]
  transform(text: string): SafeHtml {
    // Filter um Tags zu verhindern z.B <script>alert("Hello World")/<script>
    text = text.replace(/<[^>]+>/g, '');
    return this.sanitizer.bypassSecurityTrustHtml(text.replace(/\[link\|([\w\söäüß&%@()\-\?\!§#$€]+)\|((http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9äöüßÄÖÜ_\.\-]+\.[a-zA-Z]{2,63}[\.]{0,1}(\/.*)?)\]/g, '<a target="_blank" href="$2">$1</a>'));
  }


}

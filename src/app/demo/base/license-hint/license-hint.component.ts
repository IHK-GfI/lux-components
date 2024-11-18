import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-license-hint',
  styles: [':host { display: flex; align-items: start; justify-content: center; flex: 1 1 auto;}'],
  templateUrl: './license-hint.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LicenseHintComponent {
  licenceHintIcons = `
## Icons

In dieser Anwendung werden Streamline-Icons über das Github-Projekt [lux-components-icons-and-fonts](https://github.com/IHK-GfI/lux-components-icons-and-fonts) der IHK-GfI mbH eingebunden. Die verwendeten Icons laufen unter der Lizenz [Creative Commons 4.0 (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/). Der Urheber ist [Streamline Icons](https://www.streamlinehq.com/). Bezugsquelle: Core Line - Free (https://www.streamlinehq.com/icons/streamline-mini-line). Die Lizensierungsinformationen sind verfügbar unter https://www.streamlinehq.com/license-free. Die Icons aus dem o.g. Iconset wurden durch die IHK-GfI mbH nicht verändert. Im o.g. Github-Projekt wurden eigene Icons im selben Stil erstellt und der Sammlung unter gleicher Lizenz hinzugefügt.
Bis zur Version 14.x.x werden ebenfalls die Font-Awesome sowie Material-Icons verwendet.
  `;

  licenceHintFonts = `
## Fonts

Diese Anwendung verwendet die Schriftarten "Source Sans Pro" designed by Paul D. Hunt (lizensiert unter [SIL Open Font License V1.1](https://github.com/IHK-GfI/lux-components-icons-and-fonts/blob/master/assets/fonts/Source%20Sans%20Pro/SIL%20Open%20Font%20License%20V1.1.md)) sowie "BloggerSans" created by Sergiy Tkachenko (Lizenz: https://www.fontsquirrel.com/license/blogger-sans, lizensiert unter [Creative Commons 4.0 (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/)).
  `;

  constructor() {}
}

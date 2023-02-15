import { Component } from '@angular/core';

@Component({
  selector: 'app-license-hint',
  templateUrl: './license-hint.component.html'
})
export class LicenseHintComponent {
  licenceHintIcons = `
## Lizenzhinweis - Icons

In dieser Demo werden auch Streamline Icons verwendet.
Die Streamline Icons laufen unter der Lizenz CC-BY 4.0 und der Urheber ist „streamlinehq.com“ ("Streamline Icons Core Line free Copyright © by streamlinehq.com“).
Bezugsquelle: „[Free Core Line – Free Icons Set - 1000 customizable PNGs, SVGs, PDFs (streamlinehq.com)](https://www.streamlinehq.com/icons/streamline-mini-line)“.
Die Lizenz „[CC BY 4.0“ ist zu finden unter „[Streamline Free License | Streamline Help center (intercom.help)](https://intercom.help/streamlinehq/en/articles/5354376-streamline-free-license)“.
  `;

  licenceHintFonts = `
## Lizenzhinweis - Fonts

Über das Github-Projekt https://github.com/IHK-GfI/lux-components-icons-and-fonts können statt der bisher vorgeschlagenen Fontfamilien wie z.B. Korb, Roboo, etc.) nun auch die Schriftarten "Source Sans Pro" designed by Paul D. Hunt (Lizensiert unter [SIL 1.1 Open Font License](https://github.com/IHK-GfI/lux-components-icons-and-fonts/blob/master/assets/fonts/Source%20Sans%20Pro/SIL%20Open%20Font%20License%20V1.1.md)) sowie "BloggerSans" created by Sergiy Tkachenko (Lizensiert unter Creative Commons 4.0) verwendet werden, welche speziell für die Nutzung mit dem Theme-authentic ausgewählt wurden.
  `;

  constructor() {}
}

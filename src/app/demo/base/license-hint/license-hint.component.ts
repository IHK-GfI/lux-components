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

  constructor() {}
}

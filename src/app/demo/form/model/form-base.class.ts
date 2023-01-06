import { IUnsavedDataCheck } from '../unsaved-data-guard/unsaved-data-check.interface';
import { LuxSnackbarService } from '../../../modules/lux-popups/lux-snackbar/lux-snackbar.service';
import { HostListener, Directive, OnInit } from '@angular/core';

@Directive() // Angular 9 (Ivy) ignoriert @Input(), @Output() in Klassen ohne @Directive() oder @Component().
export abstract class FormBase implements IUnsavedDataCheck {

  protected constructor(protected snackbar: LuxSnackbarService) {}

  @HostListener('window:beforeunload', ['$event'])
  handleBeforeUnload(unloadEvent: Event) {
    // hier muss irgendwie geprüft werden, ob es ungespeicherte Daten gibt
    if (this.hasUnsavedData()) {
      unloadEvent.preventDefault();
      // Damit der Browser eine Warnung ausgibt (die je nach Browser variiert und nicht anpassbar ist), muss ein returnValue gesetzt sein.
      unloadEvent.returnValue = false;
    }
  }

  abstract  hasUnsavedData(): boolean;
}

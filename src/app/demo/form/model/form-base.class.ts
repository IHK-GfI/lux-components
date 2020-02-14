import { FormGroup } from '@angular/forms';
import { IUnsavedDataCheck } from '../unsaved-data-guard/unsaved-data-check.interface';
import { LuxSnackbarService } from '../../../modules/lux-popups/lux-snackbar/lux-snackbar.service';
import { HostListener } from '@angular/core';

export abstract class FormBase implements IUnsavedDataCheck {
  myGroup: FormGroup;

  @HostListener('window:beforeunload', ['$event'])
  handleBeforeUnload($event: any) {
    // hier muss irgendwie geprüft werden, ob es ungespeicherte Daten gibt
    if (this.hasUnsavedData()) {
      $event.preventDefault();
      // Damit der Browser eine Warnung ausgibt (die je nach Browser variiert und nicht anpassbar ist), muss ein returnValue gesetzt sein.
      $event.returnValue = '';
    }
  }

  protected constructor(protected snackbar: LuxSnackbarService) {}

  hasUnsavedData(): boolean {
    return this.myGroup.dirty;
  }

  handleSaveClicked() {
    this.myGroup.markAsPristine();

    this.snackbar.open(2000, {
      text: 'Daten gespeichert!'
    });
  }
}

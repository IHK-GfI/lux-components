import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { LuxHttpErrorInterceptor } from './lux-http-error-interceptor';
import { Subscription } from 'rxjs';
import { ILuxMessage } from '../../lux-common/lux-message-box/lux-message-box-model/lux-message.interface';

@Component({
  selector: 'lux-http-error',
  templateUrl: 'lux-http-error.component.html',
  styleUrls: ['lux-http-error.component.scss']
})
export class LuxHttpErrorComponent implements OnInit, OnDestroy, AfterViewInit {
  private subs: Subscription[] = [];

  errors: any[];

  constructor(router: Router) {
    // Beim Ansteuern einer neuen Route, die aktuellen Fehler resetten.
    router.events.forEach(event => {
      if (event instanceof NavigationStart) {
        LuxHttpErrorInterceptor.dataStream.next([]);
      }
    });
  }

  ngOnInit(): void {
    this.errors = [];
  }

  ngAfterViewInit() {
    // Wenn neue Fehler-Objekte kommen, diese umformatieren und in der LuxMessageBoxComponent anzeigen.
    this.subs.push(
      LuxHttpErrorInterceptor.dataStream$().subscribe((errors: any[]) => {
        this.updateErrors(errors);
      })
    );
  }

  ngOnDestroy(): void {
    // Alle bekannten Subscriptions auflösen.
    this.subs.forEach(sub => {
      sub.unsubscribe();
    });
  }

  /**
   * Updated das aktuelle Errors-Array mit dem übergebenen Wert.
   * Liest dabei die Message aus dem Fehler und erzeugt LuxMessage-Objekte für die LuxMessageBoxComponent.
   *
   * @param errors
   */
  private updateErrors(errors: any[]) {
    const errorMessages: ILuxMessage[] = [];
    if (errors && errors.length > 0) {
      errors.forEach((error: any) => {
        errorMessages.push({
          text: this.readErrorMessage(error),
          color: 'red',
          iconName: 'fa-bug'
        });
      });
    }
    setTimeout(() => {
      this.errors = errorMessages;
    });
  }

  /**
   * Versucht eine Fehlermeldung aus dem Fehler zu lesen.
   * Zuerst wird geschaut, ob der Fehler selbst nur ein String ist ==> Wenn ja, diesen zurückgeben.
   * Dann wird geprüft, ob der Fehler eine "message"-Property besitzt ==> Wenn ja, diese zurückgeben
   * Als letzter Ausweg wird das "error"-Objekt selbst über die toString-Methode zurückgegeben.
   *
   * @param error
   */
  private readErrorMessage(error: any): string {
    if (typeof error === 'string') {
      return error;
    } else if (error.hasOwnProperty('message')) {
      return error['message'];
    } else {
      return error.toString();
    }
  }
}

import { Component } from '@angular/core';
import { LuxHttpErrorInterceptor } from '../../../modules/lux-error/lux-http-error/lux-http-error-interceptor';

type Errors = Error[];

interface Error {
  name: string;
  message: string;
}

@Component({
  selector: 'app-http-error-example',
  templateUrl: 'http-error-example.component.html',
  styleUrls: ['http-error-example.component.scss']
})
export class HttpErrorExampleComponent {
  private sampleErrorStructure = {
    status: '400',
    errors: this.mapErrors([
      ['vorname', 'Der Vorname darf nicht leer sein.'],
      ['nachname', 'Der Nachname darf nicht leer sein.'],
      ['id', 'Die ID existiert nicht.'],
      [
        'test',
        'Lorem ipsum dolor sit amet, consetetur\n' +
          ' sadipscing elitr, sed diam nonumy eirmod tempor inviduntutlaboreetdolore magna aliquyam erat,\n' +
          ' sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.\n'
      ]
    ])
  };

  disabled = true;

  constructor() {}

  createErrors() {
    LuxHttpErrorInterceptor.dataStream.next(this.sampleErrorStructure.errors);
    this.disabled = false;
  }

  createErrorMessageStrings() {
    LuxHttpErrorInterceptor.dataStream.next(['An error has occured.', 'Content couldn\'t be loaded.']);
    this.disabled = false;
  }

  createErrorToStringObjects() {
    LuxHttpErrorInterceptor.dataStream.next([
      { toString: () => 'Permission denied.' },
      { toString: () => 'An error has occured.' }
    ]);
    this.disabled = false;
  }

  clearErrors() {
    LuxHttpErrorInterceptor.dataStream.next(null);
    this.disabled = true;
  }

  private mapErrors(args: Array<[string, string]>): Errors {
    return args.map(([k, v]) => ({ name: k, message: v }));
  }
}

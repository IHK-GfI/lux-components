import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { LuxErrorService } from '../../../modules/lux-error/lux-error-page/lux-error-services/lux-error-service';
import { LuxConsoleService } from '../../../modules/lux-util/lux-console.service';
import { ILuxErrorPageConfig } from '../../../modules/lux-error/lux-error-page/lux-error-interfaces/lux-error-page-config.interface';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ILuxError } from '../../../modules/lux-error/lux-error-page/lux-error-interfaces/lux-error.interface';
import { LuxErrorStoreService } from '../../../modules/lux-error/lux-error-page/lux-error-services/lux-error-store.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-errorpage-example',
  templateUrl: './errorpage-example.component.html',
  styleUrls: ['./errorpage-example.component.scss']
})
export class ErrorpageExampleComponent implements AfterViewInit, OnDestroy {
  errorConfig: ILuxError = { errorId: '1234', errorMessage: 'Es ist ein Fehler aufgetreten.' };
  errorPageConfig: ILuxErrorPageConfig;
  updateButtonDisabled = true;
  configForm: UntypedFormGroup;
  subscription!: Subscription;

  constructor(private errorService: LuxErrorService, private errorStore: LuxErrorStoreService, private logger: LuxConsoleService) {
    this.errorPageConfig = this.errorStore.config;
    this.configForm = new UntypedFormGroup({});
    Object.keys(this.errorPageConfig).forEach((key: string) => {
      this.configForm.setControl(key, new UntypedFormControl(this.errorPageConfig[key]));
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit() {
    this.subscription = this.configForm.valueChanges.subscribe(() => {
      this.updateButtonDisabled = false;

      this.errorPageConfig = this.configForm.value;
    });
  }

  openErrorpage() {
    this.errorService.navigateToErrorPage(this.errorConfig);
    this.logger.log(this.errorStore.lastErrors);
  }

  updateErrorConfig() {
    this.errorService.setConfig(this.errorPageConfig);
    this.updateButtonDisabled = true;
  }
}

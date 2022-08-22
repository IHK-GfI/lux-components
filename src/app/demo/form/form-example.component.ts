import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormCommonComponent } from './form-common/form-common.component';
import { FormDualColComponent } from './form-dual-col/form-dual-col.component';
import { FormSingleColComponent } from './form-single-col/form-single-col.component';
import { FormThreeColComponent } from './form-three-col/form-three-col.component';
import { IUnsavedDataCheck } from './unsaved-data-guard/unsaved-data-check.interface';
import { LuxAppFooterButtonService } from '../../modules/lux-layout/lux-app-footer/lux-app-footer-button.service';
import { LuxAppFooterButtonInfo } from '../../modules/lux-layout/lux-app-footer/lux-app-footer-button-info';
import { LuxUtil } from '../../modules/lux-util/lux-util';
import { LuxTabsComponent } from '../../modules/lux-layout/lux-tabs/lux-tabs.component';
import { LuxSnackbarService } from '../../modules/lux-popups/lux-snackbar/lux-snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-example',
  templateUrl: './form-example.component.html'
})
export class FormExampleComponent implements IUnsavedDataCheck, OnInit, OnDestroy {
  @ViewChild(FormCommonComponent) formCommon!: FormCommonComponent;
  @ViewChild(FormSingleColComponent) formSingle!: FormSingleColComponent;
  @ViewChild(FormDualColComponent) formDuo!: FormDualColComponent;
  @ViewChild(FormThreeColComponent) formThree!: FormThreeColComponent;
  @ViewChild(LuxTabsComponent) tabComponent!: LuxTabsComponent;

  btnShowErrors = LuxAppFooterButtonInfo.generateInfo({
    cmd: 'btnShowErrors',
    label: 'Fehler anzeigen',
    iconName: 'fas fa-exclamation',
    raised: true,
    alwaysVisible: false,
    onClick: this.highlightErrors.bind(this)
  });

  btnSave = LuxAppFooterButtonInfo.generateInfo({
    cmd: 'btnSave',
    label: 'Speichern',
    iconName: 'fas fa-save',
    raised: true,
    color: 'primary',
    alwaysVisible: false,
    onClick: this.handleSaveClicked.bind(this)
  });

  constructor(private router: Router, private buttonService: LuxAppFooterButtonService, private snackbar: LuxSnackbarService) {}

  ngOnInit(): void {
    this.buttonService.buttonInfos = [this.btnShowErrors, this.btnSave, LuxAppFooterButtonInfo.generateInfo({
      label: 'Dokumentation',
      iconName: 'fas fa-external-link-alt',
      cmd: 'documentation-btn',
      color: 'primary',
      raised: true,
      alwaysVisible: true,
      onClick: () => {
        window.open('https://github.com/IHK-GfI/lux-components/wiki/lux%E2%80%90layout%E2%80%90form%E2%80%90row', '_blank');
      }
    }),
      LuxAppFooterButtonInfo.generateInfo({
        label: 'Overview',
        iconName: 'fas fa-caret-left',
        cmd: 'back-btn',
        color: 'primary',
        raised: true,
        alwaysVisible: false,
        onClick: () => {
          this.router.navigate(['/']);
        }
      })];
  }

  ngOnDestroy(): void {
    this.buttonService.buttonInfos = [];
  }

  hasUnsavedData(): boolean {
    return (
      this.formCommon.myGroup.dirty ||
      this.formSingle.myGroup.dirty ||
      this.formDuo.myGroup.dirty ||
      this.formThree.myGroup.dirty
    );
  }

  handleSaveClicked() {
    switch (this.tabComponent.luxActiveTab) {
      case 0:
        this.formCommon.myGroup.markAsPristine();
        break;
      case 1:
        this.formSingle.myGroup.markAsPristine();
        break;
      case 2:
        this.formDuo.myGroup.markAsPristine();
        break;
      case 3:
        this.formThree.myGroup.markAsPristine();
        break;
      default:
        break;
    }

    this.snackbar.open(2000, {
      text: 'Daten gespeichert!'
    });
  }

  highlightErrors() {
    switch (this.tabComponent.luxActiveTab) {
      case 0:
        LuxUtil.showValidationErrors(this.formCommon.myGroup);
        break;
      case 1:
        LuxUtil.showValidationErrors(this.formSingle.myGroup);
        break;
      case 2:
        LuxUtil.showValidationErrors(this.formDuo.myGroup);
        break;
      case 3:
        LuxUtil.showValidationErrors(this.formThree.myGroup);
        break;
      default:
        break;
    }
  }
}

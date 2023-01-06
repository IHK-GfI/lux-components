import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { LuxActionModule } from '../lux-action/lux-action.module';
import { LuxComponentsConfigModule } from '../lux-components-config/lux-components-config.module';
import { LuxDirectivesModule } from '../lux-directives/lux-directives.module';
import { LuxIconModule } from '../lux-icon/lux-icon.module';
import { LuxLayoutModule } from '../lux-layout/lux-layout.module';
import { LuxPipesModule } from '../lux-pipes/lux-pipes.module';
import { LuxPopupsModule } from "../lux-popups/lux-popups.module";
import { LuxAutocompleteComponent } from './lux-autocomplete/lux-autocomplete.component';
import { LuxCheckboxComponent } from './lux-checkbox/lux-checkbox.component';
import { LuxChipGroupComponent } from './lux-chips/lux-chips-subcomponents/lux-chip-group.component';
import { LuxChipComponent } from './lux-chips/lux-chips-subcomponents/lux-chip.component';
import { LuxChipsComponent } from './lux-chips/lux-chips.component';
import { LuxDatepickerComponent } from './lux-datepicker/lux-datepicker.component';
import { LuxDateTimePickerComponent } from './lux-datetimepicker/lux-datetimepicker.component';
import { LuxFileInputComponent } from './lux-file/lux-file-input/lux-file-input.component';
import { LuxFileListComponent } from './lux-file/lux-file-list/lux-file-list.component';
import { LuxFileProgressComponent } from './lux-file/lux-file-subcomponents/lux-file-progress/lux-file-progress.component';
import { LuxFormHintComponent } from './lux-form-control/lux-form-control-subcomponents/lux-form-hint.component';
import { LuxFormLabelComponent } from './lux-form-control/lux-form-control-subcomponents/lux-form-label.component';
import { LuxFormControlComponent } from './lux-form-control/lux-form-control.component';
import { LuxInputPrefixComponent } from './lux-input/lux-input-subcomponents/lux-input-prefix.component';
import { LuxInputSuffixComponent } from './lux-input/lux-input-subcomponents/lux-input-suffix.component';
import { LuxInputComponent } from './lux-input/lux-input.component';
import { LuxRadioComponent } from './lux-radio/lux-radio.component';
import { LuxSelectComponent } from './lux-select/lux-select.component';
import { LuxSliderComponent } from './lux-slider/lux-slider.component';
import { LuxTextareaComponent } from './lux-textarea/lux-textarea.component';
import { LuxToggleComponent } from './lux-toggle/lux-toggle.component';
import { LuxFileCaptureDirective } from './lux-file/lux-file-model/lux-file-capture.directive';
import { LuxMaxLengthDirective } from './lux-form-control/lux-form-directives/lux-maxlength/lux-max-length.directive';
import { LuxNameDirectiveDirective } from './lux-form-control/lux-form-directives/lux-name/lux-name-directive.directive';
import { LuxSelectOptionHeightDirective } from './lux-select/lux-select-option-height.directive';
import { LuxDatetimeOverlayComponent } from './lux-datetimepicker/lux-datetime-overlay/lux-datetime-overlay.component';
import { LuxDatetimeOverlayContentComponent } from './lux-datetimepicker/lux-datetime-overlay/lux-datetime-overlay-content.component';
import { LuxDatepickerCustomHeaderComponent } from './lux-datepicker/lux-datepicker-custom-header/lux-datepicker-custom-header.component';
import { LuxFileUploadComponent } from './lux-file/lux-file-upload/lux-file-upload.component';
import { LuxFileDeleteDialogComponent } from './lux-file/lux-file-subcomponents/lux-file-delete-dialog/lux-file-delete-dialog.component';
import { LuxFileReplaceDialogComponent } from './lux-file/lux-file-subcomponents/lux-file-replace-dialog/lux-file-replace-dialog.component';
import { LuxInputAcComponent } from './lux-input-ac/lux-input-ac.component';
import { LuxInputAcPrefixComponent } from './lux-input-ac/lux-input-ac-subcomponents/lux-input-ac-prefix.component';
import { LuxFormControlWrapperComponent } from './lux-form-control-wrapper/lux-form-control-wrapper.component';
import { LuxInputAcSuffixComponent } from './lux-input-ac/lux-input-ac-subcomponents/lux-input-ac-suffix.component';
import { LuxCheckboxAcComponent } from './lux-checkbox-ac/lux-checkbox-ac.component';
import { LuxToggleAcComponent } from './lux-toggle-ac/lux-toggle-ac.component';
import { LuxAutocompleteAcComponent } from './lux-autocomplete-ac/lux-autocomplete-ac.component';
import { LuxSelectAcComponent } from './lux-select-ac/lux-select-ac.component';
import { LuxRadioAcComponent } from './lux-radio-ac/lux-radio-ac.component';
import { LuxDatepickerAcComponent } from './lux-datepicker-ac/lux-datepicker-ac.component';
import { LuxDatepickerAcCustomHeaderComponent } from './lux-datepicker-ac/lux-datepicker-ac-custom-header/lux-datepicker-ac-custom-header.component';
import { LuxDatetimepickerAcComponent } from './lux-datetimepicker-ac/lux-datetimepicker-ac.component';
import { LuxDatetimeOverlayAcComponent } from './lux-datetimepicker-ac/lux-datetime-overlay-ac/lux-datetime-overlay-ac.component';
import { LuxDatetimeOverlayContentAcComponent } from './lux-datetimepicker-ac/lux-datetime-overlay-ac/lux-datetime-overlay-content-ac.component';
import { LuxTextareaAcComponent } from './lux-textarea-ac/lux-textarea-ac.component';
import { LuxFileInputAcComponent } from './lux-file/lux-file-input-ac/lux-file-input-ac.component';
import { LuxChipsAcComponent } from './lux-chips-ac/lux-chips-ac.component';
import { LuxChipAcComponent } from './lux-chips-ac/lux-chips-subcomponents/lux-chip-ac.component';
import { LuxChipAcGroupComponent } from './lux-chips-ac/lux-chips-subcomponents/lux-chip-ac-group.component';
import { LuxSliderAcComponent } from './lux-slider-ac/lux-slider-ac.component';

@NgModule({
  declarations: [
    LuxToggleComponent,
    LuxSelectComponent,
    LuxSelectOptionHeightDirective,
    LuxInputComponent,
    LuxInputPrefixComponent,
    LuxInputSuffixComponent,
    LuxCheckboxComponent,
    LuxChipsComponent,
    LuxChipComponent,
    LuxChipGroupComponent,
    LuxRadioComponent,
    LuxDatepickerComponent,
    LuxDateTimePickerComponent,
    LuxAutocompleteComponent,
    LuxSliderComponent,
    LuxTextareaComponent,
    LuxFormControlComponent,
    LuxFormHintComponent,
    LuxFormLabelComponent,
    LuxFileListComponent,
    LuxFileInputComponent,
    LuxFileProgressComponent,
    LuxFileCaptureDirective,
    LuxMaxLengthDirective,
    LuxNameDirectiveDirective,
    LuxDatetimeOverlayComponent,
    LuxDatetimeOverlayContentComponent,
    LuxDatepickerCustomHeaderComponent,
    LuxFileUploadComponent,
    LuxFileDeleteDialogComponent,
    LuxFileReplaceDialogComponent,
    LuxInputAcComponent,
    LuxInputAcPrefixComponent,
    LuxInputAcSuffixComponent,
    LuxFormControlWrapperComponent,
    LuxCheckboxAcComponent,
    LuxToggleAcComponent,
    LuxAutocompleteAcComponent,
    LuxSelectAcComponent,
    LuxRadioAcComponent,
    LuxDatepickerAcComponent,
    LuxDatepickerAcCustomHeaderComponent,
    LuxDatetimepickerAcComponent,
    LuxDatetimeOverlayAcComponent,
    LuxDatetimeOverlayContentAcComponent,
    LuxTextareaAcComponent,
    LuxFileInputAcComponent,
    LuxChipsAcComponent,
    LuxChipAcComponent,
    LuxChipAcGroupComponent,
    LuxSliderAcComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatChipsModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatSliderModule,
    LuxIconModule,
    LuxDirectivesModule,
    LuxPipesModule,
    LuxComponentsConfigModule,
    LuxActionModule,
    LuxLayoutModule,
    LuxPopupsModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    OverlayModule
  ],
  exports: [
    LuxToggleComponent,
    LuxSelectComponent,
    LuxSelectOptionHeightDirective,
    LuxInputComponent,
    LuxInputPrefixComponent,
    LuxInputSuffixComponent,
    LuxCheckboxComponent,
    LuxChipsComponent,
    LuxChipComponent,
    LuxChipGroupComponent,
    LuxRadioComponent,
    LuxDatepickerComponent,
    LuxDateTimePickerComponent,
    LuxAutocompleteComponent,
    LuxSliderComponent,
    LuxTextareaComponent,
    LuxFormControlComponent,
    LuxFormHintComponent,
    LuxFormLabelComponent,
    LuxFileListComponent,
    LuxFileInputComponent,
    LuxFileCaptureDirective,
    LuxMaxLengthDirective,
    LuxFileUploadComponent,
    LuxInputAcComponent,
    LuxFormControlWrapperComponent,
    LuxInputAcPrefixComponent,
    LuxInputAcSuffixComponent,
    LuxCheckboxAcComponent,
    LuxToggleAcComponent,
    LuxAutocompleteAcComponent,
    LuxSelectAcComponent,
    LuxRadioAcComponent,
    LuxDatepickerAcComponent,
    LuxDatetimepickerAcComponent,
    LuxTextareaAcComponent,
    LuxFileInputAcComponent,
    LuxChipsAcComponent,
    LuxChipAcComponent,
    LuxChipAcGroupComponent,
    LuxSliderAcComponent
  ],
  providers: []
})
export class LuxFormModule {}

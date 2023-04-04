/* eslint-disable max-len */
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LuxActionModule } from '../../modules/lux-action/lux-action.module';
import { LuxDirectivesModule } from '../../modules/lux-directives/lux-directives.module';
import { LuxErrorModule } from '../../modules/lux-error/lux-error.module';
import { LuxFilePreviewModule } from '../../modules/lux-file-preview/lux-file-preview.module';
import { LuxFormModule } from '../../modules/lux-form/lux-form.module';
import { LuxIconModule } from '../../modules/lux-icon/lux-icon.module';
import { LuxLayoutModule } from '../../modules/lux-layout/lux-layout.module';
import { LuxLookupModule } from '../../modules/lux-lookup/lux-lookup.module';
import { LuxPipesModule } from '../../modules/lux-pipes/lux-pipes.module';
import { LuxPopupsModule } from '../../modules/lux-popups/lux-popups.module';
import { LuxConsoleService } from '../../modules/lux-util/lux-console.service';
import { AccordionExampleComponent } from './accordion-example/accordion-example.component';
import { AutocompleteExampleComponent } from './autocomplete-example/autocomplete-example.component';
import { BadgeExampleComponent } from './badge-example/badge-example.component';
import { ButtonExampleComponent } from './button-example/button-example.component';
import { ChipExampleComponent } from './chip-example/chip-example.component';
import { ComponentsOverviewComponent } from './components-overview.component';
import { ComponentsOverviewRoutingModule } from './components-overview-routing.module';
import { DatepickerExampleComponent } from './datepicker-example/datepicker-example.component';
import { DateTimepickerExampleComponent } from './datetimepicker-example/datetimepicker-example.component';
import { DividerExampleComponent } from './divider-example/divider-example.component';
import { ErrorpageExampleComponent } from './errorpage-example/errorpage-example.component';
import { HttpErrorExampleComponent } from './http-error-example/http-error-example.component';
import { IconExampleComponent } from './icon-example/icon-example.component';
import { ImageExampleComponent } from './image-example/image-example.component';
import { LinkExampleComponent } from './link-example/link-example.component';
import { MasterDetailAuthenticExampleComponent } from './master-detail-authentic-example/master-detail-authentic-example.component';
import { ProgressBarExampleComponent } from './progress-example/progress-example.component';
import { RadioButtonExampleComponent } from './radio-button-example/radio-button-example.component';
import { SliderExampleComponent } from './slider-example/slider-example.component';
import { SnackbarExampleComponent } from './snackbar-example/snackbar-example.component';
import { SpinnerExampleComponent } from './spinner-example/spinner-example.component';
import { StepperLargeExternStepExampleComponent } from './stepper-large-example/steps/stepper-large-extern-step-example.component';
import { StorageExampleComponent } from './storage-example/storage-example.component';
import { TableExampleComponent } from './table-example/table-example.component';
import { TableServerExampleComponent } from './table-server-example/table-server-example.component';
import { CustomTabComponent } from './tabs-example/custom-tab/custom-tab.component';
import { TextareaExampleComponent } from './textarea-example/textarea-example.component';
import { TooltipExampleComponent } from './tooltip-example/tooltip-example.component';
import { LookupComboboxExampleComponent } from './lookup-examples/lookup-combobox-example/lookup-combobox-example.component';
import { LookupAutocompleteExampleComponent } from './lookup-examples/lookup-autocomplete-example/lookup-autocomplete-example.component';
import { SelectExampleComponent } from './select-example/select-example.component';
import { InputExampleComponent } from './input-example/input-example.component';
import { TabindexExampleComponent } from './tabindex-example/tabindex-example.component';
import { CardExampleComponent } from './card-example/card-example.component';
import { TileExampleComponent } from './tile-example/tile-example.component';
import { MessageBoxExampleComponent } from './message-box-example/message-box-example.component';
import { CheckboxExampleComponent } from './checkbox-example/checkbox-example.component';
import { MenuExampleComponent } from './menu-example/menu-example.component';
import { AppFooterExampleComponent } from './app-footer-example/app-footer-example.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TableExampleSimpleOptionsComponent } from './table-example/table-example-simple-options/table-example-simple-options.component';
import { TableExampleAdvancedOptionsComponent } from './table-example/table-example-advanced-options/table-example-advanced-options.component';
import { ToggleExampleComponent } from './toggle-example/toggle-example.component';
import { ListExampleComponent } from './list-example/list-example.component';
import { LookupLabelExampleComponent } from './lookup-examples/lookup-label-example/lookup-label-example.component';
import { ExampleBaseModule } from '../example-base/example-base.module';
import { TimestampExampleComponent } from './timestamp-example/timestamp-example.component';
import { MasterDetailExampleComponent } from './master-detail-example/master-detail-example.component';
import { TabsExampleComponent } from './tabs-example/tabs-example.component';
import { StepperExampleComponent } from './stepper-example/stepper-example.component';
import { DetailExampleComponent } from './master-detail-example/detail-example/detail-example.component';
import { TextExampleComponent } from './master-detail-example/text-example/text-example.component';
import { TabsExampleContentComponent } from './tabs-example/tabs-example-content/tabs-example-content.component';
import { InfiniteScrollingExampleComponent } from './infinite-scrolling-example/infinite-scrolling-example.component';
import { ResponsiveBehaviourFilteredPipe } from './table-example/responsive-behaviour-filtered.pipe';
import { FileInputExampleComponent } from './file-example/file-input-example/file-input-example.component';
import { LuxCommonModule } from '../../modules/lux-common/lux-common.module';
import { FileListExampleComponent } from './file-example/file-list-example/file-list-example.component';
import { FileExampleSimpleOptionsComponent } from './file-example/file-example-simple-options/file-example-simple-options.component';
import { FileExampleAdvancedOptionsComponent } from './file-example/file-example-advanced-options/file-example-advanced-options.component';
import { DialogExampleComponent } from './dialog-example/dialog-example.component';
import { DialogComponentExampleComponent } from './dialog-example/dialog-component-example/dialog-component-example.component';
import { BadgeNotificationExampleComponent } from './badge-notification-example/badge-notification-example.component';
import { RippleExampleComponent } from './ripple-example/ripple-example.component';
import { HtmlExampleComponent } from './html-example/html-example.component';
import { LuxHtmlModule } from '../../modules/lux-html/lux-html.module';
import { MarkdownExampleComponent } from './markdown-example/markdown-example.component';
import { LuxMarkdownModule } from '../../modules/lux-markdown/lux-markdown.module';
import { FormRowExampleComponent } from './form-row-example/form-row-example.component';
import { CardRowExampleComponent } from './card-row-example/card-row-example.component';
import { FilterExampleComponent } from './filter-example/filter-example.component';
import { LuxFilterModule } from '../../modules/lux-filter/lux-filter.module';
import { StepperLargeExampleComponent } from './stepper-large-example/stepper-large-example.component';
import { StepperLargeExampleStepPrevButtonComponent } from './stepper-large-example/steps/stepper-large-example-step-prev-button.component';
import { StepperLargeExampleStepNextButtonComponent } from './stepper-large-example/steps/stepper-large-example-step-next-button.component';
import { StepperLargeExampleStepFinButtonComponent } from './stepper-large-example/steps/stepper-large-example-step-fin-button.component';
import { StepperLargeExampleStepVetoComponent } from './stepper-large-example/steps/stepper-large-example-step-veto.component';
import { LinkPlainExampleComponent } from './link-plain-example/link-plain-example.component';
import { TileAuthenticExampleComponent } from './tile-authentic-example/tile-authentic-example.component';
import { FileUploadExampleComponent } from './file-example/file-upload-example/file-upload-example.component';
import { InputAuthenticExampleComponent } from './input-authentic-example/input-authentic-example.component';
import { MatListModule } from '@angular/material/list';
import { OverviewExampleComponent } from './tile-authentic-example/overview-example/overview-example.component';
import { CheckboxAuthenticExampleComponent } from './checkbox-authentic-example/checkbox-authentic-example.component';
import { ToggleAuthenticExampleComponent } from './toggle-authentic-example/toggle-authentic-example.component';
import { AutocompleteAuthenticExampleComponent } from './autocomplete-authentic-example/autocomplete-authentic-example.component';
import { SelectAuthenticExampleComponent } from './select-authentic-example/select-authentic-example.component';
import { RadioAuthenticExampleComponent } from './radio-authentic-example/radio-authentic-example.component';
import { DatepickerAuthenticExampleComponent } from './datepicker-authentic-example/datepicker-authentic-example.component';
import { DatetimepickerAuthenticExampleComponent } from './datetimepicker-authentic-example/datetimepicker-authentic-example.component';
import { TextareaAuthenticExampleComponent } from './textarea-authentic-example/textarea-authentic-example.component';
import { FileInputAuthenticExampleComponent } from './file-example/file-input-authentic-example/file-input-authentic-example.component';
import { ChipAuthenticExampleComponent } from './chip-authentic-example/chip-authentic-example.component';
import { SliderAuthenticExampleComponent } from './slider-authentic-example/slider-authentic-example.component';
import { LookupAutocompleteAcExampleComponent } from './lookup-examples/lookup-autocomplete-ac-example/lookup-autocomplete-ac-example.component';
import { LookupComboboxAcExampleComponent } from './lookup-examples/lookup-combobox-ac-example/lookup-combobox-ac-example.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IconOverviewComponent } from './icon-example/icon-overview/icon-overview.component';
import { ComponentsOverviewBlueComponent } from './components-overview-blue.component';
import { ComponentsOverviewAuthenticComponent } from './components-overview-authentic.component';
import { CheckboxContainerAcExampleComponent } from './checkbox-container-ac-example/checkbox-container-ac-example.component';

@NgModule({
  imports: [
    ComponentsOverviewRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    LuxLayoutModule,
    LuxIconModule,
    LuxActionModule,
    LuxFormModule,
    LuxDirectivesModule,
    LuxPipesModule,
    LuxErrorModule,
    LuxPopupsModule,
    LuxLookupModule,
    LuxCommonModule,
    LuxHtmlModule,
    LuxMarkdownModule,
    LuxFilePreviewModule,
    MatFormFieldModule,
    ExampleBaseModule,
    ExampleBaseModule,
    MatBadgeModule,
    LuxFilterModule,
    MatListModule,
    MatButtonModule,
    MatIconModule
  ],
  declarations: [
    MasterDetailExampleComponent,
    DetailExampleComponent,
    TextExampleComponent,
    TabsExampleComponent,
    TabsExampleContentComponent,
    StepperExampleComponent,
    SnackbarExampleComponent,
    SliderExampleComponent,
    TableExampleComponent,
    ProgressBarExampleComponent,
    BadgeExampleComponent,
    ButtonExampleComponent,
    LinkExampleComponent,
    AccordionExampleComponent,
    DatepickerExampleComponent,
    DateTimepickerExampleComponent,
    AutocompleteExampleComponent,
    IconExampleComponent,
    DividerExampleComponent,
    TooltipExampleComponent,
    ErrorpageExampleComponent,
    ChipExampleComponent,
    HttpErrorExampleComponent,
    SpinnerExampleComponent,
    StorageExampleComponent,
    RadioButtonExampleComponent,
    ImageExampleComponent,
    TableServerExampleComponent,
    TextareaExampleComponent,
    ComponentsOverviewComponent,
    LookupComboboxExampleComponent,
    LookupAutocompleteExampleComponent,
    SelectExampleComponent,
    InputExampleComponent,
    TabindexExampleComponent,
    CardExampleComponent,
    TileExampleComponent,
    CardExampleComponent,
    MessageBoxExampleComponent,
    MenuExampleComponent,
    CheckboxExampleComponent,
    AppFooterExampleComponent,
    TableExampleSimpleOptionsComponent,
    TableExampleAdvancedOptionsComponent,
    ToggleExampleComponent,
    ListExampleComponent,
    LookupLabelExampleComponent,
    TimestampExampleComponent,
    ResponsiveBehaviourFilteredPipe,
    InfiniteScrollingExampleComponent,
    FileInputExampleComponent,
    FileListExampleComponent,
    FileExampleSimpleOptionsComponent,
    FileExampleAdvancedOptionsComponent,
    DialogExampleComponent,
    DialogComponentExampleComponent,
    BadgeNotificationExampleComponent,
    RippleExampleComponent,
    HtmlExampleComponent,
    MarkdownExampleComponent,
    FormRowExampleComponent,
    CardRowExampleComponent,
    FilterExampleComponent,
    StepperLargeExampleComponent,
    StepperLargeExternStepExampleComponent,
    StepperLargeExampleStepPrevButtonComponent,
    StepperLargeExampleStepNextButtonComponent,
    StepperLargeExampleStepFinButtonComponent,
    StepperLargeExampleStepVetoComponent,
    LinkPlainExampleComponent,
    TileAuthenticExampleComponent,
    FileUploadExampleComponent,
    InputAuthenticExampleComponent,
    OverviewExampleComponent,
    CheckboxAuthenticExampleComponent,
    ToggleAuthenticExampleComponent,
    AutocompleteAuthenticExampleComponent,
    SelectAuthenticExampleComponent,
    RadioAuthenticExampleComponent,
    DatepickerAuthenticExampleComponent,
    DatetimepickerAuthenticExampleComponent,
    TextareaAuthenticExampleComponent,
    FileInputAuthenticExampleComponent,
    ChipAuthenticExampleComponent,
    SliderAuthenticExampleComponent,
    LookupAutocompleteAcExampleComponent,
    LookupComboboxAcExampleComponent,
    IconOverviewComponent,
    ComponentsOverviewBlueComponent,
    ComponentsOverviewAuthenticComponent,
    MasterDetailAuthenticExampleComponent,
    CustomTabComponent,
    CheckboxContainerAcExampleComponent
  ],
  providers: [HttpClient],
  entryComponents: [DialogComponentExampleComponent]
})
export class ComponentsOverviewModule {}

LuxConsoleService.LOG('Modul "ComponentsOverviewModule" geladen...');

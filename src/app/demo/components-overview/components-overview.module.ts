/* eslint-disable max-len */
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
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
import { BadgeExampleComponent } from './badge-example/badge-example.component';
import { ButtonExampleComponent } from './button-example/button-example.component';
import { ComponentsOverviewComponent } from './components-overview.component';
import { ComponentsOverviewRoutingModule } from './components-overview-routing.module';
import { DividerExampleComponent } from './divider-example/divider-example.component';
import { ErrorpageExampleComponent } from './errorpage-example/errorpage-example.component';
import { HttpErrorExampleComponent } from './http-error-example/http-error-example.component';
import { IconExampleComponent } from './icon-example/icon-example.component';
import { ImageExampleComponent } from './image-example/image-example.component';
import { LinkExampleComponent } from './link-example/link-example.component';
import { DetailExampleComponent } from './master-detail-authentic-example/detail-example/detail-example.component';
import { MasterDetailAuthenticExampleComponent } from './master-detail-authentic-example/master-detail-authentic-example.component';
import { TextExampleComponent } from './master-detail-authentic-example/text-example/text-example.component';
import { ProgressBarExampleComponent } from './progress-example/progress-example.component';
import { SnackbarExampleComponent } from './snackbar-example/snackbar-example.component';
import { SpinnerExampleComponent } from './spinner-example/spinner-example.component';
import { StepperLargeExternStepExampleComponent } from './stepper-large-example/steps/stepper-large-extern-step-example.component';
import { StorageExampleComponent } from './storage-example/storage-example.component';
import { TableExampleComponent } from './table-example/table-example.component';
import { TableServerExampleComponent } from './table-server-example/table-server-example.component';
import { CustomTabComponent } from './tabs-example/custom-tab/custom-tab.component';
import { TileExampleComponent } from './tile-example/tile-example.component';
import { TooltipExampleComponent } from './tooltip-example/tooltip-example.component';
import { TabindexExampleComponent } from './tabindex-example/tabindex-example.component';
import { CardExampleComponent } from './card-example/card-example.component';
import { MessageBoxExampleComponent } from './message-box-example/message-box-example.component';
import { MenuExampleComponent } from './menu-example/menu-example.component';
import { AppFooterExampleComponent } from './app-footer-example/app-footer-example.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { TableExampleSimpleOptionsComponent } from './table-example/table-example-simple-options/table-example-simple-options.component';
import { TableExampleAdvancedOptionsComponent } from './table-example/table-example-advanced-options/table-example-advanced-options.component';
import { ListExampleComponent } from './list-example/list-example.component';
import { LookupLabelExampleComponent } from './lookup-examples/lookup-label-example/lookup-label-example.component';
import { ExampleBaseModule } from '../example-base/example-base.module';
import { TimestampExampleComponent } from './timestamp-example/timestamp-example.component';
import { TabsExampleComponent } from './tabs-example/tabs-example.component';
import { StepperExampleComponent } from './stepper-example/stepper-example.component';
import { TabsExampleContentComponent } from './tabs-example/tabs-example-content/tabs-example-content.component';
import { InfiniteScrollingExampleComponent } from './infinite-scrolling-example/infinite-scrolling-example.component';
import { ResponsiveBehaviourFilteredPipe } from './table-example/responsive-behaviour-filtered.pipe';
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
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
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
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { IconOverviewComponent } from './icon-example/icon-overview/icon-overview.component';
import { CheckboxContainerAcExampleComponent } from './checkbox-container-ac-example/checkbox-container-ac-example.component';
import { TextboxExampleComponent } from './textbox-example/textbox-example.component';
import {TenantLogoExampleComponent} from "./tenant-logo-example/tenant-logo-example.component";
import {LuxTenantLogoModule} from "../../modules/lux-tenant-logo/lux-tenant-logo.module";
import {TenantLogoExampleConfigComponent} from "./tenant-logo-example/tenant-logo-example-config/tenant-logo-example-config.component";

@NgModule({
  imports: [
    ComponentsOverviewRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
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
    MatIconModule,
    LuxTenantLogoModule
  ],
  declarations: [
    DetailExampleComponent,
    TextExampleComponent,
    TabsExampleComponent,
    TabsExampleContentComponent,
    StepperExampleComponent,
    SnackbarExampleComponent,
    TableExampleComponent,
    ProgressBarExampleComponent,
    BadgeExampleComponent,
    ButtonExampleComponent,
    LinkExampleComponent,
    AccordionExampleComponent,
    IconExampleComponent,
    DividerExampleComponent,
    TooltipExampleComponent,
    ErrorpageExampleComponent,
    HttpErrorExampleComponent,
    SpinnerExampleComponent,
    StorageExampleComponent,
    ImageExampleComponent,
    TableServerExampleComponent,
    ComponentsOverviewComponent,
    TabindexExampleComponent,
    CardExampleComponent,
    CardExampleComponent,
    MessageBoxExampleComponent,
    MenuExampleComponent,
    AppFooterExampleComponent,
    TableExampleSimpleOptionsComponent,
    TableExampleAdvancedOptionsComponent,
    ListExampleComponent,
    LookupLabelExampleComponent,
    TimestampExampleComponent,
    ResponsiveBehaviourFilteredPipe,
    InfiniteScrollingExampleComponent,
    FileListExampleComponent,
    FileExampleSimpleOptionsComponent,
    FileExampleAdvancedOptionsComponent,
    DialogExampleComponent,
    DialogComponentExampleComponent,
    BadgeNotificationExampleComponent,
    RippleExampleComponent,
    HtmlExampleComponent,
    MarkdownExampleComponent,
    FilterExampleComponent,
    StepperLargeExampleComponent,
    StepperLargeExternStepExampleComponent,
    StepperLargeExampleStepPrevButtonComponent,
    StepperLargeExampleStepNextButtonComponent,
    StepperLargeExampleStepFinButtonComponent,
    StepperLargeExampleStepVetoComponent,
    LinkPlainExampleComponent,
    TileExampleComponent,
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
    MasterDetailAuthenticExampleComponent,
    CustomTabComponent,
    CheckboxContainerAcExampleComponent,
    TextboxExampleComponent,
    TenantLogoExampleComponent,
    TenantLogoExampleConfigComponent
  ],
  providers: [HttpClient],
  entryComponents: [DialogComponentExampleComponent]
})
export class ComponentsOverviewModule {}

LuxConsoleService.LOG('Modul "ComponentsOverviewModule" geladen...');

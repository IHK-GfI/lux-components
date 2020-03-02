// tslint:disable:max-line-length
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
import { DividerExampleComponent } from './divider-example/divider-example.component';
import { ErrorpageExampleComponent } from './errorpage-example/errorpage-example.component';
import { HttpErrorExampleComponent } from './http-error-example/http-error-example.component';
import { IconExampleComponent } from './icon-example/icon-example.component';
import { ImageExampleComponent } from './image-example/image-example.component';
import { LinkExampleComponent } from './link-example/link-example.component';
import { ProgressBarExampleComponent } from './progress-example/progress-example.component';
import { RadioButtonExampleComponent } from './radio-button-example/radio-button-example.component';
import { SliderExampleComponent } from './slider-example/slider-example.component';
import { SnackbarExampleComponent } from './snackbar-example/snackbar-example.component';
import { SpinnerExampleComponent } from './spinner-example/spinner-example.component';
import { StorageExampleComponent } from './storage-example/storage-example.component';
import { TableExampleComponent } from './table-example/table-example.component';
import { TableServerExampleComponent } from './table-server-example/table-server-example.component';
import { TextareaExampleComponent } from './textarea-example/textarea-example.component';
import { TooltipExampleComponent } from './tooltip-example/tooltip-example.component';
import { LookupComboboxExampleComponent } from './lookup-examples/lookup-combobox-example/lookup-combobox-example.component';
import { LuxLookupHandlerService } from '../../modules/lux-lookup/lux-lookup-service/lux-lookup-handler.service';
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
import { MasterDetailExampleDataService } from './master-detail-example/master-detail-example-data.service';
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
import { LuxDialogService } from '../../modules/lux-popups/lux-dialog/lux-dialog.service';
import { BadgeNotificationExampleComponent } from './badge-notification-example/badge-notification-example.component';
import { RippleExampleComponent } from './ripple-example/ripple-example.component';

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
    LuxFilePreviewModule,
    MatFormFieldModule,
    ExampleBaseModule,
    MatBadgeModule
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
    RippleExampleComponent
  ],
  providers: [HttpClient, LuxLookupHandlerService, MasterDetailExampleDataService, LuxDialogService],
  entryComponents: [DialogComponentExampleComponent]
})
export class ComponentsOverviewModule {}

LuxConsoleService.LOG('Modul "ComponentsOverviewModule" geladen...');

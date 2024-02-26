/* eslint-disable max-len */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LuxConsoleService } from '../../modules/lux-util/lux-console.service';
import { AccordionExampleComponent } from './accordion-example/accordion-example.component';
import { BadgeExampleComponent } from './badge-example/badge-example.component';
import { ButtonExampleComponent } from './button-example/button-example.component';
import { CardExampleComponent } from './card-example/card-example.component';
import { ComponentsOverviewComponent } from './components-overview.component';
import { DividerExampleComponent } from './divider-example/divider-example.component';
import { ErrorpageExampleComponent } from './errorpage-example/errorpage-example.component';
import { FileUploadExampleComponent } from './file-example/file-upload-example/file-upload-example.component';
import { HttpErrorExampleComponent } from './http-error-example/http-error-example.component';
import { IconExampleComponent } from './icon-example/icon-example.component';
import { ImageExampleComponent } from './image-example/image-example.component';
import { LinkExampleComponent } from './link-example/link-example.component';
import { MasterDetailAuthenticExampleComponent } from './master-detail-authentic-example/master-detail-authentic-example.component';
import { ProgressBarExampleComponent } from './progress-example/progress-example.component';
import { SnackbarExampleComponent } from './snackbar-example/snackbar-example.component';
import { SpinnerExampleComponent } from './spinner-example/spinner-example.component';
import { StepperLargeExampleComponent } from './stepper-large-example/stepper-large-example.component';
import { StorageExampleComponent } from './storage-example/storage-example.component';
import { TableExampleComponent } from './table-example/table-example.component';
import { TableServerExampleComponent } from './table-server-example/table-server-example.component';
import { TileExampleComponent } from './tile-example/tile-example.component';
import { TooltipExampleComponent } from './tooltip-example/tooltip-example.component';
import { LookupComboboxAcExampleComponent } from './lookup-examples/lookup-combobox-ac-example/lookup-combobox-ac-example.component';
import { LookupAutocompleteAcExampleComponent } from './lookup-examples/lookup-autocomplete-ac-example/lookup-autocomplete-ac-example.component';
import { LookupLabelExampleComponent } from './lookup-examples/lookup-label-example/lookup-label-example.component';
import { TabindexExampleComponent } from './tabindex-example/tabindex-example.component';
import { MessageBoxExampleComponent } from './message-box-example/message-box-example.component';
import { MenuExampleComponent } from './menu-example/menu-example.component';
import { AppFooterExampleComponent } from './app-footer-example/app-footer-example.component';
import { ListExampleComponent } from './list-example/list-example.component';
import { TimestampExampleComponent } from './timestamp-example/timestamp-example.component';
import { ExampleRootComponent } from '../example-base/example-base-root/example-root.component';
import { StepperExampleComponent } from './stepper-example/stepper-example.component';
import { TabsExampleComponent } from './tabs-example/tabs-example.component';
import { InfiniteScrollingExampleComponent } from './infinite-scrolling-example/infinite-scrolling-example.component';
import { DialogExampleComponent } from './dialog-example/dialog-example.component';
import { FileListExampleComponent } from './file-example/file-list-example/file-list-example.component';
import { RippleExampleComponent } from './ripple-example/ripple-example.component';
import { BadgeNotificationExampleComponent } from './badge-notification-example/badge-notification-example.component';
import { HtmlExampleComponent } from './html-example/html-example.component';
import { MarkdownExampleComponent } from './markdown-example/markdown-example.component';
import { FormRowExampleComponent } from './form-row-example/form-row-example.component';
import { CardRowExampleComponent } from './card-row-example/card-row-example.component';
import { FilterExampleComponent } from './filter-example/filter-example.component';
import { LinkPlainExampleComponent } from './link-plain-example/link-plain-example.component';
import { TileAuthenticExampleComponent } from './tile-authentic-example/tile-authentic-example.component';
import { InputAuthenticExampleComponent } from './input-authentic-example/input-authentic-example.component';
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
import { IconOverviewComponent } from './icon-example/icon-overview/icon-overview.component';
import { CheckboxContainerAcExampleComponent } from './checkbox-container-ac-example/checkbox-container-ac-example.component';
import { TextboxExampleComponent } from './textbox-example/textbox-example.component';
import {TenantLogoExampleComponent} from "./tenant-logo-example/tenant-logo-example.component";

const routes: Routes = [
  { path: '', component: ComponentsOverviewComponent },
  {
    path: 'example',
    component: ExampleRootComponent,
    children: [
      { path: 'accordion', component: AccordionExampleComponent },
      { path: 'autocomplete-ac', component: AutocompleteAuthenticExampleComponent },
      { path: 'badge', component: BadgeExampleComponent },
      { path: 'button', component: ButtonExampleComponent },
      { path: 'card', component: CardExampleComponent },
      { path: 'chips-ac', component: ChipAuthenticExampleComponent },
      { path: 'datepicker-ac', component: DatepickerAuthenticExampleComponent },
      { path: 'datetimepicker-ac', component: DatetimepickerAuthenticExampleComponent },
      { path: 'divider', component: DividerExampleComponent },
      { path: 'error-page', component: ErrorpageExampleComponent },
      { path: 'http-error', component: HttpErrorExampleComponent },
      { path: 'icon', component: IconExampleComponent },
      { path: 'image', component: ImageExampleComponent },
      { path: 'link', component: LinkExampleComponent },
      { path: 'progress', component: ProgressBarExampleComponent },
      { path: 'radio-button-ac', component: RadioAuthenticExampleComponent },
      { path: 'select-ac', component: SelectAuthenticExampleComponent },
      { path: 'slider-ac', component: SliderAuthenticExampleComponent },
      { path: 'snackbar', component: SnackbarExampleComponent },
      { path: 'spinner', component: SpinnerExampleComponent },
      { path: 'storage', component: StorageExampleComponent },
      { path: 'table', component: TableExampleComponent },
      { path: 'table-server', component: TableServerExampleComponent },
      { path: 'textarea-ac', component: TextareaAuthenticExampleComponent },
      { path: 'tooltip', component: TooltipExampleComponent },
      { path: 'lookup-combobox-ac', component: LookupComboboxAcExampleComponent },
      { path: 'lookup-autocomplete-ac', component: LookupAutocompleteAcExampleComponent },
      { path: 'lookup-label', component: LookupLabelExampleComponent },
      { path: 'tabindex', component: TabindexExampleComponent },
      { path: 'message-box', component: MessageBoxExampleComponent },
      { path: 'menu', component: MenuExampleComponent },
      { path: 'app-footer', component: AppFooterExampleComponent },
      { path: 'toggle-ac', component: ToggleAuthenticExampleComponent },
      { path: 'list', component: ListExampleComponent },
      { path: 'timestamp', component: TimestampExampleComponent },
      { path: 'stepper', component: StepperExampleComponent },
      { path: 'stepper-large', component: StepperLargeExampleComponent },
      { path: 'tabs', component: TabsExampleComponent },
      { path: 'infinite-scrolling', component: InfiniteScrollingExampleComponent },
      { path: 'dialog', component: DialogExampleComponent },
      { path: 'file-input-ac', component: FileInputAuthenticExampleComponent },
      { path: 'file-list', component: FileListExampleComponent },
      { path: 'file-upload', component: FileUploadExampleComponent },
      { path: 'badge-notification', component: BadgeNotificationExampleComponent },
      { path: 'ripple', component: RippleExampleComponent },
      { path: 'html', component: HtmlExampleComponent },
      { path: 'markdown', component: MarkdownExampleComponent },
      { path: 'form-row', component: FormRowExampleComponent },
      { path: 'card-row', component: CardRowExampleComponent },
      { path: 'filter', component: FilterExampleComponent },
      { path: 'link-plain', component: LinkPlainExampleComponent },
      { path: 'tile', component: TileExampleComponent },
      { path: 'tile-ac', component: TileAuthenticExampleComponent },
      { path: 'input-ac', component: InputAuthenticExampleComponent },
      { path: 'checkbox-ac', component: CheckboxAuthenticExampleComponent },
      { path: 'tile-overview', component: OverviewExampleComponent },
      { path: 'icon-overview', component: IconOverviewComponent },
      { path: 'master-detail-ac', component: MasterDetailAuthenticExampleComponent },
      { path: 'checkbox-container-ac', component: CheckboxContainerAcExampleComponent },
      { path: 'textbox', component: TextboxExampleComponent },
      { path: 'tenant-logo', component: TenantLogoExampleComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsOverviewRoutingModule {}

LuxConsoleService.LOG('Modul "ComponentsOverviewRoutingModule" geladen...');

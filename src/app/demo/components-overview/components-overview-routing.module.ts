/* eslint-disable max-len */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LuxConsoleService } from '../../modules/lux-util/lux-console.service';
import { AccordionExampleComponent } from './accordion-example/accordion-example.component';
import { AutocompleteExampleComponent } from './autocomplete-example/autocomplete-example.component';
import { BadgeExampleComponent } from './badge-example/badge-example.component';
import { ButtonExampleComponent } from './button-example/button-example.component';
import { CardExampleComponent } from './card-example/card-example.component';
import { ChipExampleComponent } from './chip-example/chip-example.component';
import { ComponentsOverviewComponent } from './components-overview.component';
import { DatepickerExampleComponent } from './datepicker-example/datepicker-example.component';
import { DateTimepickerExampleComponent } from './datetimepicker-example/datetimepicker-example.component';
import { DividerExampleComponent } from './divider-example/divider-example.component';
import { ErrorpageExampleComponent } from './errorpage-example/errorpage-example.component';
import { FileUploadExampleComponent } from "./file-example/file-upload-example/file-upload-example.component";
import { HttpErrorExampleComponent } from './http-error-example/http-error-example.component';
import { IconExampleComponent } from './icon-example/icon-example.component';
import { ImageExampleComponent } from './image-example/image-example.component';
import { InputExampleComponent } from './input-example/input-example.component';
import { LinkExampleComponent } from './link-example/link-example.component';
import { ProgressBarExampleComponent } from './progress-example/progress-example.component';
import { RadioButtonExampleComponent } from './radio-button-example/radio-button-example.component';
import { SliderExampleComponent } from './slider-example/slider-example.component';
import { SnackbarExampleComponent } from './snackbar-example/snackbar-example.component';
import { SpinnerExampleComponent } from './spinner-example/spinner-example.component';
import { StepperLargeExampleComponent } from "./stepper-large-example/stepper-large-example.component";
import { StorageExampleComponent } from './storage-example/storage-example.component';
import { TableExampleComponent } from './table-example/table-example.component';
import { TableServerExampleComponent } from './table-server-example/table-server-example.component';
import { TextareaExampleComponent } from './textarea-example/textarea-example.component';
import { TooltipExampleComponent } from './tooltip-example/tooltip-example.component';
import { LookupComboboxExampleComponent } from './lookup-examples/lookup-combobox-example/lookup-combobox-example.component';
import { LookupAutocompleteExampleComponent } from './lookup-examples/lookup-autocomplete-example/lookup-autocomplete-example.component';
import { LookupLabelExampleComponent } from './lookup-examples/lookup-label-example/lookup-label-example.component';
import { SelectExampleComponent } from './select-example/select-example.component';
import { TabindexExampleComponent } from './tabindex-example/tabindex-example.component';
import { TileExampleComponent } from './tile-example/tile-example.component';
import { MessageBoxExampleComponent } from './message-box-example/message-box-example.component';
import { CheckboxExampleComponent } from './checkbox-example/checkbox-example.component';
import { MenuExampleComponent } from './menu-example/menu-example.component';
import { AppFooterExampleComponent } from './app-footer-example/app-footer-example.component';
import { ToggleExampleComponent } from './toggle-example/toggle-example.component';
import { ListExampleComponent } from './list-example/list-example.component';
import { TimestampExampleComponent } from './timestamp-example/timestamp-example.component';
import { ExampleRootComponent } from '../example-base/example-base-root/example-root.component';
import { MasterDetailExampleComponent } from './master-detail-example/master-detail-example.component';
import { StepperExampleComponent } from './stepper-example/stepper-example.component';
import { TabsExampleComponent } from './tabs-example/tabs-example.component';
import { InfiniteScrollingExampleComponent } from './infinite-scrolling-example/infinite-scrolling-example.component';
import { DialogExampleComponent } from './dialog-example/dialog-example.component';
import { FileInputExampleComponent } from './file-example/file-input-example/file-input-example.component';
import { FileListExampleComponent } from './file-example/file-list-example/file-list-example.component';
import { RippleExampleComponent } from './ripple-example/ripple-example.component';
import { BadgeNotificationExampleComponent } from './badge-notification-example/badge-notification-example.component';
import { HtmlExampleComponent } from './html-example/html-example.component';
import { MarkdownExampleComponent } from './markdown-example/markdown-example.component';
import { FormRowExampleComponent } from './form-row-example/form-row-example.component';
import { CardRowExampleComponent } from './card-row-example/card-row-example.component';
import { FilterExampleComponent } from './filter-example/filter-example.component';

const routes: Routes = [
  { path: '', component: ComponentsOverviewComponent },
  {
    path: 'example',
    component: ExampleRootComponent,
    children: [
      { path: 'accordion', component: AccordionExampleComponent },
      { path: 'autocomplete', component: AutocompleteExampleComponent },
      { path: 'badge', component: BadgeExampleComponent },
      { path: 'button', component: ButtonExampleComponent },
      { path: 'card', component: CardExampleComponent },
      { path: 'chips', component: ChipExampleComponent },
      { path: 'datepicker', component: DatepickerExampleComponent },
      { path: 'datetimepicker', component: DateTimepickerExampleComponent },
      { path: 'divider', component: DividerExampleComponent },
      { path: 'error-page', component: ErrorpageExampleComponent },
      { path: 'http-error', component: HttpErrorExampleComponent },
      { path: 'icon', component: IconExampleComponent },
      { path: 'image', component: ImageExampleComponent },
      { path: 'link', component: LinkExampleComponent },
      { path: 'progress', component: ProgressBarExampleComponent },
      { path: 'radio-button', component: RadioButtonExampleComponent },
      { path: 'select', component: SelectExampleComponent },
      { path: 'slider', component: SliderExampleComponent },
      { path: 'snackbar', component: SnackbarExampleComponent },
      { path: 'spinner', component: SpinnerExampleComponent },
      { path: 'storage', component: StorageExampleComponent },
      { path: 'table', component: TableExampleComponent },
      { path: 'table-server', component: TableServerExampleComponent },
      { path: 'textarea', component: TextareaExampleComponent },
      { path: 'tooltip', component: TooltipExampleComponent },
      { path: 'lookup-combobox', component: LookupComboboxExampleComponent },
      { path: 'lookup-autocomplete', component: LookupAutocompleteExampleComponent },
      { path: 'lookup-label', component: LookupLabelExampleComponent },
      { path: 'input', component: InputExampleComponent },
      { path: 'tabindex', component: TabindexExampleComponent },
      { path: 'tile', component: TileExampleComponent },
      { path: 'message-box', component: MessageBoxExampleComponent },
      { path: 'menu', component: MenuExampleComponent },
      { path: 'checkbox', component: CheckboxExampleComponent },
      { path: 'app-footer', component: AppFooterExampleComponent },
      { path: 'toggle', component: ToggleExampleComponent },
      { path: 'list', component: ListExampleComponent },
      { path: 'timestamp', component: TimestampExampleComponent },
      { path: 'master-detail', component: MasterDetailExampleComponent },
      { path: 'stepper', component: StepperExampleComponent },
      { path: 'stepper-large', component: StepperLargeExampleComponent },
      { path: 'tabs', component: TabsExampleComponent },
      { path: 'infinite-scrolling', component: InfiniteScrollingExampleComponent },
      { path: 'dialog', component: DialogExampleComponent },
      { path: 'file-input', component: FileInputExampleComponent },
      { path: 'file-list', component: FileListExampleComponent },
      { path: 'file-upload', component: FileUploadExampleComponent },
      { path: 'badge-notification', component: BadgeNotificationExampleComponent },
      { path: 'ripple', component: RippleExampleComponent },
      { path: 'html', component: HtmlExampleComponent },
      { path: 'markdown', component: MarkdownExampleComponent },
      { path: 'form-row', component: FormRowExampleComponent },
      { path: 'card-row', component: CardRowExampleComponent },
      { path: 'filter', component: FilterExampleComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsOverviewRoutingModule {}

LuxConsoleService.LOG('Modul "ComponentsOverviewRoutingModule" geladen...');

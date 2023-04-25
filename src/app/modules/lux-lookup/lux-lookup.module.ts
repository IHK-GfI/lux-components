import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from '@angular/material/legacy-autocomplete';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { LuxDirectivesModule } from '../lux-directives/lux-directives.module';
import { LuxFormModule } from '../lux-form/lux-form.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LuxLookupLabelComponent } from './lux-lookup-label/lux-lookup-label.component';
import { LuxComponentsConfigModule } from '../lux-components-config/lux-components-config.module';
import { LuxLookupAutocompleteAcComponent } from './lux-lookup-autocomplete-ac/lux-lookup-autocomplete-ac.component';
import { LuxLookupComboboxAcComponent } from './lux-lookup-combobox-ac/lux-lookup-combobox-ac.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatSelectModule,
    MatFormFieldModule,
    LuxDirectivesModule,
    LuxFormModule,
    MatAutocompleteModule,
    MatInputModule,
    FlexLayoutModule,
    LuxComponentsConfigModule
  ],
  declarations: [LuxLookupLabelComponent, LuxLookupAutocompleteAcComponent, LuxLookupComboboxAcComponent],
  providers: [HttpClient],
  exports: [LuxLookupLabelComponent, LuxLookupAutocompleteAcComponent, LuxLookupComboboxAcComponent]
})
export class LuxLookupModule {}

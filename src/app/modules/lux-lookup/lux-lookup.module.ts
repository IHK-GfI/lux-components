import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { LuxDirectivesModule } from '../lux-directives/lux-directives.module';
import { LuxFormModule } from '../lux-form/lux-form.module';
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
    LuxComponentsConfigModule
  ],
  declarations: [LuxLookupLabelComponent, LuxLookupAutocompleteAcComponent, LuxLookupComboboxAcComponent],
  providers: [HttpClient],
  exports: [LuxLookupLabelComponent, LuxLookupAutocompleteAcComponent, LuxLookupComboboxAcComponent]
})
export class LuxLookupModule {}

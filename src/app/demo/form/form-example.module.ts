import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LuxLayoutModule } from '../../modules/lux-layout/lux-layout.module';
import { LuxIconModule } from '../../modules/lux-icon/lux-icon.module';
import { LuxActionModule } from '../../modules/lux-action/lux-action.module';
import { LuxFormModule } from '../../modules/lux-form/lux-form.module';
import { LuxDirectivesModule } from '../../modules/lux-directives/lux-directives.module';
import { LuxPipesModule } from '../../modules/lux-pipes/lux-pipes.module';
import { FormExampleComponent } from './form-example.component';
import { FormSingleColComponent } from './form-single-col/form-single-col.component';
import { FormDualColComponent } from './form-dual-col/form-dual-col.component';
import { FormThreeColComponent } from './form-three-col/form-three-col.component';
import { FormCommonComponent } from './form-common/form-common.component';
import { TableExampleDataProviderService } from './table-example-data-provider.service';
import { ExampleBaseModule } from '../example-base/example-base.module';
import { UnsavedDataGuard } from './unsaved-data-guard/unsaved-data.guard';
import { WebFontDemoComponent } from './web-font-demo/web-font-demo.component';

const routes: Routes = [{ path: '', component: FormExampleComponent, canDeactivate: [UnsavedDataGuard] }];

@NgModule({
  imports: [
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
    ExampleBaseModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    FormExampleComponent,
    FormSingleColComponent,
    FormDualColComponent,
    FormThreeColComponent,
    FormCommonComponent,
    WebFontDemoComponent
  ],
  providers: [TableExampleDataProviderService]
})
export class FormExampleModule {}

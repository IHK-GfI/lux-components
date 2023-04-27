import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LuxIconModule } from '../../modules/lux-icon/lux-icon.module';
import { LuxLayoutModule } from '../../modules/lux-layout/lux-layout.module';
import { LuxFormModule } from '../../modules/lux-form/lux-form.module';
import { LuxActionModule } from '../../modules/lux-action/lux-action.module';
import { LuxDirectivesModule } from '../../modules/lux-directives/lux-directives.module';
import { BaselineExampleComponent } from './baseline-example.component';
import { BaselineComponent } from './baseline/baseline.component';
import { BaselineCardComponent } from './baseline-card/baseline-card.component';
import { BaselineAccordionComponent } from './baseline-accordion/baseline-accordion.component';
import { LuxCommonModule } from '../../modules/lux-common/lux-common.module';

const routes: Routes = [{ path: '', component: BaselineExampleComponent }];

@NgModule({
  imports: [
    CommonModule,
    LuxLayoutModule,
    LuxIconModule,
    LuxDirectivesModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    LuxFormModule,
    LuxActionModule,
    LuxCommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BaselineExampleComponent, BaselineComponent, BaselineCardComponent, BaselineAccordionComponent],
  providers: [HttpClient]
})
export class BaselineModule {}

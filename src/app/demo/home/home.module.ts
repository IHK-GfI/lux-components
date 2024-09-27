import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LuxIconModule } from '../../modules/lux-icon/lux-icon.module';
import { LuxLayoutModule } from '../../modules/lux-layout/lux-layout.module';
import { HomeComponent } from './home.component';
import { LuxDirectivesModule } from '../../modules/lux-directives/lux-directives.module';

@NgModule({ declarations: [HomeComponent],
    exports: [HomeComponent], imports: [CommonModule,
        LuxLayoutModule,
        LuxIconModule,
        LuxDirectivesModule,
        CommonModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class HomeModule {}

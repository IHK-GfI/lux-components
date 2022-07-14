import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LuxIconModule } from '../lux-icon/lux-icon.module';
import { LuxHttpErrorComponent } from './lux-http-error/lux-http-error.component';
import { LuxHttpErrorInterceptor } from './lux-http-error/lux-http-error-interceptor';
import { LuxLayoutModule } from '../lux-layout/lux-layout.module';
import { LuxErrorPageComponent } from './lux-error-page/lux-error-page.component';
import { RouterModule } from '@angular/router';
import { LuxComponentsConfigModule } from '../lux-components-config/lux-components-config.module';
import { LuxCommonModule } from '../lux-common/lux-common.module';
import { LuxActionModule } from '../lux-action/lux-action.module';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        RouterModule,
        LuxIconModule,
        LuxLayoutModule,
        LuxCommonModule,
        LuxActionModule,
        LuxComponentsConfigModule
    ],
    declarations: [LuxHttpErrorComponent, LuxErrorPageComponent],
    exports: [LuxHttpErrorComponent, LuxErrorPageComponent],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LuxHttpErrorInterceptor,
            multi: true
        }
    ]
})
export class LuxErrorModule {}

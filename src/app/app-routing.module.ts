import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LicenseHintComponent } from './demo/base/license-hint/license-hint.component';
import { HomeComponent } from './demo/home/home.component';
import { LuxConsoleService } from './modules/lux-util/lux-console.service';
import { ConfigurationComponent } from './demo/configuration/configuration.component';
import { DseComponent } from './demo/abstract/dse/dse.component';
import { DseResolver } from './demo/abstract/dse/dse.resolver';
import { ImpressumComponent } from './demo/abstract/impressum/impressum.component';
import { ImpressumResolver } from './demo/abstract/impressum/impressum.resolver';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'datenschutz',
    component: DseComponent,
    resolve: {
      content: DseResolver
    }
  },
  { path: 'license-hint', component: LicenseHintComponent },
  {
    path: 'impressum',
    component: ImpressumComponent,
    resolve: {
      content: ImpressumResolver
    }
  },
  {
    path: 'components-overview',
    loadChildren: () => import('./demo/components-overview/components-overview.module').then((m) => m.ComponentsOverviewModule)
  },
  { path: 'form', loadChildren: () => import('./demo/form/form-example.module').then((m) => m.FormExampleModule) },
  { path: 'configuration', component: ConfigurationComponent },
  { path: 'baseline', loadChildren: () => import('./demo/baseline/baseline.module').then((m) => m.BaselineModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule {}

LuxConsoleService.LOG('Modul "AppRoutingModule" geladen...');

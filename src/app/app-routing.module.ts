import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './demo/home/home.component';
import { LuxConsoleService } from './modules/lux-util/lux-console.service';
import { ConfigurationComponent } from './demo/configuration/configuration.component';
import { BaselineComponent } from './demo/baseline/baseline.component';
import { PlaceholderComponent } from './demo/abstract/placeholder/placeholder.component';
import { RedirectComponent } from './demo/abstract/redirect/redirect.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'datenschutz', component: PlaceholderComponent },
  { path: 'impressum', component: RedirectComponent },
  {
    path: 'components-overview',
    loadChildren: () =>
      import('app/demo/components-overview/components-overview.module').then(m => m.ComponentsOverviewModule)
  },
  { path: 'form', loadChildren: () => import('app/demo/form/form-example.module').then(m => m.FormExampleModule) },
  { path: 'configuration', component: ConfigurationComponent },
  { path: 'baseline', component: BaselineComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}

LuxConsoleService.LOG('Modul "AppRoutingModule" geladen...');

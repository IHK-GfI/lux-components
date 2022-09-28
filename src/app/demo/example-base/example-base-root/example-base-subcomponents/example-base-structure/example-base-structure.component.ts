import { Component, ContentChild, Input, OnDestroy, OnInit } from '@angular/core';
import { ExampleBaseContentComponent } from '../example-base-content/example-base-content.component';
import { ExampleBaseSimpleOptionsComponent } from '../example-base-options/example-base-simple-options.component';
import { ExampleBaseAdvancedOptionsComponent } from '../example-base-options/example-base-advanced-options.component';
import { LuxAppFooterButtonInfo } from '../../../../../modules/lux-layout/lux-app-footer/lux-app-footer-button-info';
import { LuxAppFooterButtonService } from '../../../../../modules/lux-layout/lux-app-footer/lux-app-footer-button.service';
import { LuxComponentsConfigService } from '../../../../../modules/lux-components-config/lux-components-config.service';
import { LuxComponentsConfigParameters } from '../../../../../modules/lux-components-config/lux-components-config-parameters.interface';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'example-base-structure',
  templateUrl: './example-base-structure.component.html',
  styleUrls: ['./example-base-structure.component.scss']
})
export class ExampleBaseStructureComponent implements OnInit, OnDestroy {
  private initialConfig: LuxComponentsConfigParameters;

  @Input() exampleTitle: string;
  @Input() exampleIconName: string;
  @Input() exampleDocumentationHref: string;

  @ContentChild(ExampleBaseContentComponent) contentComponent: ExampleBaseContentComponent;
  @ContentChild(ExampleBaseSimpleOptionsComponent)
  simpleOptionsComponent: ExampleBaseSimpleOptionsComponent;
  @ContentChild(ExampleBaseAdvancedOptionsComponent)
  advancedOptionsComponent: ExampleBaseAdvancedOptionsComponent;

  subscription: Subscription;

  constructor(
    private router: Router,
    private footerService: LuxAppFooterButtonService,
    private configService: LuxComponentsConfigService
  ) {
  }

  ngOnInit() {
    this.subscription =  this.configService.config.subscribe((config: LuxComponentsConfigParameters) => {
      this.initialConfig = config;
    });

    this.footerService.pushButtonInfos(
      LuxAppFooterButtonInfo.generateInfo({
        label: 'Dokumentation',
        iconName: 'lux-interface-arrows-expand-5',
        cmd: 'documentation-btn',
        color: 'primary',
        flat: true,
        raised: false,
        alwaysVisible: false,
        onClick: () => {
          window.open(this.exampleDocumentationHref, '_blank');
        }
      }),
      LuxAppFooterButtonInfo.generateInfo({
        label: 'Overview',
        iconName: 'lux-interface-arrows-button-left',
        cmd: 'back-btn',
        color: 'primary',
        flat: true,
        raised: false,
        alwaysVisible: true,
        onClick: () => {
          this.router.navigate(['components-overview']);
        }
      })
    );
  }

  ngOnDestroy() {
    this.footerService.clearButtonInfos();
    // Falls das Beispiel mit der Konfiguration herum spielt, sollte diese beim Verlassen wieder resettet werden.
    this.configService.updateConfiguration(this.initialConfig);

    this.subscription.unsubscribe();
  }
}

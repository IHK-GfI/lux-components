import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LuxAppFooterButtonService } from '../../../modules/lux-layout/lux-app-footer/lux-app-footer-button.service';
import { LuxAppFooterButtonInfo } from '../../../modules/lux-layout/lux-app-footer/lux-app-footer-button-info';

@Component({
  selector: 'app-layout-row-example',
  templateUrl: './form-row-example.component.html'
})
export class FormRowExampleComponent implements OnInit, OnDestroy {
  options: any[] = ['Lorem ipsum A', 'Lorem ipsum B', 'Lorem ipsum c'];

  constructor(private router: Router, private buttonService: LuxAppFooterButtonService) {}

  ngOnInit(): void {
    this.buttonService.buttonInfos = [
      LuxAppFooterButtonInfo.generateInfo({
        label: 'Dokumentation',
        iconName: 'fas fa-external-link-alt',
        cmd: 'documentation-btn',
        color: 'primary',
        raised: true,
        alwaysVisible: false,
        onClick: () => {
          window.open('https://github.com/IHK-GfI/lux-components/wiki/lux%E2%80%90layout%E2%80%90form%E2%80%90row', '_blank');
        }
      }),
      LuxAppFooterButtonInfo.generateInfo({
        label: 'Overview',
        iconName: 'fas fa-caret-left',
        cmd: 'back-btn',
        color: 'primary',
        raised: true,
        alwaysVisible: true,
        onClick: () => {
          this.router.navigate(['/components-overview']);
        }
      })
    ];
  }

  ngOnDestroy(): void {
    this.buttonService.buttonInfos = [];
  }
}

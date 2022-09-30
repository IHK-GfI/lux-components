import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LuxAppFooterButtonService } from '../../../modules/lux-layout/lux-app-footer/lux-app-footer-button.service';
import { LuxAppFooterButtonInfo } from '../../../modules/lux-layout/lux-app-footer/lux-app-footer-button-info';
import { LuxThemeService } from '../../../modules/lux-theme/lux-theme.service';
import { ThemePalette } from "@angular/material/core";

@Component({
  selector: 'app-layout-row-example',
  templateUrl: './form-row-example.component.html',
  styleUrls: ['./form-row-example.component.scss']
})
export class FormRowExampleComponent implements OnInit, OnDestroy {
  options: any[] = ['Lorem ipsum A', 'Lorem ipsum B', 'Lorem ipsum C'];
  markdownData=`
  Html
  \`\`\`
  <lux-layout>
    <lux-layout-form-row 
      [luxGap]="{row: '16px', rowItem: '24px', column: '8px'}"
    >
      <lux-input 
        luxLabel="Labeltext" 
        luxHint="Hinweistext" 
        *luxLayoutRowItem="{}"
      ></lux-input>
    </lux-layout-form-row>
    <lux-layout-form-row 
      [luxGap]="{row: '16px', rowItem: '24px', column: '8px'}"
    >
      <lux-input 
        luxLabel="Labeltext" 
        luxHint="Hinweistext" 
        *luxLayoutRowItem="{}"
      ></lux-input>
    </lux-layout-form-row>
  </lux-layout>
  \`\`\`
  `;

  rowHeight: string;
  dataSource= [
    { name: 'ohne (default)', blueHeight: '70px', greenHeight: '84px', example: 'Standard-Fall', link: 'baseline', linkName: 'Baseline' },
    { name: 'luxNoLabels', blueHeight: '30px', greenHeight: '40px', example: 'Form-Controls in editierbaren Tabellen', link: 'components-overview/example/table', linkName: 'Lux-Table' },
    { name: 'luxNoTopLabel', blueHeight: '53px', greenHeight: '63px', example: 'Checkboxen oder Toggle-Buttons in Spalten', link: 'components-overview/example/checkbox', linkName: 'Lux-Checkbox' },
    { name: 'luxNoBottomLabel', blueHeight: '47px', greenHeight: '61px', example: 'Form-Controls im Filterformular (ohne Validierung)', link: 'components-overview/example/filter', linkName: 'Lux-Filter'}
  ];
  
  markdownData2=`
  Html (Beipiel-Wert für das Blue-Theme)
  \`\`\`
  <lux-layout>
  ...
    <lux-layout-form-row [luxGap]="{ row: '63px', rowItem: '32px', column: '0px' }">
      <div *luxLayoutRowItem="{ empty: true }"></div>
    </lux-layout-form-row>
  ...
  </lux-layout>
  \`\`\`
  `;

  chips: {label: string; color: ThemePalette; removable: boolean; disabled: boolean; selected: boolean}[] = [
    { label: 'Chip #1', color: undefined, removable: true, disabled: false, selected: true },
    { label: 'Chip #2', color: 'primary', removable: true, disabled: false, selected: true },
    { label: 'Chip #3', color: 'warn', removable: true, disabled: false, selected: true },
    { label: 'Chip #4', color: 'accent', removable: true, disabled: false, selected: true }
  ];

  chipsOptions: string[] = ['Hallo', 'Ciao', 'Privet'];
 
  selected: any;

  
  constructor(private router: Router, private buttonService: LuxAppFooterButtonService, private themeService: LuxThemeService) {
    themeService.getTheme().name === 'blue' ? this.rowHeight = '63px' : this.rowHeight = '77px';
  }

  ngOnInit(): void {
    this.buttonService.buttonInfos = [
      LuxAppFooterButtonInfo.generateInfo({
        label: 'Dokumentation',
        iconName: 'lux-interface-arrows-expand-5',
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
        iconName: 'lux-interface-arrows-button-left',
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

  chipAdded($event: string) {
    this.chips.push({
      label: $event,
      color: 'warn',
      removable: true,
      disabled: false,
      selected: true
    });
  }
  chipRemoved($event: number) {
    this.chips = this.chips.filter((value: any, index: number) => index !== $event);
  }
}

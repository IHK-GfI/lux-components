import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LuxAppFooterButtonService } from '../../../modules/lux-layout/lux-app-footer/lux-app-footer-button.service';
import { LuxAppFooterButtonInfo } from '../../../modules/lux-layout/lux-app-footer/lux-app-footer-button-info';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-layout-row-example',
  templateUrl: './form-row-example.component.html',
  styleUrls: ['./form-row-example.component.scss']
})
export class FormRowExampleComponent implements OnInit, OnDestroy {
  options: any[] = ['Lorem ipsum A', 'Lorem ipsum B', 'Lorem ipsum C'];
  markdownData = `
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

  chips: { label: string; color: ThemePalette; removable: boolean; disabled: boolean; selected: boolean }[] = [
    { label: 'Chip #1', color: undefined, removable: true, disabled: false, selected: true },
    { label: 'Chip #2', color: 'primary', removable: true, disabled: false, selected: true },
    { label: 'Chip #3', color: 'warn', removable: true, disabled: false, selected: true },
    { label: 'Chip #4', color: 'accent', removable: true, disabled: false, selected: true }
  ];

  chipsOptions: string[] = ['Hallo', 'Ciao', 'Privet'];

  selected: any;

  htmlData1 = `
<pre>
Html

&lt;lux-layout-form-row [luxGap]="{ rowItem: '16px'}"&gt;
...
  &lt;div class="btn-container" *luxLayoutRowItem="{ flex: 'none'}"&gt;
    &lt;lux-button luxIconName="lux-info" luxTagId="btnInfo" [luxRounded]="true" luxColor="primary"&gt;&lt;/lux-button&gt;
    &lt;lux-button luxIconName="lux-interface-delete-bin-5" luxTagId="btnRemove" [luxRounded]="true" luxColor="warn"&gt;&lt;/lux-button&gt;
  &lt;/div&gt;
&lt;/lux-layout-form-row&gt;


SCSS

.btn-container {
  display: flex;
  gap: 10px;
}
</pre>
`;
  htmlData2 = `
<pre>
Html

&lt;lux-layout-form-row [luxGap]="{ rowItem: '16px' }"&gt;
  ...
  &lt;div class="btn-container" *luxLayoutRowItem="{ flex: 'none', formNoBottomLabel: true }"&gt;
    ...
  &lt;/div&gt;
&lt;/lux-layout-form-row&gt;


SCSS

.btn-container { display: flex; gap: 10px; }
</pre>`;

  constructor(private router: Router, private buttonService: LuxAppFooterButtonService) {}

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

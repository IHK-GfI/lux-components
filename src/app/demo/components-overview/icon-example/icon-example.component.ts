import { Component } from '@angular/core';
import { LuxIconColor, LuxIconColors } from '../../../modules/lux-util/lux-colors.enum';
import { LuxIconRegistryService } from 'public_api';

@Component({
  selector: 'app-icon-example',
  templateUrl: './icon-example.component.html',
  styleUrls: ['./icon-example.component.scss']
})
export class IconExampleComponent {
  colors: LuxIconColor[] = LuxIconColors;
  iconSizes: string[] = ['1x', '2x', '3x', '4x', '5x', '55px', '121px', '1.7em'];
  iconName = 'lux-interface-favorite-like-1';
  iconHint = 'Beispiele: app-box, app-ihk-gfi, lux-save,...';
  iconSize = '2x';
  rounded = false;
  margin = '0';
  padding = '4px';
  backgroundColor = '';

  constructor(private iconService: LuxIconRegistryService) {
    iconService.getSvgIconList().push({ iconName: 'app-box', iconBasePath: '/', iconPath: '/assets/svg/box.svg' });
    iconService.getSvgIconList().push({ iconName: 'app-ihk-gfi', iconBasePath: '/', iconPath: '/assets/svg/IHK_GfI.svg' });
  }
}

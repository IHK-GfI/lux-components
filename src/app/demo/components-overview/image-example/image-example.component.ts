import { Component } from '@angular/core';

@Component({
  selector: 'app-image-example',
  templateUrl: './image-example.component.html',
  styleUrls: ['./image-example.component.scss']
})
export class ImageExampleComponent {
  // region Helper-Properties für das Beispiel

  showImageFrame = false;

  imgSrcs: string[] = [
    'assets/png/example.png',
    'assets/svg/android.svg',
    'assets/svg/Example.svg',
    'assets/svg/red_power_button.svg',
    'assets/svg/svg2009.svg',
    'assets/svg/box.svg',
    '/fb/images/relative_image.png'
  ];

  // endregion

  // region Properties der Component

  imgSrc = 'assets/svg/box.svg';
  imgWidth = '50%';
  imgHeight = 'auto';
  imgRawSrc = false;

  // endregion

  constructor() {}
}

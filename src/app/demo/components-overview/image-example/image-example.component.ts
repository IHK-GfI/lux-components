import { Component } from '@angular/core';

@Component({
  selector: 'app-image-example',
  templateUrl: './image-example.component.html',
  styleUrls: ['./image-example.component.scss']
})
export class ImageExampleComponent {

  showImageFrame = false;
  imgSrcArr: string[] = [
    'assets/png/example.png',
    'assets/svg/android.svg',
    'assets/svg/Example.svg',
    'assets/svg/red_power_button.svg',
    'assets/svg/svg2009.svg',
    'assets/svg/box.svg',
    '/fb/images/relative_image.png'
  ];
  imgSrc = 'assets/svg/box.svg';
  imgWidth = '50%';
  imgHeight = 'auto';
  imgRawSrc = false;

  constructor() {}
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-example',
  templateUrl: './image-example.component.html',
  styleUrls: ['./image-example.component.scss']
})
export class ImageExampleComponent implements OnInit {
  // region Helper-Properties für das Beispiel

  showImageFrame: boolean = false;

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

  imgSrc: string = 'assets/svg/box.svg';
  imgWidth: string = '100%';
  imgHeight: string = 'auto';
  imgRawSrc: boolean = false;

  // endregion

  constructor() {}

  ngOnInit() {}
}

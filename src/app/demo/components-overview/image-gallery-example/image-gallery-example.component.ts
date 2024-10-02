import { Component, OnInit } from '@angular/core';
import { ILuxImageGallerySources } from 'src/app/modules/lux-image-gallery/lux-image-gallery-model/lux-image-gallery-source.interface';

@Component({
  selector: 'lux-image-gallery-example',
  templateUrl: './image-gallery-example.component.html',
  styleUrls: ['./image-gallery-example.component.scss']
})
export class ImageGalleryExampleComponent {

  gallerySources: ILuxImageGallerySources[] = [
    {imageSrc: 'assets/svg/box.svg'},
    {imageSrc: 'assets/svg/svg2009.svg'},
    {imageSrc: 'assets/svg/red_power_button.svg'}
  ];

  imgSrcArr: string[] = [
    'assets/png/example.png',
    'assets/svg/android.svg',
    'assets/svg/Example.svg',
    'assets/svg/red_power_button.svg',
    'assets/svg/svg2009.svg',
    'assets/svg/box.svg',
    '/fb/images/relative_image.png'
  ];

  galleryPreview: string = "assets/svg/svg2009.svg";

  constructor() { }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lux-master-detail-light-example',
  templateUrl: './master-detail-light-example.component.html',
  styleUrls: ['./master-detail-light-example.component.scss']
})
export class MasterDetailLightExampleComponent {

  listItems: any[] = [
    {title: 'Title Item 0', subtitle: 'Subtitle Item 0', value: 0, selected: false},
    {title: 'Title Item 1', subtitle: 'Subtitle Item 1', value: 1, selected: true},
    {title: 'Title Item 2', subtitle: 'Subtitle Item 2', value: 2, selected: false},
];
selectedItem: any;


 
onClick(that: any) {
    this.listItems.forEach((listItem: any) => listItem.selected = false);
    that.selected = true;
    this.selectedItem = that;
}
  constructor() { }

}

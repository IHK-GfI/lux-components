import { Component, OnInit } from '@angular/core';

import { LuxSvgIcon } from '../../../../modules/lux-icon/lux-icon/lux-svg-icon'
import { LuxIconRegistryService } from '../../../../modules/lux-icon/lux-icon/lux-icon-registry.service';
import { LuxIconColor, LuxIconColors } from '../../../../modules/lux-util/lux-colors.enum';


import {Clipboard} from '@angular/cdk/clipboard'
import { Observable } from 'rxjs';


@Component({
  selector: 'icon-overview',
  templateUrl: './icon-overview.component.html',
  styleUrls: ['./icon-overview.component.scss']
})
export class IconOverviewComponent implements OnInit {

  iconList: LuxSvgIcon[] = new Array<LuxSvgIcon>();
  isLoading = false;
  copiedToClipboard = false;
  codeSnippet: string = '<lux-icon></lux-icon>';

  private _inputValue = '';
  get inputValue(){
    return this._inputValue;
  }
  set inputValue(input: string) {
    if(this._inputValue !== input){
      this._inputValue = input;
      this.onIconSearchChange(this._inputValue);
    }
  }

  private _chipLabels: Array<string> = []; // wird durch das Inputvalue gesetzt, liefert Labels für die chips
  get chipLabels() {
    return this._chipLabels;
  }
  set chipLabels(labels: string[]) {
    this._chipLabels=labels;
    this._chipLabels.filter((item) => {
      item.length === 0;
    });
  }

  private allIcons: LuxSvgIcon[];
  private filterMap: Map<string, LuxSvgIcon[]>;

  private _previewItem?: LuxSvgIcon; // das Item, dass aus der Liste ausgesucht wurde
  get previewItem() {
    return this._previewItem;
  }
  set previewItem(item: LuxSvgIcon | undefined) {
    this._previewItem = item;
    this.uptdateCodeSnippet();
  }

  //Werte für das Ausgewählte Icon
  colorValues = [
    { label: 'Blau (primary)', value: 'blue'},
    { label: 'Grün (accent)', value: 'green'},
    { label: 'Rot (warn)', value: 'red'},
    { label: 'Hellblau', value: 'lightblue'},
    { label: 'Gelb', value: 'yellow'},
    { label: 'Orange', value: 'orange'},
    { label: 'Rosa', value: 'pink'},
    { label: 'Violett', value: 'purple'},
    { label: 'Grau', value: 'gray'},
    { label: 'Braun', value: 'brown'},
    { label: 'Schwarz', value: 'black'},
  ];

  iconColorOptions = [
    { label: 'Linienfarbe', value: false },
    { label: 'Hintergrundfarbe', value: true },
  ];

  iconSizes: string[] = ['1x', '2x', '3x', '4x', '5x'];

  private _iconSize = "2x";
  get iconSize() {
    return this._iconSize;
  }
  set iconSize(size: string) {
    this._iconSize = size;
    this.uptdateCodeSnippet();
  }

  private _iconColor: LuxIconColor = 'blue';
  get iconColor() {
    return this._iconColor;
  }
  set iconColor(color: LuxIconColor) {
    this._iconColor =  color;
    this.uptdateCodeSnippet();
  }

  private _iconClass = 'lux-color-blue';
  get iconClass() {
    return this._iconClass;
  }
  set iconClass(iClass: string) {
    this._iconClass = iClass;
    this.uptdateCodeSnippet();
  }

  private _isBgColor = false;
  get isBgColor() {
    return this._isBgColor;
  }
  set isBgColor(value: boolean) {
    this._isBgColor = value;
    this.uptdateCodeSnippet();
  }

  constructor(private iconReg: LuxIconRegistryService, private clipboard: Clipboard) {
    this.allIcons = this.iconReg.getSvgIconList();
    this.previewItem = undefined;
    this.filterMap = this.createFilterMap();
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.iconList = this.allIcons;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    });
  }

  onIconSearchChange(search: string) {
    if(!search) {
      this.iconList = this.allIcons;
      this.chipLabels.length = 0;
      return;
    }

    let result = new Array<LuxSvgIcon>();
    let filterValue = search.toLowerCase();
    let values = filterValue.split(' ');
    this.chipLabels = values;

    for (const value of values) {
      if (this.filterMap.has(value)) {
        if (result.length === 0){
          result = result.concat(this.filterMap.get(value)!);
        } else {
          result = result.filter(item => this.filterMap.get(value)!.includes(item));
        }
      }
    }

    this.iconList = result.filter((element, index) => {
      return result.indexOf(element) === index;
    });
  }

  // löscht die Suche
  resetInput() {
    this.iconList = this.allIcons;
    this.chipLabels.length = 0;
    this.inputValue = '';
  }

  chipRemoved(event: number) {
    let temp = this.inputValue.split(' ');
    temp.splice(event, 1);
    this.inputValue = temp.join(' ');
  }

  // ein Icon aus der Liste augewählt
  onItemClicked(item: LuxSvgIcon){
    this.previewItem = item;
  }

  copyToClipboard() {
    this.clipboard.copy(this.codeSnippet);
    this.copiedToClipboard = true;
  }

  // Funktionen für das Ausgeählte Icon
  colorChanged(color: { label: string; value: LuxIconColor }) {
    this.iconColor = color.value;
    this.iconClass = `lux-color-${color.value}`
  }

  optionChanged(option: { label: string; value: boolean }) {
    this.isBgColor = option.value;
  }

  private uptdateCodeSnippet() {
    if (this.previewItem) {
      if (!this.isBgColor){
        this.codeSnippet = `
        <lux-icon
          luxIconName="${this.previewItem.iconName.split('--')[0].toLowerCase()}"
          luxIconSize="${this.iconSize}"
          class="lux-color-${this.iconColor}"
        ></lux-icon>`;
      } else {
        this.codeSnippet = `
        <lux-icon
          luxIconName="${this.previewItem.iconName.split('--')[0].toLowerCase()}"
          luxIconSize="${this.iconSize}"
          luxColor="${this.iconColor}"
        ></lux-icon>`
      }
    }
    this.copiedToClipboard = false;
  }

  //Hilfsfunktion zum erstellen einer Map mit den Tags als Keys und den passenden Icons als Value
  private createFilterMap() {
    let temp = new Map<string, LuxSvgIcon[]>();

    for( let icon of this.allIcons) {
      let tags = icon.iconName.split('-');
      for(let tag of tags) {
        let key = tag.trim().toLowerCase();
        if(temp.has(key)){
          temp.get(key)!.push(icon);
        } else {
          if (key.length > 0)
            temp.set( key, [ icon ]);
        }
      }
    }
    return temp;
  }
}

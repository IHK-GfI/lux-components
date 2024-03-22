import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { LuxSvgIcon } from '../../../../modules/lux-icon/lux-icon/lux-svg-icon';
import { LuxIconRegistryService } from '../../../../modules/lux-icon/lux-icon/lux-icon-registry.service';
import { LuxIconColor } from '../../../../modules/lux-util/lux-colors.enum';
import { Clipboard } from '@angular/cdk/clipboard';
import { LuxMediaQueryObserverService } from '../../../../modules/lux-util/lux-media-query-observer.service';

declare interface SearchBinding {
  label: string;
  value: 'and' | 'or';
}

@Component({
  selector: 'icon-overview',
  templateUrl: './icon-overview.component.html',
  styleUrls: ['./icon-overview.component.scss']
})
export class IconOverviewComponent implements OnInit, OnDestroy {
  @ViewChild('scrollContainer') scrollContainer?: ElementRef;

  allIcons: LuxSvgIcon[];
  blockSize = 100;
  codeSnippet = '';
  copiedToClipboard = false;
  displayedIcons: LuxSvgIcon[] = [];
  fgBgOptions = [
    { label: 'Linienfarbe', value: false },
    { label: 'Hintergrundfarbe', value: true }
  ];
  filteredIcons: LuxSvgIcon[] = [];
  iconColorOptions = [
    { label: 'Blau (primary)', value: 'blue' },
    { label: 'Grün (accent)', value: 'green' },
    { label: 'Rot (warn)', value: 'red' },
    { label: 'Hellblau', value: 'lightblue' },
    { label: 'Gelb', value: 'yellow' },
    { label: 'Orange', value: 'orange' },
    { label: 'Rosa', value: 'pink' },
    { label: 'Violett', value: 'purple' },
    { label: 'Grau', value: 'gray' },
    { label: 'Braun', value: 'brown' },
    { label: 'Schwarz', value: 'black' }
  ];
  iconSizesOptions: string[] = ['1x', '2x', '3x', '4x', '5x'];
  mobileView: boolean;
  searchBindingOptions: SearchBinding[] = [
    { label: 'Und', value: 'and' },
    { label: 'Oder', value: 'or' }
  ];
  selectedSearchBinding = this.searchBindingOptions[0];
  subscriptions: Subscription[] = [];

  private _chipLabels: string[] = [];
  private _iconClass = 'lux-color-blue';
  private _iconColor: LuxIconColor = 'blue';
  private _iconSize = '2x';
  private _inputValue = '';
  private _isBgColor = false;
  private _previewItem?: LuxSvgIcon;

  get inputValue() {
    return this._inputValue;
  }

  set inputValue(input: string) {
    if (this._inputValue !== input) {
      this._inputValue = input;
      this.onIconSearch(this._inputValue);
    }
  }

  get chipLabels() {
    return this._chipLabels;
  }

  set chipLabels(labels: string[]) {
    this._chipLabels = labels;
    this._chipLabels.filter((item) => item.length === 0);
  }

  get previewItem() {
    return this._previewItem;
  }

  set previewItem(item: LuxSvgIcon | undefined) {
    this._previewItem = item;
    this.updateCodeSnippet();
  }

  get iconSize() {
    return this._iconSize;
  }

  set iconSize(size: string) {
    this._iconSize = size;
    this.updateCodeSnippet();
  }

  get iconColor() {
    return this._iconColor;
  }

  set iconColor(color: LuxIconColor) {
    this._iconColor = color;
    this.updateCodeSnippet();
  }

  get iconClass() {
    return this._iconClass;
  }

  set iconClass(iClass: string) {
    this._iconClass = iClass;
    this.updateCodeSnippet();
  }

  get isBgColor() {
    return this._isBgColor;
  }

  set isBgColor(value: boolean) {
    this._isBgColor = value;
    this.updateCodeSnippet();
  }

  constructor(private mediaQuery: LuxMediaQueryObserverService, private iconReg: LuxIconRegistryService, private clipboard: Clipboard) {
    this.mobileView = mediaQuery.isSmaller('md');
    this.subscriptions.push(
      this.mediaQuery.getMediaQueryChangedAsObservable().subscribe((query) => {
        this.mobileView = mediaQuery.isSmaller('md');
      })
    );

    this.allIcons = this.iconReg.getSvgIconList();
  }

  ngOnInit(): void {
    this.updateIcons(this.allIcons, false);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  onScroll() {
    if (this.filteredIcons.length > 0) {
      const start = 0;
      const end = Math.min(this.blockSize, this.filteredIcons.length);
      this.displayedIcons.push(...this.filteredIcons.splice(start, end));
    }
  }

  onIconSearch(searchText: string) {
    if (searchText) {
      const filterValue = searchText.toLowerCase();
      const values = filterValue.split(' ');
      this.chipLabels = values;

      let resultIcons: LuxSvgIcon[] = [];

      if (this.selectedSearchBinding.value === 'and') {
        for (let value of values) {
          const valueResult = this.allIcons.filter((icon) => icon.iconName.toLowerCase().includes(value));

          if (resultIcons.length > 0) {
            const intersection = resultIcons.filter((icon) => valueResult.includes(icon));

            if (intersection) {
              resultIcons = intersection;
            } else {
              resultIcons = [];
              break;
            }
          } else {
            resultIcons.push(...valueResult);
          }
        }
      } else {
        values.forEach((value) => {
          const valueResult = this.allIcons.filter((icon) => icon.iconName.toLowerCase().includes(value));
          if (valueResult) {
            const newIcons = valueResult.filter((icon) => !resultIcons.includes(icon));
            if (newIcons) {
              resultIcons.push(...newIcons);
            }
          }
        });
      }

      this.updateIcons(resultIcons);

      if (this.scrollContainer) {
        this.scrollContainer.nativeElement.scrollTop = 0;
      }
    } else {
      this.updateIcons(this.allIcons);
      this.chipLabels.length = 0;
    }
  }

  onResetInput() {
    this.updateIcons(this.allIcons);
    this.chipLabels.length = 0;
    this.inputValue = '';
  }

  onChipRemoved(event: number) {
    let temp = this.inputValue.split(' ');
    temp.splice(event, 1);
    this.inputValue = temp.join(' ');
  }

  onIconClicked(item: LuxSvgIcon) {
    this.previewItem = item;
  }

  onCopyToClipboard() {
    this.clipboard.copy(this.codeSnippet);
    this.copiedToClipboard = true;
  }

  onColorChanged(color: { label: string; value: LuxIconColor }) {
    this.iconColor = color.value;
    this.iconClass = `lux-color-${color.value}`;
  }

  onBgChanged(option: { label: string; value: boolean }) {
    this.isBgColor = option.value;
  }

  onSearchBindingChanged() {
    this.onIconSearch(this.inputValue);
  }

  private updateCodeSnippet() {
    if (this.previewItem) {
      if (!this.isBgColor) {
        this.codeSnippet = `
<lux-icon
  luxIconName="${this.previewItem.iconName.split('--')[0].toLowerCase()}"
  luxIconSize="${this.iconSize}"
  class="lux-color-${this.iconColor}">
</lux-icon>`;
      } else {
        this.codeSnippet = `
<lux-icon
  luxIconName="${this.previewItem.iconName.split('--')[0].toLowerCase()}"
  luxIconSize="${this.iconSize}"
  luxColor="${this.iconColor}">
</lux-icon>`;
      }
    }
    this.copiedToClipboard = false;
  }

  private updateIcons(icons: LuxSvgIcon[], resetDisplayedIcons = true) {
    this.filteredIcons = [...icons];
    if (resetDisplayedIcons) {
      this.displayedIcons = [];
    }
    this.onScroll();

    if (this.displayedIcons.length > 0) {
      this.previewItem = this.displayedIcons[0];
    } else {
      this.previewItem = undefined;
    }
  }
}

import { Component, ElementRef, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { FocusableOption } from '@angular/cdk/a11y';

@Component({
  selector: 'lux-list-item',
  templateUrl: './lux-list-item.component.html',
  styleUrls: ['./lux-list-item.component.scss']
})
export class LuxListItemComponent implements FocusableOption {
  private _luxTitle: string;
  private _luxSubTitle: string;
  private _luxSelected: boolean;

  @HostBinding('attr.aria-label') ariaLabel;
  @HostBinding('attr.aria-selected') ariaSelected;
  @HostBinding('attr.role') role = 'option';
  @HostBinding('attr.tabindex') tabindex = '-1';

  @Output() luxClicked: EventEmitter<any> = new EventEmitter();

  @Input() luxTitleLineBreak = true;

  get luxTitle(): string {
    return this._luxTitle;
  }

  @Input() set luxTitle(title: string) {
    this._luxTitle = title;
    this.ariaLabel = this.getLabel();
  }

  get luxSubTitle(): string {
    return this._luxSubTitle;
  }

  @Input() set luxSubTitle(subTitle: string) {
    this._luxSubTitle = subTitle;
    this.ariaLabel = this.getLabel();
  }

  get luxSelected(): boolean {
    return this._luxSelected;
  }

  @Input() set luxSelected(selected: boolean) {
    this._luxSelected = selected;
    this.ariaSelected = selected;
  }

  constructor(public elementRef: ElementRef) {}

  clicked() {
    this.luxClicked.emit(null);
  }

  focus(): void {
    this.elementRef.nativeElement.focus();
  }

  getLabel() {
    return `${this.luxTitle ? this.luxTitle : ''} ${this.luxSubTitle ? this.luxSubTitle : ''}`;
  }
}

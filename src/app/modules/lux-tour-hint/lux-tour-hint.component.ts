import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LuxTourHintRef } from './lux-tour-hint-model/lux-tour-hint-ref.class';

@Component({
  selector: 'lux-tour-hint',
  templateUrl: './lux-tour-hint.component.html',
  styleUrls: ['./lux-tour-hint.component.scss']
})
export class LuxTourHintComponent implements OnInit, AfterViewInit {
  //The element which is the target of the hint or tour
  private _luxTarget: any;

  set luxTarget(luxTarget: any) {
    this._luxTarget = luxTarget;

    //Needs a timeout or the content will not be rendered and so the bounds cannot be read corretly
    setTimeout(() => {
      this.updateTargetAndPositions();
    });
  }

  get luxTarget(): any {
    return this._luxTarget;
  }

  //CSS Class for the arrow where to point
  public arrowClass = 'top';

  //Constants which are also used in scss but can't directly be read from here
  private arrowLength = 16;
  private shadowPadding = 5;

  //Positions of the tour-hint modal
  public tourHintPosLeft = 0;
  public tourHintPosTop = 0;

  //Positions / Sizes of the tour-hint shadows
  public bgTopSize = 0;
  public bgBottomSize = 0;
  public bgLeftSize = 0;
  public bgRightSize = 0;
  public bgContentHeight = 0;

  //Style variables for the rendering of a dynamic 'Modal-Arrow'
  public dynamicArrowStyle = {};

  @ViewChild('tourHintContainer', { read: ElementRef })
  private tourHintContainer!: ElementRef;

  constructor(private cdr: ChangeDetectorRef, private element: ElementRef, public tourHintRef: LuxTourHintRef) {}

  ngOnInit(): void {
    //When resizing / min- / maximizing window update all positions
    addEventListener('resize', () => {
      this.updateTargetAndPositions();
    });
  }

  ngAfterViewInit(): void {
    //Focus after loaded so we can navigate the tour with arrow keys
    this.tourHintContainer.nativeElement.focus();
  }

  private updateTargetAndPositions() {
    if (!this.luxTarget) return;

    //Scrolls the element into view
    //TODO: In some cases scroll 'feels' wrong and target element is not centered on screen.
    this.luxTarget.scrollIntoView({
      block: 'center',
      inline: 'center'
    });

    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let bounds = this.getSurroundingBounds(this.luxTarget);

    this.calculatePositions(windowWidth, windowHeight, bounds);

    //Css variables, positions and styles were changesd so we need to rerender
    this.cdr.detectChanges();
  }

  private calculatePositions(winWidth: number, winHeight: number, bounds: any) {
    //Calculate where the tour-hint should be shown
    let calculatedComponentBounds = this.tourHintContainer.nativeElement.getBoundingClientRect();
    let calculatedWidth = calculatedComponentBounds.width;
    let calculatedHeight = calculatedComponentBounds.height;

    let spaceTop = bounds.top - calculatedHeight;
    let spaceBottom = winHeight - bounds.bottom - calculatedHeight;
    let spaceLeft = bounds.left - calculatedWidth;
    let spaceRight = winWidth - bounds.right - calculatedWidth;
    let spaceMax = Math.max(spaceTop, spaceBottom, spaceLeft, spaceRight);

    let neededWidth = calculatedWidth + this.arrowLength;
    let neededHeight = calculatedHeight + this.arrowLength;

    let showTop = spaceTop === spaceMax;
    let showBottom = spaceBottom === spaceMax;
    let showLeft = spaceLeft === spaceMax;
    let showRight = spaceRight === spaceMax;

    //Min value for offsetting the arrow when tour-hint is at an edge of the screen
    let arrowOffset = this.arrowLength * 4;

    //Offsets for modal and arrow so when target is outside screen it will be handled correctly
    let baseOffX = 0;
    let baseOffY = 0;
    let arrowOffX = 0;
    let arrowOffY = 0;

    if (showTop || showBottom) {
      //Top OR Bottom
      this.tourHintPosLeft = bounds.midX - this.arrowLength * 2;
      if (this.tourHintPosLeft < 0) this.tourHintPosLeft = 0;

      baseOffX = this.tourHintPosLeft + neededWidth - winWidth;
      arrowOffX = baseOffX;
      baseOffY = 0;
      arrowOffY = 0;

      if (baseOffX < 0) {
        baseOffX = 0;
        arrowOffX = 0;
      } else if (baseOffX >= calculatedWidth - arrowOffset) arrowOffX = calculatedWidth - arrowOffset;

      if (showTop) {
        //Show on top
        this.arrowClass = 'bottom';
        this.tourHintPosTop = bounds.top - neededHeight;
      } else {
        //Show on bottom
        this.arrowClass = 'top';
        this.tourHintPosTop = bounds.bottom + this.arrowLength;
      }

      if (this.tourHintPosTop < 0) this.tourHintPosTop = 0;
    } else {
      //Left OR Right
      this.tourHintPosTop = bounds.midY - this.arrowLength * 2;
      if (this.tourHintPosTop < 0) this.tourHintPosTop = 0;

      baseOffX = 0;
      arrowOffX = 0;
      baseOffY = this.tourHintPosTop + neededHeight - winHeight;
      arrowOffY = baseOffY;

      if (baseOffY < 0) {
        baseOffY = 0;
        arrowOffY = 0;
      } else if (baseOffY >= calculatedHeight - arrowOffset) arrowOffY = calculatedHeight - arrowOffset;

      if (showLeft) {
        //Show on left side
        this.arrowClass = 'right';
        this.tourHintPosLeft = bounds.left - neededWidth;
      } else {
        //Show on right side
        this.arrowClass = 'left';
        this.tourHintPosLeft = bounds.right + this.arrowLength;
      }

      if (this.tourHintPosLeft < 0) this.tourHintPosLeft = 0;
    }

    this.dynamicArrowStyle = {
      '--baseOffsetX': -baseOffX + 'px',
      '--baseOffsetY': -baseOffY + 'px',
      '--arrowOffsetX': -arrowOffX + 'px',
      '--arrowOffsetY': -arrowOffY + 'px'
    };

    //Calculate shadows for the highlight
    this.bgTopSize = Math.max(0, bounds.top - this.shadowPadding);
    this.bgBottomSize = Math.max(0, winHeight - (bounds.bottom + this.shadowPadding));
    this.bgLeftSize = Math.max(0, bounds.left - this.shadowPadding);
    this.bgRightSize = Math.max(0, winWidth - (bounds.right + this.shadowPadding));

    this.bgContentHeight = winHeight - (this.bgTopSize + this.bgBottomSize);
  }

  //Calculates the 'surrounding bounds' of an element so the element and all its children are contained.
  //This is needed because sometimes elements dont have a width / height but the children define the bounds.
  private getSurroundingBounds(el: any, bounds: any = {}) {
    let myBounds = el.getBoundingClientRect();

    if (myBounds.left !== undefined && (bounds.left === undefined || myBounds.left < bounds.left)) {
      bounds.left = myBounds.left;
    }

    if (myBounds.right !== undefined && (bounds.right === undefined || myBounds.right > bounds.right)) {
      bounds.right = myBounds.right;
    }

    if (myBounds.top !== undefined && (bounds.top === undefined || myBounds.top < bounds.top)) {
      bounds.top = myBounds.top;
    }

    if (myBounds.bottom !== undefined && (bounds.bottom === undefined || myBounds.bottom > bounds.bottom)) {
      bounds.bottom = myBounds.bottom;
    }

    if (!myBounds.width || !myBounds.height) {
      let children = el.children;
      for (let child of children) {
        this.getSurroundingBounds(child, bounds);
      }
    }

    bounds.midX = (bounds.left + bounds.right) / 2;
    bounds.midY = (bounds.top + bounds.bottom) / 2;

    return bounds;
  }

  public close() {
    this.element.nativeElement.remove();
  }
}

import { AfterViewInit, Component, ElementRef, HostListener, Inject, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { LuxUtil } from '../../../../lux-util/lux-util';
import { LuxStepperLargeComponent } from '../../lux-stepper-large.component';
import { LUX_STEPPER_LARGE_OVERLAY_DATA, LuxStepperLargeMobileOverlayData } from './lux-stepper-large-mobile-overlay-data';
import { LuxStepperLargeMobileOverlayRef } from './lux-stepper-large-mobile-overlay-ref';

@Component({
  selector: 'lux-lux-stepper-large-mobile-overlay',
  templateUrl: './lux-stepper-large-mobile-overlay.component.html',
  styleUrls: ['./lux-stepper-large-mobile-overlay.component.scss']
})
export class LuxStepperLargeMobileOverlayComponent implements OnInit, AfterViewInit {
  @ViewChildren('links') links: QueryList<ElementRef>;

  stepperComponent: LuxStepperLargeComponent;

  @HostListener('document:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent) {
    if (LuxUtil.isKeyEscape(event)) {
      this.overlayRef.close();
    }
  }

  constructor(
    @Inject(LuxStepperLargeMobileOverlayRef) public overlayRef: LuxStepperLargeMobileOverlayRef,
    @Inject(LUX_STEPPER_LARGE_OVERLAY_DATA) public data: LuxStepperLargeMobileOverlayData
  ) {}

  ngOnInit(): void {
    this.stepperComponent = this.data.stepperComponent;
  }

  ngAfterViewInit() {
    if (
      this.links &&
      this.stepperComponent.luxCurrentStepNumber &&
      this.links.get(this.stepperComponent.luxCurrentStepNumber).nativeElement
    ) {
      (this.links.get(this.stepperComponent.luxCurrentStepNumber).nativeElement as HTMLElement).focus();
    }
  }

  onNavLink(stepIndex: number) {
    this.stepperComponent.onNavLink(stepIndex);
    this.overlayRef.close();
  }
}

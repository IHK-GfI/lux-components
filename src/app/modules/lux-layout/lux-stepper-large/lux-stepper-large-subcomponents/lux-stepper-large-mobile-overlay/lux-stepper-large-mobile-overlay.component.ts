import { AfterViewInit, Component, ElementRef, HostListener, Inject, OnInit, QueryList, ViewChildren } from '@angular/core';
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
  @ViewChildren('links') links!: QueryList<ElementRef>;

  stepperComponent!: LuxStepperLargeComponent;

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

    LuxUtil.assertNonNull('stepperComponent', this.stepperComponent);
  }

  ngAfterViewInit() {
    if (this.links && this.links.length > 0) {
      const activeLink = this.links
        .toArray()
        .find(
          (element) => element.nativeElement && element.nativeElement.classList && !!element.nativeElement.classList.contains('active-link')
        );
      if (activeLink && activeLink.nativeElement) {
        activeLink.nativeElement.focus();
      }
    }
  }

  onNavLink(stepIndex: number) {
    if (this.stepperComponent.luxCurrentStepNumber !== stepIndex) {
      this.overlayRef.close();
      this.stepperComponent.onNavLink(stepIndex);
    }
  }
}

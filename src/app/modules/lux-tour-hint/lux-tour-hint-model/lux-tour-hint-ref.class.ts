import { EventEmitter, Injectable } from '@angular/core';
import { LuxTourHintComponent } from '../lux-tour-hint.component';
import { InitializedTourHintConfig } from '../lux-tour-hint.service';

export type OnCloseListener = (dontShowAgain: boolean) => void;

@Injectable({
  providedIn: 'root'
})
export class LuxTourHintRef<T = any> {
  public get target(): any {
    return this.tourStepConfigs[this.tourStep].target;
  }

  public get data(): T {
    return this.tourStepConfigs[this.tourStep].data;
  }

  public get step(): number {
    return this.tourStep;
  }

  public get steps(): number {
    return this.tourStepConfigs.length;
  }

  private _opened = false;
  public get opened(): boolean {
    return this._opened;
  }

  private tourHintContainer?: LuxTourHintComponent;
  private tourStep = 0;
  private tourStepConfigs: InitializedTourHintConfig[] = [];

  private _optionDontShowAgain = true;
  public get optionDontShowAgain(): boolean {
    return this._optionDontShowAgain;
  }

  private dontShowAgainCallback!: () => void;

  private onCloseListeners: OnCloseListener[] = [];

  constructor() {}

  public init(
    tourHintContainer: LuxTourHintComponent,
    configs: InitializedTourHintConfig[],
    optionDontShowAgain: boolean,
    dontShowAgainCallback: () => void
  ) {
    this.tourHintContainer = tourHintContainer;
    this.tourStep = 0;
    this.tourStepConfigs = configs;
    this._optionDontShowAgain = optionDontShowAgain;
    this.dontShowAgainCallback = dontShowAgainCallback;
    this._opened = true;

    this.onCloseListeners = [];

    this.updateTour();
  }

  private updateTour() {
    if (!this.tourHintContainer) return;

    let targetElement = this.target;
    this.tourHintContainer.luxTarget = targetElement;
  }

  public hasNext(): boolean {
    return this.tourStep + 1 < this.tourStepConfigs.length;
  }

  public hasPrevious(): boolean {
    return this.tourStep - 1 >= 0;
  }

  public next() {
    if (!this.hasNext()) {
      return;
    }

    this.tourStep++;
    this.updateTour();
  }

  public prev() {
    if (!this.hasPrevious()) {
      return;
    }

    this.tourStep--;
    this.updateTour();
  }

  public close(dontShowAgain = false) {
    this.onCloseListeners.forEach((listener) => {
      listener(dontShowAgain);
    });

    if (dontShowAgain) {
      this.dontShowAgainCallback();
    }

    this.tourHintContainer?.close();

    this._opened = false;
  }

  public onClose(listener: OnCloseListener) {
    this.onCloseListeners.push(listener);
  }
}

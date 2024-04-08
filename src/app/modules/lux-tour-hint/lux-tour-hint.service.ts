import { ComponentType } from '@angular/cdk/portal';
import { ApplicationRef, ComponentRef, createComponent, EnvironmentInjector, Injectable } from '@angular/core';
import { LuxStorageService } from '../lux-util/lux-storage.service';
import { LuxTourHintRef } from './lux-tour-hint-model/lux-tour-hint-ref.class';
import { ILuxTourHintStepConfig } from './lux-tour-hint-model/lux-tour-hint-step-config.interface';
import { LuxTourHintPresetComponent } from './lux-tour-hint-preset/lux-tour-hint-preset.component';
import { LuxTourHintComponent } from './lux-tour-hint.component';

export interface InitializedTourHintConfig {
  targetId: string;
  target: any;
  data?: any;
}

@Injectable({
  providedIn: 'root'
})
export class LuxTourHintService {
  public tourContainer?: ComponentRef<LuxTourHintComponent>;

  constructor(
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector,
    private tourHintRef: LuxTourHintRef,
    private storage: LuxStorageService
  ) {
    window.addEventListener('popstate', () => {
      this.onPageNavigate();
    });
  }

  //When navigating pages while the tour-hint is open tour-hint must be closed if open!
  private onPageNavigate() {
    if (this.tourHintRef.opened) {
      this.close();
    }
  }

  public open(tourConfig: ILuxTourHintStepConfig | ILuxTourHintStepConfig[], optionDontShowAgain = true): LuxTourHintRef {
    return this.openComponent(LuxTourHintPresetComponent, tourConfig, optionDontShowAgain);
  }

  public openComponent(
    comp: ComponentType<any>,
    tourConfig: ILuxTourHintStepConfig | ILuxTourHintStepConfig[],
    optionDontShowAgain = true
  ): LuxTourHintRef {
    if (!(tourConfig instanceof Array)) {
      tourConfig = [tourConfig];
    }

    //Initialize the configs...
    let initializedConfigs: InitializedTourHintConfig[] = this.prepareConfigs(tourConfig);

    //DSA (Don't show again)
    let dsaCacheId = this.getDontShowAgainId(initializedConfigs);

    //If the dsa id is in local storage cancel showing the tour-hint
    let cacheEntry = this.storage.getItem(dsaCacheId);
    if (cacheEntry) {
      return this.tourHintRef;
    }

    //The preset / custom component
    let innerComp = createComponent(comp, {
      environmentInjector: this.injector
    });

    //The outer container for the modal
    this.tourContainer = createComponent(LuxTourHintComponent, {
      environmentInjector: this.injector,
      projectableNodes: [[innerComp.location.nativeElement]]
    });

    //Add a keylistener for the tour-hint content so we can navigate the tour with arrow keys
    this.tourContainer.location.nativeElement.addEventListener('keydown', (e: any) => {
      this.onTourElementKeyPress(e);
    });

    //Append the container to the html body and attach both generated components so they will work in the angular context
    document.body.appendChild(this.tourContainer.location.nativeElement);
    this.appRef.attachView(this.tourContainer.hostView);
    this.appRef.attachView(innerComp.hostView);

    //Push new tour-hint data to the tourHintRef
    this.tourHintRef.init(this.tourContainer.instance, initializedConfigs, optionDontShowAgain, () => {
      this.dsaCallback(dsaCacheId);
    });

    return this.tourHintRef;
  }

  private prepareConfigs(configs: ILuxTourHintStepConfig[]): InitializedTourHintConfig[] {
    let initializedConfigs: InitializedTourHintConfig[] = [];

    for (let config of configs) {
      let target = document.getElementById(config.targetId);
      if (!target) {
        throw new Error(
          'Cannot find element with id [' + config.targetId + ']. Perhaps tour-hint was started before content initialization?'
        );
      }

      initializedConfigs.push({
        targetId: config.targetId,
        target: target,
        data: config.data
      });
    }

    return initializedConfigs;
  }

  private getDontShowAgainId(configs: InitializedTourHintConfig[]): string {
    let id = '[lux-tour-hint-dsa] ';

    for (let i = 0; i < configs.length; i++) {
      if (i != 0) id += '_';

      let config = configs[i];
      id += config.targetId;
    }

    return id;
  }

  private onTourElementKeyPress(e: any) {
    let key = e.key;
    if (key === 'Enter') {
      this.close();
    } else if (key === 'ArrowLeft') {
      this.tourHintRef.prev();
    } else if (key === 'ArrowRight') {
      this.tourHintRef.next();
    }
  }

  private dsaCallback(dsaId: string) {
    this.storage.setItem(dsaId, 'true', false);
  }

  public clearDSACacheForConfig(tourConfig: ILuxTourHintStepConfig | ILuxTourHintStepConfig[]) {
    if (!(tourConfig instanceof Array)) {
      tourConfig = [tourConfig];
    }

    let initializedConfigs: InitializedTourHintConfig[] = this.prepareConfigs(tourConfig);
    let cacheId = this.getDontShowAgainId(initializedConfigs);

    this.storage.removeItem(cacheId);
  }

  public close(dontShowAgain = false) {
    this.tourHintRef.close(dontShowAgain);
  }
}

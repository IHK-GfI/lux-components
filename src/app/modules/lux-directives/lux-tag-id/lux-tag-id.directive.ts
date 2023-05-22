import { AfterViewInit, Directive, ElementRef, Input, OnDestroy, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { LuxComponentsConfigParameters } from '../../lux-components-config/lux-components-config-parameters.interface';
import { LuxComponentsConfigService } from '../../lux-components-config/lux-components-config.service';
import { luxFormControlSelektor } from '../../lux-form/lux-form-control-wrapper/lux-form-control-wrapper.component';

@Directive({
  selector: '[luxTagIdHandler]'
})
export class LuxTagIdDirective implements AfterViewInit, OnDestroy {
  public static readonly luxTagIdAttrName: string = 'data-luxtagid';
  public static readonly sepParent: string = '.';
  public static readonly sepComponent: string = '#';

  private configSubscription: Subscription;

  @Input() luxTagId?: string;

  generateLuxTagIds = false;

  constructor(private elementRef: ElementRef, private renderer: Renderer2, public componentsConfigService: LuxComponentsConfigService) {
    this.configSubscription = this.componentsConfigService.config.subscribe((newConfig: LuxComponentsConfigParameters) => {
      this.generateLuxTagIds = newConfig.generateLuxTagIds ?? false;
    });
  }

  ngAfterViewInit() {
    if (this.generateLuxTagIds) {
      const luxComponent: Element | null = this.findLuxComponent(this.elementRef.nativeElement);

      if (luxComponent) {
        let newTagId = this.luxTagId ?? this.getLuxTagId(luxComponent);

        if (newTagId) {
          newTagId = this.mergeTagIds(
            this.getLuxTagIdParent(luxComponent.parentElement, ''),
            luxComponent.nodeName + LuxTagIdDirective.sepComponent + newTagId
          );
          newTagId = newTagId.toLowerCase();

          this.renderer.setAttribute(luxComponent, LuxTagIdDirective.luxTagIdAttrName, newTagId);
        } else {
          newTagId = this.getLuxTagIdParent(luxComponent.parentElement, '');
          let usedLabel = false;
          if (luxComponent.getAttribute('luxLabel')) {
            newTagId = this.mergeTagIds(newTagId, luxComponent.getAttribute('luxLabel'));
            newTagId = newTagId.toLowerCase();
            this.renderer.setAttribute(luxComponent, LuxTagIdDirective.luxTagIdAttrName, newTagId);

            usedLabel = true;
          } else if (luxComponent.getAttribute('ng-reflect-lux-label')) {
            newTagId = this.mergeTagIds(newTagId, luxComponent.getAttribute('ng-reflect-lux-label'));
            newTagId = newTagId.toLowerCase();
            this.renderer.setAttribute(luxComponent, LuxTagIdDirective.luxTagIdAttrName, newTagId);

            usedLabel = true;
          } else if (luxComponent.getAttribute('ng-reflect-label')) {
            newTagId = this.mergeTagIds(newTagId, luxComponent.getAttribute('ng-reflect-label'));
            newTagId = newTagId.toLowerCase();
            this.renderer.setAttribute(luxComponent, LuxTagIdDirective.luxTagIdAttrName, newTagId);

            usedLabel = true;
          } else if (luxComponent.getElementsByClassName('lux-form-label')[0]) {
            let text = luxComponent.getElementsByClassName('lux-form-label')[0].textContent;
            newTagId = this.mergeTagIds(newTagId, text ? text.trim() : null);
            newTagId = newTagId.toLowerCase();
            this.renderer.setAttribute(luxComponent, LuxTagIdDirective.luxTagIdAttrName, newTagId);

            usedLabel = true;
          } else if (luxComponent.getElementsByClassName('lux-form-label-authentic')[0]) {
            let text = luxComponent.getElementsByClassName('lux-form-label-authentic')[0].textContent;
            newTagId = this.mergeTagIds(newTagId, text ? text.trim() : null);
            newTagId = newTagId.toLowerCase();
            this.renderer.setAttribute(luxComponent, LuxTagIdDirective.luxTagIdAttrName, newTagId);

            usedLabel = true;
          } else if (luxComponent.nodeName && luxComponent.nodeName.toLowerCase() === 'lux-button') {
            const labelEl = luxComponent.querySelector('.lux-button-label');
            if (labelEl && labelEl.textContent && labelEl.textContent.trim()) {
              newTagId = this.mergeTagIds(newTagId, labelEl.textContent.trim());
              newTagId = newTagId.toLowerCase();
              this.renderer.setAttribute(luxComponent, LuxTagIdDirective.luxTagIdAttrName, newTagId);

              usedLabel = true;
            }
          }

          if (!usedLabel) {
            console.warn(
              'Dem Tag "' +
                this.getNodeName(luxComponent) +
                '(' +
                this.getParentPath(luxComponent.parentElement, '') +
                ')' +
                '" fehlt das luxTagId-Attribut. Dieses Attribut wird für die automatischen Tests benötigt.'
            );
          }
        }
      }
    }
  }

  ngOnDestroy() {
    this.configSubscription.unsubscribe();
  }

  private getParentPath(element: Element | null, currentTagId: string): string {
    if (element && element.parentElement) {
      return this.getParentPath(element.parentElement, currentTagId + '.' + this.getNodeName(element.parentElement));
    }

    return currentTagId;
  }

  private getLuxTagIdParent(element: Element | null, currentTagId: string): string {
    if (element) {
      let newTagId: string = currentTagId;
      if (element.hasAttribute('luxTagId')) {
        newTagId = this.mergeTagIds('luxTagId', newTagId);
      } else if (element.hasAttribute(LuxTagIdDirective.luxTagIdAttrName)) {
        newTagId = this.mergeTagIds(element.getAttribute(LuxTagIdDirective.luxTagIdAttrName), newTagId);
      } else if (element.hasAttribute('luxcontrolbinding')) {
        newTagId = this.mergeTagIds(element.getAttribute('luxcontrolbinding'), newTagId);
      } else if (element.hasAttribute('formgroupname')) {
        newTagId = this.mergeTagIds('formgroup' + LuxTagIdDirective.sepComponent + element.getAttribute('formgroupname'), newTagId);
      }

      return this.getLuxTagIdParent(element.parentElement, newTagId);
    }

    return currentTagId;
  }

  private mergeTagIds(tagId1: string | null, tagId2: string | null) {
    let tagId: string;

    if (tagId1 && tagId2) {
      tagId = tagId1 + LuxTagIdDirective.sepParent + tagId2;
    } else if (tagId1 && !tagId2) {
      tagId = tagId1;
    } else if (!tagId1 && tagId2) {
      tagId = tagId2;
    } else {
      tagId = '';
    }

    return tagId;
  }

  private getLuxTagId(element: Element): string {
    let newId = '';

    if (element) {
      if (element.hasAttribute('luxTagId')) {
        newId = this.getAttributeValue(element, 'luxTagId');
      } else if (element.hasAttribute(LuxTagIdDirective.luxTagIdAttrName)) {
        newId = this.getAttributeValue(element, LuxTagIdDirective.luxTagIdAttrName);
      } else if (element.hasAttribute('luxcontrolbinding')) {
        newId = this.getAttributeValue(element, 'luxcontrolbinding');
      } else if (element.hasAttribute('formgroupname')) {
        newId = this.getAttributeValue(element, 'formgroupname');
      }
    }

    return newId;
  }

  private getAttributeValue(element: Element, attrName: string): string {
    return element.getAttribute(attrName) ?? '';
  }

  private findLuxComponent(element: Element | null): Element | null {
    if (element) {
      const nodeName: string = this.getNodeName(element);
      if (nodeName && nodeName.startsWith('lux-'.toUpperCase()) && nodeName !== luxFormControlSelektor.toUpperCase()) {
        return element;
      } else {
        return this.findLuxComponent(element.parentElement);
      }
    }

    return null;
  }

  private getNodeName(element: Element): string {
    return element && element.nodeName ? element.nodeName : '';
  }
}

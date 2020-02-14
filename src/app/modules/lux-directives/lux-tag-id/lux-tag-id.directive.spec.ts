import { Component } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { LuxTestHelper } from '../../lux-util/testing/lux-test-helper';
import { LuxTagIdDirective } from './lux-tag-id.directive';
import { of } from 'rxjs';
import { LuxComponentsConfigService } from '../../lux-components-config/lux-components-config.service';
import { By } from '@angular/platform-browser';

describe('LuxTagIdDirective', () => {
  LuxTestHelper.configureTestSuite();

  let fixture: ComponentFixture<MockComponent>;
  let mockComp: MockComponent;

  beforeAll(async () => {
    LuxTestHelper.configureTestModule(
      [
        {
          provide: LuxComponentsConfigService,
          useClass: MockConfigService
        }
      ],
      [MockComponent, MockLuxComponent]
    );
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MockComponent);
    mockComp = fixture.componentInstance;
  }));

  it('Sollte erstellt werden', fakeAsync(() => {
    fixture.detectChanges();
    expect(mockComp).toBeTruthy();
  }));

  it('Sollte eine Warnung abgeben, wenn luxTagId falsy ist', fakeAsync(() => {
    const spy = spyOn(console, 'warn');
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(
      'Dem Tag "LUX-COMPONENT(.BODY.HTML)" fehlt das luxTagId-Attribut. Dieses Attribut wird für die automatischen Tests benötigt.'
    );
  }));

  it('Sollte die Tag-ID generieren', fakeAsync(() => {
    const spy = spyOn(console, 'warn');
    mockComp.tagId = 'tagid-demo';
    fixture.detectChanges();

    const tagId = fixture.debugElement.query(By.css('lux-component[data-luxtagid="lux-component#tagid-demo"]'));
    expect(tagId).not.toBe(null);
    expect(spy).toHaveBeenCalledTimes(0);
  }));
});

@Component({
  selector: 'mock-component',
  template: `
    <lux-component luxTagIdHandler [luxTagId]="tagId"></lux-component>
  `
})
class MockComponent {
  tagId;
}

@Component({
  selector: 'lux-component',
  template: `
    <ng-content></ng-content>
  `
})
class MockLuxComponent {}

class MockConfigService {
  config = of({
    generateLuxTagIds: true
  });
}

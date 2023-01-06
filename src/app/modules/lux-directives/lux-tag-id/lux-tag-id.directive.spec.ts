/* eslint-disable max-classes-per-file */
import { Component } from '@angular/core';
import { waitForAsync, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { LuxTestHelper } from '../../lux-util/testing/lux-test-helper';
import { LuxTagIdDirective } from './lux-tag-id.directive';
import { of } from 'rxjs';
import { LuxComponentsConfigService } from '../../lux-components-config/lux-components-config.service';
import { By } from '@angular/platform-browser';

describe('LuxTagIdDirective', () => {
  let fixture: ComponentFixture<MockComponent>;
  let mockComp: MockComponent;

  beforeEach(async () => {
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

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(MockComponent);
    mockComp = fixture.componentInstance;
  }));

  it('Sollte die Tag-ID generieren', () => {
    const spy = spyOn(console, 'warn');
    mockComp.tagId = 'tagid-demo';
    fixture.detectChanges();

    const tagId = fixture.debugElement.query(By.css('lux-component[data-luxtagid="lux-component#tagid-demo"]'));
    expect(tagId).not.toBeNull();
    expect(spy).toHaveBeenCalledTimes(0);
  });
});

@Component({
  selector: 'mock-component',
  template: `
    <lux-component luxTagIdHandler [luxTagId]="tagId"></lux-component>
  `
})
class MockComponent {
  tagId: string | null = null;
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

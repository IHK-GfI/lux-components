/* eslint-disable max-classes-per-file */
// noinspection DuplicatedCode

import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { expect } from '@angular/flex-layout/_private-utils/testing';
import { LuxErrorModule } from '../../lux-error.module';
import { LuxErrorStoreService } from './lux-error-store.service';

describe('LuxErrorStoreService', () => {
  let service: LuxErrorStoreService;
  let fixture: ComponentFixture<MockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [LuxErrorModule] });
    service = TestBed.inject(LuxErrorStoreService);
    service.init();
    fixture = TestBed.createComponent(MockComponent);
    fixture.detectChanges();
  });

  it('Sollte bei "null" die Defaultwerte setzen', () => {
    service.safeNewConfig(null);
    fixture.detectChanges();

    expect(service.config.iconName).toEqual(LuxErrorStoreService.DEFAULT_CONFIG.iconName);
    expect(service.config.iconSize).toEqual(LuxErrorStoreService.DEFAULT_CONFIG.iconSize);
    expect(service.config.errorText).toEqual(LuxErrorStoreService.DEFAULT_CONFIG.errorText);
    expect(service.config.homeRedirectText).toEqual(LuxErrorStoreService.DEFAULT_CONFIG.homeRedirectText);
    expect(service.config.errorPageUrl).toEqual(LuxErrorStoreService.DEFAULT_CONFIG.errorPageUrl);
    expect(service.config.skipLocationChange).toEqual(LuxErrorStoreService.DEFAULT_CONFIG.skipLocationChange);
  });

  it('Sollte bei "{}" die Defaultwerte setzen', () => {
    service.safeNewConfig({});
    fixture.detectChanges();

    expect(service.config.iconName).toEqual(LuxErrorStoreService.DEFAULT_CONFIG.iconName);
    expect(service.config.iconSize).toEqual(LuxErrorStoreService.DEFAULT_CONFIG.iconSize);
    expect(service.config.errorText).toEqual(LuxErrorStoreService.DEFAULT_CONFIG.errorText);
    expect(service.config.homeRedirectText).toEqual(LuxErrorStoreService.DEFAULT_CONFIG.homeRedirectText);
    expect(service.config.errorPageUrl).toEqual(LuxErrorStoreService.DEFAULT_CONFIG.errorPageUrl);
    expect(service.config.skipLocationChange).toEqual(LuxErrorStoreService.DEFAULT_CONFIG.skipLocationChange);
  });

  it('Sollte die Defaultwerte gezielt überschreiben', () => {
    service.safeNewConfig({
      errorText: 'Lorem ipsum',
      errorPageUrl: 'dolor/sit/amet/'
    });
    fixture.detectChanges();

    expect(service.config.iconName).toEqual(LuxErrorStoreService.DEFAULT_CONFIG.iconName);
    expect(service.config.iconSize).toEqual(LuxErrorStoreService.DEFAULT_CONFIG.iconSize);
    expect(service.config.errorText).toEqual('Lorem ipsum');
    expect(service.config.homeRedirectText).toEqual(LuxErrorStoreService.DEFAULT_CONFIG.homeRedirectText);
    expect(service.config.errorPageUrl).toEqual('dolor/sit/amet/');
    expect(service.config.skipLocationChange).toEqual(LuxErrorStoreService.DEFAULT_CONFIG.skipLocationChange);
  });

  it('Sollte alle Defaultwerte überschreiben', () => {
    service.safeNewConfig({
      iconName: 'lux-interface-user-single',
      iconSize: '2x',
      errorText: 'Lorem ipsum',
      homeRedirectText: 'Link',
      errorPageUrl: 'dolor/sit/amet/',
      skipLocationChange: false
    });
    fixture.detectChanges();

    expect(service.config.iconName).toEqual('lux-interface-user-single');
    expect(service.config.iconSize).toEqual('2x');
    expect(service.config.errorText).toEqual('Lorem ipsum');
    expect(service.config.homeRedirectText).toEqual('Link');
    expect(service.config.errorPageUrl).toEqual('dolor/sit/amet/');
    expect(service.config.skipLocationChange).toBeFalse();
  });
});

@Component({
  template: ``
})
class MockComponent {
  constructor(public service: LuxErrorStoreService) {}
}

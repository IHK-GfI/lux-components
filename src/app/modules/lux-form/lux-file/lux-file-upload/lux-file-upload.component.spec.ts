/* eslint-disable max-classes-per-file */
import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { LuxConsoleService } from '../../../lux-util/lux-console.service';
import { LuxStorageService } from '../../../lux-util/lux-storage.service';
import { LuxTestHelper } from '../../../lux-util/testing/lux-test-helper';

import { LuxFileUploadComponent } from './lux-file-upload.component';

describe('LuxFileUploadComponent', () => {
  let component: LuxFileUploadComponent;
  let fixture: ComponentFixture<LuxFileUploadComponent>;

  beforeEach(async () => {
    LuxTestHelper.configureTestModule(
      [
        LuxConsoleService,
        {
          provide: HttpClient,
          useClass: MockHttp
        },
        {
          provide: LuxStorageService,
          useClass: MockStorage
        }
      ],
      [LuxFileUploadComponent]
    );
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LuxFileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class MockHttp {
  post() {
    return of(null);
  }
}

class MockStorage {

  getItem(key: string): string {
    return '';
  }

  setItem(key: string, value: string, sensitive: boolean) {}
}

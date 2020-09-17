import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LuxFilterFormComponent } from './lux-filter-form.component';
import { LuxTestHelper } from '../../lux-util/testing/lux-test-helper';
import { LuxConsoleService } from '../../lux-util/lux-console.service';
import { LuxDialogService } from '../../lux-popups/lux-dialog/lux-dialog.service';

describe('LuxFilterFormComponent', () => {
  let component: LuxFilterFormComponent;
  let fixture: ComponentFixture<LuxFilterFormComponent>;

  beforeEach(async () => {
    LuxTestHelper.configureTestModule([LuxConsoleService, LuxDialogService], [LuxFilterFormComponent]);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LuxFilterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

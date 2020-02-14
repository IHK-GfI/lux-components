import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { LuxTestHelper } from '../../lux-util/testing/lux-test-helper';
import { By } from '@angular/platform-browser';
import { LuxLookupHandlerService } from '../lux-lookup-service/lux-lookup-handler.service';
import { LuxLookupLabelComponent } from './lux-lookup-label.component';
import { LuxConsoleService } from '../../lux-util/lux-console.service';
import { LuxLookupService } from '../lux-lookup-service/lux-lookup.service';
import { of } from 'rxjs';

describe('LuxLookupLabelComponent', () => {
  LuxTestHelper.configureTestSuite();

  beforeAll(async () => {
    LuxTestHelper.configureTestModule(
      [{ provide: LuxLookupService, useClass: MockLuxLookupLabelService }, LuxLookupHandlerService, LuxConsoleService],
      [LuxNoFormComponent]
    );
  });

  describe('Außerhalb einer Form', () => {
    let fixture: ComponentFixture<LuxNoFormComponent>;
    let component: LuxNoFormComponent;
    let lookupLabel: LuxLookupLabelComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(LuxNoFormComponent);
      component = fixture.componentInstance;
      lookupLabel = fixture.debugElement.query(By.directive(LuxLookupLabelComponent)).componentInstance;
      fixture.detectChanges();
    });

    it('Kurztext für Schlüssel anzeigen', fakeAsync(() => {
      const myComponent = fixture.debugElement.query(By.css('lux-lookup-label > span'));

      expect(myComponent).not.toBeNull('Component ist null');
      expect(myComponent.nativeElement.innerHTML).toEqual('Jungholz (ausl. Adresse)');
      TestBed.get(LuxLookupService).changeTableValue();
      TestBed.get(LuxLookupHandlerService).reloadData('meineId');

      fixture.detectChanges();

      expect(myComponent.nativeElement.innerHTML).toEqual('Altholz (inl. Adresse)');
    }));
  });
});

@Component({
  template: `
    <lux-lookup-label luxLookupId="meineId" [luxTableNo]="500211" [luxTableKey]="110"> </lux-lookup-label>
  `
})
class LuxNoFormComponent {
  value;
}

class MockLuxLookupLabelService extends LuxLookupService {
  changeTableValue() {
    mockResult[0] = {
      key: '110',
      kurzText: 'Altholz (inl. Adresse)',
      gueltigkeitVon: '20090814'
    };
  }

  getLookupTable(luxTableNo, lookupParameters, url) {
    return of([...mockResult]);
  }
}

const mockResult: any[] = [
  {
    key: '110',
    kurzText: 'Jungholz (ausl. Adresse)',
    gueltigkeitVon: '20090814'
  }
];

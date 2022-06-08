/* eslint-disable max-classes-per-file */
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

  beforeEach(async () => {
    LuxTestHelper.configureTestModule(
      [{ provide: LuxLookupService, useClass: MockLuxLookupLabelService }, LuxLookupHandlerService, LuxConsoleService],
      [LuxNoFormComponent, LuxTable500212Component]
    );
  });

  describe('Außerhalb einer Form', () => {
    let fixture: ComponentFixture<LuxNoFormComponent>;
    let lookupLabel: LuxLookupLabelComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(LuxNoFormComponent);
      lookupLabel = fixture.debugElement.query(By.directive(LuxLookupLabelComponent)).componentInstance;
      fixture.detectChanges();
    });

    it('Sollte den Kurztext des Schlüssels anzeigen', fakeAsync(() => {
      const myComponent = fixture.debugElement.query(By.css('lux-lookup-label > span'));

      expect(myComponent).toBeDefined();
      expect(myComponent.nativeElement.innerHTML).toEqual('Jungholz (ausl. Adresse)');
      (TestBed.inject(LuxLookupService) as MockLuxLookupLabelService).changeTableValue();
      TestBed.inject(LuxLookupHandlerService).reloadData('meineId');

      fixture.detectChanges();

      expect(myComponent.nativeElement.innerHTML).toEqual('Altholz (inl. Adresse)');
    }));
  });

  describe('Aktualisierungen', () => {
    let fixture: ComponentFixture<LuxTable500212Component>;
    let component: LuxTable500212Component;
    let lookupLabel: LuxLookupLabelComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(LuxTable500212Component);
      component = fixture.componentInstance;
      lookupLabel = fixture.debugElement.query(By.directive(LuxLookupLabelComponent)).componentInstance;
      fixture.detectChanges();
    });

    it('Sollte den korrekten Wert des TableKeys laden (tableKey changed)', fakeAsync(() => {
      const myComponent = fixture.debugElement.query(By.css('lux-lookup-label > span'));

      expect(myComponent.nativeElement.innerHTML).toEqual('Lorem ipsum 212/110');

      component.tableKey = '111';
      fixture.detectChanges();

      expect(myComponent.nativeElement.innerHTML).toEqual('Lorem ipsum 212/111');
    }));

    it('Sollte den korrekten Wert des TableKeys laden (tableNo changed)', fakeAsync(() => {
      const myComponent = fixture.debugElement.query(By.css('lux-lookup-label > span'));

      expect(myComponent.nativeElement.innerHTML).toEqual('Lorem ipsum 212/110');

      component.tableNo = '500213';
      fixture.detectChanges();

      expect(myComponent.nativeElement.innerHTML).toEqual('Lorem ipsum 213/110');
    }));
  });
});

@Component({
  template: ` <lux-lookup-label luxLookupId="meineId" [luxTableNo]="tableNo" [luxTableKey]="tableKey"> </lux-lookup-label> `
})
class LuxNoFormComponent {
  tableNo = '500211';
  tableKey = '110';
  value;
}

@Component({
  template: ` <lux-lookup-label luxLookupId="meineId" [luxTableNo]="tableNo" [luxTableKey]="tableKey"> </lux-lookup-label> `
})
class LuxTable500212Component {
  tableNo = '500212';
  tableKey = '110';
  value;
}

class MockLuxLookupLabelService extends LuxLookupService {
  changeTableValue() {
    mockResult500211[0] = {
      key: '110',
      kurzText: 'Altholz (inl. Adresse)',
      gueltigkeitVon: '20090814'
    };
  }

  getLookupTable(luxTableNo, lookupParameters, url) {
    let mockResult;

    if (luxTableNo === '500211') {
      mockResult = mockResult500211;
    } else if (luxTableNo === '500212') {
      mockResult = mockResult500212;
    } else if (luxTableNo === '500213') {
      mockResult = mockResult500213;
    }

    return of([mockResult.find((entry) => entry.key === lookupParameters.keys[0])]);
  }
}

const mockResult500211: any[] = [
  {
    key: '110',
    kurzText: 'Jungholz (ausl. Adresse)',
    gueltigkeitVon: '20090814'
  },
  {
    key: '111',
    kurzText: 'Altholz (inl. Adresse)',
    gueltigkeitVon: '20090814'
  }
];

const mockResult500212: any[] = [
  {
    key: '110',
    kurzText: 'Lorem ipsum 212/110',
    gueltigkeitVon: '20090814'
  },
  {
    key: '111',
    kurzText: 'Lorem ipsum 212/111',
    gueltigkeitVon: '20090814'
  }
];

const mockResult500213: any[] = [
  {
    key: '110',
    kurzText: 'Lorem ipsum 213/110',
    gueltigkeitVon: '20090814'
  },
  {
    key: '111',
    kurzText: 'Lorem ipsum 213/111',
    gueltigkeitVon: '20090814'
  }
];

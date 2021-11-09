/* eslint-disable max-classes-per-file */
import { ComponentFixture, discardPeriodicTasks, fakeAsync, flush, inject, TestBed } from '@angular/core/testing';

import { LuxTableComponent } from './lux-table.component';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { LuxTestHelper } from '../../lux-util/testing/lux-test-helper';
import { By } from '@angular/platform-browser';
import { ILuxTableHttpDao } from './lux-table-http/lux-table-http-dao.interface';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { LuxConsoleService } from '../../lux-util/lux-console.service';
import { LuxMediaQueryObserverService } from '../../lux-util/lux-media-query-observer.service';
import { delay } from 'rxjs/operators';

describe('LuxTableComponent', () => {
  beforeEach(async () => {
    LuxTestHelper.configureTestModule(
      [
        { provide: LuxMediaQueryObserverService, useClass: MockMediaObserverService },
        { provide: LuxConsoleService, useClass: MockConsoleService }
      ],
      [TableComponent, TableMultiselectComponent, HttpDaoTableComponent]
    );
  });

  describe('Übliche Anwendungsfälle (ohne HTTP-DAO)', () => {
    let component: TableComponent;
    let fixture: ComponentFixture<TableComponent>;
    let luxTableComponent: LuxTableComponent;

    beforeEach(async () => {
      fixture = TestBed.createComponent(TableComponent);
      component = fixture.componentInstance;
      luxTableComponent = fixture.debugElement.query(By.directive(LuxTableComponent)).componentInstance;
      fixture.detectChanges();
    });

    it('Sollte erstellt werden', () => {
      expect(component).toBeTruthy();
    });

    it('Die Zeilen darstellen (inklusive Header und Footer)', fakeAsync(() => {
      // Vorbedingungen testen
      let contentRows = document.querySelectorAll('.mat-row'); // fixture...selectAll not working....
      let headerRow = document.querySelector('.mat-header-row');
      let footerRow = document.querySelector('.mat-footer-row');
      expect(contentRows.length).toEqual(0, 'Vorbedingung 1');
      expect(luxTableComponent.dataSource.data.length).toEqual(0, 'Vorbedingung 2');
      expect(headerRow).toBeDefined('Vorbedingung 3');
      expect(footerRow).toBeDefined('Vorbedingung 3');

      // Änderungen durchführen
      component.dataSource = [
        { c1: 1, c2: 'Hydrogen' },
        { c1: 2, c2: 'Helium' }
      ];
      LuxTestHelper.wait(fixture);

      // Nachbedingungen testen
      contentRows = document.querySelectorAll('.mat-row');
      headerRow = document.querySelector('.mat-header-row');
      footerRow = document.querySelector('.mat-footer-row');

      expect(contentRows.length).toEqual(2, 'Nachbedingung 1');
      expect(luxTableComponent.dataSource.data.length).toEqual(2, 'Nachbedingung 2');
      expect(headerRow).toBeDefined('Nachbedingung 3');
      expect(footerRow).toBeDefined('Nachbedingung 3');

      flush();
    }));

    it('Die Einträge filtern', fakeAsync(() => {
      // Vorbedingungen testen
      component.dataSource = [
        { c1: 1, c2: 'Hydrogen' },
        { c1: 2, c2: 'Helium' },
        { c1: 3, c2: 'Oxygen' },
        { c1: 4, c2: new Date() }
      ];
      component.showFilter = true;

      LuxTestHelper.wait(fixture);
      let contentRows = document.querySelectorAll('.mat-row');
      expect(contentRows.length).toEqual(4, 'Vorbedingung 1');
      expect(luxTableComponent.dataSource.data.length).toEqual(4, 'Vorbedingung 2');

      // Änderungen durchführen
      luxTableComponent.filtered$.next('he');
      LuxTestHelper.wait(fixture, 550);

      // Nachbedingungen testen
      contentRows = document.querySelectorAll('.mat-row');
      expect(contentRows.length).toEqual(1, 'Nachbedingung 1');
      expect(luxTableComponent.dataSource.data.length).toEqual(4, 'Nachbedingung 2');

      // Änderungen durchführen
      luxTableComponent.filtered$.next('s');
      LuxTestHelper.wait(fixture, 550);

      // Nachbedingungen testen
      contentRows = document.querySelectorAll('.mat-row');
      expect(contentRows.length).toEqual(0, 'Nachbedingung 3');
      expect(luxTableComponent.dataSource.data.length).toEqual(4, 'Nachbedingung 4');
    }));

    it('Die Paginierung korrekt durchführen', fakeAsync(() => {
      // Vorbedingungen testen
      component.dataSource = [
        { c1: 1, c2: 'Hydrogen' },
        { c1: 2, c2: 'Helium' },
        { c1: 3, c2: 'Oxygen' },
        { c1: 4, c2: 'Paganium' },
        { c1: 4, c2: 'Paganium' },
        { c1: 4, c2: 'Paganium' },
        { c1: 4, c2: 'Paganium' },
        { c1: 4, c2: 'Paganium' },
        { c1: 4, c2: 'Paganium' },
        { c1: 4, c2: 'Paganium' },
        { c1: 4, c2: 'Paganium' },
        { c1: 4, c2: 'Paganium' },
        { c1: 4, c2: 'Paganium' },
        { c1: 4, c2: 'Paganium' },
        { c1: 4, c2: 'Paganium' },
        { c1: 4, c2: 'Paganium' },
        { c1: 4, c2: 'Paganium' }
      ];
      component.showPagination = true;
      component.pageSize = 5;

      LuxTestHelper.wait(fixture, 300);
      let contentRows = document.querySelectorAll('.mat-row');
      expect(contentRows.length).toEqual(5, 'Vorbedingung 1');
      expect(luxTableComponent.dataSource.data.length).toEqual(17, 'Vorbedingung 2');
      expect(luxTableComponent.paginator).toBeDefined('Vorbedingung 3');
      expect(luxTableComponent.paginator.hasPreviousPage()).toBeFalsy('Vorbedingung 4');

      // Änderungen durchführen
      luxTableComponent.paginator.nextPage();
      LuxTestHelper.wait(fixture);
      luxTableComponent.paginator.nextPage();
      LuxTestHelper.wait(fixture);
      luxTableComponent.paginator.nextPage();
      LuxTestHelper.wait(fixture);

      // Nachbedingungen testen
      contentRows = document.querySelectorAll('.mat-row');
      expect(contentRows.length).toEqual(2, 'Nachbedingung 1');
      expect(luxTableComponent.dataSource.data.length).toEqual(17, 'Nachbedingung 2');
      expect(luxTableComponent.paginator.hasNextPage()).toBeFalsy('Nachbedingung 3');

      flush();
    }));

    it('Die Pagination nachträglich aktivieren', fakeAsync(() => {
      // Vorbedingungen testen
      component.dataSource = [
        { c1: 1, c2: 'Hydrogen' },
        { c1: 2, c2: 'Helium' },
        { c1: 3, c2: 'Oxygen' },
        { c1: 4, c2: 'Paganium' }
      ];
      component.pageSize = 2;

      LuxTestHelper.wait(fixture);
      let contentRows = document.querySelectorAll('.mat-row');
      expect(contentRows.length).toEqual(4, 'Vorbedingung 1');
      expect(luxTableComponent.dataSource.data.length).toEqual(4, 'Vorbedingung 2');
      expect(luxTableComponent.paginator).toBeDefined('Vorbedingung 3');

      // Änderungen durchführen
      component.showPagination = true;
      LuxTestHelper.wait(fixture);

      // Nachbedingungen testen
      contentRows = document.querySelectorAll('.mat-row');
      expect(contentRows.length).toEqual(2, 'Nachbedingung 1');
      expect(luxTableComponent.dataSource.data.length).toEqual(4, 'Nachbedingung 2');
    }));

    it('Die Einträge sortieren', fakeAsync(() => {
      // Vorbedingungen testen
      component.dataSource = [
        { c1: 1, c2: 'Teta' },
        { c1: 2, c2: 'Beta' },
        { c1: 3, c2: 'Gamma' },
        { c1: 4, c2: 'Alpha' }
      ];
      component.c1Sortable = false;
      component.c2Sortable = true;
      LuxTestHelper.wait(fixture);

      let col2FirstElements = document.getElementsByClassName('c2-content');
      const sortHeaders = document.querySelectorAll('th.mat-sort-header:not(.lux-table-header-blocked)');
      const sortHeadersBlocked = document.querySelectorAll('.lux-table-header-blocked');

      expect(col2FirstElements.length).toBe(4, 'Vorbedingung 1');
      expect(col2FirstElements.item(3).textContent).toEqual('Alpha', 'Vorbedingung 2');
      expect(col2FirstElements.item(2).textContent).toEqual('Gamma', 'Vorbedingung 3');
      expect(col2FirstElements.item(1).textContent).toEqual('Beta', 'Vorbedingung 4');
      expect(col2FirstElements.item(0).textContent).toEqual('Teta', 'Vorbedingung 5');

      expect(sortHeaders.length).toBe(1, 'Vorbedingung 6');
      expect(sortHeadersBlocked.length).toBe(1, 'Vorbedingung 7');

      // Änderungen durchführen
      (sortHeaders.item(0) as HTMLButtonElement).click();
      LuxTestHelper.wait(fixture, 500);

      // Nachbedingungen testen
      col2FirstElements = document.getElementsByClassName('c2-content');

      expect(col2FirstElements.item(3).textContent).toEqual('Teta', 'Nachbedingung 1');
      expect(col2FirstElements.item(2).textContent).toEqual('Gamma', 'Nachbedingung 2');
      expect(col2FirstElements.item(1).textContent).toEqual('Beta', 'Nachbedingung 3');
      expect(col2FirstElements.item(0).textContent).toEqual('Alpha', 'Nachbedingung 4');

      // Änderungen durchführen
      (sortHeaders.item(0) as HTMLButtonElement).click();
      LuxTestHelper.wait(fixture, 500);

      // Nachbedingungen testen
      col2FirstElements = document.getElementsByClassName('c2-content');

      expect(col2FirstElements.item(3).textContent).toEqual('Alpha', 'Nachbedingung 5');
      expect(col2FirstElements.item(2).textContent).toEqual('Beta', 'Nachbedingung 6');
      expect(col2FirstElements.item(1).textContent).toEqual('Gamma', 'Nachbedingung 7');
      expect(col2FirstElements.item(0).textContent).toEqual('Teta', 'Nachbedingung 8');

      discardPeriodicTasks();
      flush();
    }));

    it('Die Einträge mit Sonderzeichen sortieren', fakeAsync(() => {
      // Vorbedingungen testen
      component.dataSource = [
        { c1: 1, c2: '1234' },
        { c1: 2, c2: '$ Asdf' },
        { c1: 3, c2: 'Hallo' },
        { c1: 4, c2: '<<' },
        { c1: 5, c2: '  ' }
      ];
      component.c2Sortable = true;
      LuxTestHelper.wait(fixture);

      let col2Elements = document.getElementsByClassName('c2-content');
      const sortHeaders = document.querySelectorAll('th.mat-sort-header:not(.lux-table-header-blocked)');

      expect(col2Elements.length).toBe(5, 'Vorbedingung 1');
      expect(col2Elements.item(4).textContent).toEqual('  ', 'Vorbedingung 2');
      expect(col2Elements.item(3).textContent).toEqual('<<', 'Vorbedingung 3');
      expect(col2Elements.item(2).textContent).toEqual('Hallo', 'Vorbedingung 4');
      expect(col2Elements.item(1).textContent).toEqual('$ Asdf', 'Vorbedingung 5');
      expect(col2Elements.item(0).textContent).toEqual('1234', 'Vorbedingung 6');
      expect(sortHeaders.length).toBe(1, 'Vorbedingung 7');

      // Änderungen durchführen
      (sortHeaders.item(0) as HTMLButtonElement).click();
      LuxTestHelper.wait(fixture, 500);

      // Nachbedingungen testen
      col2Elements = document.getElementsByClassName('c2-content');

      expect(col2Elements.item(4).textContent).toEqual('Hallo', 'Nachbedingung 1');
      expect(col2Elements.item(3).textContent).toEqual('1234', 'Nachbedingung 2');
      expect(col2Elements.item(2).textContent).toEqual('$ Asdf', 'Nachbedingung 3');
      expect(col2Elements.item(1).textContent).toEqual('<<', 'Nachbedingung 4');
      expect(col2Elements.item(0).textContent).toEqual('  ', 'Nachbedingung 5');

      // Änderungen durchführen
      (sortHeaders.item(0) as HTMLButtonElement).click();
      LuxTestHelper.wait(fixture, 500);

      // Nachbedingungen testen
      col2Elements = document.getElementsByClassName('c2-content');

      expect(col2Elements.item(4).textContent).toEqual('  ', 'Nachbedingung 1');
      expect(col2Elements.item(3).textContent).toEqual('<<', 'Nachbedingung 1');
      expect(col2Elements.item(2).textContent).toEqual('$ Asdf', 'Nachbedingung 2');
      expect(col2Elements.item(1).textContent).toEqual('1234', 'Nachbedingung 3');
      expect(col2Elements.item(0).textContent).toEqual('Hallo', 'Nachbedingung 4');

      discardPeriodicTasks();
      flush();
    }));

    it('Die Breite korrekt setzen', fakeAsync(() => {
      // Vorbedingungen testen
      component.dataSource = [
        { c1: 1, c2: 'Teta' },
        { c1: 2, c2: 'Beta' },
        { c1: 3, c2: 'Gamma' },
        { c1: 4, c2: 'Alpha' }
      ];
      LuxTestHelper.wait(fixture);
      let tableHeaders = document.querySelectorAll('.mat-header-row:not(.lux-table-header-no-data) th');
      expect(tableHeaders.length).toBe(2, 'Vorbedingung 1');

      // Änderungen durchführen
      component.colWidths = ['5', '25'];
      LuxTestHelper.wait(fixture);

      // Nachbedingungen testen
      tableHeaders = document.querySelectorAll('.mat-header-row:not(.lux-table-header-no-data) th');
      expect(tableHeaders.length).toBe(2, 'Nachbedingung 1');
      expect((tableHeaders.item(0) as HTMLElement).style.width).toEqual('5%', 'Nachbedingung 1');
      expect((tableHeaders.item(1) as HTMLElement).style.width).toEqual('25%', 'Nachbedingung 1');
    }));

    it('Einzelne Spalten links und rechts fixieren', fakeAsync(() => {
      // Vorbedingungen testen
      component.dataSource = [
        { c1: 1, c2: 'Hydrogen' },
        { c1: 2, c2: 'Helium' }
      ];
      LuxTestHelper.wait(fixture);
      let stickyElements = document.querySelectorAll('.mat-row .mat-table-sticky');
      expect(stickyElements.length).toBe(0, 'Vorbedingung 1');

      // Änderungen durchführen
      component.c1Sticky = true;
      LuxTestHelper.wait(fixture);

      // Nachbedingungen testen
      stickyElements = document.querySelectorAll('.mat-row .mat-table-sticky');
      expect(stickyElements.length).toBe(2, 'Nachbedingung 1');

      // Änderungen durchführen
      component.c2Sticky = true;
      LuxTestHelper.wait(fixture);

      // Nachbedingungen testen
      stickyElements = document.querySelectorAll('.mat-row .mat-table-sticky');
      expect(stickyElements.length).toBe(4, 'Nachbedingung 2');
    }));

    it('Sollte die Custom CSS-Classes einstellen', fakeAsync(() => {
      // Vorbedingungen testen
      component.dataSource = [
        { c1: 1, c2: 'Hydrogen' },
        { c1: 2, c2: 'Helium' }
      ];
      LuxTestHelper.wait(fixture);
      let rows = document.getElementsByClassName('mat-row');
      expect(rows.item(0).classList.toString().indexOf('my-custom-class')).toBe(-1, 'Vorbedingung 1');
      expect(rows.item(1).classList.toString().indexOf('my-custom-class')).toBe(-1, 'Vorbedingung 1');

      // Änderungen durchführen
      component.cssClasses = {
        class: 'my-custom-class',
        check: (element) => element.c1 === 1 || element.c1 === 2
      };
      LuxTestHelper.wait(fixture);

      // Nachbedingungen testen
      rows = document.getElementsByClassName('mat-row');
      expect(rows.item(0).classList.toString().indexOf('my-custom-class')).toBeGreaterThan(-1, 'Nachbedingung 1');
      expect(rows.item(1).classList.toString().indexOf('my-custom-class')).toBeGreaterThan(-1, 'Nachbedingung 2');

      // Änderungen durchführen
      component.cssClasses = [
        {
          class: 'my-custom-class',
          check: (element) => element.c1 === 1 || element.c1 === 2
        },
        {
          class: 'my-custom-class-2',
          check: (element) => element.c2 === 'Hydrogen' || element.c2 === 'Helium'
        }
      ];
      LuxTestHelper.wait(fixture);

      // Nachbedingungen testen
      rows = document.getElementsByClassName('mat-row');
      expect(rows.item(0).classList.toString().indexOf('my-custom-class-2')).toBeGreaterThan(-1, 'Nachbedingung 3');
      expect(rows.item(1).classList.toString().indexOf('my-custom-class-2')).toBeGreaterThan(-1, 'Nachbedingung 4');
    }));

    it('Einzelne Columns sollten in speziellen MediaQueries ausgeblendet werden', fakeAsync(
      inject([LuxMediaQueryObserverService], (mediaObserver: MockMediaObserverService) => {
        // Vorbedingungen testen
        component.dataSource = [
          { c1: 1, c2: 'Hydrogen' },
          { c1: 2, c2: 'Helium' }
        ];
        component.c1RespAt = ['xs', 'sm'];
        component.c1RespBeh = 'hide';
        LuxTestHelper.wait(fixture);
        let cells = document.getElementsByClassName('mat-cell');
        expect(cells.length).toBe(4, 'Vorbedingung 1');

        // Änderungen durchführen
        mediaObserver.mediaQueryChanged.next('sm');
        LuxTestHelper.wait(fixture);

        // Nachbedingungen testen
        cells = document.getElementsByClassName('mat-cell');
        expect(cells.length).toBe(2, 'Nachbedingung 1');

        // Änderungen durchführen
        mediaObserver.mediaQueryChanged.next('xs');
        LuxTestHelper.wait(fixture);

        // Nachbedingungen testen
        cells = document.getElementsByClassName('mat-cell');
        expect(cells.length).toBe(2, 'Nachbedingung 2');

        // Änderungen durchführen
        mediaObserver.mediaQueryChanged.next('gt');
        LuxTestHelper.wait(fixture);

        // Nachbedingungen testen
        cells = document.getElementsByClassName('mat-cell');
        expect(cells.length).toBe(4, 'Nachbedingung 3');
      })
    ));

    it('Einzelne Columns sollten in speziellen MediaQueries verschoben werden', fakeAsync(
      inject([LuxMediaQueryObserverService], (mediaObserver: MockMediaObserverService) => {
        // Vorbedingungen testen
        component.dataSource = [
          { c1: 1, c2: 'Hydrogen' },
          { c1: 2, c2: 'Helium' }
        ];
        component.c1RespAt = ['xs', 'sm'];
        component.c1RespBeh = 'c2';
        LuxTestHelper.wait(fixture);
        let cells = document.getElementsByClassName('mat-cell');
        let movedCells = document.getElementsByClassName('lux-moved-header-title');
        expect(cells.length).toBe(4, 'Vorbedingung 1');
        expect(movedCells.length).toBe(0, 'Vorbedingung 2');

        // Änderungen durchführen
        mediaObserver.mediaQueryChanged.next('sm');
        LuxTestHelper.wait(fixture);

        // Nachbedingungen testen
        cells = document.getElementsByClassName('mat-cell');
        movedCells = document.getElementsByClassName('lux-moved-header-title');
        expect(cells.length).toBe(2, 'Nachbedingung 1');
        expect(movedCells.length).toBe(2, 'Nachbedingung 2');

        // Änderungen durchführen
        mediaObserver.mediaQueryChanged.next('xs');
        LuxTestHelper.wait(fixture);

        // Nachbedingungen testen
        cells = document.getElementsByClassName('mat-cell');
        movedCells = document.getElementsByClassName('lux-moved-header-title');
        expect(cells.length).toBe(2, 'Nachbedingung 3');
        expect(movedCells.length).toBe(2, 'Nachbedingung 4');

        // Änderungen durchführen
        mediaObserver.mediaQueryChanged.next('gt');
        LuxTestHelper.wait(fixture);

        // Nachbedingungen testen
        cells = document.getElementsByClassName('mat-cell');
        movedCells = document.getElementsByClassName('lux-moved-header-title');
        expect(cells.length).toBe(4, 'Nachbedingung 5');
        expect(movedCells.length).toBe(0, 'Nachbedingung 6');

        flush();
      })
    ));

    it('Einzelne Columns sollten in speziellen MediaQueries verschoben werden (ohne Header)', fakeAsync(
      inject([LuxMediaQueryObserverService], (mediaObserver: MockMediaObserverService) => {
        // Vorbedingungen testen
        component.dataSource = [
          { c1: 1, c2: 'Hydrogen' },
          { c1: 2, c2: 'Helium' }
        ];
        component.c1RespAt = ['xs', 'sm'];
        component.c1RespBeh = 'c2';
        component.hideHeaders = true;
        LuxTestHelper.wait(fixture);
        let cells = document.getElementsByClassName('mat-cell');
        let movedCells = document.getElementsByClassName('lux-moved-header-title');
        expect(cells.length).toBe(4, 'Vorbedingung 1');
        expect(movedCells.length).toBe(0, 'Vorbedingung 2');

        // Änderungen durchführen
        mediaObserver.mediaQueryChanged.next('sm');
        LuxTestHelper.wait(fixture);

        // Nachbedingungen testen
        cells = document.getElementsByClassName('mat-cell');
        movedCells = document.getElementsByClassName('lux-moved-header-title');
        expect(cells.length).toBe(2, 'Nachbedingung 1');
        expect(movedCells.length).toBe(2, 'Nachbedingung 2');

        // Änderungen durchführen
        mediaObserver.mediaQueryChanged.next('xs');
        LuxTestHelper.wait(fixture);

        // Nachbedingungen testen
        cells = document.getElementsByClassName('mat-cell');
        movedCells = document.getElementsByClassName('lux-moved-header-title');
        expect(cells.length).toBe(2, 'Nachbedingung 3');
        expect(movedCells.length).toBe(2, 'Nachbedingung 4');

        // Änderungen durchführen
        mediaObserver.mediaQueryChanged.next('gt');
        LuxTestHelper.wait(fixture);

        // Nachbedingungen testen
        cells = document.getElementsByClassName('mat-cell');
        movedCells = document.getElementsByClassName('lux-moved-header-title');
        expect(cells.length).toBe(4, 'Nachbedingung 5');
        expect(movedCells.length).toBe(0, 'Nachbedingung 6');

        flush();
      })
    ));

    it('Sollte eine Fehlermeldung loggen, wenn nur luxResponsiveAt oder luxResponsiveBehaviour gesetzt wurden', fakeAsync(
      inject([LuxConsoleService], (consoleService: MockConsoleService) => {
        const respAtSpy = spyOn(consoleService, 'error');
        // Vorbedingungen testen
        LuxTestHelper.wait(fixture);
        expect(respAtSpy).toHaveBeenCalledTimes(0);

        // Änderungen durchführen
        component.c1RespBeh = 'hide';
        LuxTestHelper.wait(fixture);

        // Nachbedingungen testen
        expect(respAtSpy).toHaveBeenCalledTimes(1);

        // Änderungen durchführen
        component.c2RespAt = 'sm';
        LuxTestHelper.wait(fixture);

        // Nachbedingungen testen
        expect(respAtSpy).toHaveBeenCalledTimes(3);
      })
    ));

    it('Den Text für leere Daten änderung', fakeAsync(() => {
      // Vorbedingungen testen
      LuxTestHelper.wait(fixture);
      let noDataText = (document.getElementsByClassName('lux-no-data-text').item(0) as HTMLElement).innerText;
      expect(noDataText).toEqual('Keine Daten gefunden.', 'Vorbedingung 1');

      // Änderungen durchführen
      component.noDataText = 'Tetriandoch';
      LuxTestHelper.wait(fixture);

      // Nachbedingungen testen
      noDataText = (document.getElementsByClassName('lux-no-data-text').item(0) as HTMLElement).innerText;
      expect(noDataText).toEqual('Tetriandoch', 'Nachbedingung 1');
    }));

    it('Die Breite und Höhe automagisch berechnen', fakeAsync(() => {
      // Vorbedingungen testen
      component.dataSource = [
        { c1: 1, c2: 'Hydrogen' },
        { c1: 2, c2: 'Helium' }
      ];
      LuxTestHelper.wait(fixture);
      let tableContent = document.getElementsByClassName('lux-table').item(0) as HTMLElement;
      let table = document.getElementsByTagName('table').item(0) as HTMLElement;
      let paginator = document.getElementsByTagName('mat-paginator').item(0) as HTMLElement;
      let filter = document.getElementsByTagName('lux-input').item(0) as HTMLElement;

      expect(tableContent.offsetHeight - paginator.offsetHeight - filter.offsetHeight).not.toBe(400, 'Vorbedingung 1');
      expect(table.style.minWidth).not.toBe('600px', 'Vorbedingung 2');

      // Änderungen durchführen
      component.minWidth = 600;
      component.containerHeight = 400;
      component.containerWidth = 800;
      LuxTestHelper.wait(fixture);

      // Nachbedingungen testen
      tableContent = document.getElementsByClassName('lux-table').item(0) as HTMLElement;
      table = document.getElementsByTagName('table').item(0) as HTMLElement;
      paginator = document.getElementsByTagName('mat-paginator').item(0) as HTMLElement;
      filter = document.getElementsByTagName('lux-input').item(0) as HTMLElement;

      expect(tableContent.offsetHeight + paginator.offsetHeight + filter.offsetHeight).toBe(400, 'Nachbedingung 1');
      expect(table.style.minWidth).toBe('600px', 'Nachbedingung 2');
    }));

    it('Sollte automatisch die Pagination bei > 100 Einträgen aktivieren', fakeAsync(() => {
      // Vorbedingungen testen
      LuxTestHelper.wait(fixture);
      let hiddenPaginator = document.querySelector('mat-paginator.lux-hide');
      expect(hiddenPaginator).toBeDefined('Vorbedingung 1');

      // Änderungen durchführen
      const data = [];
      for (let i = 0; i <= 101; i++) {
        data.push({ c1: i, c2: 'Demo ' + i });
      }
      component.dataSource = data;
      component.autopaginate = true;
      LuxTestHelper.wait(fixture);

      // Nachbedingungen testen
      hiddenPaginator = document.querySelector('mat-paginator.lux-hide');
      expect(hiddenPaginator).toBeFalsy('Nachbedingung 1');

      flush();
    }));

    it('Sollte nicht automatisch die Pagination bei > 100 Einträgen aktivieren', fakeAsync(() => {
      // Vorbedingungen testen
      LuxTestHelper.wait(fixture);
      let hiddenPaginator = document.querySelector('mat-paginator.lux-hide');
      expect(hiddenPaginator).toBeDefined('Vorbedingung 1');

      // Änderungen durchführen
      const data = [];
      for (let i = 0; i <= 101; i++) {
        data.push({ c1: i, c2: 'Demo ' + i });
      }
      component.dataSource = data;
      LuxTestHelper.wait(fixture);

      // Nachbedingungen testen
      hiddenPaginator = document.querySelector('mat-paginator.lux-hide');
      expect(hiddenPaginator).toBeDefined('Nachbedingung 1');

      flush();
    }));

    it('Sollte die Borders ausblenden', fakeAsync(() => {
      // Vorbedingungen testen
      component.dataSource = [
        { c1: 1, c2: 'Hydrogen' },
        { c1: 2, c2: 'Helium' }
      ];
      LuxTestHelper.wait(fixture);
      let noBorderTable = document.getElementsByClassName('lux-hide-borders');
      expect(noBorderTable.length).toBe(0, 'Vorbedingung 1');

      // Änderungen durchführen
      component.hideBorders = true;
      LuxTestHelper.wait(fixture);

      // Nachbedingungen testen
      noBorderTable = document.getElementsByClassName('lux-hide-borders');
      expect(noBorderTable.length).toBe(1, 'Nachbedingung 1');

      flush();
    }));
  });

  describe('HTTP-DAO', () => {
    let component: HttpDaoTableComponent;
    let fixture: ComponentFixture<HttpDaoTableComponent>;
    let luxTableComponent: LuxTableComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(HttpDaoTableComponent);
      component = fixture.componentInstance;
      luxTableComponent = fixture.debugElement.query(By.directive(LuxTableComponent)).componentInstance;
    });

    it('Sollte erstellt werden', () => {
      expect(component).toBeTruthy();
    });

    it('Die load-Data Funktion des uebergebenen DAOs aufrufen', fakeAsync(() => {
      // Vorbedingungen testen
      let contentRows = document.querySelectorAll('.mat-row');
      let headerRow = document.querySelector('.mat-header-row');
      let footerRow = document.querySelector('.mat-footer-row');

      expect(contentRows.length).toBe(0, 'Vorbedingung 1');
      expect(luxTableComponent.dataSource.data.length).toEqual(0, 'Vorbedingung 2');
      expect(headerRow).toBeDefined('Vorbedingung 3');
      expect(footerRow).toBeDefined('Vorbedingung 4');

      // Änderungen durchführen
      // Abwarten bis das DAO geladen hat (ist asynchron)
      LuxTestHelper.wait(fixture);

      // Nachbedingungen testen
      contentRows = document.querySelectorAll('.mat-row');
      headerRow = document.querySelector('.mat-header-row');
      footerRow = document.querySelector('.mat-footer-row');

      expect(contentRows.length).toBe(2, 'Nachbedingung 1');
      expect(luxTableComponent.dataSource.data.length).toEqual(2, 'Nachbedingung 2');
      expect(headerRow).toBeDefined('Nachbedingung 3');
      expect(footerRow).toBeDefined('Nachbedingung 4');

      flush();
    }));

    it('Sollte nur die Daten nach dem aktuellen Filter setzen', fakeAsync(() => {
      // Vorbedingungen testen
      // Abwarten bis das DAO geladen hat (ist asynchron)
      LuxTestHelper.wait(fixture);
      let contentRows = document.querySelectorAll('.mat-row');

      expect(contentRows.length).toBe(2, 'Vorbedingung 1');
      expect(luxTableComponent.dataSource.data.length).toEqual(2, 'Vorbedingung 2');

      // Änderungen durchführen
      // Wir überschreiben hier absichtlich loadData um testen zu können ob ein älterer (veralteter Filtertext) loadData-Response
      // der aber trotzdem später ankommt als ein neuerer Response korrekt abgefangen und ignoriert wird.
      component.httpDao.loadData = (conf: any) => {
        if (conf.filter === 'old_filter_text_later_arrival') {
          return of({
            items: component.httpDao.dataSourceFix,
            totalCount: component.httpDao.dataSourceFix.length
          }).pipe(delay(2000));
        } else if (conf.filter === 'new_filter_text_earlier_arrival') {
          return of({ items: [component.httpDao.dataSourceFix[0]], totalCount: 1 }).pipe(delay(500));
        } else {
          throw new Error('Unreachable');
        }
      };
      fixture.detectChanges();

      luxTableComponent.filtered$.next('old_filter_text_later_arrival');
      LuxTestHelper.wait(fixture, 550);

      luxTableComponent.filtered$.next('new_filter_text_earlier_arrival');
      fixture.detectChanges();

      LuxTestHelper.wait(fixture, 2500);

      // Nachbedingungen testen
      // Hier muss das Resultat dem der neueren Filterung entsprechend und der alte Request ("old_filter...") darf
      // keine Auswirkungen gehabt haben.
      contentRows = document.querySelectorAll('.mat-row');

      expect(contentRows.length).toBe(1, 'Nachbedingung 1');
      expect(luxTableComponent.dataSource.data.length).toEqual(1, 'Nachbedingung 2');
    }));

    it('Selektion muss nach dem Setzen eines neuen DAO geleert sein.', fakeAsync(() => {
      LuxTestHelper.wait(fixture);
      expect(component.selected.length).toBe(0, 'Vorbedingung 1');

      // Änderungen durchführen
      LuxTestHelper.wait(fixture);

      const firstTd = fixture.debugElement.query(By.css('td.lux-multiselect-td')).nativeElement;
      (firstTd as HTMLElement).click();
      LuxTestHelper.wait(fixture);

      // Nachbedingungen testen
      expect(component.selected.length).toBe(1, 'Nachbedingung 1');

      component.httpDao = new TestHttpDao();
      LuxTestHelper.wait(fixture);

      expect(component.selected.length).toEqual(0);
    }));
  });

  describe('Multiselect', () => {
    let component: TableMultiselectComponent;
    let fixture: ComponentFixture<TableMultiselectComponent>;
    let luxTableComponent: LuxTableComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(TableMultiselectComponent);
      component = fixture.componentInstance;
      luxTableComponent = fixture.debugElement.query(By.directive(LuxTableComponent)).componentInstance;
      fixture.detectChanges();
    });

    it('Sollte erstellt werden', () => {
      expect(component).toBeTruthy();
    });

    it('Einträge korrekt selektieren', fakeAsync(() => {
      // Vorbedingungen testen
      component.dataSource = [
        { c1: 1, c2: 'Hydrogen' },
        { c1: 2, c2: 'Helium' }
      ];
      LuxTestHelper.wait(fixture);
      let multiselectCheckbox = document.getElementsByClassName('lux-multiselect-toggle');
      let multiselectCheckboxAll = document.getElementsByClassName('lux-multiselect-toggle-all');
      expect(multiselectCheckbox.length).toBe(0, 'Vorbedingung 1');
      expect(multiselectCheckboxAll.length).toBe(0, 'Vorbedingung 2');
      expect(component.selected.length).toBe(0, 'Vorbedingung 3');

      // Änderungen durchführen
      component.showMultiSelect = true;
      LuxTestHelper.wait(fixture);

      const multiselectRow = document.querySelectorAll('.mat-row.lux-multiselect-field');

      (multiselectRow[0] as HTMLElement).click();
      LuxTestHelper.wait(fixture);

      (multiselectRow[1] as HTMLElement).click();
      LuxTestHelper.wait(fixture);

      // Nachbedingungen testen
      multiselectCheckbox = document.getElementsByClassName('lux-multiselect-toggle');
      multiselectCheckboxAll = document.getElementsByClassName('lux-multiselect-toggle-all');
      expect(multiselectCheckbox.length).toBe(2, 'Nachbedingung 1');
      expect(multiselectCheckboxAll.length).toBe(1, 'Nachbedingung 2');
      expect(component.selected.length).toBe(2, 'Nachbedingung 3');
    }));

    it('Alle Einträge korrekt selektieren', fakeAsync(() => {
      // Vorbedingungen testen
      component.dataSource = [
        { c1: 1, c2: 'Hydrogen' },
        { c1: 2, c2: 'Helium' }
      ];
      LuxTestHelper.wait(fixture);
      expect(component.selected.length).toBe(0, 'Vorbedingung 1');

      // Änderungen durchführen
      component.showMultiSelect = true;
      LuxTestHelper.wait(fixture);

      const multiselectTriggerAll = document.querySelector('.mat-footer-row.lux-multiselect-field');

      (multiselectTriggerAll as HTMLElement).click();
      LuxTestHelper.wait(fixture);

      // Nachbedingungen testen
      expect(component.selected.length).toBe(2, 'Nachbedingung 1');

      // Änderungen durchführen
      (multiselectTriggerAll as HTMLElement).click();
      LuxTestHelper.wait(fixture);

      // Nachbedingungen testen
      expect(component.selected.length).toBe(0, 'Nachbedingung 2');
    }));

    it('Alle Einträge mit Filter korrekt selektieren', fakeAsync(() => {
      // Vorbedingungen testen
      component.dataSource = [
        { c1: 1, c2: 'Hydrogen' },
        { c1: 2, c2: 'Helium' }
      ];
      LuxTestHelper.wait(fixture);
      expect(component.selected.length).toBe(0, 'Vorbedingung 1');

      // Änderungen durchführen
      component.showMultiSelect = true;
      component.showFilter = true;
      LuxTestHelper.wait(fixture);

      luxTableComponent.filtered$.next('he');
      LuxTestHelper.wait(fixture, 550);

      const multiselectTriggerAll = document.querySelector('.mat-footer-row.lux-multiselect-field');

      (multiselectTriggerAll as HTMLElement).click();
      LuxTestHelper.wait(fixture);

      // Nachbedingungen testen
      expect(component.selected.length).toBe(1, 'Nachbedingung 1');

      // Änderungen durchführen
      (multiselectTriggerAll as HTMLElement).click();
      LuxTestHelper.wait(fixture);

      // Nachbedingungen testen
      expect(component.selected.length).toBe(0, 'Nachbedingung 2');
    }));

    it('Filter für Multiselect-Tabelle deaktivieren', fakeAsync(() => {
      // Vorbedingungen testen
      component.dataSource = [
        { c1: 1, c2: 'Hydrogen' },
        { c1: 2, c2: 'Helium' }
      ];
      LuxTestHelper.wait(fixture);
      expect(component.selected.length).toBe(0, 'Vorbedingung 1');
      expect(fixture.debugElement.query(By.css('.lux-table-filter.lux-hide'))).not.toBe(null, 'Vorbedingung 2');

      // Änderungen durchführen
      component.showMultiSelect = true;
      component.showFilter = true;
      LuxTestHelper.wait(fixture);

      // Nachbedingungen testen
      expect(fixture.debugElement.query(By.css('.lux-table-filter.lux-hide'))).toBe(null, 'Nachbedingung 1');

      // Änderungen durchführen
      component.showFilter = false;
      LuxTestHelper.wait(fixture);

      // Nachbedingungen testen
      expect(fixture.debugElement.query(By.css('.lux-table-filter.lux-hide'))).not.toBe(null, 'Nachbedingung 2');
    }));

    it('Alle Einträge programmatisch korrekt selektieren', fakeAsync(() => {
      // Vorbedingungen testen
      component.dataSource = [
        { c1: 1, c2: 'Hydrogen' },
        { c1: 2, c2: 'Helium' }
      ];
      LuxTestHelper.wait(fixture);
      // luxSelected von der TableComponent prüfen, da beim progm. Setzen kein Change-Event ausgeführt wird
      expect(luxTableComponent.luxSelected.size).toBe(0, 'Vorbedingung 1');

      // Änderungen durchführen
      component.showMultiSelect = true;
      LuxTestHelper.wait(fixture);

      component.preselected = [component.dataSource[0], component.dataSource[1]];
      LuxTestHelper.wait(fixture);

      // Nachbedingungen testen
      expect(luxTableComponent.luxSelected.size).toBe(2);

      // Änderungen durchführen
      component.preselected = [];
      LuxTestHelper.wait(fixture);

      // Nachbedingungen testen
      expect(luxTableComponent.luxSelected.size).toBe(0, 'Nachbedingung 2');
    }));

    it('Alle Einträge programmatisch korrekt selektieren (mit pickValueFn)', fakeAsync(() => {
      // Vorbedingungen testen
      component.dataSource = [
        { c1: 1, c2: 'Hydrogen' },
        { c1: 2, c2: 'Helium' }
      ];
      LuxTestHelper.wait(fixture);
      // luxSelected von der TableComponent prüfen, da beim progm. Setzen kein Change-Event ausgeführt wird
      expect(luxTableComponent.luxSelected.size).toBe(0, 'Vorbedingung 1');

      // Änderungen durchführen
      component.showMultiSelect = true;
      component.pickFn = (o) => o.c2;
      LuxTestHelper.wait(fixture);

      component.preselected = [component.dataSource[0], component.dataSource[1]];
      LuxTestHelper.wait(fixture);

      // Nachbedingungen testen
      expect(luxTableComponent.luxSelected.size).toBe(2);

      // Änderungen durchführen
      component.preselected = [];
      LuxTestHelper.wait(fixture);

      // Nachbedingungen testen
      expect(luxTableComponent.luxSelected.size).toBe(0, 'Nachbedingung 2');
    }));

    it('Alle Einträge programmatisch korrekt selektieren (mit compareWithFn)', fakeAsync(() => {
      // Vorbedingungen testen
      component.dataSource = [
        { c1: 1, c2: 'Hydrogen' },
        { c1: 2, c2: 'Helium' }
      ];
      LuxTestHelper.wait(fixture);
      // luxSelected von der TableComponent prüfen, da beim progm. Setzen kein Change-Event ausgeführt wird
      expect(luxTableComponent.luxSelected.size).toBe(0, 'Vorbedingung 1');

      // Änderungen durchführen
      component.showMultiSelect = true;
      component.compareFn = (o1, o2) => o1.c1 === o2.c1;
      LuxTestHelper.wait(fixture);

      component.preselected = [{ c1: 1, c2: 'Hydrogen' }];
      LuxTestHelper.wait(fixture);

      // Nachbedingungen testen
      expect(luxTableComponent.luxSelected.size).toBe(1);

      // Änderungen durchführen
      component.preselected = [];
      LuxTestHelper.wait(fixture);

      // Nachbedingungen testen
      expect(luxTableComponent.luxSelected.size).toBe(0, 'Nachbedingung 2');
    }));

    it('Alle Einträge programmatisch korrekt selektieren (mit compareWithFn und pickValueFn)', fakeAsync(() => {
      // Vorbedingungen testen
      component.dataSource = [
        { c1: 1, c2: 'Hydrogen' },
        { c1: 2, c2: 'Helium' }
      ];
      LuxTestHelper.wait(fixture);
      // luxSelected von der TableComponent prüfen, da beim progm. Setzen kein Change-Event ausgeführt wird
      expect(luxTableComponent.luxSelected.size).toBe(0, 'Vorbedingung 1');

      // Änderungen durchführen
      component.showMultiSelect = true;
      component.compareFn = (o1_c1, o2_c1) => o1_c1 === o2_c1;
      component.pickFn = (o) => o.c1;
      LuxTestHelper.wait(fixture);

      component.preselected = [{ c1: 1, c2: 'Hydrogen' }];
      LuxTestHelper.wait(fixture);

      // Nachbedingungen testen
      expect(luxTableComponent.luxSelected.size).toBe(1);

      // Änderungen durchführen
      component.preselected = [];
      LuxTestHelper.wait(fixture);

      // Nachbedingungen testen
      expect(luxTableComponent.luxSelected.size).toBe(0, 'Nachbedingung 2');
    }));

    it('Selektierte Einträge sortieren', fakeAsync(() => {
      // Vorbedingungen testen
      component.dataSource = [
        { c1: 1, c2: 'Alpha' },
        { c1: 2, c2: 'Beta' }
      ];
      LuxTestHelper.wait(fixture);
      expect(component.selected.length).toBe(0, 'Vorbedingung 1');

      // Änderungen durchführen
      component.showMultiSelect = true;
      LuxTestHelper.wait(fixture);
      const multiselectRow = document.querySelectorAll('.mat-row.lux-multiselect-field');

      (multiselectRow[1] as HTMLElement).click();
      LuxTestHelper.wait(fixture);

      // Nachbedingungen testen
      expect(component.selected.length).toBe(1, 'Nachbedingung 1');

      // Änderungen durchführen body
      const sortHeader = document.querySelector('th.mat-sort-header');
      (sortHeader as HTMLButtonElement).click();
      LuxTestHelper.wait(fixture, 500);

      // Nachbedingungen testen
      expect(sortHeader).toBeDefined('Nachbedingung 2');

      let col2FirstElements = document.getElementsByClassName('c2-content');
      expect(col2FirstElements.item(1).textContent).toEqual('Alpha', 'Nachbedingung 3');
      expect(col2FirstElements.item(0).textContent).toEqual('Beta', 'Nachbedingung 4');

      // Änderungen durchführen
      (sortHeader as HTMLButtonElement).click();
      LuxTestHelper.wait(fixture, 500);

      // Nachbedingungen testen
      col2FirstElements = document.getElementsByClassName('c2-content');
      expect(col2FirstElements.item(1).textContent).toEqual('Beta', 'Nachbedingung 3');
      expect(col2FirstElements.item(0).textContent).toEqual('Alpha', 'Nachbedingung 4');
    }));

    it('Die korrekte Anzahl selektierter Elemente ausgeben', fakeAsync(() => {
      // Vorbedingungen testen
      component.dataSource = [
        { c1: 1, c2: 'Hydrogen' },
        { c1: 2, c2: 'Helium' }
      ];
      component.showMultiSelect = true;
      LuxTestHelper.wait(fixture);
      let selectedCount = (document.getElementsByClassName('lux-selected-count').item(0) as HTMLElement).innerText;
      expect(selectedCount).toEqual('0 / 2', 'Vorbedingung 1');

      // Änderungen durchführen
      const multiselectRow = document.querySelectorAll('.mat-row.lux-multiselect-field');

      (multiselectRow[0] as HTMLElement).click();
      LuxTestHelper.wait(fixture);

      // Nachbedingungen testen
      selectedCount = (document.getElementsByClassName('lux-selected-count').item(0) as HTMLElement).innerText;
      expect(selectedCount).toEqual('1 / 2', 'Nachbedingung 1');

      // Änderungen durchführen
      (multiselectRow[1] as HTMLElement).click();
      LuxTestHelper.wait(fixture);

      // Nachbedingungen testen
      selectedCount = (document.getElementsByClassName('lux-selected-count').item(0) as HTMLElement).innerText;
      expect(selectedCount).toEqual('2 / 2', 'Nachbedingung 2');
    }));
  });
});

// region Mock Components, Classes & Services

@Component({
  template: `
    <div [ngStyle]="{ height: containerHeight + 'px', width: containerWidth + 'px' }">
      <lux-table
        [luxData]="dataSource"
        [luxShowPagination]="showPagination"
        [luxColWidthsPercent]="colWidths"
        [luxShowFilter]="showFilter"
        [luxPageSize]="pageSize"
        [luxClasses]="cssClasses"
        [luxNoDataText]="noDataText"
        [luxMinWidthPx]="minWidth"
        [luxAutoPaginate]="autopaginate"
        [luxHideBorders]="hideBorders"
      >
        <lux-table-column
          luxColumnDef="c1"
          [luxSortable]="c1Sortable"
          [luxSticky]="c1Sticky"
          [luxResponsiveAt]="c1RespAt"
          [luxResponsiveBehaviour]="c1RespBeh"
        >
          <lux-table-column-header *ngIf="!hideHeaders">
            <ng-template>C1</ng-template>
          </lux-table-column-header>
          <lux-table-column-content>
            <ng-template let-element>
              <span>{{ element.c1 }}</span>
            </ng-template>
          </lux-table-column-content>
          <lux-table-column-footer>
            <ng-template>C1 Footer</ng-template>
          </lux-table-column-footer>
        </lux-table-column>
        <lux-table-column
          luxColumnDef="c2"
          [luxSortable]="c2Sortable"
          [luxSticky]="c2Sticky"
          [luxResponsiveAt]="c2RespAt"
          [luxResponsiveBehaviour]="c2RespBeh"
        >
          <lux-table-column-header *ngIf="!hideHeaders">
            <ng-template>C2</ng-template>
          </lux-table-column-header>
          <lux-table-column-content>
            <ng-template let-element
              ><span class="c2-content">{{ element.c2 }}</span></ng-template
            >
          </lux-table-column-content>
          <lux-table-column-footer>
            <ng-template>C2 Footer</ng-template>
          </lux-table-column-footer>
        </lux-table-column>
      </lux-table>
    </div>
  `
})
class TableComponent {
  dataSource = [];

  showPagination = false;
  showFilter = false;
  colWidths;
  pageSize;
  cssClasses;
  noDataText = 'Keine Daten gefunden.';
  minWidth;
  containerHeight;
  containerWidth;
  autopaginate = false;
  hideBorders = false;
  hideHeaders = false;
  c1Sortable;
  c1Sticky;
  c2Sortable;
  c2Sticky;
  c1FooterSpan;
  c1RespAt;
  c2RespAt;
  c1RespBeh;
  c2RespBeh;

  constructor() {}
}

@Component({
  template: `
    <lux-table [luxHttpDAO]="httpDao" [luxShowPagination]="true" [luxShowFilter]="true" [luxPageSize]="5" [(luxSelected)]="selected" [luxMultiSelect]="true">
      <lux-table-column luxColumnDef="c1" [luxSortable]="true">
        <lux-table-column-header>
          <ng-template> C1 </ng-template>
        </lux-table-column-header>
        <lux-table-column-content>
          <ng-template let-element>
            <span>{{ element.c1 }}</span>
          </ng-template>
        </lux-table-column-content>
        <lux-table-column-footer>
          <ng-template> C1 Footer </ng-template>
        </lux-table-column-footer>
      </lux-table-column>
      <lux-table-column luxColumnDef="c2" [luxSortable]="true">
        <lux-table-column-header>
          <ng-template> C2 </ng-template>
        </lux-table-column-header>
        <lux-table-column-content>
          <ng-template let-element
            ><span class="c2-content">{{ element.c2 }}</span></ng-template
          >
        </lux-table-column-content>
        <lux-table-column-footer>
          <ng-template> C2 Footer </ng-template>
        </lux-table-column-footer>
      </lux-table-column>
    </lux-table>
  `
})
class HttpDaoTableComponent {
  httpDao: TestHttpDao = new TestHttpDao();
  selected = [];

  constructor() {}
}

@Component({
  template: `
    <lux-table
      [luxData]="dataSource"
      [luxShowPagination]="showPagination"
      [luxShowFilter]="showFilter"
      [luxMultiSelect]="showMultiSelect"
      [luxSelected]="preselected"
      [luxPickValue]="pickFn"
      [luxCompareWith]="compareFn"
      (luxSelectedChange)="selected = $event"
    >
      <lux-table-column luxColumnDef="c1">
        <lux-table-column-header>
          <ng-template>C1</ng-template>
        </lux-table-column-header>
        <lux-table-column-content>
          <ng-template let-element>
            <span>{{ element.c1 }}</span>
          </ng-template>
        </lux-table-column-content>
        <lux-table-column-footer>
          <ng-template>C1 Footer</ng-template>
        </lux-table-column-footer>
      </lux-table-column>
      <lux-table-column luxColumnDef="c2">
        <lux-table-column-header>
          <ng-template>C2</ng-template>
        </lux-table-column-header>
        <lux-table-column-content>
          <ng-template let-element
            ><span class="c2-content">{{ element.c2 }}</span></ng-template
          >
        </lux-table-column-content>
        <lux-table-column-footer>
          <ng-template>C2 Footer</ng-template>
        </lux-table-column-footer>
      </lux-table-column>
    </lux-table>
  `
})
class TableMultiselectComponent {
  dataSource = [];
  selected = [];
  preselected = [];
  showPagination = false;
  showFilter = false;
  showMultiSelect = false;
  pickFn;
  compareFn;

  constructor() {}
}

class TestHttpDao implements ILuxTableHttpDao {
  dataSourceFix: any[] = [
    { c1: 1, c2: 'Alpha' },
    { c1: 2, c2: 'Beta' }
  ];

  constructor() {}

  loadData(conf: { page: number; pageSize: number; filter?: string; sort?: string; order?: string }): Observable<any> {
    // Beispiel; bis zum return wuerde das alles hier serverseitig stattfinden
    return of({ items: this.dataSourceFix, totalCount: this.dataSourceFix.length });
  }
}

// TODO: Add Angular decorator.
class MockMediaObserverService implements OnDestroy {
  mediaQueryChanged: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() {}

  ngOnDestroy() {
    this.mediaQueryChanged.complete();
  }

  public getMediaQueryChangedAsObservable(): Observable<string> {
    return this.mediaQueryChanged.asObservable();
  }
}

class MockConsoleService {
  error(param: any) {}
}

// endregion

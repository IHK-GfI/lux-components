import { Component, ViewChild } from '@angular/core';
import { TableExampleBaseClass } from './table-example-base.class';
import { LuxTableComponent } from '../../../modules/lux-common/lux-table/lux-table.component';

@Component({
  selector: 'app-table-example',
  templateUrl: './table-example.component.html',
  styleUrls: ['./table-example.component.scss']
})
export class TableExampleComponent extends TableExampleBaseClass {
  @ViewChild('myTable') tableComponent!: LuxTableComponent;

  dataSource: any[] = [];
  markdownData = `
  Html

  \`\`\`html
  <lux-table-column-content>
    ...
      <lux-input-ac
        ...
        *ngIf="element.editable"
        [luxNoLabels]="true"
        ...
      ></lux-input-ac>
    ...
  </lux-table-column-content>
  \`\`\`
  `;

  fontExample: { example1: string; example2: string; example3: string; example4: string; content: string }[] = [
    { example1: 'unformated', example2: 'span', example3: 'div', example4: 'p', content: 'Lorem ipsum' }
  ];

  constructor() {
    super();

    setTimeout(() => {
      this.loadData(false);
    });
  }

  getTableComponent(): LuxTableComponent<any> {
    return this.tableComponent;
  }

  getDataArr() {
    return this.dataSource;
  }

  onSelectedChange(selected: Set<any>) {
    console.log('als Set:  ', selected);
  }

  onSelectedAsArrayChange(selected: any[]) {
    console.log('als Array:', selected);
  }

  clearData() {
    this.dataSource = [];
  }

  loadData(simulateLargeSource: boolean) {
    const data = [
      { name: 'Hydrogen', symbol: 'H', date: new Date(2017, 11, 24), disabled: false },
      { name: 'Helium', symbol: 'He', date: new Date(2017, 11, 22), disabled: false },
      { name: 'Lithium', symbol: 'Li', date: new Date(2018, 11, 21), disabled: false },
      { name: 'Beryllium', symbol: 'Be', date: new Date(2018, 11, 18), disabled: false },
      { name: 'Boron', symbol: 'B', date: new Date(2018, 10, 24), disabled: false },
      { name: 'carbon', symbol: 'C', date: new Date(2018, 11, 24), disabled: false },
      { name: 'Nitrogen', symbol: 'N', date: new Date(2018, 10, 24), disabled: false },
      { name: 'Öxygen', symbol: 'O', date: new Date(2018, 11, 24), disabled: false },
      { name: '', symbol: 'F', date: new Date(2018, 11, 24), disabled: false },
      { name: 'äeon', symbol: 'Ne', date: new Date(2018, 10, 24), disabled: false },
      { name: 'Sodium', symbol: 'Na', date: new Date(2018, 11, 24), disabled: false },
      { name: 'Magnesium', symbol: 'Mg', date: new Date(2018, 9, 24), disabled: false },
      { name: 'Dluminum', symbol: 'Al', date: new Date(2018, 11, 24), disabled: false },
      { name: 'Silicon', symbol: 'Si', date: new Date(2018, 9, 24), disabled: false },
      { name: 'Phosphorus', symbol: 'P', date: new Date(2018, 11, 24), disabled: false },
      { name: 'Sulfur', symbol: 'S', date: new Date(2018, 9, 24), disabled: false },
      { name: 'otto', symbol: 'S', date: new Date(2018, 11, 24), disabled: false },
      { name: null, symbol: null, date: new Date(2018, 9, 24), disabled: false },
      { name: undefined, symbol: undefined, date: new Date(2018, 11, 24), disabled: false },
      { name: 'ß', symbol: 'ß', date: new Date(2018, 11, 24), disabled: false },
      { name: 123, symbol: 'ß', date: new Date(2018, 2, 28), disabled: false },
      { name: 'Ä', symbol: 'ä', date: new Date(2018, 2, 1), disabled: false },
      { name: 'Ü', symbol: 'ü', date: new Date(2018, 2, 10), disabled: false },
      { name: 'Ö', symbol: 'ö', date: new Date(2018, 11, 13), disabled: false },
      { name: 234.56, symbol: '2', date: new Date(2018, 11, 7), disabled: false },
      { name: '234,56', symbol: '3', date: new Date(2018, 11, 5), disabled: false },
      { name: '2.234,56', symbol: '4', date: new Date(2017, 11, 1), disabled: false },
      { name: 'AA', symbol: '', date: new Date(2018, 11, 2), disabled: false },
      { name: 'Élite', symbol: 'é', date: new Date(2016, 1, 1), disabled: false },
      { name: 'Egon', symbol: 'e', date: new Date(2018, 6, 30), disabled: false }
    ];

    if (!simulateLargeSource) {
      this.dataSource = data;
    } else {
      const largeData = [];
      for (let j = 0; j < 10; j++) {
        for (let i = 0; i < 30; i++) {
          const newObj: { name: string; symbol: string; date: Date } = { name: '', symbol: '', date: new Date() };
          Object.assign(newObj, data[i]);
          newObj.name = newObj.name + i + '-' + j;
          largeData.push(newObj);
        }
      }
      this.dataSource = largeData;
    }
  }

  onEdit(element: any) {
    // Aktuelle Daten im Memento speichern, falls das Bearbeiten abgebrochen wird.
    element.memento = JSON.parse(JSON.stringify(element));

    // Das Element in den Editiermodus versetzen.
    element.editable = true;

    // Das Blättern deaktivieren und eine Begründung als Tooltip anzeigen.
    this.pagerDisabled = true;
    this.pagerTooltip = 'Es gibt noch ungespeicherte Änderungen!';
  }

  onSave(element: any) {
    // Die aktuellen Werte wurden bereits beim Editieren in das Element geschrieben.
    // Hier muss nur noch der alte Zustand gelöscht werden. Dieser wird nur beim
    // Abbrechen (siehe onCancel) benötigt.
    delete element.editable;
    delete element.memento;

    this.clearEditState();
  }

  onCancel(element: any) {
    // Den Orginalzustand (siehe onEdit) wiederherstellen.
    Object.assign(element, element.memento);
    delete element.editable;
    delete element.memento;

    this.clearEditState();
  }

  private isMinOneElementEditable() {
    return this.dataSource.find((element) => element.editable);
  }

  private clearEditState() {
    if (!this.isMinOneElementEditable()) {
      this.pagerDisabled = false;
      this.pagerTooltip = '';
    }
  }
}

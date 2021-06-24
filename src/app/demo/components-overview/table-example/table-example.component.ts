import { Component } from '@angular/core';
import { TableExampleBaseClass } from './table-example-base.class';

@Component({
  selector: 'app-table-example',
  templateUrl: './table-example.component.html',
  styleUrls: ['./table-example.component.scss']
})
export class TableExampleComponent extends TableExampleBaseClass {
  dataSource: any[] = [];

  constructor() {
    super();
  }

  onSelectedChange($event) {
    console.log($event);
  }

  clearData() {
    this.dataSource = [];
  }

  loadData(simulateLargeSource: boolean) {
    const data = [
      { name: 'Hydrogen', symbol: 'H', date: new Date(2017, 11, 24) },
      { name: 'Helium', symbol: 'He', date: new Date(2017, 11, 22) },
      { name: 'Lithium', ymbol: 'Li', date: new Date(2018, 11, 21) },
      { name: 'Beryllium', symbol: 'Be', date: new Date(2018, 11, 18) },
      { name: 'Boron', symbol: 'B', date: new Date(2018, 10, 24) },
      { name: 'carbon', symbol: 'C', date: new Date(2018, 11, 24) },
      { name: 'Nitrogen', symbol: 'N', date: new Date(2018, 10, 24) },
      { name: 'Öxygen', symbol: 'O', date: new Date(2018, 11, 24) },
      { name: '', symbol: 'F', date: new Date(2018, 11, 24) },
      { name: 'äeon', symbol: 'Ne', date: new Date(2018, 10, 24) },
      { name: 'Sodium', symbol: 'Na', date: new Date(2018, 11, 24) },
      { name: 'Magnesium', symbol: 'Mg', date: new Date(2018, 9, 24) },
      { name: 'Dluminum', symbol: 'Al', date: new Date(2018, 11, 24) },
      { name: 'Silicon', symbol: 'Si', date: new Date(2018, 9, 24) },
      { name: 'Phosphorus', symbol: 'P', date: new Date(2018, 11, 24) },
      { name: 'Sulfur', symbol: 'S', date: new Date(2018, 9, 24) },
      { name: 'otto', symbol: 'S', date: new Date(2018, 11, 24) },
      { name: null, symbol: null, date: new Date(2018, 9, 24) },
      { name: undefined, symbol: undefined, date: new Date(2018, 11, 24) },
      { name: 'ß', symbol: 'ß', date: new Date(2018, 11, 24) },
      { name: 123, symbol: 'ß', date: new Date(2018, 2, 28) },
      { name: 'Ä', symbol: 'ä', date: new Date(2018, 2, 1) },
      { name: 'Ü', symbol: 'ü', date: new Date(2018, 2, 10) },
      { name: 'Ö', symbol: 'ö', date: new Date(2018, 11, 13) },
      { name: 234.56, symbol: '2', date: new Date(2018, 11, 7) },
      { name: '234,56', symbol: '3', date: new Date(2018, 11, 5) },
      { name: '2.234,56', symbol: '4', date: new Date(2017, 11, 1) },
      { name: 'AA', symbol: '', date: new Date(2018, 11, 2) },
      { name: 'Élite', symbol: 'é', date: new Date(2016, 1, 1) },
      { name: 'Egon', symbol: 'e', date: new Date(2018, 6, 30) }
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
}

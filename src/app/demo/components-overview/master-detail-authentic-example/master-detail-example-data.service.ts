import { Injectable } from '@angular/core';

@Injectable()
export class MasterDetailExampleDataService {
  public static readonly DAY: number = 1000 * 60 * 60 * 24;
  public static readonly MONTH: number = MasterDetailExampleDataService.DAY * 31;

  constructor() {}

  createExampleData(amount: number) {
    const now = Date.now();
    const data = [];
    const icons = ['lux-interface-home-3', 'lux-cogs'];

    for (let i = 0; i < amount; i++) {
      data.push({
        id: i,
        title: `Eintrag #${i + 1}`,
        titleTooltip: `Tooltipp: Eintrag #${i + 1}`,
        subtitle: `Alle Informationen unter https://www.ihk-gfi.de`,
        subtitleTooltip: `Tooltipp: Alle Informationen unter https://www.ihk-gfi.de`,
        icon: icons[i % 2],
        timestamp: now + i * MasterDetailExampleDataService.DAY,
        content:
          ' Lorem ipsum dolor sit amet, consetetur\n' +
          ' sadipscing elitr, sed diam nonumy eirmod tempor inviduntutlaboreetdolore magna aliquyam erat,\n' +
          ' sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.'
      });
    }

    return data;
  }
}

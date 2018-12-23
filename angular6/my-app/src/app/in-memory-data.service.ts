import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{

  createDb() {
    const heroes = [
      {id: 11, name: '安琪拉'},
      {id: 12, name: '扁鹊'},
      {id: 13, name: '程咬金'},
      {id: 14, name: '貂蝉'},
      {id: 15, name: '裴擒虎'},
      {id: 16, name: '公孙离'},
      {id: 17, name: '韩信'},
      {id: 18, name: '姜子牙'},
      {id: 19, name: '李元芳'},
      {id: 20, name: '芈月'},
    ];

    const tests = 'tests';
    return {heroes, tests}
  }

  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.ename)) + 1 : 11;
  };
  constructor() {}
}

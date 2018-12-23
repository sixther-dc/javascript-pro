import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { ActivatedRoute } from '@angular/router';
import { LoggerService } from '../logger.service';

//装饰器函数，用于为该组件指定angular所需的元数据
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  // providers: [HeroService]
  // 声明了HeroService可以被注入进这个组件，如果HeroService的Providein被定义为root的时候，则可以不需要该定义
})
export class HeroesComponent implements OnInit {

  heroes: Hero[];
  //subscribe为异步处理数据的写法
  getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(heroes => {
          this.heroes = heroes
        });
  }

  //这里做什么
  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private loggerService: LoggerService
  ) { }
  //angualr创建完组件后就会调用ngOnInit,这里可以放置组件初始化的逻辑

  //为什么数据的初始化要在ngOnInit里做
  ngOnInit() {
    this.route.parent.url.subscribe(
      url => {
        this.loggerService.log(url)
      }
    );
    this.getHeroes()
  };

  sortName = null;
  sortValue = null;
  //接受key以及排序字段
  sort(sort: { key: string, value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.search();
  };

  search(): void {
    /** sort data **/
    let data = this.heroes;
    this.loggerService.log(data);
    //按照汉子顺序排序
    if (this.sortName && this.sortValue) {
      this.heroes = data.sort(
        (a, b) =>
          (this.sortValue === 'ascend') ? 
          (a[ this.sortName ].localeCompare(b[ this.sortName ]))
          : 
          (b[ this.sortName ].localeCompare(a[ this.sortName ]))
      );
    } else {
      this.heroes = data;
    }
  }

}

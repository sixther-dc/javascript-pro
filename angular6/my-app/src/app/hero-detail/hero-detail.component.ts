import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';
import { LoggerService } from '../logger.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  //Input修饰符表明hero可以让外部的组件绑定到它，可以理解为组件对外的接口
  @Input() hero: Hero
  constructor(
    //可以从url中提取参数
    private route: ActivatedRoute,
    private heroService: HeroService,
    //与浏览器打交道的导航服务
    private location: Location,
    private loggerService: LoggerService,
  ) { }

  ngOnInit() {
    this.getHero()
  }

  getHero(): void {
    //操作符会把字符串转换为数字
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id).subscribe(heros =>{
      let hero = heros.find((hero) => (hero.ename == id));
      this.loggerService.log(hero);
      this.hero = hero
    })
  }

  goBack(): void {
    this.location.back();
  }

}

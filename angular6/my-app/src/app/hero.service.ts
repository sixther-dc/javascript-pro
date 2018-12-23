import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { Observable, of } from 'rxjs';
import { MessageService } from './messages.service';
import { NzMessageService } from 'ng-zorro-antd';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { LoggerService } from './logger.service';


//TODO: const的变量为什么不能定义到class中
const httpOptions = {
  headers: new HttpHeaders({
    'Originn': 'https://pvp.qq.com'
  })
};

//provideIn生命了该服务可以被所有class锁注入
// @Injectable({
//   providedIn: 'root'
// })
@Injectable()
export class HeroService {

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
   
      this.loggerService.log(error); // log to console instead
      this.messageService.error(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  private heroesUrl = 'https://pvp.qq.com/web201605/js/herolist.json';
  private testUrl = 'api/tests';
  getHeroes(): Observable<Hero[]> {
    //返回一个 Observable<Hero[]>
    this.messageService.info('HeroService: 英雄列表已经获取', { nzDuration: 3000 });
    // let a = this.http.get<Hero[]>(this.testUrl);
    // a.subscribe(data => {
    //   this.loggerService.log(data);
    // })
    return this.http.get<Hero[]>(this.heroesUrl, httpOptions)
      .pipe(
        catchError(this.handleError('getHeroes', []))
      )
  }

  //获取单个英雄
  getHero(id: number): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        catchError(this.handleError('getHeroes', [])),
        tap(_ => {
          this.messageService.info(`HeroService: 英雄信息已经获取 id=${id}`);
        })
      )
  }

  constructor(
    private messageService: NzMessageService,
    private http: HttpClient,
    private loggerService: LoggerService
    ) { }
}

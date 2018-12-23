import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule, HttpClient }    from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxEchartsModule } from 'ngx-echarts';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HeroService } from './hero.service';
import { MockHeroService } from './mock-hereoes.service';
import { LoggerService } from './logger.service';

//默认下载/assets/i18n/[lang].json
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

// 自定义翻译文件名
// export function createTranslateLoader(http: HttpClient) {
//   return new TranslateHttpLoader(http, './assets/i18n/', '.json');
// }

@NgModule({
  //声明属于本NgModule的组件，指令，管道
  //TODO: 声明后有什么用
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent
  ],
  //可以让其他组件的模板使用这些NgModule导出的组件，指令，管道
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    //支持css动画效果
    BrowserAnimationsModule,
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataService, {dataEncapsulation: false}
    // )
    NgZorroAntdModule,
    NgxEchartsModule,
    TranslateModule.forRoot({
      loader: {
          //接口
          provide: TranslateLoader,
          //具体实现
          useFactory: (HttpLoaderFactory),
          //依赖的参数
          deps: [ HttpClient ]
      }
    })
  ],
  //其他组件中可以使用的对象
  exports: [],
  //配置ng-zorro-antd国际化
  providers: [
    //相当于在Service定义处的providein为"root",可以再所有对象中注入
    //TODO: 此处的useClass为使用它来替代前面的HeroClass，但为什么在引用处import的是HeroClass
    { provide: HeroService, useClass: MockHeroService },
    { provide: NZ_I18N, useValue: zh_CN},
    { 
      provide: LoggerService, 
      useFactory: () =>{
        return new LoggerService(false)
      }
    }  
  ],
  // bootstrap: [AppComponent, DashboardComponent]
  // 此处数组需需要跟index.html中的组件相呼应
  bootstrap: [AppComponent]
})
export class AppModule { } 

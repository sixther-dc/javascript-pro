import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LoggerService } from './logger.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tour of Heros';
  supportLan = [
    {"value": "en", "desc": "English"},
    {"value": "cn", "desc": "简体中文"}
  ]
  constructor(
    public translate: TranslateService,
    private loggerService: LoggerService
    ) {
    translate.addLangs(['en', 'cn']);
    translate.setDefaultLang('cn');
    // const browserLang = translate.getBrowserLang();
    // translate.use(browserLang.match(/en|fr/) ? browserLang : 'cn');
  };  

  changeLang(lang) {
    this.loggerService.log(lang);
    this.translate.use(lang);
  }

};

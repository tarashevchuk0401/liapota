import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('ua');
    translate.use('ua');
  }

  switchLanguage(language: string){
    this.translate.use(language)
  }

}

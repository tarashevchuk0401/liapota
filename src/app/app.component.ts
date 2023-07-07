import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'liapota';
  viberIconToogle: boolean = true;


  closeViberIcon(){
    this.viberIconToogle = false;
  }
}

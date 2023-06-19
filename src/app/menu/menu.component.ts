import { Component, OnInit } from '@angular/core';
import { ServerService } from '../services/server.service';
import { MenuItem } from '../shared/MenuItem';
import { map } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit{

  allMenu: MenuItem[] = [];
  todayMenu: MenuItem[] = [];
  renderingMenu: MenuItem[] = [];

  dayNumberToday: number | undefined;
  checkDay: number | undefined;
  currentPartOfMenu: string = 'lunch';



  constructor(private serverService: ServerService){}

  ngOnInit(): void {
    this.getDayOfWeek();
    this.checkDay = this.dayNumberToday;

    this.getAllItems();  }

  getAllItems(){
    this.serverService.getItem().pipe(
      map(item => Object.values(item)),
      map(i =>Object.values(i)),
    ).subscribe((data: any) => {
      this.allMenu = data;
      this.renderingMenu = this.allMenu.filter(item => item.dayOfWeek === this.dayNumberToday?.toString())
    });
  }

  getDayOfWeek(){
    let date = new Date();
    this.dayNumberToday = date.getDay();
    console.log(this.dayNumberToday);
  }

  changePartOfMenu(newPart : string){
    this.currentPartOfMenu =  newPart;;
    
  }

 
///
showSunday(){
    this.renderingMenu = this.allMenu.filter(item => item.dayOfWeek == '0' || item.dayOfWeek === 'all');
    this.checkDay = 0;
  }
//////   ONE FUNCTION /////////////////
  showMonday(){
    this.renderingMenu = this.allMenu.filter(item => item.dayOfWeek === '1');
    this.checkDay = 1;
  }
  showTuesday(){
    this.renderingMenu = this.allMenu.filter(item => item.dayOfWeek == '2' || item.dayOfWeek == 'all');
    this.checkDay = 2;
  }
  showWednesday(){
    this.renderingMenu = this.allMenu.filter(item => item.dayOfWeek == '3' || item.dayOfWeek == 'all');
        this.checkDay = 3;
  }
  showThursday(){
    this.renderingMenu = this.allMenu.filter(item => item.dayOfWeek == '4' || item.dayOfWeek == 'all');
        this.checkDay = 4;
  }
  showFriday(){
    this.renderingMenu = this.allMenu.filter(item => item.dayOfWeek == '5' || item.dayOfWeek == 'all');
        this.checkDay = 5;
  }

}

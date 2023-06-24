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
export class MenuComponent implements OnInit {

  allMenu: MenuItem[] = [];
  todayMenu: MenuItem[] = [];
  renderingMenu: MenuItem[] = [];

  dayNumberToday: number | undefined;
  checkDay: number | undefined;
  currentPartOfMenu: string = 'lunch';



  constructor(private serverService: ServerService) { }

  ngOnInit(): void {
    this.getDayOfWeek();
    this.checkDay = this.dayNumberToday;

    this.getAllItems();
  }

  getAllItems() {
    this.serverService.getItem().pipe(
     map(response => {
      let post = [];
      for (const key in response) {
        if (response.hasOwnProperty(key)) {
          post.push({ ...response[key], id: key });
        }
      }
      return post
    }))
    .subscribe((data: any) => {
      this.allMenu = data;
      this.renderingMenu = this.allMenu.filter(item => item.dayOfWeek === this.dayNumberToday?.toString())
    });
  }

  getDayOfWeek() {
    let date = new Date();
    this.dayNumberToday = date.getDay();
    // console.log(this.dayNumberToday);
  }

  changePartOfMenu(newPart: string) {
    this.currentPartOfMenu = newPart;
    this.renderingMenu = this.allMenu.filter(item => item.partOfMenu === newPart);
  }

  changeDay(day: string) {
    this.renderingMenu = this.allMenu.filter(item => item.dayOfWeek === day);
    this.checkDay = +day;
  }

}

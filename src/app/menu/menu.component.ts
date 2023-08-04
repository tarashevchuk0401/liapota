import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ServerService } from '../services/server.service';
import { MenuItem } from '../shared/MenuItem';
import { debounceTime, interval, map, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { SubjectService } from '../services/subject.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent extends SubjectService implements OnInit {

  allMenu: MenuItem[] = [];
  todayMenu: MenuItem[] = [];
  renderingMenu: MenuItem[] = [];

  dayNumberToday: number | undefined;
  checkedDay: number | undefined;
  currentPartOfMenu: string = 'lunch';
  currentNumberOfWeek: string = '1';

  constructor(private serverService: ServerService) {
    super()
  }

  ngOnInit(): void {
    this.getDayOfWeek();
    this.checkedDay = this.dayNumberToday;

    this.getNumberOfWeek();
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
      }),
      takeUntil(this.unsubscribe$)
    ).subscribe((data: any) => {
      this.allMenu = data;
      this.renderingMenu = this.allMenu.filter(item => item.dayOfWeek === this.dayNumberToday?.toString() || item.dayOfWeek === 'all')
        .filter(item => item.numberOfWeek === this.currentNumberOfWeek || item.numberOfWeek === 'all').sort((a, b) => a.idNumber - b.idNumber);

        console.log(this.allMenu)
    });
  }

  getNumberOfWeek() {
    this.serverService.getCurrentNumberOfWeek().pipe(
      map(item => Object.values(item).toString()),
      takeUntil(this.unsubscribe$)
    ).subscribe(d => {
      this.currentNumberOfWeek = d;
      console.log('Тиждень : ' + d)
    })
  }

  getDayOfWeek() {
    let date = new Date();
    this.dayNumberToday = date.getDay();
  }

  changePartOfMenu(newPart: string) {
    this.currentPartOfMenu = newPart;

    this.renderingMenu = this.allMenu.filter(item => item.partOfMenu === newPart)
      .filter(item => item.numberOfWeek === this.currentNumberOfWeek || item.numberOfWeek === 'all')
      .sort((a, b) => a.idNumber - b.idNumber);

    if (newPart == 'lunch') {
      this.checkedDay = this.dayNumberToday;
      this.getAllItems();
      this.renderingMenu = this.renderingMenu.filter(item => item.dayOfWeek === this.dayNumberToday || item.dayOfWeek === 'all')
    } else return
  }

  changeDay(day: string) {
    this.renderingMenu = this.allMenu.filter(item => item.dayOfWeek === day || item.dayOfWeek === 'all')
      .filter(item => item.numberOfWeek === this.currentNumberOfWeek || item.numberOfWeek === 'all')
      .sort((a, b) => a.idNumber - b.idNumber);
    this.checkedDay = +day;
  }

}

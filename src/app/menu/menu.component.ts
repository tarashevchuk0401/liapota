import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ServerService } from '../services/server.service';
import { MenuItem } from '../shared/MenuItem';
import { debounceTime, map } from 'rxjs';
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
  currentNumberOfWeek: string = '1';



  constructor(private serverService: ServerService) { }



  ngOnInit(): void {
    this.getDayOfWeek();
    this.checkDay = this.dayNumberToday;

    this.getNumberOfWeek();
    this.getAllItems();

    console.log(this.currentPartOfMenu)
  }

  getAllItems() {
    this.serverService.getItem()
      .subscribe((data: any) => {
        this.allMenu = data;
        this.renderingMenu = this.allMenu.filter(item => item.dayOfWeek === this.dayNumberToday?.toString() || item.dayOfWeek === 'all')
          .filter(item => item.numberOfWeek === this.currentNumberOfWeek || item.numberOfWeek === 'all').sort((a, b) => a.idNumber - b.idNumber)
      });
  }

  getNumberOfWeek() {
    this.serverService.getCurrentNumberOfWeek().pipe(
      map(item => Object.values(item).toString())
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
      this.checkDay = this.dayNumberToday;
      this.renderingMenu = this.renderingMenu.filter(item => item.dayOfWeek === this.dayNumberToday || item.dayOfWeek === 'all')
    } else return
  }

  changeDay(day: string) {
    this.renderingMenu = this.allMenu.filter(item => item.dayOfWeek === day || item.dayOfWeek === 'all')
      .filter(item => item.numberOfWeek === this.currentNumberOfWeek || item.numberOfWeek === 'all')
      .sort((a, b) => a.idNumber - b.idNumber)
    this.checkDay = +day;
  }

}

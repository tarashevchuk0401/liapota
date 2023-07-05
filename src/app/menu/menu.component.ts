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
  }

  getAllItems() {
    this.serverService.getItem().pipe(
      //debounce time used for let initialized this.currentNuberOfWeek
      debounceTime(10),
      map(response => {
        let post: any[] = [];
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            post.push({ ...response[key], id: key });
          }
        }
        return post;
      }))
      .subscribe((data: any) => {
        this.allMenu = data;
        this.renderingMenu = this.allMenu.filter(item => item.dayOfWeek === this.dayNumberToday?.toString() || item.dayOfWeek === 'all')
          .filter(item => item.numberOfWeek === this.currentNumberOfWeek || item.numberOfWeek === 'all').sort((a, b) => a.idNumber - b.idNumber);
      });
  }

  getNumberOfWeek() {
    this.serverService.getCurrentNumberOfWeek().pipe(
      map(item => Object.values(item).toString())
    ).subscribe(d => {
      this.currentNumberOfWeek = d;
      console.log('Тиждень : ' + d);
      
    })
  }

  getDayOfWeek() {
    let date = new Date();
    this.dayNumberToday = date.getDay();
    // console.log(this.dayNumberToday);
  }

  changePartOfMenu(newPart: string) {
    this.currentPartOfMenu = newPart;
    this.renderingMenu = this.allMenu.filter(item => item.partOfMenu === newPart)
      .filter(item => item.numberOfWeek === this.currentNumberOfWeek || item.numberOfWeek === 'all')
      .sort((a, b) => a.idNumber - b.idNumber);
  }

  changeDay(day: string) {
    this.renderingMenu = this.allMenu.filter(item => item.dayOfWeek === day || item.dayOfWeek === 'all')
      .filter(item => item.numberOfWeek === this.currentNumberOfWeek || item.numberOfWeek === 'all')
      .sort((a, b) => a.idNumber - b.idNumber)

    this.checkDay = +day;
  }

  addToCart(id: string, quantity: number) {
    if(quantity > 0){
      this.serverService.addToCart(id, quantity).subscribe();
    }
  }

}

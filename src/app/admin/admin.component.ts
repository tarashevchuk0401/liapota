import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MenuItem } from '../shared/MenuItem';
import { ServerService } from '../services/server.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  renderingMenu: MenuItem[] = [];
  showMenu: MenuItem[] = [];
  checkedPartOfMenu: string = ''

  constructor(private server: ServerService) { }

  ngOnInit(): void {
    this.getAllItems();
  }


  submitReset(menu: NgForm) {
    let item: MenuItem = {
      dish1: menu.value.dish1,
      dish2: menu.value.dish2,
      dish3: menu.value.dish3,
      dish4: menu.value.dish4,
      dish5: menu.value.dish5,
      dish6: menu.value.dish6,
      dayOfWeek: menu.value.dayOfWeek,
      price: menu.value.price,
      idNumber: menu.value.idNumber,
      // id: string,
      partOfMenu: menu.value.partOfMenu,
    }

    if (menu.valid) {
      this.server.addItem(item).subscribe(() => {
        menu.reset();
        window.location.reload();
      })
    }
  }


  getAllItems() {
    this.server.getItem().pipe(
      map(response => {
        let post = [];
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            post.push({ ...response[key], id: key });
          }
        }
        return post
      })).subscribe(data => {
        this.renderingMenu = data;
      })
  }

  filterByPartOfMenu(query: string) {
    this.showMenu = this.renderingMenu.filter(item => item.partOfMenu === query);
    this.checkedPartOfMenu = query;
   
  }

  deleteItem(id: string) {
    this.server.deleteItem(id).subscribe(d => {

    })
  }

}

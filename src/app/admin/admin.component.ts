import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MenuItem } from '../shared/MenuItem';
import { ServerService } from '../services/server.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  constructor(private server: ServerService) { }

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
      partOfMenu: menu.value.partOfMenu,
    }

    if (menu.valid) {
      this.server.addItem(item).subscribe(() => menu.reset())
    }
  }
}

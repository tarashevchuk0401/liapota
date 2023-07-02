import { Component } from '@angular/core';
import { ServerService } from '../services/server.service';
import { concatMap, debounceTime, filter, map, tap } from 'rxjs';
import { MenuItem } from '../shared/MenuItem';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  cartItems: string[] = [];
  cartArray: any[] = [];
  allMenu: any[] = []
  cartMenu: any[] = [];
  res: any;

  constructor(private serverService: ServerService) { }

  ngOnInit(): void {
    this.serverService.getFromCart().pipe(
      map(item => Object.values(item)),
      debounceTime(1)
    ).subscribe(d => {
      this.cartItems = d.map(a => a.id)
      console.log(this.cartItems)
    })

    this.serverService.getItem().pipe(
      map(response => {
        let post = [];
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            post.push({ ...response[key], id: key });
          }
        }
        return post
      })
    ).subscribe(d => {
      this.cartArray = d.filter(item => this.cartItems.includes(item.id))
    })
  }

}


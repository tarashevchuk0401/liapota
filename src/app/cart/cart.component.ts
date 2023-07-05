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

  allMenu: MenuItem[] = [];
  cartItems: any;
  renderingCart: MenuItem[] = [];

  newCart: string[] = [];
  actualCart: any = [];

  constructor(private serverService: ServerService) { }

  ngOnInit(): void {
    this.getContentOfCart()

  }

  /// Gettimg id og products from cart, then initialize  getAllItems() and filter all menu

  getContentOfCart() {
    this.serverService.getFromCart().pipe(
      tap(d => console.log(d)),
      map(item => Object.values(item))
    ).subscribe(d => {
      this.actualCart = d
      this.cartItems = d.map(a => a.id.toString());
      this.actualCart.sort((a: { id: number; }, b: { id: number; }) => a.id - b.id)
      this.getAllItems();
    });
  }

  getAllItems() {
    this.serverService.getItem().pipe(
      //debounce time used for let initialized this.currentNuberOfWeek
      // debounceTime(10),
      map(response => {
        let post = [];
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            post.push({ ...response[key], id: key });
          }
        }
        return post
      })).subscribe(d => {
        this.renderingCart = d.filter(item => this.cartItems.includes(item.id));
        for (let i = 0; i < this.renderingCart.length; i++) {
          this.sortCarts();
          this.renderingCart[i].quantity = this.actualCart[i].quantity;
        }
      })
  }

  sortCarts() {
    this.renderingCart.sort((a: { id: string; }, b: { id: string; }) => a.id.localeCompare(b.id));
    this.actualCart.sort((a: { id: string; }, b: { id: string; }) => a.id.localeCompare(b.id));
  }



  /// changing actualCart array of items(deleting unnesesary item), remove all cart from DB,
  /// adding to DB(cart) new edited array
  removeFromCart(id: string) {
    this.actualCart = this.actualCart.filter((item: any) => item.id !== id);
    this.serverService.removeAllFromCart().subscribe(d => {
      this.actualCart.map((item: any) => {
        this.serverService.addToCart(item.id, item.quantity).subscribe(d => {
          this.getContentOfCart();
        });
      })
    });
  }

  removeAllFromCart() {
    this.serverService.removeAllFromCart().subscribe();
  }


  changeQuantity(operator: string, id: string) {
    this.actualCart.map((item: any) => {

      if (item.id == id) {
        switch (operator) {
          case '+':
            item.quantity = item.quantity + 1;
            break;
          case '-':
            item.quantity = item.quantity - 1;
            break;
        }
      }
    })

    this.serverService.removeAllFromCart().subscribe(d => {
      this.actualCart.map((item: any) => {
        this.serverService.addToCart(item.id, item.quantity).subscribe(d => {
          this.getContentOfCart();
        });
      })
    });
  }
}


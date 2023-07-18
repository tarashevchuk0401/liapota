import { Component, OnInit } from '@angular/core';
import { ServerService } from '../services/server.service';
import { map } from 'rxjs';
import { Discount } from '../shared/Discount';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss']
})
export class DiscountComponent implements OnInit {

  allDiscounts: Discount[] = [];

  constructor(private serverService: ServerService) { }

  ngOnInit(): void {
    this.getAllDiscounts()
  }

  getAllDiscounts() {
    this.serverService.getAllDiscounts().pipe(
      map(response => {
        let post = [];
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            post.push({ ...response[key], id: key });
          }
        }
        return post
      })).subscribe(d => {
        this.allDiscounts = d;
      })
  }


}

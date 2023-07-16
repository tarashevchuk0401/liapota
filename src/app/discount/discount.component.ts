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
    this.serverService.getAllDiscounts().subscribe(d => {
      this.allDiscounts = d;
    })
  }


}

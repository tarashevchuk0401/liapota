import { Component, OnInit } from '@angular/core';
import { ServerService } from '../services/server.service';
import { map, takeUntil } from 'rxjs';
import { Discount } from '../shared/Discount';
import { SubjectService } from '../services/subject.service';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss']
})
export class DiscountComponent extends SubjectService implements OnInit {

  allDiscounts: Discount[] = [];

  constructor(private serverService: ServerService) {
    super();
  }

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
      }),
      takeUntil(this.unsubscribe$)
    ).subscribe(d => {
      this.allDiscounts = d;
    })
  }


}

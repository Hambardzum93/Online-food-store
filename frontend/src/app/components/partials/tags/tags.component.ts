import { Component, OnInit } from '@angular/core';

import { Tag } from "../../../shared/models/Tag";
import { FoodService } from "../../../services/food.service";

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {

  tags?: Tag[];

  constructor(private foodService: FoodService) {
    this.getRoute();
  }

  ngOnInit(): void {
  }

  private getRoute(): void {
    this.foodService.getAllTags().subscribe(serverTag => {
      this.tags = serverTag;
    })
  }

}

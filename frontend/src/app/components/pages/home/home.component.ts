import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { Observable } from "rxjs";

import { Food } from "../../../shared/models/Food";
import { FoodService } from "../../../services/food.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  foods: Food[] = [];

  constructor(
    private foodService: FoodService,
    private route: ActivatedRoute
  ) {
    this.foodsRendering();
  }

  ngOnInit(): void {
  }

  private foodsRendering(): void {
    this.route.params.subscribe((params) => {
      this.getRoute(params)
    });
  }

  private getRoute(p: Params): void {
    let foodsObservable: Observable<Food[]>;
    if (p.searchTerm) {
      foodsObservable = this.foodService.getAllFoodsBySearchTerm(p.searchTerm);
    } else if (p.tag) {
      foodsObservable = this.foodService.getAllFoodsByTag(p.tag);
    } else {
      foodsObservable = this.foodService.getAll();
    }

    foodsObservable.subscribe((serverFoods) => {
      this.foods = serverFoods;
    })
  }

}

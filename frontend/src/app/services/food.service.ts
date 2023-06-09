import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { Food } from "../shared/models/Food";
import { Tag } from "../shared/models/Tag";
import {
  FOODS_BY_ID_URL,
  FOODS_BY_SEARCH_URL,
  FOODS_BY_TAG_URL,
  FOODS_TAGS_URL,
  FOODS_URL
} from "../shared/constants/urls";

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(
    private http: HttpClient
  ) {
  }

  public getAll(): Observable<Food[]> {
    return this.http.get<Food[]>(FOODS_URL);
  }

  public getAllFoodsBySearchTerm(searchTerm: string) {
    return this.http.get<Food[]>(FOODS_BY_SEARCH_URL + searchTerm);
  }

  public getAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(FOODS_TAGS_URL);
  }

  public getAllFoodsByTag(tag: string): Observable<Food[]> {
    return tag == "All" ?
      this.getAll() :
      this.http.get<Food[]>(FOODS_BY_TAG_URL + tag);
  }

  public getFoodById(foodId: string): Observable< Food >{
    return this.http.get<Food>(FOODS_BY_ID_URL + foodId);
  }

}

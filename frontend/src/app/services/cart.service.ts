import { Injectable } from '@angular/core';
import { Cart } from "../shared/models/Cart";
import { BehaviorSubject, Observable } from "rxjs";

import { Food } from "../shared/models/Food";
import { CartItem } from "../shared/models/CartItem";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: Cart = this.getCartFromLocalStorage();
  private castSubject: BehaviorSubject<Cart> = new BehaviorSubject<Cart>(this.cart);

  constructor() {
  }

  public addToCart(food: Food): void {
    let cartItem = this.cart.items
      .find(item => item.food.id === food.id);
    if (cartItem) {
      return;
    } else {
      this.cart.items.push(new CartItem(food));
      this.setCartToLocalStorage();
    }
  }

  public removeFromCart(foodId: string): void {
    this.cart.items = this.cart.items
      .filter(item => item.food.id != foodId);
    this.setCartToLocalStorage();
  }

  public changeQuantity(foodId: string, quantity: number) {
    let carItem = this.cart.items
      .find(item => item.food.id === foodId);
    if (!carItem) {
      return;
    } else {
      carItem.quantity = quantity;
      carItem.price = quantity * carItem.food.price;
      this.setCartToLocalStorage();
    }
  }

  public clearCart() {
    this.cart = new Cart();
    this.setCartToLocalStorage();
  }

  public getCartObservable(): Observable<Cart> {
    return this.castSubject.asObservable();
  }

  private setCartToLocalStorage(): void {

    this.cart.totalPrice = this.cart.items
      .reduce((prevSum, curentItem) => prevSum + curentItem.price, 0);

    this.cart.totalCount = this.cart.items
      .reduce((prevSum, curentItem) => prevSum + curentItem.quantity, 0);

    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson);

    this.castSubject.next(this.cart);
  }

  private getCartFromLocalStorage(): Cart {
    const castJson = localStorage.getItem('Cart');
    return castJson ? JSON.parse(castJson) : new Cart();
  }


}

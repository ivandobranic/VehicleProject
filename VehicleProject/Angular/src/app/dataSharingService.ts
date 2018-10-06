import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ShoppingCartService } from './shoppingCart/shopping-cart-service';

@Injectable()
export class DataSharingService {
    cartNumbers: number;
  constructor(private shoppingCartService: ShoppingCartService){this.shoppingCartService.GetItemsFromCart().subscribe((cartData : any) => {
    this.cartNumbers = cartData.cartList.length;})}
    public cartNumber: BehaviorSubject<number> = new BehaviorSubject<number>(this.cartNumbers);
    
  }
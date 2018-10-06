import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from './shopping-cart-service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { DataSharingService } from '../dataSharingService';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  shoppingCartList: any[];
  shoppingCartTotalPrice: number;
  errorMessage: string;

  constructor(private shoppingCartService: ShoppingCartService, private router: Router, private dataSharingService: DataSharingService) { }

  ngOnInit() {
    this.shoppingCartService.GetItemsFromCart().subscribe(cartData => {
      this.shoppingCartList = cartData.cartList;
      this.shoppingCartTotalPrice = cartData.result;
    })
  }

  PlaceOrder = (firstName, lastName, Email, Adress, cardType, cardNumber) => {
    const fullOrder = {
      itemsOrdered: this.shoppingCartList,
      totalPrice: this.shoppingCartTotalPrice,
      userName: localStorage.getItem("userName"),
      firstName: firstName,
      lastName: lastName,
      Email: Email,
      adress: Adress,
      cardType: cardType,
      cardNumber: cardNumber
    }
    this.shoppingCartService.PlaceOrder(fullOrder).subscribe(() => this.router.navigate(["SuccessfulOrder"]),
    ((error: HttpErrorResponse) => this.errorMessage = error.error));
   
   
  }


}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCartService } from './shoppingCart/shopping-cart-service';
import { DataSharingService } from './dataSharingService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'app';
  user : string;
  cartNumber: number;
  cartNumbers: number;
 
  constructor(private router: Router, private shoppingCartService : ShoppingCartService, private dataSharingService: DataSharingService) {

    this.user = localStorage.getItem("userName");
    this.shoppingCartService.GetItemsFromCart().subscribe((cartData : any) => this.cartNumber = cartData.cartList.length);
  
      
  }
  Logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    this.user = "";
    this.router.navigateByUrl("/Login");

  }
}

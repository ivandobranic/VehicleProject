import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from './shopping-cart-service';
import { DataSharingService } from '../dataSharingService';
import { VehiclesForSaleService } from '../vehiclesForSale/vehicles-for-sale-service.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {
  shoppingCartList: any[];
  shoppingCartTotalPrice: number;
  cartItem: any;

  constructor(private shoppingCartService: ShoppingCartService, private vehiclesForSaleService : VehiclesForSaleService,
     private dataSharingService: DataSharingService, private router: Router) { }

  ngOnInit() {
  this.shoppingCartService.GetItemsFromCart().subscribe(cartData => {
    this.shoppingCartList = cartData.cartList;
    this.shoppingCartTotalPrice = cartData.result;
  })
}

  RemoveFromCart = (id, vehiclesForSaleId) => {
    
    this.vehiclesForSaleService.getVehiclesForSaleById(vehiclesForSaleId).subscribe((cartData: any) => {
    this.cartItem = cartData;
    const newItemInStock = {
      Id: this.cartItem.stockId,
      VehiclesForSaleId: this.cartItem.id,
      ItemsInStock: this.cartItem.itemsInStock + 1
     }
     
    this.vehiclesForSaleService.updateItemsInStock(newItemInStock);
    this.dataSharingService.cartNumber.next(this.shoppingCartList.length - 1);
    this.shoppingCartService.RemoveItemFromCart(id).subscribe(() => this.router.navigate(["/ShoppingCart"]));
    
    
  });

  }

  ProceedToCheckOut = () =>{
    this.router.navigate(["/CheckOut"]);
  }
  
}

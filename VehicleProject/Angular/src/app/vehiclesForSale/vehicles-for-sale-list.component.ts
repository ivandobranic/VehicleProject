import { Component, OnInit } from '@angular/core';
import { VehiclesForSale } from '../models/vehiclesForSale';
import { VehiclesForSaleService } from './vehicles-for-sale-service.component';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { VehiclesForSaleModel } from '../models/vehiclesForSaleModel';
import { ShoppingCartService } from '../shoppingCart/shopping-cart-service';
import { DataSharingService } from '../dataSharingService';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-vehicles-for-sale-list',
  templateUrl: './vehicles-for-sale-list.component.html',
  styleUrls: ['./vehicles-for-sale-list.component.css']
})
export class VehiclesForSaleListComponent implements OnInit {

  vehiclesForSaleList: VehiclesForSaleModel[];
  pageNumber: number = 1;
  pageSize: number;
  totalCount: number;
  isAscending: boolean = false;
  search: string = "";
  user: string;
  cartItem: any;
  id: number;
  newData: any;
  quantity: number = 2;
  cartNumber: number;
  cartNumberArray: any[] = [
    { id: 1, value: 1 },
    { id: 2, value: 2 },
    { id: 5, value: 5 },
    { id: 10, value: 10 },
    { id: 15, value: 15 },
    { id: 20, value: 20 }];
  errorMessage: string;




  constructor(private vehiclesForSaleService: VehiclesForSaleService, private shoppingCartService: ShoppingCartService, private router: Router,
    private sanitizer: DomSanitizer, private route: ActivatedRoute, private dataSharingService: DataSharingService) { }

  ngOnInit() {
    this.user = localStorage.getItem("userName");
    this.getPage(1);
    this.shoppingCartService.GetItemsFromCart().subscribe((cartData: any) => {
      this.cartNumber = cartData.cartList.length;
    })

  }

  getDecodedImage = (img: any) => {
    var imageToShow = 'data:image/png;base64,' + img;
    return this.sanitizer.bypassSecurityTrustUrl(imageToShow)
  }

  getPage = (pageNumber: number) => {

    this.vehiclesForSaleService.getVehiclesForSale(pageNumber, this.search, this.isAscending).
      subscribe((vehiclesForSaleData: VehiclesForSale) => {
        this.vehiclesForSaleList = vehiclesForSaleData.model;
        this.pageNumber = vehiclesForSaleData.pageNumber;
        this.pageSize = vehiclesForSaleData.pageSize;
        this.totalCount = vehiclesForSaleData.totalCount;
        this.isAscending = vehiclesForSaleData.isAscending;
      });

  }

  isAdmin = () => {
    if(localStorage.getItem("userName") === "Admin")
    {
      return true;
    }
    return false;
  }

  searchMake = (search: string) => {

    this.vehiclesForSaleService.getVehiclesForSale(this.getPage(this.pageNumber = 1), search, this.isAscending);

  }

  sortMake = () => {
    this.isAscending = !this.isAscending;
    this.vehiclesForSaleService.getVehiclesForSale(this.getPage(this.pageNumber), this.search, this.isAscending);
  }

  AddToCart = (id, selectList) => {
    this.vehiclesForSaleService.getVehiclesForSaleById(id).subscribe((cartData: any) => {
      this.cartItem = cartData;
      this.cartItem.vehiclePicture = ""
      this.cartItem.quantity = selectList;
      this.cartItem.userName = this.user;
      this.cartItem.VehiclesForSaleId = id;
     


      const newItemInStock = {
        Id: this.cartItem.stockId,
        VehiclesForSaleId: this.cartItem.id,
        ItemsInStock: this.cartItem.itemsInStock - selectList
      }

      var i;
      for (i = 0; i < selectList; i++) {
        this.shoppingCartService.AddItemToCart(this.cartItem).subscribe(() => {
          this.router.navigate(["/ShoppingCart"]);
        },(error: HttpErrorResponse) => {this.errorMessage = error.error, this.dataSharingService.cartNumber.next(0)});
       
      }
    
      this.vehiclesForSaleService.updateItemsInStock(newItemInStock);
     

      if (this.cartNumber === 0) {
        this.dataSharingService.cartNumber.next(selectList);
      }
      else {
        var result = +this.cartNumber + +selectList;
        this.dataSharingService.cartNumber.next(result);
      }

    });
    
  }

}

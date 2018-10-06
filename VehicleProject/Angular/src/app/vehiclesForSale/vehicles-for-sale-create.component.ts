import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { VehiclesForSaleService } from './vehicles-for-sale-service.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-vehiclesForSaleCreate',
  templateUrl: './vehicles-for-sale-create.component.html'
})
export class VehiclesForSaleCreateComponent implements OnInit {
  fileToUpload: File = null;
  vehicleFile : any;
  preview: any;
  constructor(private vehiclesForSaleService: VehiclesForSaleService, private router : Router) { }
  
  ngOnInit() { 
  }
  handleFileInput(event:any) {
   this.fileToUpload = event.target.files[0];
   if (event.target.files && event.target.files[0]) {
    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.preview = event.target.result;
    }

    reader.readAsDataURL(event.target.files[0]);
  }
}
  CreateVehiclesForSale = (vehicleMake, vehicleModel, price, itemsInStock, itemsInStockId) => {
     var formData = new FormData();
     formData.append("vehicleMake", vehicleMake);
     formData.append("vehicleModel", vehicleModel);
     formData.append("price", price);
     formData.append("itemsInStockId", itemsInStockId);
     formData.append("itemsInStock", itemsInStock);
     formData.append(this.fileToUpload.name, this.fileToUpload);
     this.vehiclesForSaleService.createVehiclesForSale(formData).subscribe((data) => this.router.navigate(["/VehiclesForSaleList"]));
     
  }
 
}

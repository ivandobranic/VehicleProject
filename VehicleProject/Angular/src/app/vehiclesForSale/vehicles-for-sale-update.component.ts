import { Component, OnInit } from '@angular/core';
import { VehiclesForSaleService } from './vehicles-for-sale-service.component';
import { ActivatedRoute, Router } from '@angular/router';
import { VehiclesForSaleModel } from '../models/vehiclesForSaleModel';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-update',
  templateUrl: './vehicles-for-sale-update.component.html',
  styleUrls: ['./update.component.css']
})
export class VehiclesForSaleUpdateComponent implements OnInit {
  vehicle: VehiclesForSaleModel;
  id: number;
  user: string;
  fileToUpload: File = null;
  vehicleFile: any;
  preview: any;
  constructor(private vehiclesForSaleService: VehiclesForSaleService, private route: ActivatedRoute, private router : Router, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => { this.id = +params.get("id") });
    this.vehiclesForSaleService.getVehiclesForSaleById(this.id).subscribe((vehicleData: VehiclesForSaleModel) => { 
    this.vehicle = vehicleData;
    var image = 'data:image/png;base64,' + vehicleData.vehiclePicture;
    this.preview = this.sanitizer.bypassSecurityTrustUrl(image);
  });
    this.user = localStorage.getItem("userName");
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
    
  Update = (id, vehicleMake, vehicleModel, price, itemsInStock) => {
    var formData = new FormData();
    formData.append("id", id);
    formData.append("vehicleMake", vehicleMake);
    formData.append("vehicleModel", vehicleModel);
    formData.append("price", price);
    formData.append("itemsInStock", itemsInStock);
    formData.append("itemsInStockId", id)
    formData.append(this.fileToUpload.name, this.fileToUpload);
    console.log(this.fileToUpload);
    this.vehiclesForSaleService.updateVehiclesForSale(formData);
  }

}

import { Component, OnInit } from '@angular/core';
import { VehiclesForSaleModel } from '../models/vehiclesForSaleModel';
import { VehiclesForSaleService } from './vehicles-for-sale-service.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-delete',
  templateUrl: './vehicles-for-sale-delete.component.html',
  styleUrls: ['./vehicles-for-sale-delete.component.css']
})
export class VehiclesForSaleDeleteComponent implements OnInit {
  vehicle: VehiclesForSaleModel;
  id: number;
  user: string;
  fileToUpload: File = null;
  vehicleFile: any;
  preview: any = null;
  constructor(private vehiclesForSaleService: VehiclesForSaleService, private route: ActivatedRoute, private router : Router, 
    private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => { this.id = +params.get("id") });
    this.vehiclesForSaleService.getVehiclesForSaleById(this.id).subscribe((vehicleData: VehiclesForSaleModel) => { 
    this.vehicle = vehicleData;
    var image = 'data:image/png;base64,' + vehicleData.vehiclePicture;
    this.preview = this.sanitizer.bypassSecurityTrustUrl(image);
  });
    this.user = localStorage.getItem("userName");
  }

  Delete = () => {
    
    this.vehiclesForSaleService.deleteVehiclesForSale(this.id);
  }

}

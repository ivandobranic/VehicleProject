import { Component, OnInit } from '@angular/core';
import { VehicleMakeService } from './vehicle-make.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { VehicleMakeModel } from '../models/vehicleModel';

@Component({
  selector: 'app-update-make',
  templateUrl: './update-make.component.html',
})
export class UpdateComponent implements OnInit {
  vehicle : VehicleMakeModel;
  id : number;
  user : string;
  constructor(private vehicleMakeService : VehicleMakeService, private route : ActivatedRoute) { }
  
  ngOnInit() {
     this.route.paramMap.subscribe(params => {this.id = +params.get("id")});
     this.vehicleMakeService.getVehicleMakeById(this.id).subscribe((vehicleData) => this.vehicle = vehicleData);
     this.user = localStorage.getItem("userName");
  }

  
  Update = (formData: NgForm) => {
    
    this.vehicleMakeService.updateVehicleMake(formData.value);
 }

}

import { Component, OnInit } from '@angular/core';
import { VehicleMakeService } from './vehicle-make.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { VehicleMakeModel } from '../models/vehicleModel';
import { Observable} from 'rxjs';
@Component({
  selector: 'app-delete-make',
  templateUrl: './delete-make.component.html',
})
export class DeleteMakeComponent implements OnInit {
  vehicle : VehicleMakeModel;
  id : number;
  private sub: any;
  user: string;

  constructor(private vehicleMakeService : VehicleMakeService, private route : ActivatedRoute) { 
    
  }
  
  ngOnInit() {
    this.route.paramMap.subscribe(params => {this.id = +params.get("id")});
    this.vehicleMakeService.getVehicleMakeById(this.id).subscribe((vehicleData) => this.vehicle = vehicleData);
    this.user = localStorage.getItem("userName");
  }

  Delete = () => {
    
    this.vehicleMakeService.deleteVehicleMake(this.vehicle.id);
 }

}

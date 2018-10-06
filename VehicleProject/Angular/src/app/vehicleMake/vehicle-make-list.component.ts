import { Component, OnInit } from '@angular/core';
import {VehicleMake} from '../models/vehiclemake.model'
import {VehicleMakeService} from './vehicle-make.service'
import { VehicleMakeModel } from '../models/vehicleModel';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({

  templateUrl: './vehicle-make-list.component.html'

})
export class VehicleMakeListComponent implements OnInit {

 
 vehicleMakeList : VehicleMake[];
 pageNumber : number = 1;
 pageSize : number;
 totalCount : number;
 isAscending : boolean = false;
 search: string = "";
 user : string;

  constructor(private vehicleMakeService: VehicleMakeService, private router: Router) { }

  ngOnInit() {
    this.user = localStorage.getItem("userName");
    this.getPage(1);
  }

  getPage = (pageNumber : number) =>{
   
    this.vehicleMakeService.getVehicleMake(pageNumber, this.search, this.isAscending).
    subscribe((vehicleMakeData : VehicleMake) => {
    this.vehicleMakeList = vehicleMakeData.model;
    this.pageNumber = vehicleMakeData.pageNumber;
    this.pageSize = vehicleMakeData.pageSize;
    this.totalCount = vehicleMakeData.totalCount;
    this.isAscending = vehicleMakeData.isAscending;
  });
  
  }
 
  searchMake = (search: string) => {

    this.vehicleMakeService.getVehicleMake(this.getPage(this.pageNumber = 1), search, this.isAscending);
    
  }

  sortMake = () => {
   this.isAscending = !this.isAscending;
   this.vehicleMakeService.getVehicleMake(this.getPage(this.pageNumber), this.search, this.isAscending);
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import {VehicleMakeService} from './vehicle-make.service'
import { NgForm, FormBuilder, Validators } from '@angular/forms';
import { VehicleMake } from '../models/vehiclemake.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
})
export class CreateComponent implements OnInit {
  createdBy: string;
  @ViewChild("VehicleMakeForm") createMakeForm : NgForm;
  constructor(private vehicleMakeService: VehicleMakeService, private router : Router) { }
  
  ngOnInit() { 
   this.createdBy = localStorage.getItem("userName");
  }

  Create = (formData: NgForm) => {
     const newData = Object.assign({}, formData.value)
     this.vehicleMakeService.createVehicleMake(newData).subscribe((data) => this.router.navigate(["/VehicleMakeList"]));
     formData.reset();
  }
}

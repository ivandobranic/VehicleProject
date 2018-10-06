import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { NgForm } from '@angular/forms';
import { UserDetails } from '../../models/userDetails.model';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: '../register/register.component.html',

})
export class RegisterComponent implements OnInit {
 model: UserDetails;
 errorMessage : string;
 constructor(private authenticationService : AuthenticationService, private router : Router) { }

  ngOnInit() {
  }

  Register = (formData: NgForm) => {
    this.authenticationService.Register(formData.value).subscribe((data : any) => {
      this.router.navigate(["/VehicleMakeList"]);
    }, (error: HttpErrorResponse) => this.errorMessage = error.error);
   
  }

}

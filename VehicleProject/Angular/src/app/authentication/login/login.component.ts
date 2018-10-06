import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import {map} from 'rxjs/operators';
import { DataSharingService } from '../../dataSharingService';

@Component({
  selector: 'app-login',
  templateUrl: '../login/login.component.html',
  styleUrls: ['../login/login.component.css']
})
export class LoginComponent implements OnInit {
   constructor(private authenticationService: AuthenticationService, private router: Router) { }
   
  ngOnInit() {
  }

  Login = (formData: NgForm) => {
    this.authenticationService.Login(formData.value).subscribe((data : any) => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("userName", data.username);
      window.location.reload();
      this.router.navigate(["/VehicleMakeList"]);
    
    },(error => this.router.navigate(["/Register"])));
  }

}

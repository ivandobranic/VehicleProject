import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { VehiclesForSale } from '../models/vehiclesForSale';
import { retry, catchError } from 'rxjs/operators';
import { VehiclesForSaleModel } from '../models/vehiclesForSaleModel';

@Injectable()
export class VehiclesForSaleService {
  readonly url = "http://localhost:8243/api/VehiclesForSaleAPI";
  constructor(private http: HttpClient, private router: Router) { }

  private handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
          console.error("An error occured: ", error.error.message)
      } else {
          console.error(
              "Backend returned code: " + error.status + "body was: "
              + error.error);
      }
     
      return throwError("Something bad happened, please try again later");
  }
  
  // Get
  getVehiclesForSale = (pageNumber, search, isAscending) : Observable<VehiclesForSale> => {
      const params = new HttpParams()
      .set("pageNumber", pageNumber)
      .set("search", search)
      .set("isAscending", isAscending)
      return this.http.get<VehiclesForSale>(this.url, {params})
          .pipe(retry(2),catchError(this.handleError));
  }
  // Get By Id
  getVehiclesForSaleById = (id) : Observable<VehiclesForSaleModel> => {
      return this.http.get<VehiclesForSaleModel>(this.url + "/" + id)
          .pipe(retry(2), catchError(this.handleError));
  }
  
  // Post
  createVehiclesForSale = (vehicle)  =>  {
      try {
        return this.http.post(this.url, vehicle);

      }
      catch{
          catchError(this.handleError)
      }
  }
  // Put
  updateVehiclesForSale =(vehicle) =>{
      try {
          this.http.put(this.url, vehicle).subscribe((data) => this.router.navigate(["/VehiclesForSaleList"]));

      }
      catch{
          catchError(this.handleError)
      }
  }
  // Delete
  deleteVehiclesForSale = (id) => {
      try{
      this.http.delete(this.url + "/" + id).subscribe((data) => this.router.navigate(["/VehiclesForSaleList"]));
      }catch{
          catchError(this.handleError)
      }
  }

  updateItemsInStock = (item) => {
    try{
    this.http.put(this.url + "/" +"UpdateItemsInStock", item).subscribe((data) => this.router.navigate(["/VehiclesForSaleList"]));
    }catch{
        catchError(this.handleError)
    }
}


}

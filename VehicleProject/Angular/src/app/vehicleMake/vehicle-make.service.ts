import { Injectable } from '@angular/core';
import { VehicleMake } from '../models/vehicleMake.model';
import {VehicleMakeModel} from '../models/vehicleModel';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, pipe, throwError } from 'rxjs';
import { catchError, retry, map} from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable()
export class VehicleMakeService {
    readonly url = "http://localhost:8243/api/VehicleMakeAPI";
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
    getVehicleMake = (pageNumber, search, isAscending) : Observable<VehicleMake> => {
        const params = new HttpParams()
        .set("pageNumber", pageNumber)
        .set("search", search)
        .set("isAscending", isAscending)
        return this.http.get<VehicleMake>(this.url, {params})
            .pipe(retry(2),catchError(this.handleError));
    }
    // Get By Id
    getVehicleMakeById = (id) : Observable<VehicleMakeModel> => {
        return this.http.get<VehicleMakeModel>(this.url + "/" + id)
            .pipe(retry(2), catchError(this.handleError));
    }
    
    // Post
    createVehicleMake = (vehicle)  =>  {
      
        try {
          return this.http.post(this.url, vehicle);

        }
        catch{
            catchError(this.handleError)
        }
    }
    // Put
    updateVehicleMake(vehicle) {
        try {
            this.http.put(this.url, vehicle).subscribe((data) => this.router.navigate(["/VehicleMakeList"]));

        }
        catch{
            catchError(this.handleError)
        }
    }
    // Delete
    deleteVehicleMake = (id) => {
        try{
        this.http.delete(this.url + "/" + id).subscribe((data) => this.router.navigate(["/VehicleMakeList"]));
        }catch{
            catchError(this.handleError)
        }
    }


}
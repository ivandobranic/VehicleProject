import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, pipe, throwError} from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserDetails } from '../models/userDetails.model';


@Injectable()

export class AuthenticationService {
    readonly url = "http://localhost:8243/api/AccountsAPI";
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

  
    Register = (model) => {
        
        try {
            return this.http.post<UserDetails>(this.url + "/Register", model);
            
        }

        catch{
            catchError(this.handleError)
        }    
    }

    
    Login = (model) => {
        try {
            return this.http.post<any>(this.url + "/Login", model);
            
        }

        catch{
            this
            catchError(this.handleError)
        }
    }
}
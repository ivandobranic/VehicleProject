import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { Router } from "@angular/router";
import { throwError, Observable } from "rxjs";
import { retry, catchError } from "rxjs/operators";


@Injectable()
export class ShoppingCartService {
    readonly url = "http://localhost:8243/api/ShoppingCartAPI";
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

    GetItemsFromCart = () : Observable<any> => {
        const params = new HttpParams()
        .set("userName", localStorage.getItem("userName"))
      return this.http.get<any>(this.url, {params}).pipe(retry(2),catchError(this.handleError));
    }

    AddItemToCart = (item) => {
        try {
            const headers = new HttpHeaders();
            headers.append("Content-Type", "application/json")
            return this.http.post(this.url, item, {headers});
  
          }
          catch{
              catchError(this.handleError)
          }
    }

    RemoveItemFromCart = (id) => {
        try{
        return this.http.delete(this.url + "/" + id);
        }
        catch{
            catchError(this.handleError)
        }
    }

    PlaceOrder = (order) => {
        try {
            const headers = new HttpHeaders();
            headers.append("Content-Type", "application/json")
            return this.http.post(this.url + "/PlaceOrder", order, {headers});
  
          }
          catch{
              catchError(this.handleError)
          }
    }

}
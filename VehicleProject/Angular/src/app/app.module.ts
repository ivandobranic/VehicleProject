import { BrowserModule } from '@angular/platform-browser';
import { NgModule, forwardRef } from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS, HttpErrorResponse} from '@angular/common/http';
import {VehicleMakeService} from './vehicleMake/vehicle-make.service';
import { AppComponent } from './app.component';
import {RouterModule, Routes} from '@angular/router';
import { VehicleMakeListComponent } from './vehicleMake/vehicle-make-list.component';
import { CreateComponent } from './vehicleMake/create.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UpdateComponent } from './vehicleMake/update-make.component';
import { DeleteMakeComponent } from './vehicleMake/delete-make.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {CreateMakeCanDeactivateGuard} from './vehicleMake/create-make-can-deactivate-guard'
import { appRoutes } from './routes';
import { RegisterComponent } from './authentication/register/register.component';
import { AuthenticationService } from './authentication/authentication.service';
import { LoginComponent } from './authentication/login/login.component';
import { TokenInterceptor } from './authentication/token.interceptor';
import { AuthenticationCanActivateGuard } from './authentication/auth-can-activate.guard';
import { VehiclesForSaleDeleteComponent } from './vehiclesForSale/vehicles-for-sale-delete.component';
import { VehiclesForSaleService } from './vehiclesForSale/vehicles-for-sale-service.component';
import { VehiclesForSaleListComponent } from './vehiclesForSale/vehicles-for-sale-list.component';
import { VehiclesForSaleCreateComponent } from './vehiclesForSale/vehicles-for-sale-create.component';
import { VehiclesForSaleUpdateComponent } from './vehiclesForSale/vehicles-for-sale-update.component';
import { ShoppingCartService } from './shoppingCart/shopping-cart-service';
import { CartListComponent } from './shoppingCart/cart-list.component';
import { DataSharingService } from './dataSharingService';
import { CheckoutComponent } from './shoppingCart/checkout.component';
import { SuccessfulOrderComponent } from './shoppingCart/successful-order.component';





@NgModule({
  declarations: [
    AppComponent,
    VehicleMakeListComponent,
    CreateComponent,
    UpdateComponent,
    DeleteMakeComponent,
    RegisterComponent,
    LoginComponent,
    VehiclesForSaleListComponent,
    VehiclesForSaleDeleteComponent,
    VehiclesForSaleCreateComponent,
    VehiclesForSaleUpdateComponent,
    CartListComponent,
    CheckoutComponent,
    SuccessfulOrderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes, {onSameUrlNavigation:"reload"}),
    NgxPaginationModule
  ],
  providers: [VehicleMakeService, CreateMakeCanDeactivateGuard, AuthenticationCanActivateGuard, AuthenticationService, VehiclesForSaleService,
    ShoppingCartService, DataSharingService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

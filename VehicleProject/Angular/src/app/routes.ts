import { CreateComponent } from "./vehicleMake/create.component";
import { CreateMakeCanDeactivateGuard } from "./vehicleMake/create-make-can-deactivate-guard";
import { DeleteMakeComponent } from "./vehicleMake/delete-make.component";
import { Routes } from "@angular/router";
import { UpdateComponent } from "./vehicleMake/update-make.component";
import { VehicleMakeListComponent } from "./vehicleMake/vehicle-make-list.component";
import {RegisterComponent} from "./authentication/register/register.component"
import { LoginComponent } from "./authentication/login/login.component";
import { AuthenticationCanActivateGuard } from "./authentication/auth-can-activate.guard";
import { VehiclesForSaleCreateComponent } from "./vehiclesForSale/vehicles-for-sale-create.component";
import { VehiclesForSaleListComponent } from "./vehiclesForSale/vehicles-for-sale-list.component";
import { VehiclesForSaleUpdateComponent } from "./vehiclesForSale/vehicles-for-sale-update.component";
import { VehiclesForSaleDeleteComponent } from "./vehiclesForSale/vehicles-for-sale-delete.component";
import { CartListComponent } from "./shoppingCart/cart-list.component";
import { CheckoutComponent } from "./shoppingCart/checkout.component";
import { SuccessfulOrderComponent } from "./shoppingCart/successful-order.component";

   export const appRoutes: Routes = [
    {path:"VehicleMakeList", component: VehicleMakeListComponent, canActivate: [AuthenticationCanActivateGuard]},
    {path: "VehiclesForSaleList/Create", component: VehiclesForSaleCreateComponent},
    {path: "VehiclesForSaleList", component: VehiclesForSaleListComponent},
    {path: "VehiclesForSaleList/Edit/:id", component: VehiclesForSaleUpdateComponent},
    {path: "VehiclesForSaleList/Delete/:id", component: VehiclesForSaleDeleteComponent},
    {path:"VehicleMakeList/Create", component: CreateComponent, canDeactivate:[CreateMakeCanDeactivateGuard], 
    canActivate: [AuthenticationCanActivateGuard]},
    {path: "VehicleMakeList/Edit/:id", component: UpdateComponent, canActivate: [AuthenticationCanActivateGuard]},
    {path: "VehicleMakeList/Delete/:id", component: DeleteMakeComponent, canActivate: [AuthenticationCanActivateGuard]},
    {path: "", redirectTo: "/VehicleMakeList", pathMatch: "full", canActivate: [AuthenticationCanActivateGuard] },
    {path: "Register", component: RegisterComponent},
    {path: "Login", component: LoginComponent},
    {path: "ShoppingCart", component: CartListComponent},
    {path: "CheckOut", component: CheckoutComponent},
    {path: "SuccessfulOrder", component: SuccessfulOrderComponent}
  ]


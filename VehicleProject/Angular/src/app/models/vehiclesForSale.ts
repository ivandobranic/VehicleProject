import { VehiclesForSaleModel } from "./vehiclesForSaleModel";

export class VehiclesForSale{
    model: VehiclesForSaleModel[];
    pageNumber: number;
    pageSize: number;
    totalCount: number;
    isAscending: boolean
}
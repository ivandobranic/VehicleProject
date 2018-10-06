import { configure, observable, runInAction, decorate } from 'mobx';



configure({ enforceActions: true });
const webApiUrl = "http://localhost:8243/api/VehiclesForSaleAPI";
const shoppingCartUrl = "http://localhost:8243/api/ShoppingCartAPI";
class VehiclesForSaleStore{

    vehiclesForSaleData = {
        model: [],
        pageNumber: 1,
        pageSize: 0,
        totalCount: 0,
        isAscending: false
    };
    search = "";
    pageRedirect = false;
    status = "";
    token = localStorage.getItem("token");

    loadDataAsync = async () => {
        try {
            var params = {
                pageNumber: this.vehiclesForSaleData.pageNumber,
                search: this.search,
                isAscending: this.vehiclesForSaleData.isAscending
            };
          
            const urlParams = new URLSearchParams(Object.entries(params));
            const headers = new Headers();
            headers.append("Authorization","Bearer " + this.token);
            const options = {
                method: "GET",
                headers
            }
            const request = new Request(webApiUrl + "?" + urlParams, options);
            const response = await fetch(request);
            const data = await response.json();

            runInAction(() => {
                this.vehiclesForSaleData = data;
            });
        } catch (error) {
            runInAction(() => {
                this.status = "error";
            });
        }
    };

    vehicleForSaleEntity = {};

    GetByIdAsync = async (id) => {
        try {
            const headers = new Headers();
            headers.append("Authorization","Bearer " + this.token);
            const options = {
                method: "GET",
                headers
            }
            const request = new Request(webApiUrl + "/" + id, options);
            const response = await fetch(request)
            const data = await response.json();

            runInAction(() => {
                this.vehicleForSaleEntity = data;
            });
        } catch (error) {
            runInAction(() => {
                this.status = "error";
            });
        }
    };

    CreateVehiclesForSale = async (vehicle) => {
        try {

            const headers = new Headers();
            headers.append("Authorization","Bearer " + this.token);
            const options = {
                method: "POST",
                headers,
                body: vehicle
            }
            const request = new Request(webApiUrl, options);
            const response = await fetch(request);
            const status = await response.status;
            if (status === 200) {
                runInAction(() => {
                    this.pageRedirect = true;
                })
            } else {
                runInAction(() => {
                    this.status = "error";
                });
            }
        } catch (error) {
            runInAction(() => {
                this.status = "error";
            });
        }

    };

    UpdateVehiclesForSale = async (vehicle) => {
        try {
            const headers = new Headers();
            headers.append("Authorization","Bearer " + this.token);
            const options = {
                method: "PUT",
                headers,
                body: vehicle
            }
            const request = new Request(webApiUrl, options);
            const response = await fetch(request);
            const status = await response.status;

            if (status === 200) {
                runInAction(() => {
                    this.pageRedirect = true;
                })
            } else {
                runInAction(() => {
                    this.status = "error";
                });
            }
        } catch (error) {
            runInAction(() => {
                this.status = "error";
            });
        }
    };

    UpdateItemsInStock = async (item) => {
        try {
            const headers = new Headers();
            // headers.append("Authorization","Bearer " + this.token);
            headers.append("Content-Type", "application/json")
            const options = {
                method: "PUT",
                headers,
                body: JSON.stringify(item)
            }
            const request = new Request(webApiUrl + "/UpdateItemsInStock", options);
            const response = await fetch(request);
            const status = await response.status;

            if (status === 200) {
                runInAction(() => {
                    this.pageRedirect = true;
                })
            } else {
                runInAction(() => {
                    this.status = "error";
                });
            }
        } catch (error) {
            runInAction(() => {
                this.status = "error";
            });
        }
    };

    AddItemToCart = async (itemInStock) => {
        try {
          
            const headers = new Headers();
            headers.append("Authorization", "Bearer " + this.token);
            headers.append("Content-Type", "application/json");
            const options = {
                method: "POST",
                headers,
                body: JSON.stringify(itemInStock)
            }
            console.log(itemInStock)
            const request = new Request(shoppingCartUrl, options);
            const response = await fetch(request);
            const text = await response.text();
            const status = await response.status;
            if (status === 200) {
                runInAction(() => {
                    this.pageRedirect = true;
                })
            } else {
            
               runInAction(() => {
                    this.status = JSON.parse(text.toString());
                });
            }

        } catch (error) {
            runInAction(() => {
                this.status = "error";
            });
        }

    };


}


decorate(VehiclesForSaleStore, {
    vehiclesForSaleData: observable,
    vehicleForSaleEntity: observable,
    pageRedirect: observable,
    status: observable,
    token: observable,
    search: observable
   
});


export default new VehiclesForSaleStore();


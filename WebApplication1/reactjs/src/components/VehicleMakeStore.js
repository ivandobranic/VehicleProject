
import { configure, observable, runInAction, decorate } from 'mobx';



configure({ enforceActions: true });
const webApiUrl = "http://localhost:8243/api/VehicleMakeAPI";
class VehicleMakeStore {

    // Get
    vehicleMakeData = {
        model: [],
        pageNumber: 1,
        pageSize: 0,
        totalCount: 0,
        isAscending: false
    };
    pageRedirect = false;
    status = "initial";
    search = "";
    token = localStorage.getItem("token");

    loadDataAsync = async () => {
        try {
            var params = {
                pageNumber: this.vehicleMakeData.pageNumber,
                search: this.search,
                isAscending: this.vehicleMakeData.isAscending
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
                this.vehicleMakeData = data;
            });
        } catch (error) {
            runInAction(() => {
                this.status = "error";
            });
        }
    };

    // GetById
    vehicleMakeEntity = {};

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
                this.vehicleMakeEntity = data;
            });
        } catch (error) {
            runInAction(() => {
                this.status = "error";
            });
        }
    };


    // Post
    CreateVehicleMake = async (vehicle) => {
        try {

            const headers = new Headers();
            headers.append("Authorization","Bearer " + this.token);
            headers.append("Content-Type", "application/json");
            const options = {
                method: "POST",
                headers,
                body: JSON.stringify(vehicle)
            }
            const request = new Request(webApiUrl, options);
            const response = await fetch(request);
            const status = await response.status;
            if (status === 201) {
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

    //Put
    UpdateVehicleMake = async (vehicle) => {
        try {
            const headers = new Headers();
            headers.append("Authorization","Bearer " + this.token);
            headers.append("Content-Type", "application/json");
            const options = {
                method: "PUT",
                headers,
                body: JSON.stringify(vehicle)
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
    //Delete
    DeleteVehicleMake = async (id) => {
        try {
            const headers = new Headers();
            headers.append("Authorization","Bearer " + this.token);
            headers.append("Content-Type", "application/json");
            const options = {
                method: "DELETE",
                headers
            }
            const request = new Request(webApiUrl + "/" + id, options);
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
    }


}




decorate(VehicleMakeStore, {
    vehicleMakeData: observable,
    vehicleMakeEntity: observable,
    search: observable,
    pageRedirect: observable,
    status: observable,
    token: observable
});


export default new VehicleMakeStore();
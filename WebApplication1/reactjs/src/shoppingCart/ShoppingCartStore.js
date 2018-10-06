
import { configure, observable, runInAction, decorate } from 'mobx';




configure({ enforceActions: true });
const webApiUrl = "http://localhost:8243/api/ShoppingCartAPI";
const vehiclesForSaleAPI = "http://localhost:8243/api/VehiclesForSaleAPI";
class ShoppingCartStore {

    shoppingCartData = {
        cartList: [],
        result: 0
    };
    
    token = localStorage.getItem("token");


    GetItemsFromCart = async () => {
        var params = {
            userName: localStorage.getItem("userName")
        }
        const urlParams = new URLSearchParams(Object.entries(params));
        const headers = new Headers();
        headers.append("Authorization", "Bearer " + this.token);
        const options = {
            method: "GET",
            headers
        }
        const request = new Request(webApiUrl + "?" + urlParams, options);
        const response = await fetch(request);
        const data = await response.json();
        try {
            runInAction(() => {
                this.shoppingCartData = data;
            });
        } catch (error) {
            runInAction(() => {
                this.status = "error";
            });
        }
    }

    RemoveItemFromCart = async (id) => {
        try {
            const headers = new Headers();
            headers.append("Authorization", "Bearer " + this.token);
            headers.append("Content-Type", "application/json");
            const options = {
                method: "DELETE",
                headers
            }
            const request = new Request(webApiUrl + "/" + id, options);
            const response = await fetch(request);
            const text = await response.text();
            const status = await response.status;
            if (status === 200) {
                runInAction(() => {
                    this.pageRedirect = true;
                })

            } else {
                runInAction(() => {
                    this.status = text.toString();
                });
            }
        } catch (error) {
            runInAction(() => {
                this.status = "error";
            });
        }
    }

    GetItemsInStock = async () => {

        const options = {
            method: "GET",
        }
        const request = new Request(webApiUrl + "/ItemsInStock", options);
        const response = await fetch(request);
        const data = await response.json();
        try {
            runInAction(() => {
                this.itemsInStockData = data;
            });
        } catch (error) {
            runInAction(() => {
                this.status = "error";
            });
        }
    }

    UpdateItemsInStock = async (item) => {
        try {
            const headers = new Headers();
            headers.append("Authorization", "Bearer " + this.token);
            headers.append("Content-Type", "application/json")
            const options = {
                method: "PUT",
                headers,
                body: JSON.stringify(item)
            }
            const request = new Request(vehiclesForSaleAPI + "/UpdateItemsInStock", options);
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

    PlaceOrder = async (items) => {
        try {
            const headers = new Headers();
            headers.append("Content-Type", "application/json");
            const options = {
                method: "POST",
                headers,
                body: JSON.stringify(items)
            }
            const request = new Request(webApiUrl + "/PlaceOrder", options);
            const response = await fetch(request);
            const text = await response.text();
            const status = await response.status;
            if (status === 200) {
                runInAction(() => {
                    this.pageRedirect = true;
                })
            }
            else {
                runInAction(() => {
                    this.status = JSON.parse(text.toString());
                })
            }
        } catch(error){
            runInAction(() => {
                this.status = "error"
            })
        }
    }



}

decorate(ShoppingCartStore, {
    pageRedirect: observable,
    status: observable,
    token: observable,
    shoppingCartData: observable,
    itemsInStockData: observable
});

export default new ShoppingCartStore();
import { configure, observable, runInAction, decorate } from 'mobx';
configure({ enforceActions: true });
const webApiUrl = "http://localhost:8243/api/AccountsAPI";

class AuthenticationStore{

 pageRedirect = false;
 status = "initial";


 Register = async (user) => {
    try {

        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        const options = {
            method: "POST",
            headers,
            body: JSON.stringify(user)
        }
        const request = new Request(webApiUrl +"/Register", options);
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

Login = async (user) => {
    try{
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        const options ={
            method:"POST",
            headers,
            body: JSON.stringify(user)
        }
        const request = new Request(webApiUrl+"/Login", options);
        const response = await fetch(request);
        const data = await response.json();

        runInAction(() => {
            localStorage.setItem("token", data.token);
            localStorage.setItem("userName", data.username);
            this.pageRedirect = true;
        });
    } catch (error) {
        runInAction(() => {
            this.status = "error";
        });
    }
}

}

decorate(AuthenticationStore, {
    pageRedirect: observable,
    status: observable,
    LogInData: observable

});


export default new AuthenticationStore();
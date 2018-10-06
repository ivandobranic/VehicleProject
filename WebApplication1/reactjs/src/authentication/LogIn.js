import React from 'react'
import '../styles/bootstrap.css';
import { configure, decorate, action } from 'mobx';
import { observer, inject } from 'mobx-react';
import { Redirect } from 'react-router'

configure({ enforceActions: true });
class LogIn extends React.Component{

    LogInUser = (e) =>{
        e.preventDefault();
        
        this.props.AuthenticationStore.Login({
            Username: this.refs.UserName.value,
            Password: this.refs.Password.value
        })
       
       
        this.refs.UserName.value = null;
        this.refs.Password.value = null;
        
    }

    render(){

        if (this.props.AuthenticationStore.pageRedirect === true) {
            window.location.reload();
            return <Redirect to='/VehicleMake' />

        }
        return (
            <div>
                <div>
                    <h4>Create New</h4>
                    <br />
                    <br />
                    {this.props.AuthenticationStore.status === "error" && <h3> Invalid UserName or Password</h3>}
                </div>
                <div>
                    <form onSubmit={this.LogInUser}>
                    <div className="form-group">
                        <input ref="UserName" id="username" type="text" placeholder="UserName" required maxLength="20"/>
                    </div>
                    <div className="form-group">
                        <input ref="Password" id="password" type="text" placeholder="Password" required maxLength ="15"/>
                    </div>
                        <button type="submit">Login</button>
                       
                    </form>


                </div>
            </div>
        )
    }
}

decorate(LogIn, {
    LogInUser: action
});
export default inject("AuthenticationStore")(observer(LogIn)); 
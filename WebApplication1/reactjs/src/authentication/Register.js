import React from 'react'
import '../styles/bootstrap.css';
import { configure, decorate, action } from 'mobx';
import { observer, inject } from 'mobx-react';
import { Redirect } from 'react-router'

configure({ enforceActions: true });
class Register extends React.Component{

    RegisterUser = (e) => {
        e.preventDefault();

        this.props.AuthenticationStore.Register({
            FirstName: this.refs.FirstName.value,
            LastName: this.refs.LastName.value,
            Email: this.refs.Email.value,
            Username: this.refs.UserName.value,
            Password: this.refs.Password.value
        })

        this.refs.FirstName.value = null;
        this.refs.LastName.value = null;
        this.refs.UserName.value = null;
        this.refs.Password.value = null;
        this.refs.Email.value = null;

    }
    render(){

        if (this.props.AuthenticationStore.pageRedirect === true) {
            return <Redirect to='/VehicleMake' />

        }
        return (
            <div>
                <div>
                    <h4>Create New</h4>
                    <br />
                    <br />
                    {this.props.AuthenticationStore.status === "error" && <h3> Something went wrong</h3>}
                </div>
                <div>
                    <form onSubmit={this.RegisterUser}>
                    <div className="form-group">
                        <input ref="FirstName" id="firstname" type="text" placeholder="First Name" required maxLength="20" />
                    </div>
                    <div className="form-group">
                        <input ref="LastName" id="lastname" type="text" placeholder="Last Name" required maxLength="20" />
                    </div>
                    <div className="form-group">
                    <input ref="Email" id="email" type="email" placeholder="Email" required/>
                    </div>
                    <div className="form-group">
                        <input ref="UserName" id="username" type="text" placeholder="UserName" required maxLength="20"/>
                    </div>
                    <div className="form-group">
                        <input ref="Password" id="password" type="text" placeholder="Password" required maxLength ="15"/>
                    </div>
                        <button type="submit">Save</button>
                       
                    </form>


                </div>
            </div>
        )
    }

}

decorate(Register, {
    RegisterUser: action
});
export default inject("AuthenticationStore")(observer(Register)); 
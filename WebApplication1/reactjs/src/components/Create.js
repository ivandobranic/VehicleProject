import React from 'react'
import '../styles/bootstrap.css';
import { observer, inject } from 'mobx-react';
import { configure, decorate, action } from 'mobx';
import { Redirect } from 'react-router'

configure({ enforceActions: true });
class Create extends React.Component {
    AddVehicleMake = (e) => {
        e.preventDefault();

        this.props.VehicleMakeStore.CreateVehicleMake({
            Name: this.refs.Name.value,
            Abrv: this.refs.Abrv.value,
            CreatedBy: localStorage.getItem("userName")
        });

        this.refs.Name.value = null;
        this.refs.Abrv.value = null;

    };
    render() {

        if (this.props.VehicleMakeStore.pageRedirect === true) {
            return <Redirect to='/VehicleMake' />

        }

        return (
            <div>
                <div>
                    <h4>Create New</h4>
                    <br />
                    <br />
                    {this.props.VehicleMakeStore.status === "error" && <h3> Something went wrong</h3>}
                </div>
                <div>
                    <form  onSubmit={this.AddVehicleMake}>
                    <div className="form-group">
                        <input ref="Name" id="name" type="text" placeholder="Name" required maxLength="20" />
                    </div>
                    <div className="form-group">
                        <input ref="Abrv" id="abrv" type="text" placeholder="Abrv" required maxLength="20" />
                    </div>
                        <button type="submit">Save</button>
                    </form>


                </div>
            </div>
        )
    }
}
decorate(Create, {
    AddVehicleMake: action
});
export default inject("VehicleMakeStore")(observer(Create)); 
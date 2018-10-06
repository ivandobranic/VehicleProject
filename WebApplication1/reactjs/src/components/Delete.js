import React from 'react'
import '../styles/bootstrap.css';
import { observer, inject } from 'mobx-react';
import { configure } from 'mobx';
import { Redirect } from 'react-router'


configure({ enforceActions: true });
class Delete extends React.Component {

    componentDidMount() {
        this.props.VehicleMakeStore.GetByIdAsync(this.props.id);
    }
    Delete = (e) => {
        e.preventDefault();
        this.props.VehicleMakeStore.DeleteVehicleMake(this.props.id)
    }
    render() {
        if (this.props.VehicleMakeStore.pageRedirect === true) {
            return <Redirect to='/VehicleMake' />
        }
        return (
            <div>
                <div>
                    <h4>Delete</h4>
                    <br />
                </div>
                {this.props.VehicleMakeStore.status === "error" && <h3> Something went wrong</h3>}
                <div>
                    <form className="form-group" onSubmit={this.Delete}>
                        <label>Id: {this.props.id}</label>
                        <br />
                        <label>Name: {this.props.VehicleMakeStore.vehicleMakeEntity.name}</label>
                        <br />
                        <label>Abrv: {this.props.VehicleMakeStore.vehicleMakeEntity.abrv}</label>
                        <br />
                        <button type="submit">Delete</button>
                    </form>
                </div>
            </div>
        )
    }

}


export default inject("VehicleMakeStore")(observer(Delete));
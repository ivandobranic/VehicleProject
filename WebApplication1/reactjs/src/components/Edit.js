import React from 'react'
import '../styles/bootstrap.css';
import { observer, inject } from 'mobx-react';
import { configure, decorate, action } from 'mobx';
import { Redirect } from 'react-router'

configure({ enforceActions: true });
class Edit extends React.Component {
    constructor(props) {
        super(props)

        this.onChange = this.onChange.bind(this);

    }

    componentDidMount() {
        this.props.VehicleMakeStore.GetByIdAsync(this.props.id);
    }

    updateEntity = (key, value) => {
        this.props.VehicleMakeStore.vehicleMakeEntity[key] = value;

    };
    onChange(event) {
        this.updateEntity(event.target.name, event.target.value);

    }
    Update = (e) => {
        e.preventDefault();
        this.props.VehicleMakeStore.UpdateVehicleMake({
            Id: this.props.id,
            Name: this.props.VehicleMakeStore.vehicleMakeEntity.name,
            Abrv: this.props.VehicleMakeStore.vehicleMakeEntity.abrv,
            CreatedBy: localStorage.getItem("userName")
        }

        )

    }

    render() {
        if (this.props.VehicleMakeStore.pageRedirect === true) {
            return <Redirect to='/VehicleMake' />
        }
        return (
            <div>
                <div>
                    <h4>Edit</h4>
                    <br />
                    <br />
                    {this.props.VehicleMakeStore.status === "error" && <h3> Something went wrong</h3>}
                </div>
                <div>
                    <form onSubmit={this.Update}>
                    <div className="form-group">
                        <input value={this.props.VehicleMakeStore.vehicleMakeEntity.name || ""} name="name" type="text"
                            required maxLength="20" onChange={this.onChange} />
                    </div>
                    <div className="form-group">
                        <input className="form-group" value={this.props.VehicleMakeStore.vehicleMakeEntity.abrv || ""} name="abrv" type="text"
                            required maxLength="20" onChange={this.onChange} />
                    </div>
                        <button type="submit">Save</button>
                    </form>
                </div>
            </div>
        )
    }
}
decorate(Edit, {
    updateEntity: action
});

export default inject("VehicleMakeStore")(observer(Edit));
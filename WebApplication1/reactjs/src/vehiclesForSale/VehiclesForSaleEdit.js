import React from 'react'
import '../styles/bootstrap.css';
import { observer, inject } from 'mobx-react';
import { configure, decorate, action, runInAction, observable } from 'mobx';
import { Redirect } from 'react-router'

configure({ enforceActions: true });
class VehiclesForSaleEdit extends React.Component {
    constructor(props) {
        super(props)

        this.onChange = this.onChange.bind(this);

    }

    componentDidMount() {
        this.props.VehiclesForSaleStore.GetByIdAsync(this.props.id);
    }

    updateEntity = (key, value) => {
        this.props.VehiclesForSaleStore.vehicleForSaleEntity[key] = value;

    };
    onChange(event) {

       
        this.updateEntity(event.target.name, event.target.value);
       

    };

    Update = (e) => {
        e.preventDefault();
        var formData = new FormData();
        formData.append("id", this.props.id);
        formData.append("vehicleMake", this.props.VehiclesForSaleStore.vehicleForSaleEntity.vehicleMake);
        formData.append("vehicleModel", this.props.VehiclesForSaleStore.vehicleForSaleEntity.vehicleModel);
        formData.append("price", this.props.VehiclesForSaleStore.vehicleForSaleEntity.price);
        formData.append("itemsInStockId", this.props.id);
        formData.append("itemsInStock", this.props.VehiclesForSaleStore.vehicleForSaleEntity.itemsInStock);
        formData.append(this.fileToUpload.name, this.fileToUpload);

        this.props.VehiclesForSaleStore.UpdateVehiclesForSale(formData)

    }

    handleFileInput =(event) => {
        event.preventDefault();
        this.fileToUpload = event.target.files[0];
        if (event.target.files && event.target.files[0]) {
         var reader = new FileReader();
         reader.onload = (event) => {
            runInAction(() => {
                this.preview = event.target.result;
            });
          
         }
     
         reader.readAsDataURL(event.target.files[0]);
      
       }
    }

    render() {
        if (this.props.VehiclesForSaleStore.pageRedirect === true) {
            return <Redirect to='/VehiclesForSaleList'/>
        }
        return (
            <div>
                <div>
                    <h4>Edit</h4>
                    <br />
                    <br />
                    {this.props.VehiclesForSaleStore.status === "error" && <h3> Something went wrong</h3>}
                </div>
                <div>
                    <form onSubmit={this.Update}>
                    <div className="form-group">
                        <input value={this.props.VehiclesForSaleStore.vehicleForSaleEntity.vehicleMake || ""} name="VehicleName" type="text"
                            required maxLength="20" onChange={this.onChange} />
                    </div>
                    <div className="form-group">
                        <input className="form-group" value={this.props.VehiclesForSaleStore.vehicleForSaleEntity.vehicleModel || ""} 
                        name="VehicleModel" type="text" required maxLength="20" onChange={this.onChange} />
                    </div>
                    <div className="form-group">
                   <input id="vehiclepicture"  type="file" accept="image/*" required onChange={this.handleFileInput} />
                    {this.preview && <img src={this.preview} alt="vehicle" width="240" height="180"/>} 
                     </div>
                    <div className="form-group">
                        <input  value={this.props.VehiclesForSaleStore.vehicleForSaleEntity.price|| ""} 
                        name="Price" type="text" required maxLength="20" onChange={this.onChange} />
                    </div>
        
                    <div className="form-group">
                        <input  value={this.props.VehiclesForSaleStore.vehicleForSaleEntity.itemsInStock|| ""} 
                        name="ItemsInStock" type="text" required maxLength="20" onChange={this.onChange} />
                    </div>
                    
                        <button type="submit">Save</button>
                    </form>
                </div>
            </div>
        )
    }
}
decorate(VehiclesForSaleEdit, {
    updateEntity: action,
    preview: observable
});

export default inject("VehiclesForSaleStore")(observer(VehiclesForSaleEdit));
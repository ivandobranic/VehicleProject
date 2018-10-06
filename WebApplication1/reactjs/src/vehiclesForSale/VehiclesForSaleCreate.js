import React from 'react'
import '../styles/bootstrap.css';
import { observer, inject } from 'mobx-react';
import { configure, decorate, action,  runInAction, observable  } from 'mobx';
import { Redirect } from 'react-router'

configure({ enforceActions: true });
class VehiclesForSaleCreate extends React.Component{
  
    AddVehiclesForSale = (e) => {
        e.preventDefault();
        var formData = new FormData();
        formData.append("vehicleMake", this.refs.VehicleMake.value);
        formData.append("vehicleModel", this.refs.VehicleModel.value);
        formData.append("price", this.refs.Price.value);
        formData.append("itemsInStockId", this.refs.ItemsInStockId.value);
        formData.append("itemsInStock", this.refs.ItemsInStock.value);
        formData.append(this.fileToUpload.name, this.fileToUpload);
        
        this.refs.VehicleMake.value = null;
        this.refs.VehicleModel.value = null;
        this.refs.Price.value = null;
        this.refs.ItemsInStockId.value = null;
        this.refs.ItemsInStock.value = null;


        this.props.VehiclesForSaleStore.CreateVehiclesForSale(formData);

        
    };


    handleFileInput = (event) => {
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
  

render(){
    if (this.props.VehiclesForSaleStore.pageRedirect === true) {
        return <Redirect to='/VehiclesForSaleList' />
    }
    return(
      
        <div>
        <div>
            <h4>Create New</h4>
            <br />
            <br />
            {this.props.VehiclesForSaleStore.status === "error" && <h3> Something went wrong</h3>}
        </div>
        <div>
            <form  onSubmit={this.AddVehiclesForSale}>
            <div className="form-group">
                <input ref="VehicleMake" id="vehiclemake" type="text" placeholder=" Vehicle Name" required maxLength="20" />
            </div>
            <div className="form-group">
                <input ref="VehicleModel" id="vehiclemodel" type="text" placeholder="Vehicle Model" required maxLength="20" />
            </div>
            <div className="form-group">
            <input ref="VehiclePicture" id="vehiclepicture" onChange={this.handleFileInput} type="file" accept="image/*" required/>
            {this.preview && <img src={this.preview} alt="vehicle" width="240" height="180"/>}
            </div>
            <div className="form-group">
            <input ref="Price" id="price" type="text"  placeholde="Price" placeholder="Price" required/>
            </div>
            <div className="form-group">
            <input ref="ItemsInStockId" id="itemsinstockid" type="text"  placeholder="Items In Stock Id" required/>
            </div>
            <div className="form-group">
            <input ref="ItemsInStock" id="itemsinstock" type="text"  placeholder="Items In Stock" required/>
            </div>
                <button type="submit">Save</button>
            </form>


        </div>
    </div>

    )
}
}
decorate(VehiclesForSaleCreate, {
    AddVehiclesForSale: action,
    preview: observable
    
});
export default inject("VehiclesForSaleStore")(observer(VehiclesForSaleCreate)); 
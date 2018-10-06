import * as React from 'react';
import '../styles/bootstrap.css';
import '../App.css';
import { configure, action, decorate, observable} from 'mobx';
import { observer, inject } from 'mobx-react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

configure({ enforceActions: true });
class VehiclesForSaleList extends React.Component {
    cartNumberArray = [
        { id: 1, value: 1 },
        { id: 2, value: 2 },
        { id: 5, value: 5 },
        { id: 10, value: 10 },
        { id: 15, value: 15 },
        { id: 20, value: 20 }
    ];
   

    componentDidMount() {
        this.selectedValue = 1;
        const { VehiclesForSaleStore } = this.props;
        VehiclesForSaleStore.loadDataAsync();
        VehiclesForSaleStore.pageRedirect = false;
       
    }

    changePageNumber = (data) => {
        const { VehiclesForSaleStore } = this.props;
        let selected = data.selected;
        let offset = Math.ceil(selected + 1);
        VehiclesForSaleStore.vehiclesForSaleData.pageNumber = offset;
        VehiclesForSaleStore.loadDataAsync();
    }


  
    AddToCart = (id, vehiclemake, vehiclemodel, price, itemsInStockId, itemsInStock) => {
        
      
       
    
        const itemInStock ={
            VehicleMake:vehiclemake,
            VehicleModel:vehiclemodel,
            Price: price,
            VehiclePicture: "",
            Quantity: this.selectedValue,
            UserName: localStorage.getItem("userName"),
            VehiclesForSaleId: id
        }
      
    
     
        const newItemInStock = {
            Id: itemsInStockId,
            VehiclesForSaleId: id,
            ItemsInStock: itemsInStock - this.selectedValue
          }
       
          try{
          var i;
          for (i = 0; i < this.selectedValue; i++)
          {
        
            this.props.VehiclesForSaleStore.AddItemToCart(itemInStock);
          }
        }catch(error){
            console.log(error.Message);
        }

             this.props.VehiclesForSaleStore.UpdateItemsInStock(newItemInStock);
           
        
    }
   

    onChange = (event) =>{
        event.preventDefault();
        this.selectedValue = event.target.value;
    }


    render() {
        if (this.props.VehiclesForSaleStore.pageRedirect === true) {
            return <Redirect to='/ShoppingCartList' />
        }
        const { VehiclesForSaleStore } = this.props;
        return (
            <div>
            <div>
            <br />
            
            <Link to="/VehiclesForSaleList/Create">Create New</Link>
            <br />
            <br />
            </div>
        
            <div className="container">
                <div className="row vertical-align">
                    {VehiclesForSaleStore.vehiclesForSaleData.model.map(vehicle => (
                        <ul className="list-unstyled jumbotron" key={vehicle.id}>
                            <li>
                                <img src={"data:image/png;base64," + vehicle.vehiclePicture} width="240" height="180" alt="vehicle" />
                            </li>
                            <li>Name:&nbsp;
                   <b>{vehicle.vehicleMake}</b>
                            </li>
                            <li>Model:&nbsp;
                   <b>{vehicle.vehicleModel}</b>
                            </li>

                            <li>Price:&nbsp;
                   <b>{vehicle.price}$</b>
                            </li>
                            <li>Items In Stock:&nbsp;
                   <b>{vehicle.itemsInStock}</b>
                            </li>
                            <li>
                  <select onChange={this.onChange}>
                  {this.cartNumberArray.map(i =>(
                    <option key={i.id}>
                      {i.value}
                    </option>
                     ))}
                     </select>
                           </li>
                            <li>
                            <Link to={`/VehiclesForSaleList/Edit/${vehicle.id}`}>Edit</Link>&nbsp;&nbsp;
                            <Link to={`/VehiclesForSaleList/Delete/${vehicle.id}`}>Delete</Link>
                            </li>
                            <li>
                            <button type="submit" onClick ={() => this.AddToCart(vehicle.id, vehicle.vehicleMake,vehicle.vehicleModel,
                                vehicle.price, vehicle.itemsInStockId, vehicle.itemsInStock)}>Add To Cart</button>
                            </li>
                        </ul>
                        
                        
                    ))}
                    {VehiclesForSaleStore.status && <div>{VehiclesForSaleStore.status}</div>}
                    <ReactPaginate pageCount={Math.ceil(VehiclesForSaleStore.vehiclesForSaleData.totalCount / VehiclesForSaleStore.vehiclesForSaleData.pageSize)}
                        pageRangeDisplay={VehiclesForSaleStore.vehiclesForSaleData.pageSize}
                        onPageChange={this.changePageNumber}
                        marginPagesDisplayed={2}
                        containerClassName={"pagination"}
                        nextLabel={"next"}
                        previousLabel={"previous"}
                        breakLabel={<a href="">...</a>}
                        breakClassName={"break-me"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"}
                        nextClassName={"cursor"}
                        previousClassName={"cursor"}
                        pageClassName={"cursor"} />
                </div>
            </div>


          </div>

        )
    }


}
decorate(VehiclesForSaleList, {
    componentDidMount: action,
    selectedValue: observable
});

export default inject("VehiclesForSaleStore")(observer(VehiclesForSaleList));

import * as React from 'react';
import '../styles/bootstrap.css';
import '../App.css';
import { observer, inject } from 'mobx-react';
import { configure, action, decorate} from 'mobx';



configure({ enforceActions: true });
class ShoppingCartList extends React.Component {

    componentDidMount() {
        const { ShoppingCartStore } = this.props;
        ShoppingCartStore.GetItemsFromCart();
        ShoppingCartStore.GetItemsInStock();
        ShoppingCartStore.pageRedirect = false;

    }

    RemoveItemFromCart = (id, vehiclesForSaleId) => {

        
        var result = this.props.ShoppingCartStore.itemsInStockData.find(x => x.id === vehiclesForSaleId)
 
        const newItemInStock = {
            Id: result.id,
            VehiclesForSaleId: vehiclesForSaleId,
            ItemsInStock: result.itemsInStock + 1
        }
        try {
            this.props.ShoppingCartStore.RemoveItemFromCart(id);
        } catch (error) {
            console.log(error.Message)
        }
        this.props.ShoppingCartStore.UpdateItemsInStock(newItemInStock);
    
    }
 

   
   SetRedirect = () => {

       this.props.history.push("/Checkout")

    }

    render() {
        const { ShoppingCartStore } = this.props;
        if (this.props.ShoppingCartStore.pageRedirect === true)
        {
        window.location.reload();
        }
        return (
            
            <div className="container">
                <div className="row vertical-align">
                    {ShoppingCartStore.shoppingCartData.cartList.map(vehicle => (
                        <ul className="list-unstyled jumbotron" key={vehicle.id}>

                            <li>Name:&nbsp;
               <b>{vehicle.vehicleMake}</b>
                            </li>
                            <li>Model:&nbsp;
               <b>{vehicle.vehicleModel}</b>
                            </li>

                            <li>Price:&nbsp;
               <b>{vehicle.price}$</b>
                            </li>
                            <li>
                                <button onClick={() => this.RemoveItemFromCart(vehicle.id, vehicle.vehiclesForSaleId)}>Remove Item</button>
                            </li>
                        </ul>
                    ))}
                </div>
                <div>
                    <h3>Total Price: {ShoppingCartStore.shoppingCartData.result}$</h3>
                </div>
                <button onClick={() => this.SetRedirect()}>Proceed To Checkout</button>
             {ShoppingCartStore.status && <div>{ShoppingCartStore.status}</div>}
            </div>


        )

    }


}
decorate(ShoppingCartList, {
    componentDidMount: action,
    ProceedToCheckOut: action
});

export default inject("ShoppingCartStore")(observer(ShoppingCartList));
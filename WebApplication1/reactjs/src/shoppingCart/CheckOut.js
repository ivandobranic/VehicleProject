import React from 'react'
import '../styles/bootstrap.css';
import { observer, inject } from 'mobx-react';
import { configure, decorate, action, observable } from 'mobx';
import { Redirect } from 'react-router'

configure({ enforceActions: true });
class CheckOut extends React.Component {

    componentDidMount() {
        const { ShoppingCartStore } = this.props;
        ShoppingCartStore.GetItemsFromCart();
        ShoppingCartStore.pageRedirect = false;
        this.user = localStorage.getItem("userName");
    }

    PlaceOrder = (e) => {
        e.preventDefault();
        this.props.ShoppingCartStore.PlaceOrder({
            itemsOrdered: this.props.ShoppingCartStore.shoppingCartData.cartList,
            totalPrice: this.props.ShoppingCartStore.shoppingCartData.result,
            userName: this.user,
            firstName: this.refs.FirstName.value,
            lastName: this.refs.LastName.value,
            Email: this.refs.LastName.value,
            adress: this.refs.Adress.value,
            cardType: this.selectedValue,
            cardNumber: this.refs.CardNumber.value
        })  
        this.refs.FirstName.value = null;
        this.refs.LastName.value = null;
        this.refs.Adress.value = null;
        this.refs.Adress.value = null;
        this.refs.CardNumber.value = null; 
      
    }
    
    

    onChange = (event) =>{
        event.preventDefault();
        this.selectedValue = event.target.value;
    }

    render() {
        if (this.props.ShoppingCartStore.pageRedirect === true) {
            return <Redirect to='/VehiclesForSaleList' />
        }
        return (
           
        <div>
         <div>
            <br />
            <br />
            {this.props.ShoppingCartStore.status && <div> {this.props.ShoppingCartStore.status}</div>}
        </div>
        <div>
            <form  onSubmit={this.PlaceOrder}>
            <div className="form-group">
                <input ref="FirstName" id="firstname" type="text" placeholder=" First Name" required maxLength="20" />
            </div>
            <div className="form-group">
                <input ref="LastName" id="lastname" type="text" placeholder="Last Name" required maxLength="20" />
            </div>
            <div className="form-group">
            <input ref="Email" id="email" type="email" placeholder="Email" required maxLength="20"/>
            </div>
            <div className="form-group">
            <input ref="Adress" id="adress" type="text"  placeholde="Adress" placeholder="Adress" required maxLength="20" />
            </div>
            <div className="form-group">
            <select id="cardtype" type="text" onChange={() => this.onChange}
              required>
              <option>
                Visa
              </option>
              <option>
                MasterCard
              </option>
              </select>
            </div>
            <div className="form-group">
            <input ref="CardNumber" id="cardnumber" type="text"  required pattern="(\d{16})" placeholder="Card Number" required/>
            </div>
                <button type="submit">Submit</button>
            </form>
        </div> 
    </div>
        )
    }
}
decorate(CheckOut, {
    componentDidMount: action,
    PlaceOrder: action,
    selectedValue: observable,
    user: observable
});
export default inject("ShoppingCartStore")(observer(CheckOut));
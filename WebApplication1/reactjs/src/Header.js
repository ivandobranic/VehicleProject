import * as React from 'react';
import './styles/bootstrap.css';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { observer, inject } from 'mobx-react';



class Header extends React.Component {
    componentDidMount(){
        this.props.ShoppingCartStore.GetItemsFromCart();
    }

    user = "";
    
    LogOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        this.user = "";
        this.props.VehicleMakeStore.loadDataAsync();
        return <Redirect to='/VehicleMake'/>
        
    }

    render() {
        this.user = localStorage.getItem("userName");
        return (

            <div className="navbar-collapse collapse">
                <ul className="nav navbar-nav">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/VehicleMake">VehicleMake</Link>

                    </li>
                    <li>
                        <Link to="/VehiclesForSaleList">VehiclesForSaleList</Link>
                    </li>
                    <li>
                        <Link to="/Register">Register</Link>
                    </li>
                  
                      {!this.user && <li><Link to="/LogIn">LogIn</Link></li>}
                 
                    <li>
                        <Link to="/LogOut" onClick={this.LogOut}>LogOut</Link>
                    </li>

                    {this.user && <li> <br></br>Hello {this.user}</li>}
                    <li>
                        
                        <Link to="/ShoppingCartList">Cart({this.props.ShoppingCartStore.shoppingCartData.cartList.length})</Link>
                    </li>
                </ul>
                <div>
                </div>

            </div>

        );

    }
}

export default inject("ShoppingCartStore")(observer(Header)); 

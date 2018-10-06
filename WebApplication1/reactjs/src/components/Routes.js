import * as React from 'react';
import { Route } from 'react-router-dom';
import Home from './Home';
import PagedList from './PagedList';
import Create from './Create';
import Edit from './Edit';
import Delete from './Delete';
import Register from '../authentication/Register';
import LogIn from '../authentication/LogIn';
import VehiclesForSaleList from '../vehiclesForSale/VehiclesForSaleList';
import VehiclesForSaleCreate from '../vehiclesForSale/VehiclesForSaleCreate';
import VehiclesForSaleEdit from '../vehiclesForSale/VehiclesForSaleEdit';
import shoppingCartList from '../shoppingCart/shopping-cart-list';
import CheckOut from '../shoppingCart/CheckOut';



export default class Routes extends React.Component {
  render() {
    return (
      <div>
   
        <Route exact path='/' component={Home} />
        <Route exact path='/VehicleMake' component={PagedList} />
        <Route path='/VehicleMake/Edit/:id' render={(props) => <Edit id={props.match.params.id} />} />
        <Route path='/VehicleMake/Delete/:id' render={(props) => <Delete id={props.match.params.id} />} />
        <Route exact path='/VehicleMake/Create' component={Create} />
        <Route exact path='/Register' component={Register}/>
        <Route exact path='/Login' component={LogIn}/>
        <Route exact path="/VehiclesForSaleList" component={VehiclesForSaleList}/>
        <Route exact path="/VehiclesForSaleList/Create" component={VehiclesForSaleCreate}/>
        <Route path="/VehiclesForSaleList/Edit/:id" render={(props) => <VehiclesForSaleEdit id={props.match.params.id} />}/>
        <Route exact path="/ShoppingCartList" component = {shoppingCartList}/>
        <Route exact path="/CheckOut" component = {CheckOut}/>
        



      </div>

    )
  }
}
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import VehicleMakeStore from './components/VehicleMakeStore';
import { BrowserRouter} from 'react-router-dom';
import {Provider} from 'mobx-react';
import registerServiceWorker from './registerServiceWorker';
import App from './components/App';
import AuthenticationStore from './authentication/AuthenticationStore';
import VehiclesForSaleStore from './vehiclesForSale/VehiclesForSaleStore';
import ShoppingCartStore from './shoppingCart/ShoppingCartStore';

const monoApp = document.getElementById('monoApp')
const Root = (<Provider 
VehicleMakeStore = {VehicleMakeStore}
AuthenticationStore = {AuthenticationStore}
VehiclesForSaleStore = {VehiclesForSaleStore}
ShoppingCartStore = {ShoppingCartStore}>
<App/>
</Provider>);
ReactDOM.render((
    <BrowserRouter>
    {Root}
    </BrowserRouter>
), monoApp);
registerServiceWorker();

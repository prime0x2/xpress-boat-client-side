import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import AuthProvider from './context/AuthProvider';
import Account from './Pages/Account/Account';
import Dashboard from './Pages/Dashboard/Dashboard';
import Home from './Pages/Home/Home/Home';
import ProductDetails from './Pages/Home/ProductDetails/ProductDetails';
import Inventory from './Pages/Inventory/Inventory';
import PrivateRoute from './Pages/PrivateRoute/PrivateRoute';
import Footer from './Pages/Shared/Footer/Footer';
import Header from './Pages/Shared/Header/Header';
import NotFound from './Pages/Shared/NotFound/NotFound';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>

                <Header />

                <Switch>
                    <Route path="/" exact>
                        <Home />
                    </Route>

                    <Route path="/home" >
                        <Home />
                    </Route>
                    
                    <Route path="/inventory" >
                        <Inventory />
                    </Route>

                    <Route path="/account" >
                        <Account />
                    </Route>
                    
                    <PrivateRoute path="/dashboard">
                        <Dashboard />
                    </PrivateRoute>
                    
                    <PrivateRoute path="/boat/:productID">
                        <ProductDetails />
                    </PrivateRoute>
                    
                    <Route>
                        <NotFound />
                    </Route>
                </Switch>
                
                <Footer />
                
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;

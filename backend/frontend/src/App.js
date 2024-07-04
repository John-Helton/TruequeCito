import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreateProductPage from './pages/CreateProductPage';
import ProductListPage from './pages/ProductListPage';
import ProposeExchangePage from './pages/ProposeExchangePage';
import ManageExchangesPage from './pages/ManageExchangesPage';
import CreatePaymentPage from './pages/CreatePaymentPage';
import UserProfilePage from './pages/UserProfilePage';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';

function App() {
  const [products, setProducts] = useState([]);

  return (
    <AuthProvider>
      <Router>
        <div>
          <Navbar setProducts={setProducts} />
          <Switch>
            <Route path="/" exact>
              <HomePage products={products} setProducts={setProducts} />
            </Route>
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/create-product" component={CreateProductPage} />
            <Route path="/products" component={ProductListPage} />
            <Route path="/propose-exchange" component={ProposeExchangePage} />
            <Route path="/manage-exchanges" component={ManageExchangesPage} />
            <Route path="/create-payment" component={CreatePaymentPage} />
            <Route path="/profile" component={UserProfilePage} />
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

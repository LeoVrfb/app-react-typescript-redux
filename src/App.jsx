import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleleware from 'redux-saga';
import rootReducer from './store/reducers';
import rootSaga from './components/sagas/sagas';
import Navbar from './components/menu/Navbar';
import LoginPage from './components/loginInterface/LoginPage';
import Dashboard from './components/loginInterface/Dashboard';
import Home from './Pages/Home/Home';
import Products from './Pages/Products/Products';
import ProductShowcase from './Pages/ProductShowcase/ProductShowcase';
import Contact from './Pages/Contact/Contact';
import ShoppingCart from './Pages/ShoppingCart/ShoppingCart';
import FloatingCart from './components/FloatingCart/FloatingCart';
import StripeContainer from './Pages/Payment/StripeContainer';
import SignupForm from './components/SignupInterface/SignupForm';
import SignUpMessage from './components/SignupInterface/SignUpMessage';
import Profil from './components/AccountProfil/Profil';
import Administration from './Pages/Administration/Administration';

const sagaMiddleware = createSagaMiddleleware();
const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],

});

sagaMiddleware.run(rootSaga);


function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Profil />
          <FloatingCart />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path='/home' element={<Home />} />
            <Route path='/produits' element={< Products />} />
            <Route path='/produits/:id' element={<ProductShowcase />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/shoppingcart' element={<ShoppingCart isFromPayment />} />
            <Route path='/stripecontainer' element={<StripeContainer />} />
            <Route path='/signupmessage' element={<SignUpMessage />} />
            <Route path='/administration' element={<Administration />} />
          </Routes>
        </div>
      </Router>
    </Provider>

  );
}

export default App;

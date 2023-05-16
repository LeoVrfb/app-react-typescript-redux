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
          <FloatingCart />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/connexion" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path='/home' element={<Home />} />
            <Route path='/produits' element={< Products />} />
            <Route path='/produits/:id' element={<ProductShowcase />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/shoppingcart' element={<ShoppingCart />} />
          </Routes>
        </div>
      </Router>
    </Provider>

  );
}

export default App;

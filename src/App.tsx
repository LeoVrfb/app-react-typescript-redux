import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleleware from 'redux-saga';
import rootReducer from './store/reducers';
import rootSaga from './sagas';
import Menu from './components/menu/Menu';
import LoginMessage from './components/loginInterface/LoginMessage';
import LoginPage from './components/loginInterface/LoginPage';

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
          <Menu />
          <Routes>
            <Route path="/" element={<LoginMessage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </div>
      </Router>
    </Provider>

  );
}

export default App;

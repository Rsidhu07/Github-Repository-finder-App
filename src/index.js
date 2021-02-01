import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import reducer from './store/reducers';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(reducer, composeEnhancers());

const app = (
    <Provider store= {store}>
      <BrowserRouter>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </BrowserRouter>
    </Provider>
);

ReactDOM.render(
  app,
  document.getElementById('root')
);


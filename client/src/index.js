import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react'
import { MyContextProvider } from './useContext'
import { Provider } from 'react-redux'
import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { devToolsEnhancer } from 'redux-devtools-extension'
import reducers from './reducers/index'

const store = compose(applyMiddleware(thunk), devToolsEnhancer({ trace: true }))(createStore)(reducers)

ReactDOM.render(
  <Provider store={store}>
    <MyContextProvider>
      <ChakraProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </ChakraProvider>
    </MyContextProvider>
  </Provider>,
  document.getElementById('root')
);

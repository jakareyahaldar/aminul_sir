import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./global.css"
import "./output.css"

import { store } from './app/store'
import { Provider } from 'react-redux'


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)

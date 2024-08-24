import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import MapContextProvider from './context/mapContext.jsx'
import IndicatorsContextProvider from './context/indicatorsContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <IndicatorsContextProvider>
      <MapContextProvider>
        <App />
      </MapContextProvider>
    </IndicatorsContextProvider>
  </React.StrictMode>,
)

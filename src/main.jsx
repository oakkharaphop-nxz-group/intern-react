import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import ListStudent from './ListStudent'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ListStudent page={1} />
  </React.StrictMode>,
)

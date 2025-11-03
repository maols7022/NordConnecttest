import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// Eventuell global styling (Tailwind lastes via CDN i index.html)
// Hvis du senere legger til tailwind.config, kan du ha: import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

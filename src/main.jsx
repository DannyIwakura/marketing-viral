import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/space-grotesk/500.css'
import '@fontsource/space-grotesk/700.css'
import './styles/theme.css'
import './styles/app.css'
import App from './App'
import { BASE_PATH } from './lib/site'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter basename={BASE_PATH.replace(/\/$/, '')}>
            <App />
        </BrowserRouter>
    </React.StrictMode>,
)

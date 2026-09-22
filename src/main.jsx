import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { RecipeProvider } from './context/RecipeContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import "toastify-js/src/toastify.css"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <RecipeProvider>
          <App />
        </RecipeProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)

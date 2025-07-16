import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { GlobalContext } from './Context/Context'
import { Toaster } from 'react-hot-toast';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GlobaldataContext } from './Context/Auth';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalContext>
      <GlobaldataContext>
<GoogleOAuthProvider clientId="401287905504-mt0j6758urn6u99fi7rbnl4hrphlgsic.apps.googleusercontent.com">
            <Toaster position="top-right" reverseOrder={false} />

    <App />
    </GoogleOAuthProvider>

      </GlobaldataContext>

    </GlobalContext>
  </StrictMode>,
)

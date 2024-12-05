import React from 'react';
import { ToastContainer } from "react-toastify";
import { Navigation } from './routes';
import { AuthProvider } from './context';

// { children } es el contenido
export const App = () => {
  
  
  return (
    <AuthProvider> 

      <Navigation />

      <ToastContainer
        position='bottom-center'
        autoClose={ 5000 }
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={ false }
        pauseOnFocusLoss
        draggable
        pauseOnHover={ false }
      />
    </AuthProvider>
  )
}

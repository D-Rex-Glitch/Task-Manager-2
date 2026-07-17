import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: '#10141f',
          color: '#f1f5f9',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '12px',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: '0.875rem',
          boxShadow: '0 10px 40px rgba(0,0,0,0.6)',
        },
        success: {
          iconTheme: { primary: '#10b981', secondary: '#10141f' },
        },
        error: {
          iconTheme: { primary: '#ef4444', secondary: '#10141f' },
        },
      }}
    />
  </React.StrictMode>
);

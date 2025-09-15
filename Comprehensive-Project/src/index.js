// =============================================================================
// REACT APP ENTRY POINT
// =============================================================================
// Main entry point cho React Learning Management System
// =============================================================================

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Create root element và render app
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </head>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </>,
);

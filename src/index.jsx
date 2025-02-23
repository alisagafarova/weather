// src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client'; // Импортируем правильную версию
import App from './App';

// Используем createRoot вместо render
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

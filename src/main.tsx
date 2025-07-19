import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GamePage from './GamePage';
import './index.css';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/game" element={<GamePage />} />
      </Routes>
    </BrowserRouter>
    <Toaster position="top-right" />
  </React.StrictMode>
);

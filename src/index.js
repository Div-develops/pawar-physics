import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import firebaseConfig from './fbconfig'; // Update the path to your Firebase config file

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);



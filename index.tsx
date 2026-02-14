import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error("FATAL ERROR: Root element not found.");
} else {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("LUKSA AI Application initialized successfully.");
  } catch (error) {
    console.error("Failed to mount React application:", error);
    // V primeru kritične napake prikažemo sporočilo uporabniku
    rootElement.innerHTML = `
      <div style="height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #ff4444; font-family: sans-serif; text-align: center;">
        <h2 style="margin-bottom: 10px;">System Malfunction</h2>
        <p>Could not initialize AI Interface. Please check console.</p>
      </div>
    `;
  }
}

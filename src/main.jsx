import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function App() {
  return (
    <div className="p-4 text-xl text-center text-white bg-blue-600 min-h-screen">
      Hello from your clean Vite + React + Tailwind app!
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
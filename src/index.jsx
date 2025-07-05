import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css'; // ⬅️ Add this line to include Tailwind styles

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

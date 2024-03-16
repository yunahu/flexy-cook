import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import App from 'src/App.jsx';
import env from './utils/env';

const Router = env.USE_HASH_ROUTER ? HashRouter : BrowserRouter;

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
		<Router>
    	<App />
		</Router>
  // </React.StrictMode>,
);

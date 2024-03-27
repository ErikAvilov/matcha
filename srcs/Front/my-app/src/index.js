import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

const AppRouter = () => {
	<Router>
		<Switch>
			<Route exact path='/' component={App}/>
		</Switch>
	</Router>
};

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

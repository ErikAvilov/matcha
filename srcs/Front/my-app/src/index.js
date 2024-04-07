import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import { App, MyPigeon} from './App';
import './css/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

const AppRouter = () => {
	return (
	<Router>
  		<Routes>
	        <Route path='/' element={<App />} />
	        <Route path='/pigeon' element={<MyPigeon />} />
	        <Route path='*' element={<App />} />
  		</Routes>
	</Router>
	);
};


root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

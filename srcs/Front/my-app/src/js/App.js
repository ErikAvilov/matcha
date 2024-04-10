import pigeon from '../pigeon.png';
import tinder from '../tinder-logo.png';

import { LoginForm, RegistrationForm } from './Auth';

import '../css/App.css';
import '../css/navbar.css';
import '../css/buttons.css';
import '../css/auth.css';

import { useState, Component } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Routes, Route, BrowserRouter, Link } from 'react-router-dom';
import Cookies from 'js-cookie';

import { Field } from './Components'
import { ProfilePage, ProfileFill, BioTagFill } from './Profile'

const RefreshToken = (FunctionSource) => {
	const refresh_token = Cookies.get('refresh_token');
	axios.get('http://localhost:8000/refresh_token', {
		headers: {
			Authorization: `Bearer ${refresh_token}`,
		}
	})
	.then(response => {
		if (response.data.ok) {
			Cookies.set('access_token', response.data.token);
			console.log('New access_token generated!')
			{FunctionSource()}
		}
		else
			console.log('refresh token expired');
	})
	.catch(error => {console.error('Error:', error);});
}

const WhoAmI = () => {
	const token = Cookies.get('access_token');
	axios.get('http://localhost:8000/whoami', {
		headers: {
			Authorization: `Bearer ${token}`,
		}
	})
	.then(response => {
		console.log(response.data.message);
		if (response.data.code === 401)
			{RefreshToken(WhoAmI)}
	})
	.catch(error => {console.error('Error:', error);});
};

const Logout = () => {
	const token = Cookies.get('access_token');
	axios.post('http://localhost:8000/logout', {
		headers: {
			Authorization: `Bearer ${token}`,
		}
	})
	.then(response => {
		if (response.data.ok) {
			Cookies.remove('access_token');
			Cookies.remove('refresh_token');
		}
		console.log(response.data.message);
	})
	.catch(error => {
		console.error('Error:', error);
	});
}

const NavBar = () => {
	return (
		<nav className='navbar'>
			<span><Link to="/" className='nav-btn'>Matcha</Link></span>
			<ul>
				<li><Link to="/profile" className='nav-btn'>Profile</Link></li>
				<li><Link to="/register" className='nav-btn'>Register</Link></li>
				<li><Link to="/login" className='nav-btn'>Login</Link></li>
				<li><Link to="/fill_profile_1" className='nav-btn'>Fill1</Link></li>
				<li><Link to="/fill_profile_2" className='nav-btn'>Fill2</Link></li>
				<li><button onClick={ WhoAmI }>WhoAmI</button></li>
				<li><button onClick={ Logout }>Logout</button></li>
			</ul>
		</nav>
	);
};

const MyPigeon = () => {
	return (
		<div className='App'>
			<header className="App-header">
				<img src={pigeon} className='App-logo' alt='pigeon' />
				<Link to="/" className='pigeon-btn'>Click!</Link>
			</header>
		</div>
	);
};

const Home = () => {
	return (
		<div className="App">
		  <header className="App-header">
				<img src={tinder} className="App-logo" alt="logo" />
				<Link to="/pigeon" className='pigeon-btn'>Click!</Link>
		  </header>
		</div>
	);
};

export class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<NavBar />
				  <Routes>
					<Route exact path="/" element={<Home />} />
					<Route path="/profile" element={<ProfilePage />} />
					<Route path="/fill_profile_1" element={<ProfileFill />} />
					<Route path="/fill_profile_2" element={<BioTagFill />} />
					<Route path="/register" element={<RegistrationForm />} />
					<Route path="/login" element={<LoginForm />} />
				  </Routes>
			</BrowserRouter>
		);
	}
}
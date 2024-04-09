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

const RefreshToken = () => {
	const refresh_token = Cookies.get('refresh_token')
	axios.get('http://localhost:8000/refresh_token?token=' + refresh_token, {})
	.then(response => {
		console.log(response.data.token);
		Cookies.set('access_token', response.data.token);
	})
	.catch(error => {console.error('Error:', error);});
}

const WhoAmI = () => {
	const token = Cookies.get('access_token');
	axios.get('http://localhost:8000/whoami?token=' + token, {})
	.then(response => {
		console.log(response.data.message);
		if (response.data.code == 401)
			{RefreshToken()}
	})
	.catch(error => {console.error('Error:', error);});
};

const Logout = () => {
	const token = Cookies.get('access_token');
	axios.post('http://localhost:8000/logout?token=' + token, {})
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

const ProfilePage = () => {
	return (
		<div className='profile-page'>

		</div>
	);
};

const ProfileSettings = () => {
	const [formData, setFormData] = useState({
		gender: '',
		orientation: '',
		orientation_other: '',
	});
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};
	
	const handleSumbit = async (e) => {
		e.preventDefault();

		axios.post('http://localhost:8000/register', formData)
			.then(response => {
				console.log(response.data.message);
			})
			.catch(error => {
				console.error('Error:', error);
			});
		}
	return (
		<div className='App'>
			<header className="App-header">
				<form onSubmit={handleSumbit}>
					<select name='gender' value={formData.gender} onChange={handleChange}>
						<option value="" disabled>Select gender</option>
						<option value="Male">Male</option>
						<option value="Female">Female</option>
						<option value="Non-binary">Non-binary</option>
					</select>
					<select name="orientation" value={formData.orientation} onChange={handleChange}>
						<option value="" disabled>Select orientation</option>
						<option value="Hetero">Heterosexual</option>
						<option value="Homo">Homosexual</option>
						<option value="Bi">Bi</option>
						<option value="Other">Other (Please specify)</option>
					</select>
					{formData.orientation === 'Other' && (
						<input type='text' name='orientation_other' placeholder='Other' value={formData.orientation_other} onChange={handleChange} onClick={(e) => e.stopPropagation()}/>
					)}
					<button type="submit">Register</button>
				</form>
			</header>
		</div>
	);
}

export class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<NavBar />
				  <Routes>
					<Route exact path="/" element={<Home />} />
					<Route path="/profile" element={<ProfilePage />} />
					<Route path="/register" element={<RegistrationForm />} />
					<Route path="/login" element={<LoginForm />} />
				  </Routes>
			</BrowserRouter>
		);
	}
}
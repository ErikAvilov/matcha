import pigeon from './pigeon.png';
import tinder from './tinder-logo.png';

import { AppRouter } from './index.js';
import { useState, Component } from 'react';


import './css/App.css';
import './css/navbar.css';
import './css/buttons.css';

import { BrowserRouter as Router, Routes, Route, BrowserRouter, Link } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from "react-cool-form";


const NavBar = () => {
	return (
			<nav className='navbar'>
				<span><Link to="/" className='nav-btn'>Matcha</Link></span>
				<ul>
					<li><Link to="/pigeon" className='nav-btn'>Pigeon</Link></li>
					<li><Link to="/register" className='nav-btn'>Register</Link></li>
				</ul>
			</nav>
	);
};

export const MyPigeon = () => {
	return (
		<div className='App'>
			<header className="App-header">
				<img src={pigeon} className='App-logo' alt='pigeon' />
				<Link to="/" className='pigeon-btn'>Click!</Link>
			</header>
		</div>
	);
}

const Home = () => {
	return (
		<div className="App">
		  <header className="App-header">
				<img src={tinder} className="App-logo" alt="logo" />
				<Link to="/pigeon" className='pigeon-btn'>Click!</Link>
		  </header>
		</div>
	);
}

const RegistrationForm = () => {
	const [formData, setFormData] = useState({
		id: uuidv4(),
		first_name: '',
		last_name: '',
		username: '',
		email: '',
		password: '',
		birthdate: '',
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
		<header className="Register-page">
			<form onSubmit={handleSumbit}>
				<a>Registration</a>
				<div className='input-box'>
					<span className='details'>First Name</span>
						<input type='text' name='first_name' placeholder='First name' value={formData.first_name} onChange={handleChange} />
					<span className='details'>Last Nane</span>
						<input type='text' name='last_name' placeholder='Last name' value={formData.last_name} onChange={handleChange} />
					<span className='details'>Email</span>
						<input type='email' name='email' placeholder='Email' value={formData.email} onChange={handleChange} />
					<span className='details'>Username</span>
						<input type='text' name='username' placeholder='Username' value={formData.username} onChange={handleChange} />
					<span className='details'>Password</span>
						<input type='password' name='password' placeholder='Password' value={formData.password} onChange={handleChange} />
					<span className='details'>Date of Birth</span>
						<input type='date' name='birthdate' placeholder='Birthdate' value={formData.birthdate} onChange={handleChange} />
					<button type="submit">Register</button>
				</div>
			</form>
		</header>
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
					<Route path="/pigeon" element={<MyPigeon />} />
					<Route path="/register" element={<RegistrationForm />} />
				  </Routes>
			</BrowserRouter>
		);
	}
}
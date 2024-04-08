import pigeon from '../pigeon.png';
import tinder from '../tinder-logo.png';



import '../css/App.css';
import '../css/navbar.css';
import '../css/buttons.css';
import '../css/auth.css';

import { useState, Component } from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter, Link } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import { Field } from './Components'

const NavBar = () => {
	return (
		<nav className='navbar'>
			<span><Link to="/" className='nav-btn'>Matcha</Link></span>
			<ul>
				<li><Link to="/pigeon" className='nav-btn'>Pigeon</Link></li>
				<li><Link to="/register" className='nav-btn'>Register</Link></li>
				<li><Link to="/login" className='nav-btn'>Login</Link></li>
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

const LoginForm = () => {
	const [formData, setFormData] = useState({
		id: uuidv4(),
		username: '',
		password: '',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};
	
	const handleSumbit = async (e) => {
		e.preventDefault();

		axios.post('http://localhost:8000/login', formData)
			.then(response => {
				console.log(response.data.message);
			})
			.catch(error => {
				console.error('Error:', error);
			});
	};
	return (
		<div className='reg-container'>
			  <div className='wrapper'><h2>Login</h2>
				<form onSubmit={handleSumbit}>
				<Field type='text' inputname='username' placeholder='Username' value={formData.username} onChange={handleChange} style='input-box'/>
				<Field type='password' inputname='password' placeholder='Password' value={formData.password} onChange={handleChange} style='input-box'/>
				  <div className='button-container'>
					<button type="submit">Login</button>
				  </div>
				</form>
				<div className="reg-text">Don't have an account? <Link to="/register">Register</Link></div>
			  </div>
		</div>
	);
};

const RegistrationForm = () => {
	const [formData, setFormData] = useState({
		id: uuidv4(),
		first_name: '',
		last_name: '',
		username: '',
		email: '',
		password: '',
		confirm_password: '',
		birthdate: '',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};
	
	const handleSumbit = async (e) => {
		e.preventDefault();

		if (formData.password !== formData.confirm_password)
			return alert('Passwords do not match');
		axios.post('http://localhost:8000/register', formData)
			.then(response => {
				console.log(response.data.message);
			})
			.catch(error => {
				console.error('Error:', error);
			});
	};
		return (
			<div className='reg-container'>
			  <div className='wrapper'><h2>Registration</h2>
				<form onSubmit={handleSumbit}>
				<Field type='text' inputname='first_name' placeholder='First name' value={formData.first_name} onChange={handleChange} style='input-box'/>
				<Field type='text' inputname='last_name' placeholder='Last name' value={formData.last_name} onChange={handleChange} style='input-box'/>
				<Field type='email' inputname='email' placeholder='Email' value={formData.email} onChange={handleChange} style='input-box'/>
				<Field type='text' inputname='username' placeholder='Username' value={formData.username} onChange={handleChange} style='input-box'/>
				<Field type='password' inputname='password' placeholder='Password' value={formData.password} onChange={handleChange} style='input-box'/>
				<Field type='password' inputname='confirm_password' placeholder='Confirm password' value={formData.confirm_password} onChange={handleChange} style='input-box'/>
				<div className='input-box'>
					<input type='date' name='birthdate' placeholder='Birthdate' required value={formData.birthdate} onChange={handleChange} />
				  </div>
				  <div className='button-container'>
					<button type="submit">Register</button>
				  </div>
				  <div className="reg-text">Already have an account? <Link to="/login">Login</Link></div>
				</form>
			  </div>
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
					<Route path="/pigeon" element={<MyPigeon />} />
					<Route path="/register" element={<RegistrationForm />} />
					<Route path="/login" element={<LoginForm />} />
				  </Routes>
			</BrowserRouter>
		);
	}
}
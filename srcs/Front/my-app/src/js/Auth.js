import { Link } from 'react-router-dom';
import { Field, Button } from './Components';
import { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Cookies from 'js-cookie';

import '../css/App.css';
import '../css/navbar.css';
import '../css/buttons.css';
import '../css/auth.css';

export const LoginForm = () => {
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
				if (response.data.ok) {
					Cookies.set('access_token', response.data.access_token);
					Cookies.set('refresh_token', response.data.refresh_token);
					console.log(response.data.access_token)
					console.log(response.data.refresh_token)
				}
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
				<Button style='button-container' type='submit' text='Login'/>
				</form>
				<div className="reg-text">Don't have an account? <Link to="/register">Register</Link></div>
			  </div>
		</div>
		
	);
};

export const RegistrationForm = () => {
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
				  <Button style='button-container' type='submit' text='Register'/>
				  <div className="reg-text">Already have an account? <Link to="/login">Login</Link></div>
				</form>
			  </div>
			</div>
		  );
};
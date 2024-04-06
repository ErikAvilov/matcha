import pigeon from './pigeon.png';
import tinder from './tinder-logo.png';
import { AppRouter } from './index.js';

import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import './css/App.css';
import './css/tictactoe.css';
import './css/navbar.css';
import './css/buttons.css';

import { useState, Component } from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter, Link } from 'react-router-dom';


function NavBar() {
	return (
			<nav className='navbar'>
				<a>Matcha</a>
				<ul>
					<li><Link to="/" className='nav-btn'>Home</Link></li>
					<li><Link to="/pigeon" className='nav-btn'>Pigeon</Link></li>
					<li><Link to="/register" className='nav-btn'>Register</Link></li>
				</ul>
			</nav>
	);
}

function Square({ value, onSquareClick }) {
	return <button className='square' onClick={onSquareClick}> { value } </button>;
}

function isWinner(squares) {
	const lines = [
		[0,1,2], // horizontal
		[3,4,5],
		[6,7,8],

		[0,3,6], // vertical
		[1,4,7],
		[2,5,8],

		[0,4,8], // diagonal
		[2,4,6],
	];
	for (let i = 0; i < 8; i++) {
		const [a,b,c] = lines[i];
		if (squares[a] && squares[a] == squares[b] && squares[a] == squares[c])
			return squares[a];
	}
	return null;
}

export function TicTacToe() {
	const [xIsNext, setXIsNext] = useState(true);
	const [squares, setSquares] = useState(Array(9).fill(null));

	function handleClick(i) {
		if (squares[i])
			return ;
		const nextSquares = squares.slice();
		xIsNext ? (nextSquares[i] = "X") : (nextSquares[i] = "O");
		setSquares(nextSquares);
		setXIsNext(!xIsNext);
	}	
	return (
		<>
		<div className='square-container'>
			<div className='board-row'>
				<Square value={squares[0]} onSquareClick={() => handleClick(0)} />
				<Square value={squares[1]} onSquareClick={() => handleClick(1)} />
				<Square value={squares[2]} onSquareClick={() => handleClick(2)} />
			</div>
			<div className='board-row'>
				<Square value={squares[3]} onSquareClick={() => handleClick(3)} />
				<Square value={squares[4]} onSquareClick={() => handleClick(4)} />
				<Square value={squares[5]} onSquareClick={() => handleClick(5)} />
			</div>
			<div className='board-row'>
				<Square value={squares[6]} onSquareClick={() => handleClick(6)} />
				<Square value={squares[7]} onSquareClick={() => handleClick(7)} />
				<Square value={squares[8]} onSquareClick={() => handleClick(8)} />
			</div>
		</div>
			<center>
				<Link to="/" className='pigeon-btn'>Click!</Link>
			</center>
		</>
	);
}

export function MyPigeon() {
	return (
		<div className='App'>
			<header className="App-header">
				<img src={pigeon} className='App-pigeon' alt='pigeon' />
				<Link to="/" className='pigeon-btn'>Click!</Link>
			</header>
		</div>
	);
}

function Home() {
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
		gender: '',
		orientation: '',
		orientation_other: '',
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
		<div className='App'>
			<header className="App-header">
				<form onSubmit={handleSumbit}>
					<input type='text' name='username' placeholder='Username' value={formData.username} onChange={handleChange} />
					<input type='email' name='email' placeholder='Email' value={formData.email} onChange={handleChange} />
					<input type='password' name='password' placeholder='Password' value={formData.password} onChange={handleChange} />
					<input type='text' name='first_name' placeholder='First name' value={formData.first_name} onChange={handleChange} />
					<input type='text' name='last_name' placeholder='Last name' value={formData.last_name} onChange={handleChange} />
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
					<input type='date' name='birthdate' placeholder='Birthdate' value={formData.birthdate} onChange={handleChange} />
					<button type="submit">Register</button>
				</form>
			</header>
		</div>
	);
};

export class App extends Component {
	render() {
		return (
		<div className="container">
			<BrowserRouter>
			<NavBar />
			  <Routes>
				<Route exact path="/" element={<Home />} />
				<Route path="/pigeon" element={<MyPigeon />} />
				<Route path="/game" element={<TicTacToe />} />
				<Route path="/register" element={<RegistrationForm />} />
			  </Routes>
			</BrowserRouter>
		</div>
		);
	}
}
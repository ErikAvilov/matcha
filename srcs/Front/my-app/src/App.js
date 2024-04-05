import pigeon from './pigeon.png';
import tinder from './tinder-logo.png';
import { AppRouter } from './index.js';
import './css/App.css';
import './css/tictactoe.css';
import './css/navbar.css';
import './css/buttons.css';

import { useState, Component } from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter, Link } from 'react-router-dom';

export function MyButton(props) {
	return (
		<button className="pigeon-btn">
			{ props.text }
		</button>
	);
}

export function NavBar() {
	return (
			<nav className='navbar'>
				<Link to="/" className='pigeon-btn'>Home</Link>
				<Link to="/pigeon" className='pigeon-btn'>Pigeon</Link>
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
			  </Routes>
			</BrowserRouter>
		</div>
		);
	}
}
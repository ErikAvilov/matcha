import logo from './logo.svg';
import pigeon from './pigeon.png'
import './App.css';

function MyButton() {
	return (
		<button>
			Click!
		</button>
	);
}

let bird = 1;

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
		{bird == 0 ? (
			<img src={pigeon} className="App-pigeon" alt="pigeon" />) :
			(<img src={logo} className="App-logo" alt="logo" />)}
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
		  >
          Learn React
        </a>
      </header>
    </div>
  );
}

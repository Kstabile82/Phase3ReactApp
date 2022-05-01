import logo from './logo.svg';
import './App.css';
import rescue from './Rescue'

function App() {

  //fetch rescues here 
  //login screen here for rescue ID
  //show all rescues 
    //filter rescues by location
    //filter rescues by animal type
    //update rescues to accepting volunteers, if yes, show them and have button linking to email 
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
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

export default App;

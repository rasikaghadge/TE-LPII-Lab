import logo from './logo.svg';
import './App.css';
import Counter from "./components/Counter"
import Theme from "./components/Theme"
import Data from './components/Data';

function App() {
  return (
    <div className="App">
      <Counter/>
      <Theme/>
      <Data></Data>
    </div>
  );
}

export default App;

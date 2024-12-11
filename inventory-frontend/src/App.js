import logo from "./logo.svg";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Products from "./components/Product";

function App() {
  return (
    <div className="container">
      <div className="card">
        <Products />
      </div>
    </div>
  );
}

export default App;

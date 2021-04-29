import "./App.css";
import FunFolder from "./FunFolder";
import HomePage from "./HomePage";
import "bootstrap/dist/css/bootstrap.css";
import { Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Route path="/" exact component={HomePage}></Route>
      <Route path="/fun" exact component={FunFolder}></Route>
    </div>
  );
}

export default App;

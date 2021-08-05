import { BrowserRouter as Router, Route, Switch, } from "react-router-dom";
import "./scss/App.scss";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Signup from "./components/Signup";
import Login from "./components/Login";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path='/Signup'>
            <Header/>
            <Signup />
          </Route>
          <Route path='/Login'>
            <Header/>
            <Login />
          </Route>
          <Route path='/'>
            <Header />
            <SearchBar />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

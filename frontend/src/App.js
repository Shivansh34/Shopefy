import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbarcomp";

// Screens
import HomeScreen from "./Screens/HomeScreen";
import ProductScreen from "./Screens/ProductScreen";
import CartScreen from "./Screens/CartScreen";
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import ReviewScreen from "./Screens/ReviewScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import PrivateRoute from "./Screens/routesp/privateroutes";

function App() {
  return (
    <Router>
      <Navbar  />
      <main className="app">
        <Switch>
          <Route exact path="/login"component={LoginScreen}/>
          <Route exact path="/register" component={RegisterScreen}/>
          <Route exact path="/" component={HomeScreen} />
          <Route exact path="/product/:id" component={ProductScreen} />
          <Route exact path="/profile" component={ProfileScreen} />
          <PrivateRoute exact path="/product/:id/addreview" component={ReviewScreen} />
          <PrivateRoute exact path="/cart" component={CartScreen} />
        </Switch>
      </main>
    </Router>
  );
}

export default App;

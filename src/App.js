import "./App.css";
import Footer from "./components/Footer";
import Signup from "./components/Signup";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import { AuthProvider } from "./context/AuthProvider";
import Account from "./components/Account";
import PrivateRoute from "./components/PrivateRoute";
import ResetPassword from "./components/ResetPassword";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/reset-password" component={ResetPassword} />
            <PrivateRoute path="/account" component={Account} />
          </Switch>
        </AuthProvider>
      </Router>
      <Footer />
    </div>
  );
}

export default App;

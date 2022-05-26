import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { Signup } from "./components/Login/Signup";
import { Login } from "./components/Login/login";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { AuthProvider } from './components/Login/Auth';
import { PrivateRoute } from './components/Login/PrivateRoute';

function App() {

  return (
    <div>
    <h1>Welcome to Budgie</h1>
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path="/" component={Dashboard} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
         </Switch>
      </AuthProvider>
    </Router>
  </div>
  );
}

export default App;
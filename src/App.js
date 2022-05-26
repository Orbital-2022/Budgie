import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { Signup } from "./components/login/Signup";
import { Login } from "./components/login/Login";
import { Dashboard } from "./components/login/Dashboard";
import { AuthProvider } from './components/login/Auth';
import { PrivateRoute } from './components/login/PrivateRoute';

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
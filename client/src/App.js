import './App.css';
import store from './store'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Footer from './components/layout/Footer'

import Register from './auth/Register';
import Login from './auth/Login'

import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import { logoutUser, setCurrentUser } from './actions/authAction';
import PrivateRoutes from './common/PrivateRoutes';

import Dashboard from './components/dashboard/Dashboard'
import CreateProfile from './components/createProfile/CreateProfile';
import AddMovies from './components/createProfile/AddMovies';
import UserProfile from './components/profile/UserProfile';
import { clearCurrentProfile } from './actions/profileAction';
import Lists from './components/Movies/Lists';
import SingleMovie from './components/SingleMovie/SingleMovie';

import NotFound from './components/notFound/NotFound'

// check for token
if(localStorage.jwtToken){
  // set the header of auth
  setAuthToken(localStorage.jwtToken)
  // decode token and get user info
  const decoded = jwt_decode(localStorage.jwtToken)
  // set user and is authenticated
  store.dispatch(setCurrentUser(decoded))

  // check for expired token
  const currentTime = Date.now()/1000
  if(decoded.exp < currentTime){
    // Logout user
    store.dispatch(logoutUser());
    // TODO: clr current prof
    store.dispatch(clearCurrentProfile())
    // redirect to login
    window.location.href = '/login'
  }
}

function App() {
  return (
    <Provider store={store}>
    <Router>
      <div className="App">
        <Navbar />
        <Route exact path="/">
          <Landing />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Switch>
            <PrivateRoutes component={Dashboard} exact path="/dashboard" />
        </Switch>
        <Switch>
            <PrivateRoutes component={CreateProfile} exact path="/create-profile" />
        </Switch>
        <Switch>
            <PrivateRoutes component={AddMovies} exact path="/add-movies" />
        </Switch>
        <Route exact path="/profile/:handle" render={(props) =>  <UserProfile {...props} />} />
        <Route exact path="/movies" component={Lists} />
        <Route exact path="/movies/:movie_id" component={SingleMovie} />
        <Route exact path="/not-found">
          <NotFound />
        </Route>
            
      </div>
      <footer>
        <Footer />
      </footer>
    </Router>    
    </Provider>
  );
}

export default App;

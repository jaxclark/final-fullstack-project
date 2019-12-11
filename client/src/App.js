import React, { useContext, useEffect } from 'react';
import { WriterContext } from './ContextProvider.js'
import { Route, Switch, Redirect } from 'react-router-dom'
import Navbar from './Navbar'
import Signup from './Auth/Signup'
import Login from './Auth/Login'
import ProtectedRoute from './Auth/ProtectedRoute'
import LandingPage from './Profile/LandingPage'

function App() {
  const { token } = useContext(WriterContext)

  return (
    <div className="app">
      <Navbar />
      <Switch>
        <Route path='/signup' render={() => token !== '' ? <Redirect to='/landingpage' /> : <Signup />} />
        <Route path='/login' render={() => token !== '' ? <Redirect to='/landingpage' /> : <Login />} />
        <Route exact path="/" render={() => <Redirect to='/login'/>} />
        <ProtectedRoute path="/landingpage" component={LandingPage} ></ProtectedRoute>
      </Switch>
    </div>
  );
}

export default App;
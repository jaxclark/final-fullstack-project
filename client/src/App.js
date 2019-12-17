import React, { useContext, useEffect } from 'react';
import { WriterContext } from './ContextProvider.js'
import { Route, Switch, Redirect } from 'react-router-dom'
import Navbar from './Navbar'
import Signup from './Auth/Signup'
import Login from './Auth/Login'
import ProtectedRoute from './Auth/ProtectedRoute'
import LandingPage from './Profile/LandingPage'
import StoriesPage from './Profile/StoriesPage.js';
import SingleStory from './Profile/SingleStory.js';
import OutlinesPage from './Profile/OutlinesPage.js';
import NewOutline from './Profile/NewOutline.js';

function App() {
  const { token } = useContext(WriterContext)

  return (
    <div className="app">
      <Navbar />
      <Switch>
        <Route path='/signup' render={() => token ? <Redirect to='/landingpage' /> : <Signup />} />
        <Route path='/login' render={() => token ? <Redirect to='/landingpage' /> : <Login />} />
        <Route exact path="/" render={() => <Redirect to='/login'/>} />
        <ProtectedRoute path="/landingpage" component={LandingPage} ></ProtectedRoute>
        <ProtectedRoute path='/stories' component={StoriesPage} ></ProtectedRoute>
        <ProtectedRoute path='/story/:storyId' component={SingleStory} ></ProtectedRoute>
        <ProtectedRoute path='/outlines' component={OutlinesPage} ></ProtectedRoute>
        <ProtectedRoute path='/newoutline' component={NewOutline} ></ProtectedRoute>
      </Switch>
    </div>
  );
}

export default App;
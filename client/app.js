import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import { Grid } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';

import { CohortContextProvider } from './context/cohortContext';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import MakePairs from './components/Pairs/MakePairs';
import EditStudents from './components/Edit/EditStudents';
import CreateCohort from './components/cohort/CreateCohort';
import Login from './components/Login';
import Signup from './components/Signup';

const App = () => {

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Router>
          <CohortContextProvider>
            <Header />
            <Switch>
              <>
                <Grid container>
                  <Grid item xs={1} />
                  <Grid item xs={10}>
                    <Route
                      path="/"
                      exact
                      render={(props) => <LandingPage {...props} />}
                    />
                    <Route
                      path="/pairs"
                      exact
                      render={(props) => <MakePairs {...props}/>}
                    />
                    <Route
                      path="/edit"
                      exact
                      render={(props) => <EditStudents {...props} />}
                    />
                    <Route
                      path="/login"
                      exact
                      render={(props) => <Login {...props} />}
                    />
                    <Route
                      path="/signup"
                      exact
                      render={(props) => <Signup {...props} />}
                    />
                    <Route
                      path="/create"
                      exact
                      render={(props) => <CreateCohort {...props} />}
                    />
                  </Grid>
                  <Grid item xs={1} />
                </Grid>
              </>
            </Switch>
          </CohortContextProvider>
        </Router>
      </ThemeProvider>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('pair-o-matic'));
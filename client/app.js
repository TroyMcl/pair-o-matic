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
import MakePairs from './components/Pairs/MakePairs';
import Header from './components/Header';
import LandingPage from './components/LandingPage'

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
                      render={(props) => <MakePairs {...props} />}
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
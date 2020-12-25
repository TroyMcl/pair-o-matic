import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import { Grid } from '@material-ui/core'
import ReactDOM from 'react-dom';
import MakePairs from './components/Pairs/MakePairs';
import Header from './components/Header';
import { CohortContextProvider } from './context/cohortContext';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';

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
                    <Route path="/">
                      <MakePairs />
                    </Route>
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
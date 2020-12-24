import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import { Grid } from '@material-ui/core'
import ReactDOM from 'react-dom';
import axios from 'axios';
import MakePairs from './components/Pairs/MakePairs';
import Header from './components/Header';
import { CohortContextProvider } from './context/cohortContext';

const App = () => {

  return (
    <div>
      <Router>
        <CohortContextProvider>
          <Header />
          <Switch>
            <>
            <Grid container>
              <Route path="/">
                <MakePairs />
              </Route>
            </Grid>
            </>
          </Switch>
        </CohortContextProvider>
      </Router>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('pair-o-matic'));
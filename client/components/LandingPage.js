import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CohortContext } from '../context/cohortContext';
import {
  Box,
  TextField,
  Button,
  makeStyles,
  Typography
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  existingCohortContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 15
  },
  inputText: {
    fontSize: 24,
    width: 250,
  },
  pairButtons: {
    margin: 15,
    textDecoration: 'none',
  }
}))


const LandingPage = (props) => {
  const [isError, setIsError] = useState(false);

  const { fetchRoster, selectedCohort, setSelectedCohort } = useContext(CohortContext);
  const classes = useStyles();

  const updateSelectedCohort = (char) => {
    setSelectedCohort(char);
  }

  const queryDatabase = () => {
    fetchRoster(selectedCohort)
  }

  return (
    <Box>
      <Box className={classes.existingCohortContainer}>
        <TextField
          className={classes.inputText}
          error={isError}
          id="select-cohort"
          label="Select Cohort"
          value={selectedCohort}
          placeholder="Select Cohort Number"
          color='secondary'
          onChange={(e) => updateSelectedCohort(e.target.value)}
        />
        <Link
          to="/pairs"
          className={classes.pairButtons}
        >
          <Button
            onClick={() => queryDatabase()}
            variant="contained"
            color='secondary'
          >
            Generate Pairs
          </Button>
        </Link>
        <Link
            to="/edit"
            className={classes.pairButtons}
          >
          <Button
            onClick={() => queryDatabase()}
            variant="contained"
            color='secondary'
          >
            Edit Cohort or Student
          </Button>
        </Link>
      </Box>
      <Link
        to="/create"
        className={classes.pairButtons}
      >
        <Button
          variant='contained'
          color='primary'
        >
          Create New Cohort
        </Button>
      </Link>
    </Box>
  )
}

export default LandingPage;
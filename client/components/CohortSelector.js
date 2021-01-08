import React, { useContext } from 'react';
import { CohortContext } from '../context/cohortContext';
import {
  makeStyles,
  Box,
  TextField,
  Button,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center'
  },
  buttonStyles: {
    marginLeft: 15,
    fontSize: 12
  }
}))

const CohortSelector = (props) => {
  const { fetchRoster, selectedCohort, setSelectedCohort } = useContext(CohortContext);
  const classes = useStyles();

  return (
    <Box className={classes.root} >
      <TextField
        className={classes.inputText}
        size="small"
        id="select-cohort"
        label="Select Cohort"
        value={selectedCohort}
        placeholder="Select Cohort Number"
        color='secondary'
        onChange={(e) => setSelectedCohort(e.target.value)}
      />
      <Button
        className={classes.buttonStyles}
        variant="contained"
        size="small"
        color="secondary"
        onClick={() => fetchRoster(selectedCohort)}
      >
        Roster
        </Button>
    </Box>
  )
}

export default CohortSelector;

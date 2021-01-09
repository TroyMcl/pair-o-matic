import React, { useState, useContext } from 'react';
import CohortSelector from './CohortSelector';
import { CohortContext } from '../context/cohortContext';
import {
  Box,
  makeStyles,
  Typography
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: 240,
  },
  paragraphStyles: {
    marginTop: 15,
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
    <Box style={{marginLeft: 240}}>
        <CohortSelector />
        <Typography paragraph className={classes.paragraphStyles}>
          Please enter a cohort number and click the ROSTER button if you wish to generate pairs, edit a student or a cohort. Then select the appropriate option on the left.
        </Typography>
        <Typography paragraph className={classes.paragraphStyles}>
          If you wish to create a new cohort just click on Create New Cohort on the left, no need to enter a cohort number here.
        </Typography>
    </Box>
  )
}

export default LandingPage;
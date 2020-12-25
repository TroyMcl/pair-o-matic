import React, { useContext, useState } from 'react';
import { CohortContext } from '../../context/cohortContext';
import PairDisplay from './PairDisplay';

import {
  Grid,
  Typography,
  Box,
  Button
} from '@material-ui/core'

const Roster = ({ student }) => {
  const { name, previousPairs } = student;
  const {customPairDisplay, setCustompairDisplay } = useState();
  return (
    <>
      <Typography variant="body2" >{name} </Typography>
    </>
  )
}

const MakePairs = (props) => {
  const { cohort } = useContext(CohortContext);

  if (cohort.length === 0) {
    return <p>Select a Cohort</p>
  }

  return (
    <Box>
      <p>Roster</p>
      <Grid container>
        {cohort.map(student => {
          return (
            <Grid item xs={6} sm={3}>
              <Roster student={student} />
            </Grid>
          )
        })}
      </Grid>
      <Grid container>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => console.log('stuff')}
        >
          Create Custom Pair
        </Button>
      </Grid>
      <PairDisplay />
    </Box>
  )
}

export default MakePairs;
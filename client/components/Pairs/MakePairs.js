import React, { useContext, useState } from 'react';
import { CohortContext } from '../../context/cohortContext';
import PairDisplay from './PairDisplay';

import {
  Grid,
  Typography,
  Box,
  Button
} from '@material-ui/core'

const Roster = ({student}) => {
  const { customPairDisplay, setCustompairDisplay } = useState();
  return (
    <>
      <Typography variant="body2" >{student} </Typography>
    </>
  )
}

const MakePairs = (props) => {
  const { cohort, roster } = useContext(CohortContext);
  const [selectedPairs, setSelectedPairs] = useState([]);

  const addPairDisplayComponent = () => {
    console.log('stuff')
    setSelectedPairs([...selectedPairs, []])
  }

  if (cohort.length === 0) {
    return <p>Select a Cohort</p>
  }

  return (
    <Box>
      <p>Roster</p>
      <Grid container>
        {roster.map(student => {
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
          onClick={() => addPairDisplayComponent()}
        >
          Create Custom Pair
        </Button>
      </Grid>
      {selectedPairs.map(pair => {
        return <PairDisplay pair={pair} />
      })}
    </Box>
  )
}

export default MakePairs;
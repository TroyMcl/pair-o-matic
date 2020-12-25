import React, { useContext, useState } from 'react';
import { CohortContext } from '../../context/cohortContext';
import PairDisplay from './PairDisplay';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import {
  Grid,
  Typography,
  Box,
  Button,
  makeStyles
} from '@material-ui/core'

const useStyles = makeStyles( theme => ({
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 15,
  }
}))

const searchSelectedPairs = (student, selectedPairs) => {
  let count = 0;
  for(let i = 0; i < selectedPairs.length; i++) {
    if(selectedPairs[i][0]){
      if (selectedPairs[i][0].name === student) {
        count++;
      }
    }
    if(selectedPairs[i][1]) {
      if(selectedPairs[i][1].name === student) {
        count++;
      }
    }
  }
  return count;
}

const Roster = ({student, selectedPairs}) => {
  const count = searchSelectedPairs(student, selectedPairs)
  if(count === 0) {
    return (
      <Box display="flex">
        <Box style={{width: '20px'}} />
        <Typography variant="body2" >{student} </Typography>
      </Box>
    )
  } else if (count === 1) {
    return (
      <Box display="flex">
        <Box style={{width: '20px'}}>
          <CheckCircleIcon color='secondary' fontSize="small"/>
        </Box>
        <Typography variant="body2" >{student} </Typography>
      </Box>
    )
  } else {
    return (
      <Box display="flex">
        <Box style={{width: '20px'}}>
          <CheckCircleIcon style={{color: '#ed1c27'}} fontSize="small"/>
        </Box>
        <Typography variant="body2" >{student} </Typography>
      </Box>
    )
  }
}

const MakePairs = (props) => {
  const classes = useStyles();
  const { cohort, roster } = useContext(CohortContext);
  const [selectedPairs, setSelectedPairs] = useState([]);

  const addPairDisplayComponent = () => {
    console.log('stuff')
    setSelectedPairs([...selectedPairs, []])
  }

  const addPairToSelectedPairs = (student1, student2, index) => {
    const index1 = cohort.findIndex(student => student.name === student1);
    const index2 = cohort.findIndex(student => student.name === student2);
    const updatedSelectedPairs = [...selectedPairs];
    updatedSelectedPairs[index] = [cohort[index1], cohort[index2]];
    setSelectedPairs(updatedSelectedPairs);
  };

  const removePair = (index) => {
    selectedPairs.splice(index, 1);
    setSelectedPairs([...selectedPairs]);
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
            <Grid item xs={6} sm={3} key={student}>
              <Roster student={student} selectedPairs={selectedPairs}/>
            </Grid>
          )
        })}
      </Grid>
      <Box className={classes.buttonContainer} >
        <Button
          variant="contained"
          color="secondary"
          onClick={() => addPairDisplayComponent()}
        >
          Create Custom Pair
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => console.log("will be a request")}
        >
          Generate Pairs
        </Button>
      </Box>
      {selectedPairs.map((pair, i) => {
        return (<PairDisplay
                  key={i}
                  pair={pair}
                  index={i}
                  removePair={removePair}
                  addPairToSelectedPairs={addPairToSelectedPairs}
                />)
      })}
    </Box>
  )
}

export default MakePairs;
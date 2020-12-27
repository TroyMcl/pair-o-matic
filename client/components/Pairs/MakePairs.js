import React, { useContext, useState } from 'react';
import { CohortContext } from '../../context/cohortContext';
import PairDisplay from './PairDisplay';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import axios from 'axios';

import {
  Grid,
  Typography,
  Box,
  Button,
  makeStyles
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 15,
  }
}))

const searchSelectedPairs = (student, selectedPairs) => {
  let count = 0;
  for (let i = 0; i < selectedPairs.length; i++) {
    if (selectedPairs[i][0]) {
      if (selectedPairs[i][0].name === student) {
        count++;
      }
    }
    if (selectedPairs[i][1]) {
      if (selectedPairs[i][1].name === student) {
        count++;
      }
    }
  }
  return count;
}

const Roster = ({ student, selectedPairs }) => {
  const count = searchSelectedPairs(student, selectedPairs)
  if (count === 0) {
    return (
      <Box display="flex">
        <Box style={{ width: '20px' }} />
        <Typography variant="body2" >{student} </Typography>
      </Box>
    )
  } else if (count === 1) {
    return (
      <Box display="flex">
        <Box style={{ width: '20px' }}>
          <CheckCircleIcon color='secondary' fontSize="small" />
        </Box>
        <Typography variant="body2" >{student} </Typography>
      </Box>
    )
  } else {
    return (
      <Box display="flex">
        <Box style={{ width: '20px' }}>
          <CheckCircleIcon style={{ color: '#ed1c27' }} fontSize="small" />
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
  const [pairsList, setPairsList] = useState([]);
  const [pairsListIndex, setPairsListIndex] = useState(0);

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

  const generatePairs = (cohortNum) => {
    const data = { data: selectedPairs };
    axios.post(`api/pairomatic/${cohortNum}`, data)
      .then(data => {
        console.log(data.data.message)
        setPairsList(data.data.message);
        setSelectedPairs(data.data.message[0])
      })
  }

  const viewDifferentConfiguration= (increment) => {
    let nextView = pairsListIndex + increment;
    if(nextView < 0) {
      nextView = pairsList.length -1;
    } else if(nextView === pairsList.length) {
      nextView = 0;
    }
    setPairsListIndex(nextView);
    setSelectedPairs([])
    setSelectedPairs([...pairsList[nextView]])
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
              <Roster student={student} selectedPairs={selectedPairs} />
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
          onClick={() => generatePairs(25)}
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
      {pairsList.length === 0 ? '':
        <Box>
          <Typography>Viewing Configuration {pairsListIndex + 1} of {pairsList.length}</Typography>
          <Button
            variant="contained"
            onClick={() => viewDifferentConfiguration(-1)}
            color="secondary"
          >
            Previous
          </Button>
          <Button
            variant="contained"
            onClick={() => viewDifferentConfiguration(1)}
            color="secondary"
          >
            Next
          </Button>
        </Box>
      }
    </Box>
  )
}

export default MakePairs;
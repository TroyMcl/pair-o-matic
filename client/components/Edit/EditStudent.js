import React, { useState, useContext } from 'react';
import { CohortContext } from '../../context/cohortContext';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  Grid,
  TextField,
  Button,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  addButton: {
    fontSize: 12
  },
  inputStyles: {
    marginTop: 7,
    width: '80%'
  }
}))


const EditStudent = ({ student }) => {
  const classes = useStyles();
  const { fetchRoster } = useContext(CohortContext);

  const [studentName, setStudentName] = useState(student.name)
  const [studentCohort, setStudentCohort] = useState(student.cohort);
  const [pairName, setPairName] = useState('');
  const [previousPairs, setPreviousPairs] = useState([]);

  return (
    <Grid container>
      <Grid item xs={6}>
        <TextField
          className={classes.inputStyles}
          size="small"
          id="student-name"
          label="Student Name"
          value={studentName}
          placeholder="Student Name"
          color='secondary'
          onChange={(e) => setStudentName(e.target.value)}
        />
        <TextField
          classname={classes.inputStyles}
          size="small"
          id="student-cohort"
          label="Cohort"
          value={studentCohort}
          placeholder="Cohort"
          color='secondary'
          onChange={(e) => setStudentCohort(e.target.value)}
        />
        <TextField
          size="small"
          id="pair-name"
          label="Pair Name"
          value={pairName}
          placeholder="Select Cohort Number"
          color='secondary'
          onChange={(e) => setPairName(e.target.value)}
        />
        <Button
          className={classes.addButton}
          variant="contained"
          size="small"
          color="secondary"
          onClick={() => console.log('update array')}
        >
          Add Pair
        </Button>
      </Grid>
      <Grid item xs={6} container>
        {previousPairs.map(name => (
          <Button
            variant="contained"
            size="small"
            onClick={() => console.log('remove me!')}
            endIcon={<DeleteIcon />}
          >
            {name}
          </Button>
        ))
        }
      </Grid>
    </Grid>
  )
}

export default EditStudent;
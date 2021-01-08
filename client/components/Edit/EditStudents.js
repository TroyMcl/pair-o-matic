import React, { useState, useContext, useEffect } from 'react';
import CohortSelector from '../CohortSelector';
import { CohortContext } from '../../context/cohortContext';
import EditStudent from './EditStudent';
import {
  Grid,
  Box,
  Button,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    marginLeft: 240
  },
  studentBtn: {
    borderRadius: 10,
    backgroundColor: '#c0c2c4',
    fontSize: 12,
    margin: 5
  },
  rosterContainer: {
    marginTop: '15px',
    marginBottom: '15px',
    borderBottom: '1px solid lightgray'
  }
}))

const EditStudents = (props) => {
  const classes = useStyles();
  const { setSelectedCohort, selectedCohort, roster, cohort, setCohort, fetchRoster } = useContext(CohortContext);
  const [rosterLoaded, setRosterLoaded] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState('');

  useEffect(() => {
    if(roster.length > 0) {
      setRosterLoaded(true)
    }
  },[roster])

  const pickStudent = (studentName) => {
    const student = cohort.find(s => s.name === studentName);
    setSelectedStudent(student);
  }

  if(roster.length === 0) {
    return (
      <Box className={classes.root}>
        <CohortSelector />
      </Box>)
  }

  return (
    <Box className={classes.root}>
      <CohortSelector />
      <Grid container className={classes.rosterContainer}>
        {roster.map(student => {
          return (
            <Grid item xs={4} sm={3} key={student}>
              <Button
                size="small"
                className={classes.studentBtn}
                variant="contained"
                onClick={() => pickStudent(student)}
              >
                {student}
              </Button>
            </Grid>
          )
        })}
      </Grid>
      {!selectedStudent ? '':
        <EditStudent selectedStudent={student} />
      }
    </Box>
  )
}

export default EditStudents;
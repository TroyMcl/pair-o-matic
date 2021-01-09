import React, { useState, useContext, useEffect } from 'react';
import { CohortContext } from '../../context/cohortContext';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  Grid,
  TextField,
  Button,
  makeStyles,
  Box,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Typography
} from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  addButton: {
    fontSize: 12
  },
  inputStyles: {
    marginTop: 7,
    width: '80%'
  },
  pairBox: {
    marginTop: 7,
    display: 'flex',
    alignItems: 'center'
  },
  buttonContainer: {
    display: 'flex',
    margin: '15px 7px',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  deleteButton: {
    backgroundColor: '#fc032c'
  },
  pairSelector: {
    width: '50%',
    marginRight: 10
  },
  studentBtn: {
    borderRadius: 10,
    backgroundColor: '#c0c2c4',
    fontSize: 12,
    margin: 5
  },
  previousPairsTitle: {
    display: 'block',
    margin: '7px',
    BorderBottom: '1px solid lightgray'
  }
}))


const EditStudent = ({ student, unselectStudent }) => {
  const classes = useStyles();
  const { selectedCohort, roster, cohort, fetchRoster } = useContext(CohortContext);
  const previousName = student.name;

  const [studentName, setStudentName] = useState(student.name)
  const [studentCohort, setStudentCohort] = useState(student.cohort);
  const [pairName, setPairName] = useState('');
  const [previousPairs, setPreviousPairs] = useState([]);

  useEffect(() => {
    setStudentName(student.name);
    setStudentCohort(student.cohort);
    setPreviousPairs(student.previousPairs);
    setPairName('');
  }, [student.name])

  const updatePairs = (action, targetName) => {
    const studentOne = cohort.find(s => s.name === previousName);
    const studentTwo = cohort.find(s => s.name === pairName);
    if (action === 'add') {
      studentOne.previousPairs.push(studentTwo.name);
      studentTwo.previousPairs.push(studentOne.name);
    } else {
      const s = cohort.find(student => student.name === targetName);
      studentOne.previousPairs.splice(studentOne.previousPairs.indexOf(targetName), 1);
      s.previousPairs.splice(s.previousPairs.indexOf(studentOne.name), 1);
    }
    setPreviousPairs([...studentOne.previousPairs]);
  }

  const saveChanges = () => {

    const studentOne = cohort.find(s => s.name === previousName) || {};
    studentOne.name = studentName;
    studentOne.cohort = studentCohort;
    studentOne.previousPairs = previousPairs;
    console.log(studentOne);

    axios.patch(`${window.location.origin}/api/student`, studentOne)
      .then(() => {
        return axios.patch(`${window.location.origin}/api/cohort/${selectedCohort}`, cohort)
      })
      .then(() => {
        fetchRoster(selectedCohort)
        unselectStudent();
      })
      .catch(err => {
        console.log('error saving', err)
      })
  }

  const removeStudent = () => {
    const studentObj = cohort.find(s => s.name === previousName);
    const id = studentObj._id;
    axios.delete(`${window.location.origin}/api/student`, {
      params: {
        id,
      }
    })
      .then(() => {
        fetchRoster();
        unselectStudent();
      })
      .catch(err => {
        console.log('error', err)
      })
  }

  return (
    <Grid container>
      <Grid item xs={6} style={{}}>
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
          className={classes.inputStyles}
          size="small"
          id="student-cohort"
          label="Cohort"
          value={studentCohort}
          placeholder="Cohort"
          color='secondary'
          onChange={(e) => setStudentCohort(e.target.value)}
        />
        <Box className={classes.pairBox}>
          <FormControl className={classes.pairSelector}>
            <InputLabel id="pair-name-label">Pair Name</InputLabel>
            <Select
              labelId="pair-name-label"
              id="pair-name"
              value={pairName}
              onChange={(e) => setPairName(e.target.value)}
            >
              <MenuItem value={''}>None</MenuItem>
              {roster.map(name => <MenuItem value={name} key={name}>{name}</MenuItem>)}
            </Select>
          </FormControl>
          <Button
            className={classes.addButton}
            variant="contained"
            size="small"
            color="secondary"
            onClick={() => updatePairs('add')}
          >
            Add Pair
        </Button>
        </Box>
        <Box className={classes.buttonContainer}>
          <Button
            variant="contained"
            size="small"
            className={classes.deleteButton}
            onClick={() => removeStudent()}
          >
            Delete Student
          </Button>
          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={() => saveChanges()}
          >
            Save Changes
          </Button>
        </Box>
      </Grid>
      <Grid item xs={6} >
        <Typography type="button" className={classes.previousPairsTitle}>Prevous Pairs:</Typography>
        {previousPairs.map((name, i) => (
          <Box key={i}>
            <Button
              className={classes.studentBtn}
              variant="contained"
              size="small"
              onClick={() => updatePairs('remove', name)}
              endIcon={<DeleteIcon />}
            >
              {name}
            </Button>
          </Box>
        ))
        }
      </Grid>
    </Grid>
  )
}

export default EditStudent;
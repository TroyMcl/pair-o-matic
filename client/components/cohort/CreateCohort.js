import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  makeStyles,
  TextField,
  Box,
  Button,
  IconButton,
  Grid,
} from '@material-ui/core';
import axios from 'axios';
import PreviousPairs from './PreviousPairs';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
  buttonContainer: {
    paddingBotton: 15,
    marginTop: 15,
    marginBottom: 25,
    display: 'flex',
    justifyContent: 'space-between'
  },
  inputStyling: {
    marginRight: 10
  },
  studentButton: {
    borderRadius: 10,
    backgroundColor: '#c0c2c4'
  },
  deleteStudentButton: {
    marginLeft: 10
  }
}))


const CreateCohort = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const [cohort, setCohort] = useState('');
  const [firstName, setFristName] = useState('');
  const [lastName, setLastName] = useState('');

  const [studentList, setStudentList] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [viewPreviousPairs, setViewPreviousPairs] = useState(false);

  const updateStudentList = () => {
    const newStudent = {
      name: `${firstName} ${lastName}`,
      cohort: Number(cohort),
      previousPairs: []
    }
    setStudentList([...studentList, newStudent]);
    setFristName('');
    setLastName('');
  }

  const removeStudent = (student) => {
    const studentIndex = studentList.findIndex(student => student.name === student);
    studentList.splice(studentIndex, 1);
    setStudentList([...studentList]);
  }

  const saveCohort = () => {
    axios.patch(`/api/cohort/${cohort}`, studentList)
      .then(res => {
        setCohort('');
        setFristName('');
        setLastName('');
        setStudentList([]);
        setSelectedStudent('');
        setViewPreviousPairs(false);
        history.push('/');
      })
      .catch(err => {
        console.log('Err adding Cohort', err)
      })
  }

  return (
    <Box style={{marginLeft: '240px'}}>
      <Box>
        <TextField
          id='Cohort'
          label='cohort'
          value={cohort}
          required
          onChange={(e) => setCohort(e.target.value)}
        />
      </Box>
      <TextField
        className={classes.inputStyling}
        id='first-name'
        label='First Name'
        value={firstName}
        required
        onChange={(e) => setFristName(e.target.value)}
      />
      <TextField
        className={classes.inputStyling}
        id='last-name'
        label='Last Name'
        value={lastName}
        required
        onChange={(e) => setLastName(e.target.value)}
      />
      <Button
        variant='contained'
        color='secondary'
        disabled={firstName && lastName && cohort ? false : true}
        onClick={() => updateStudentList()}
      >
        Add
      </Button>
      {studentList.length === 0 ? "" :
        <Box>
          <p>Roster For Cohort: {cohort}</p>
          <Grid container>
            {studentList.map(student => {
              return (
                <Grid item
                  xs={6} sm={3}
                  key={student.name}
                >
                  <Button
                    onClick={() => {
                      setSelectedStudent(student.name)
                      setViewPreviousPairs(true)
                    }}
                    variant='contained'
                    size='small'
                    className={classes.studentButton}
                  >{student.name}</Button>
                  <IconButton
                    className={classes.deleteStudentButton}
                    size='small'
                    onClick={() => removeStudent(student.name)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              )
            })}
          </Grid>
          <Box className={classes.buttonContainer}>
            <Button
              variant='contained'
              color='secondary'
              onClick={() => setViewPreviousPairs(true)}
            >
              Add Previous Pairs
              </Button>
            <Button
              variant='contained'
              color='primary'
              onClick={() => saveCohort()}
            >
              Save Cohort
              </Button>
          </Box>
        </Box>
      }
      {viewPreviousPairs ? <PreviousPairs
        studentList={studentList}
        setStudentList={setStudentList}
        selectedStudent={selectedStudent}
      /> : ''}
    </Box>
  )
}

export default CreateCohort;
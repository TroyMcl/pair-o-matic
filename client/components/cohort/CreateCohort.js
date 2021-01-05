import React, { useState, useContext} from 'react';
import {
  makeSytles,
  TextField,
  Box,
  Button
} from '@material-ui/core';


const CreateCohort = (props) => {
  const [cohort, setCohort] = useState('');
  const [firstName, setFristName] = useState('');
  const [lastName, setLastName] = useState('');
  const [studentList, setStudentList] = useState([]);

  const updateCohortNum = (val) => {
    setCohort(val);
  }

  const updateStudent = (input, value) => {
    input(value);
  }

  const updateStudentList = () => {
    const newStudent = {
      name: `${firstName} ${lastName}`,
      cohort: cohort,
      previousPairs: []
    }
    setStudentList([...studentList, newStudent]);
    setFristName('');
    setLastName('');
  }

  return(
    <Box>
      <Box>
        <TextField
          id="Cohort"
          label="cohort"
          value={cohort}
          required
          onChange={(e) => updateCohortNum(e.target.value)}
        />
      </Box>
      <TextField
        id="first-name"
        label="First Name"
        value={firstName}
        required
        onChange={(e) => updateStudent(setFristName, e.target.value)}
      />
      <TextField
        id="last-name"
        label="Last Name"
        value={lastName}
        required
        onChange={(e) => updateStudent(setLastName, e.target.value)}
      />
      <Button
        color='secondary'
        disabled={firstName && lastName && cohort ? false: true}
        onClick={() => updateStudentList()}
      >
        Add
      </Button>
    </Box>
  )
}

export default CreateCohort;
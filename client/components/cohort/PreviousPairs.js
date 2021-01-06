import React, { useState, useEffect } from 'react';
import {
  Grid,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  makeStyles,
  Button
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles(theme => ({
  selectBox: {
    display: 'block',
    margin: theme.spacing(1),
    minWidth: 200
  },
  removeBtn: {
    borderRadius: 10,
    backgroundColor: '#c0c2c4'
  }
}))

const PreviousPairs = ({ studentList, setStudentList, selectedStudent }) => {
  const classes = useStyles();
  const [studentOne, setStudentOne] = useState(selectedStudent || '');
  const [studentTwo, setStudentTwo] = useState('');
  const [pairsArray, setPairsArray] = useState([]);

  useEffect(() => {
    setStudentOne(selectedStudent);
    setStudentTwo('');
    let studentObj = studentList.find(student => student.name === selectedStudent);
    if (studentObj) {
      setPairsArray(studentObj.previousPairs);
    }
  }, [selectedStudent])

  const selectStudent = (student, name) => {
    if (student === setStudentOne) {
      let studentObj = studentList.find(student => student.name === name);
      setPairsArray(studentObj.previousPairs);
      setStudentTwo('');
    }
    student(name);
  }

  const adjustPairs = (name) => {

    const student1 = studentList.find(student => student.name === studentOne);
    const student2 = name ?
      studentList.find(student => student.name === name) :
      studentList.find(student => student.name === studentTwo);

    if (student1.previousPairs.indexOf(student2.name) === -1) {
      student1.previousPairs.push(student2.name);
      student2.previousPairs.push(student1.name);
    } else {
      student1.previousPairs.splice(student1.previousPairs.indexOf(student2.name), 1);
      student2.previousPairs.splice(student2.previousPairs.indexOf(student1.name), 1);
    }

    setStudentList([...studentList]);
  }

  return (
    <Box>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <FormControl variant="outlined" size="small">
            <InputLabel id='selected-student'>Student</InputLabel>
            <Select
              className={classes.selectBox}
              labelId="selected-student"
              id='student'
              value={studentOne}
              onChange={(e) => selectStudent(setStudentOne, e.target.value)}
            >
              <MenuItem value={''}>Select</MenuItem>
              {studentList.map(item => {
                return (<MenuItem value={item.name} key={item.name}>{item.name}</MenuItem>)
              })}
            </Select>
          </FormControl>
          <FormControl variant='outlined' size="small">
            <InputLabel id='pairs-options'>Pair</InputLabel>
            <Select
              className={classes.selectBox}
              // labelId="pairs-options"
              id="worked-with"
              value={studentTwo}
              onChange={(e) => selectStudent(setStudentTwo, e.target.value)}
            >
              <MenuItem value={''}>Select</MenuItem>
              {studentList.map(item => {
                return (<MenuItem value={item.name} key={item.name}>{item.name}</MenuItem>)
              })}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="secondary"
            disabled={studentOne && studentTwo ? false : true}
            onClick={() => adjustPairs()}
          >
            Add
          </Button>
        </Grid>
        {!studentOne ? '' :
          <Grid item xs={12} sm={6}>
            <Typography variant="button" gutterBottom >Student: {selectedStudent}</Typography>
            <Typography display='block' gutterBottom >Has worked with:</Typography>
            <Grid container>
              {
                pairsArray.map(name => {
                  return (
                    <Grid item xs={6} key={name}>
                      <Button
                        size="small"
                        variant='contained'
                        className={classes.removeBtn}
                        endIcon={<ClearIcon />}
                        value={name}
                        onClick={() => adjustPairs(name)}
                      >
                        {name}
                      </Button>
                    </Grid>
                  )
                })}
            </Grid>
          </Grid>}
      </Grid>
    </Box>
  )
}

export default PreviousPairs;
import React, { useState, useContext, useEffect } from 'react';
import { CohortContext } from '../../context/cohortContext';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  Checkbox,
  IconButton,
  makeStyles,
  FormControl,
  FormControlLabel,
  Select,
  MenuItem
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    fontSize: 12,
    paddingLeft: 10,
    display: 'flex',
    alignItems: 'center'
  },
  formSelector: {
    marginTop: 5,
    marginLeft: 10,
    width: '35%',
    padding: '10px, 5px',
  },
  deleteButton: {
    marginLeft: 15,
  }
}))

const PairDisplay = ({ index, addPairToSelectedPairs, removePair, pair, trackConfirmedPairs }) => {
  const classes = useStyles();
  const { cohort, roster } = useContext(CohortContext);

  const [checked, setChecked] = useState(false);
  const [studentOne, setStudentOne] = useState(pair[0] ? pair[0].name : '');
  const [studentTwo, setStudentTwo] = useState(pair[1] ? pair[1].name : '');

  const selectStudent = (setPosition, name) => {
    setPosition(name);
  }

  useEffect(() => {
    addPairToSelectedPairs(studentOne, studentTwo, index)
  }, [studentOne, studentTwo])

  useEffect(() => {
    if (pair[0]) {
      selectStudent(setStudentOne, pair[0].name)
    }
    if (pair[1]) {
      selectStudent(setStudentTwo, pair[1].name)
    }
  }, [pair])

  const confirmPair = () => {
    if (checked) {
      removePairFromSave();
    } else {
      setPairForSave();
    }
    setChecked(!checked);
  }

  const setPairForSave = () => {
    // find each student in context
    const student1 = cohort.find(student => student.name === studentOne);
    const student2 = cohort.find(student => student.name === studentTwo);
    // add to each others previouspair array
    if(student1 && student2) {
      student1.previousPairs.push(studentTwo);
      student2.previousPairs.push(studentOne);
    }
    // call count with plus 1
    trackConfirmedPairs(1);
  }

  const removePairFromSave = () => {
    // find each student in context
    const student1 = cohort.find(student => student.name === studentOne);
    const student2 = cohort.find(student => student.name === studentTwo);
    // from each others previouspair array
    if(student1 && student2) {
      student1.previousPairs.splice(student1.previousPairs.indexOf(studentTwo), 1);
      student2.previousPairs.splice(student2.previousPairs.indexOf(studentOne), 1);
    }
    // call count with minus
    trackConfirmedPairs(-1);
  }

  const deletePair = (index) => {
    removePair(index)
  }

  return (
    <div className={classes.container} >
      <FormControl
        className={classes.formSelector}
        variant="outlined"
        size="small"
        disabled={!checked ? false: true}
      >
        <Select
          value={studentOne}
          labelId="studentOne"
          id="studentOne"
          onChange={(e) => selectStudent(setStudentOne, e.target.value)}
        >
          <MenuItem value={''}>None</MenuItem>
          {roster.map(item => {
            return (<MenuItem value={item} key={item}>{item}</MenuItem>)
          })}
        </Select>
      </FormControl>
      <FormControl
        className={classes.formSelector}
        variant="outlined"
        size="small"
        disabled={!checked ? false: true}
      >
        <Select
          value={studentTwo}
          labelId="studentTwo"
          id="studentTwo"
          onChange={(e) => selectStudent(setStudentTwo, e.target.value)}
        >
          <MenuItem value={''}>None</MenuItem>
          {roster.map(item => {
            return (<MenuItem value={item} key={item}>{item}</MenuItem>)
          })}
        </Select>
      </FormControl>
      <FormControlLabel
        className={classes.checkboxLabel}
        value={checked}
        control={<Checkbox checked={checked} color="secondary" />}
        label="Confirm"
        labelPlacement="start"
        onClick={() => confirmPair()}
      />
      <IconButton
        className={classes.deleteButton}
        color="secondary"
        size="medium"
        onClick={() => deletePair(index)}
      >
        <DeleteIcon />
      </IconButton>
    </div>
  )
};

export default PairDisplay;
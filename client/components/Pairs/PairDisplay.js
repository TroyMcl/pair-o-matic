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
    height: 45,
    background: '#dcc7aa',
    paddingLeft: 10,
    display: 'flex',
    alignItems: 'center'
  },
  formSelector: {
    margin: theme.spacing(1),
    width: '35%'
  },
  deleteButton: {
    marginLeft: 15,
  }
}))




const PairDisplay = ({ index, addPairToSelectedPairs, removePair, pair }) => {
  const classes = useStyles();
  const { cohort, roster } = useContext(CohortContext);

  const [checked, setChecked] = useState(false);
  const [studentOne, setStudentOne] = useState(pair[0]? pair[0].name :'');
  const [studentTwo, setStudentTwo] = useState(pair[1]? pair[1].name :'');

  const selectStudent = (setPosition, name) => {
    setPosition(name);
  }

  useEffect(() => {
    addPairToSelectedPairs(studentOne, studentTwo, index)
  }, [studentOne, studentTwo])

  useEffect(() => {
    if(pair[0]) {
      selectStudent(setStudentOne, pair[0].name)
    }
    if (pair[1]) {
      selectStudent(setStudentTwo, pair[1].name)
    }
  },[pair])

  const confirmPair = () => {
    setChecked(!checked);
  }

  const deletePair = (index) => {
    removePair(index)
  }

  return (
    <div className={classes.container} >
      <FormControl className={classes.formSelector}>
        <Select
          value={studentOne}
          labelId="studentOne"
          id="studentOne"
          onChange={(e) => selectStudent(setStudentOne, e.target.value)}
        >
          {roster.map(item => {
            return (<MenuItem value={item} key={item}>{item}</MenuItem>)
          })}
        </Select>
      </FormControl>
      <FormControl className={classes.formSelector}>
        <Select
          value={studentTwo}
          labelId="studentTwo"
          id="studentTwo"
          onChange={(e) => selectStudent(setStudentTwo, e.target.value)}
        >
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
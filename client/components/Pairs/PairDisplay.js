import React, { useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  Checkbox,
  IconButton,
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    height: 60,
    background: '#dcc7aa',
    marginTop: 15,
    paddingLeft: 10,
    display: 'flex',
    alignItems: 'center'
  },
  formSelector: {
    margin: theme.spacing(1),
    width: '40%'
  }
}))




const PairDisplay = (props) => {
  const [checked, setChecked] = useState(true);
  const classes = useStyles();
  const potato = ['banana', 'apple', 'oragne', 'peach'];

  return (
    <div className={classes.container} >
      <FormControl className={classes.formSelector}>
        <InputLabel htmlFor="student1">Student</InputLabel>
        <Select
          labelId="student1"
          id="student1"
          onChange={(e) => console.log(e.target.value)}
        >
          {potato.map(item => {
            return (<MenuItem value={item} key={item}>{item}</MenuItem>)
          })}
        </Select>
      </FormControl>
      <FormControl className={classes.formSelector}>
        <InputLabel htmlFor="student2">Student</InputLabel>
        <Select
          labelId="student2"
          id="student2"
          onChange={(e) => console.log(e.target.value)}
        >
          {potato.map(item => {
            return (<MenuItem value={item} key={item}>{item}</MenuItem>)
          })}
        </Select>
      </FormControl>
      <Checkbox
        checked={checked}
        onChange={() => console.log('checked')}
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      />
      <IconButton
        color="secondary"
        size="medium"
      >
        <DeleteIcon />
      </IconButton>
    </div>
  )
};

export default PairDisplay;
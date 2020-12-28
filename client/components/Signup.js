import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  TextField,
  Button,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    margin: 'auto',
    height: 270,
    width: 400,
    borderRadius: 5,
    border: '1px solid black',
    paddingLeft: 30
  },
  input: {
    width: '90%',
    marginRight: 25,
    marginTop: 10,
    padding: 5
  },
  button: {
    margin: theme.spacing(1)
  }
}))

const Signup = (props) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const classes = useStyles();

  const updateInput = (target, value) => {
    target(value);
  }

  const sendLogin = () => {
    if (userName && password) {
      console.log('send it')
    } else {
      console.log('missing something')
    }
  }

  return (
    <Box>
      <Box className={classes.container}>
        <TextField
          className={classes.input}
          size='small'
          id="userName"
          label="User Name"
          value={userName}
          variant="outlined"
          required
          onChange={(e) => updateInput(setUserName, e.target.value)}
        />
        <TextField
          className={classes.input}
          size='small'
          id="email"
          label="email"
          value={email}
          variant="outlined"
          required
          onChange={(e) => updateInput(setEmail, e.target.value)}
        />
        <TextField
          className={classes.input}
          size='small'
          id="password"
          label="Password"
          value={password}
          variant="outlined"
          required
          onChange={(e) => updateInput(setPassword, e.target.value)}
        />
        <Button
          className={classes.button}
          color="primary"
          onClick={() => sendLogin()}
        >
          Sign Up
        </Button>
        <Link to="/login" style={{textDecoration: 'none'}}>
          <Button
            className={classes.button}
            color="primary"
          >Login</Button>
        </Link>
      </Box>
    </Box>
  )
}

export default Signup;
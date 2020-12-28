import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  TextField,
  Button,
  makeStyles,
  Typography
} from '@material-ui/core';
import { AddToHomeScreen } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  container: {
    margin: 'auto',
    height: 200,
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

const Login = (props) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false)

  const classes = useStyles();
  const history = useHistory();

  const updateInput = (target,value) => {
    target(value);
  }

  const sendLogin = () => {
    if(userName && password) {
      console.log('send it')
      axios.post('http://localhost:3045/auth/login', {
        userName,
        password
      })
      .then(data => {
        history.push('/')
      })
      .catch(err => {
        console.log(err)
        setError(!error)
      })
    } else {
      console.log('missing something')
    }
  }

  return (
    <Box>
      <Box className={classes.container}>
        {
          error ?
          <Typography
            variant="overline"
            style={{color: 'red', }}
          >
            Incorrect User Name or Password
          </Typography> :
          ''
        }
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
          Login
        </Button>
        <Link to="/signup" style={{textDecoration: 'none'}}>
          <Button
            className={classes.button}
            color="primary"
          >Sign Up</Button>
        </Link>
      </Box>
    </Box>
  )
}

export default Login;
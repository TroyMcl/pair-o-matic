import React, { useEffect, useContext } from 'react';
import { CohortContext } from '../context/cohortContext';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import {
  IconButton,
  makeStyles,
  fade,
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Box
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  headerText: {
    fontSize: 24,
    paddingLeft: 15,
  },
  accountIcon: {
    fontSize: 28,
  },
  leftContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
})
)
const Header = (props) => {
  const { cohort, fetchRoster } = useContext(CohortContext);
  const classes = useStyles();

  useEffect(() => {
    fetchRoster(25);
  }, [])

  return (
    <AppBar position="static" style={{marginBottom: 20}}>
      <Toolbar className={classes.root}>
        <Box className={classes.leftContainer}>
          <IconButton
            edge="start"
            aria-label="Account"
          >
            <AccountCircleIcon className={classes.accountIcon} />
          </IconButton>
          <Typography
            variant="h1"
            className={classes.headerText}
          >
            Section Title
          </Typography>
        </Box>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Header;
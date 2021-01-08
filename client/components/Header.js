import React, { useEffect, useContext } from 'react';
import { CohortContext } from '../context/cohortContext';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PeopleIcon from '@material-ui/icons/People';
import AddBoxIcon from '@material-ui/icons/AddBox';
import EditIcon from '@material-ui/icons/Edit';
import {
  IconButton,
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
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
  drawer: {
    width: 240,
  },
  appbar: {
    marginBottom: 20,
    width: `Calc(100% - 240px)`,
    marginLeft: 240
  },
  drawerContent: {
    paddingTop: 70
  }
})
)

const Header = (props) => {
  const { cohort, fetchRoster, setSelectedCohort } = useContext(CohortContext);
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.appbar}>
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
            Pair-O-Matic
          </Typography>
        </Box>
      </Toolbar>
      <Drawer
        className={classes.drawer}
        anchor='left'
        open={true}
        variant='permanent'
      >
        <Box className={classes.drawerContent}>
          <Divider />
          <List>
            <Link
              to="/pairs"
              style={{ textDecoration: 'none', color: 'black' }}
            >
              <ListItem >
                <ListItemIcon>{<PeopleIcon />}</ListItemIcon>
                <ListItemText primary={'Generate Pairs'} />
              </ListItem>
            </Link>
            <Link
              to="/edit"
              style={{ textDecoration: 'none', color: 'black' }}
            >
              <ListItem >
                <ListItemIcon>{<EditIcon />}</ListItemIcon>
                <ListItemText primary={'Edit Student or Cohort'} />
              </ListItem>
            </Link>
            <Link
              to="/create"
              style={{ textDecoration: 'none', color: 'black' }}
            >
              <ListItem >
                <ListItemIcon>{<AddBoxIcon />}</ListItemIcon>
                <ListItemText primary={'Create New Cohort'} />
              </ListItem>
            </Link>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  )
}

export default Header;
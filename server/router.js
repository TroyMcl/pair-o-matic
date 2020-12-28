const express = require('express');
const {
  addStudent,
  retreiveCohort,
  removeStudent,
  updateCohort,
  removeCohort,
  retreiveStudent,
  makePairs,
} = require('./controllers.js');

const { login, signup } = require('./auth')

const router = express.Router();

router
  .route('/student')
  .get(retreiveStudent)
  .post(addStudent)
  .delete(removeStudent);

router
  .route('/cohort/:cohort')
  .get(retreiveCohort)
  .patch(updateCohort)
  .delete(removeCohort);

router
  .route('/pairomatic/:cohort')
  .post(makePairs);

router
  .route('/login')
  .post(login)

router
  .route('/signup')
  .post(signup)
module.exports = router;


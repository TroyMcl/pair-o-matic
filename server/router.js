const express = require('express');
const { 
  addStudent, 
  addCohort 
} = require('./controllers.js');

const router = express.Router();

router
  .route('/student')  
  // .get(controller)
  .post(addStudent)
  // .delete(controller)

router
  .route('/cohort')
  // .get(controller)
  .post(addCohort)
  // .delete(controller);
  


module.exports = router;


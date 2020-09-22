const express = require('express');
const { addStudent } = require('./controllers.js');

const router = express.Router();

router
  .route('/student')  
  // .get(controller)
  .post(addStudent)
  // .delete(controller)

router
  .route('/cohort')
  // .get(controller)
  // .patch(controller)
  // .delete(controller);
  


module.exports = router;


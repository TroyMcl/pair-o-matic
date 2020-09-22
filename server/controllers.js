const { 
  insertStudent, 
  insertStudents, 
  getOneStudent, 
  getCohortOfStudents, 
  deleteStudent, 
  deleteCohort 
} = require('../db/models');

module.exports.addStudent = async (req, res) => {
  console.log('req body for add student ---', req.body);
  const studentObj = req.body;
  const results = await insertStudent(studentObj);
  res.status(200).send({
    status: 'success',
    message: results
  });
}
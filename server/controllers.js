const {
  insertStudent,
  insertStudents,
  getOneStudent,
  getCohortOfStudents,
  deleteStudent,
  deleteCohort
} = require('../db/models');

module.exports.addStudent = async (req, res) => {
  try {
    const studentObj = req.body;
    const results = await insertStudent(studentObj);
    res.status(200).send({
      status: 'success',
      message: results
    });
  } catch(error) {
    res.status(500).send({
      status: 'success',
      message: studentData
    });
  }
};

module.exports.retreiveStudent = async (req, res) => {
  const student = req.query.first + ' ' + req.query.last;
  try {
    const studentData = await getOneStudent(student);
    if (studentData.length === 0) {
      throw('Student not in database')
    } else {
      res.status(200).send({
        status: 'success',
        message: studentData
      });
    }
  } catch(error) {
    res.status(500).send({
      status: 'failure',
      message: `Error saving to database: ${error}`
    })
  }
};

module.exports.removeStudent = async (req, res) => {
  const student = req.query.first + ' ' + req.query.last;
  try {
    const studentData = await deleteStudent(student);
    if(studentData.deletedCount === 0) {
      throw('Student not in database')
    } else {
      res.status(200).send({
        status: 'success',
        message: studentData
      });
    }
  } catch (error) {
    res.status(500).send({
      status: 'failure',
      message: `Error saving to database: ${error}`
    })
  }
};

module.exports.addCohort = async (req, res) => {
  try {
    const cohort = req.body;
    const results = await insertStudents(cohort);
    res.status(200).send({
      status: 'success',
      message: results
    })
  } catch (error) {
    res.status(500).send({
      status: 'failure',
      message: `Error saving cohort to database: ${error}`
    })
  }
};


module.exports.retrieveOneCohort = async (req, res) => {
  try {
    const cohortNum = req.body;
    const results = await getCohortOfStudents(cohortNum);
    res.status(200).send({
      status: 'success',
      message: results
    })
  } catch (error) {
    res.status(500).send({
      status: 'failure',
      message: `Error saving cohort to database: ${error}`
    })
  }
};

const {
  insertStudent,
  insertStudents,
  getOneStudent,
  getCohortOfStudents,
  deleteStudent,
  deleteCohort
} = require('../db/models');

module.exports.addStudent = async (req, res) => {
  const studentObj = req.body;
  try {
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
      message: error
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
      message: error
    })
  }
}

module.exports.retreiveCohort = async (req, res) => {
  const cohort = +req.params.cohort;
  try {
    const cohortData = await getCohortOfStudents(cohort);
    if(cohortData.length === 0) {
      throw('Cohort #' + cohort + ' is not in the database')
    } else {
      res.status(200).send({
        status: 'success',
        message: cohortData
      });
    }
  } catch(error) {
    res.status(500).send({
      status: 'failure',
      message: error
    })
  }
}

module.exports.updateCohort = async (req, res) => {
  const cohort = req.body;

  try {
    const cohortData = await insertStudents(cohort);
    if(cohortData.length === 0) {
      throw('Cohort #' + cohort + ' could not be updated')
    } else {
      res.status(200).send({
        status: 'success',
        message: cohortData
      });
    }
  } catch(error) {
    res.status(500).send({
      status: 'failure',
      message: error
    })
  }
}

module.exports.removeCohort = async (req, res) => {
  const cohort = +req.params.cohort;

  try {
    const cohortData = await deleteCohort(cohort);
    console.log(cohortData)
    if(cohortData.deletedCount === 0) {
      throw('Cohort #' + cohort + ' could not be updated')
    } else {
      res.status(200).send({
        status: 'success',
        message: cohortData
      });
    }
  } catch(error) {
    res.status(500).send({
      status: 'failure',
      message: error
    })
  }
}
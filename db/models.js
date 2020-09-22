const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  cohort: Number,
  name: String,
  previousPairs: {
    type: [String]
  }
});

const Student = mongoose.model('Student', studentSchema);

module.exports.insertStudent = async (studentObj) => {
  try {
    const studentRecord = await Student.findOneAndUpdate({ name: studentObj.name }, studentObj, { upsert: true, new: true })
    return studentRecord;
  } catch(err) {
    console.log('Error saving student:', err);
    return err;
  }
}

module.exports.insertStudents = async (studentsArray) => {
  try {
    const data = studentsArray.map((student) => insertStudent(student));
    const studentSaves = await Promise.all(data);
    return studentSaves
  } catch(err) {
    console.log('Error saving students:', err);
    return err;
  }
}

module.exports.getOneStudent = async (studentName) => {
  try {
    const student = await Student.find({ name: studentName});
    return student; // array with one student object
  } catch(err) {
    console.log('Error finding student:', err);
    return err;
  }
}

module.exports.getCohortOfStudents = async (cohortNum) => {
  try {
    const cohort = await Student.find({ cohort: cohortNum });
    return cohort; // array of students
  } catch(err) {
    console.log('Error finding student:', err);
    return err;
  }
}

module.exports.deleteStudent = async (studentName) => {
  try {
    const deletedStudent = await Student.deleteOne({ name: studentName });
    return deletedStudent;
  } catch (err) {
    console.log('Error deleting student:', err);
    return err;
  }
}

module.exports.deleteCohort = async (cohortNum) => {
  try {
    const deletedStudents = await Student.deleteMany({ cohort: cohortNum });
    return deletedStudents;
  } catch (err) {
    console.log('Error deleting cohort:', err);
    return err;
  }
}

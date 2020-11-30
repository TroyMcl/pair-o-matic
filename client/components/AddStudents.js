import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import StudentList from './StudentList';

const AddStudents = () => {

  const [student, setStudent] = useState('');
  const [cohortList, setCohortList] = useState([]);
  const [cohort, setCohort] = useState(null);

  //text field, display of all students

  const addStudent = (event) => {
    event.preventDefault();
    const studentObj = {
      cohort: cohort,
      name: student,
      previousPairs: []
    }
    setCohortList(cohortList.concat(studentObj));
    setStudent('');
  }

  const removeStudent = (student) => {
    console.log(student);
    let copy = JSON.parse(JSON.stringify(cohortList));
    copy = copy.filter(s => {
      if (s.name !== student.name) return s;
    })
    setCohortList(copy);
  }

  const editStudent = (student) => {
    console.log('nah', student);
    // let copy = JSON.parse(JSON.stringify(cohortList));
    // copy = copy.filter(s => {
    //   if (s.name !== student.name) return s;
    // })
    // setCohortList(copy);
  }

  return (
    <div>
      <form>
        <TextField value={student} onChange={(e) => {setStudent(e.target.value)}}/>
        <button onClick={addStudent}>Add Student</button>
        <StudentList students={cohortList} remove={removeStudent} edit={editStudent}/>
      </form>
    </div>
  )

}

export default AddStudents;
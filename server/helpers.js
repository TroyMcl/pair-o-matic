/*

[ 
  {
  cohort: 24,
  name: 'Mickey Mouse',
  previousPairs: [],
  },
  {
  cohort: 24,
  name: 'Ronald McDonald',
  previousPairs: [],
  },
  {
  cohort: 24,
  name: 'Seven Eleven',
  previousPairs: [],
  },
  {
  cohort: 24,
  name: 'Rando Placeholder',
  previousPairs: [],
  },
]



I: 2 arrays of objects [{all pairs}], [[student1, student2]] 
O: array of student objs
C: < O(n^2) ..?
E: all pairs have partnered previously, even distribution of pairings, odd number of students


*/

// filter out preselected pairs:
// still needs to account for human error: one student in 2 pairs: 
const filterUserInputPairs = (allStudents, prefPairs) => {
  
  const madePairs = [];

  while (prefPairs.length > 0) {
    // get name of each student in pre selected pair
    const student1 = prefPairs[prefPairs.length - 1][0];
    const student2 = prefPairs[prefPairs.length - 1][1];

    // get index of each pre selected pair from allStudents
    const idx1 = allStudents.findIndex(student => student.name === student1);
    const idx2 = allStudents.findIndex(student => student.name === student2);

    // create pair array, push to madePairs
    madePairs.push([allStudents[idx1], allStudents[idx2]]);

    // remove created pair from prefPair's array
    prefPairs.pop();

    // remove both students from created pair from allStudents
    const removeFirst = Math.max(idx1, idx2);
    const removeSecond = Math.min(idx1, idx2);
    allStudents.splice(removeFirst, 1);
    allStudents.splice(removeSecond, 1)
    
  }
  return [madePairs, allStudents]
  
}


// main make pairs function

// run through preselected pairs => 2 arrays some made pairs, remaining students

// recursive fn => avoid issue of not having unique pairs, down side very alphabetical(add some logic to avoid this?)

const makeAllPairs = (studentsArray, prefPairs) => {
  const [madePairs, remainingStudents] = filterUserInputPairs(studentsArray, prefPairs);

  let pairsArray = [];

  const makeOnePair = (students, potentialPairs) => {
    if (students.length === 1 || students.length === 0) {
      return;
    }
    let currentStudent = Math.floor(Math.random() * students.length);
    for (let i = 0; i < students.length; i++) {
      if (!students[currentStudent].previousPairs.includes(students[i].name) && students[currentStudent].name !== students[i].name) {
        potentialPairs.push([students[currentStudent], students[i]]);
        const studentsCopy = students.slice();
        const removeFirst = Math.max(currentStudent, i);
        const removeSecond = Math.min(currentStudent, i);
        studentsCopy.splice(removeFirst, 1);
        studentsCopy.splice(removeSecond, 1);
        makeOnePair(studentsCopy, potentialPairs);
        potentialPairs.pop();
      }
    }
  }

  makeOnePair(remainingStudents, []);

  // pairsArray.concat(madePairs);
}
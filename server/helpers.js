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

    // account for preferred solo student
    if (student2 === undefined) {
      const soloIdx = allStudents.findIndex(student => student.name === student1);
      madePairs.push([allStudents[soloIdx], undefined]);
      allStudents.splice(soloIdx, 1);
      prefPairs.pop();
      continue;
    }

    // get index of each pre selected pair from allStudents
    const idx1 = allStudents.findIndex(student => student.name === student1.name);
    const idx2 = allStudents.findIndex(student => student.name === student2.name);

    // create pair array, push to madePairs
    madePairs.push([allStudents[idx1], allStudents[idx2]]);

    // remove created pair from prefPair's array
    prefPairs.pop();

    // remove both students from created pair from allStudents
    const removeFirst = Math.max(idx1, idx2);
    const removeSecond = Math.min(idx1, idx2);
    allStudents.splice(removeFirst, 1);
    allStudents.splice(removeSecond, 1);

  }
  return [madePairs, allStudents];

};



const makeAllPairs = (studentsArray, prefPairs) => {
  const [madePairs, remainingStudents] = filterUserInputPairs(studentsArray, prefPairs);
  let pairsArray = []

  while (pairsArray.length < 25) {
    let autoPairs = generatePairs([...remainingStudents]);
    pairsArray.push([...madePairs, ...autoPairs])
  }
  return pairsArray;
}

const generatePairs = (students) => {
  const pairs = [];
  while (students.length > 1) {
    let currentStudent = Math.floor(Math.random() * students.length);
    let i = Math.floor(Math.random() * students.length);

    let start = i = 0 ? students.length -1: i- 1;
    let matched = false;

    while (i !== start) {
      if (!checkPreviousMatch(currentStudent, i, students)) {
        pairs.push([students[currentStudent], students[i]]);
        removePair(currentStudent, i, students)
        matched = true;
        break;
      }
      i = i >= students.length ? 0 : i + 1
    }

    if (!matched) {
      let loop = true;
      while (loop) {
        let i = Math.floor(Math.random() * students.length);

        if (i !== currentStudent) {
          loop = false;
          pairs.push([students[currentStudent], students[i]]);

          // remove from further pairing
          removePair(currentStudent, i, students)
        }
      }
    }
  }
  if(students.length === 1) {
    pairs.push([students[0], undefined])
  }
  return pairs;
}

const checkPreviousMatch = (currentStudent, i, students) => {
  if (
    !students[currentStudent].previousPairs.includes(students[i].name) &&
    students[currentStudent].name !== students[i].name
  ) {
    return false;
  }
  return true;
}

const removePair = (currentStudent, i, students) => {
  const removeFirst = Math.max(currentStudent, i);
  const removeSecond = Math.min(currentStudent, i);
  students.splice(removeFirst, 1);
  students.splice(removeSecond, 1);
  return
}

module.exports = makeAllPairs;
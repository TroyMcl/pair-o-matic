import React, { useState, createContext } from 'react';
import axios from 'axios';

export const CohortContext = createContext();

export const CohortContextProvider = (props) => {
  const [cohort, setCohort] = useState([]);
  const [roster, setRoster] = useState([]);

  const fetchRoster = (cohortNum) => {
    axios.get(`api/cohort/${cohortNum}`)
      .then(data => {
        setCohort(data.data.message);
        let cohort = data.data.message.map(student => student.name).sort()
        setRoster(cohort)
      })
      .catch(err => console.log(err));
  }

  return (
    <CohortContext.Provider value={{ cohort, setCohort, fetchRoster, roster }}>
      {props.children}
    </CohortContext.Provider>
  )
}
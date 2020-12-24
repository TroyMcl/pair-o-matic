import React, { useState, createContext } from 'react';
import axios from 'axios';

export const CohortContext = createContext();

export const CohortContextProvider = (props) => {
  const [cohort, setCohort] = useState([]);

  const fetchRoster = (cohortNum) => {
    axios.get(`api/cohort/${cohortNum}`)
      .then(data => {
        console.log(data.data.message);
        setCohort(data.data.message);
      })
      .catch(err => console.log(err));
  }

  return (
    <CohortContext.Provider value={{ cohort, setCohort, fetchRoster }}>
      {props.children}
    </CohortContext.Provider>
  )
}
import React, { useEffect, useContext } from 'react';
import { CohortContext } from '../context/cohortContext';

const Header = (props) => {
  const { cohort, fetchRoster } = useContext(CohortContext);

  useEffect(() => {
    fetchRoster(25);
  }, [])

  return (
    <div>I'm a header</div>
  )
}

export default Header;
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Modal from '@material-ui/core/Modal';
import axios from 'axios';

import AddStudents from './components/AddStudents';

// To Do: get list of all cohort numbers with axios and use to populate select tab

const App  = () => {

  const [displayModal, setDisplayModal] = useState(true);
  const [cohorts, setCohorts] = useState([]);
  
  const closeModal = () => {
    setDisplayModal(false);
  }

  // const openModal = () => {
  //   setDisplayModal(true);
  // }

  useEffect(() => {
    // const fetch = async () => {
    //   try {
    //     let cohortsData = await axios.get('api/cohorts/24');
    //     console.log(cohortsData);
    //     setCohorts(cohortsData);
    //   } catch(err) {
    //     console.log('some error getting data', err)
    //   }
    // }
    const fetch = () => {
      axios.get('api/cohort/25')
        .then(data => {
          console.log(data.data.message);
          setCohorts(data.data.message);
        })
        .catch(err => console.log(err));
    }
    fetch();
  }, [])


  const body = (
    <div className={'modal'} style={{top: 'auto', left: 'auto'}} >
      <h2>What would you like to do?</h2>
      <form>
        <button>Make Pairs</button>
        <select>
          <option value="one">One</option>
          <option value="two">Two</option>
          <option value="three">Three</option>
        </select>
        <button>Add New Cohort</button>
      </form>
    </div>
  )
    
  return (
    <>
      <h1>Pair-o-Matic!!!!!!</h1>
      {/* <Modal 
        open={displayModal}
        onClose={closeModal}
      >
        {body}
      </Modal> */}
      <AddStudents />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('pair-o-matic'));
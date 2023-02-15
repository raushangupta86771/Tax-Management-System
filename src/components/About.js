import React from 'react';
import {useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useContext } from 'react';
import noteContext from '../context/data/NoteContext';


const About = () => {
  const context = useContext(noteContext);
  const { getUser, user } = context;
  let history = useHistory();

  useEffect(() => { //for showing all the notes. which we fetched from mongoDb
    if (localStorage.getItem('token')) {
      getUser();
    }
    else {
      history.push("/login");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="showAns">
      <div className="card d-flex cardSet" id='main-result'>
        <img src="https://cdn3.iconfinder.com/data/icons/gradient-general-pack/512/user-01-512.png" className="card-img-top" id="c-img" alt="..." />
        <div className="card-body">
          <h5 className="card-title">Taxable Income</h5>
          <p className="card-text" ><p id="insideTxt">Name</p> {user.name} </p>
          <p className="card-text" ><p id="insideTxt">Email</p> {user.email} </p>
          <Link to="/" className="btn btn-primary glow-on-hover" id='btn-abt'>Calculator</Link>
        </div>
      </div>
    </div>
  )
}

export default About

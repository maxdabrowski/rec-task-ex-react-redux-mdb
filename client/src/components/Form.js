import React from 'react'
import '../App.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useDispatch,useSelector} from "react-redux";
import { SET_FIRST_NAME, SET_LAST_NAME, SET_MAIL, SET_DATE, SET_INITIAL_STATE, SET_TRY_SEND } from '../store/meetingData';

const Form = () => {

  //getting state from Store
  const data = useSelector(state => state.meetingData);
  const dispatch = useDispatch();

  //data object send to API
  const dateToSend = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.mail,
    date: data.date
  };

  // handling changes in inputs and save to state in Store
  const inputHandle = (e, type) => {
    if(type ==='firstName'){
      dispatch({type: SET_FIRST_NAME, payload:e.target.value})
    }    if(type ==='lastName'){
      dispatch({type: SET_LAST_NAME, payload:e.target.value})
    }    if(type ==='mail'){
      dispatch({type: SET_MAIL, payload:e.target.value})
    }    if(type ==='date'){
      dispatch({type: SET_DATE, payload:e})
    }
  };

  // send data object to the DB
  const meetingAdd = async e => {
    e.preventDefault();
    //set try send to check first attempt at ending
    dispatch({type: SET_TRY_SEND}) 

    // check all errors  ale false
    if (!data.firstNameError &&
        !data.lastNameError &&
        !data.mailError &&
        !data.dateError) {

      //send data object to DB with fetch method     
      const response = await fetch('/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({dateToSend}),
      });
      const body = await response.json();
      if(!body.error){
        alert("Add new meeting Succesfully!")
      }
      dispatch({type: SET_INITIAL_STATE})  
    }
  };

  return (
    <div className="app">
      <h1>Application form for an event</h1>
      <form className="form" onSubmit={(e) => meetingAdd(e)}>
        <div className='formRow'>
          <label>First Name:</label>
          <input type='text' value={data.firstName} onChange={(e) => inputHandle(e,'firstName')}></input>
          {data.firstNameError && data.trySend ?<p className='formError'>Fisrt name is required and must consist of letters</p>:<p></p>}
        </div>
        <div className='formRow'>
          <label>Last Name:</label>
          <input type='text' value={data.lastName} onChange={(e) => inputHandle(e,'lastName')}></input>
          {data.lastNameError  && data.trySend  ?<p className='formError'>Last name is required and must consist of letters</p>:<p></p>}
        </div>
        <div className='formRow'>
          <label>Adress email:</label>
          <input type='text' value={data.mail} onChange={(e) => inputHandle(e,'mail')}></input>
          {data.mailError  && data.trySend ?<p className='formError'>Enter a valid email address</p>:<p></p>}
        </div>
        <div className='formRow'>
          <label>Date:</label>
          <DatePicker
            selected={data.date}
            onChange={(e) => inputHandle(e,'date')}
          />
          {data.dateError  && data.trySend ?<p className='formError'>Date is a required field</p>:<p></p>}
        </div>
        <input type="submit" value="Send" className="button"></input>
      </form>
      </div>
  ) 
}
export default Form

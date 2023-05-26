import { useState, useEffect } from 'react';
import {parse} from 'date-fns'
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react';

import Header from '@components/header.js';

const BasicDashboard = ( { user, isAdmin, showNewEmployeeModal, setShowNewEmployeeModal } ) => {
  const [clockOutDisabled, setClockOutDisabled] = useState(true)
  const [clockInDisabled, setClockInDisabled] = useState(false)
  const URL = process.env.REACT_APP_DEV_URI;
  let EMPLOYEE_ID = '640b5ad33537b73b6b694755'
  const { getAccessTokenSilently } = useAuth0()
  //----------------------------------------

  const toggleButtonStatus = () => {
    clockInDisabled?setClockInDisabled(false):setClockInDisabled(true);
    clockOutDisabled?setClockOutDisabled(false):setClockOutDisabled(true)
  }
  //----------------------------------------

  const axiosRequest = async (method, endpoint, payload) => {
    try {
      const token = await getAccessTokenSilently();
      const options = {
        method: method,
        url: endpoint,
        data: payload||null,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      const res = await axios(options)
      toggleButtonStatus()
      return res
    } catch (error) {
        console.log(error);
      }
  }
  //----------------------------------------

  const addStartTimetoTimeSheet = async() => {
    let payload = {
      date: new Date(),
      start: new Date().toLocaleTimeString()
    }
    const formatedTime = parse(payload.start, 'pp', new Date())
    payload.start = formatedTime
    const endpoint = `${URL}/schedule/${EMPLOYEE_ID}/new-shift`
    axiosRequest('put', endpoint, payload)
  }
  //----------------------------------------

  const addEndTimetoTimeSheet = async () => {
    let endpoint = `${URL}/schedule/${EMPLOYEE_ID}/clockout`
    const shift = await axiosRequest('get', endpoint)
    const currentTime = new Date().toLocaleTimeString();
    const formattedTime = parse(currentTime, 'pp' , new Date());
    const newShiftData = {
      id:shift.data.id,
      date:shift.data.date,
      start:shift.data.start,
      end:formattedTime,
      perdiod: shift.data.period
    }
    endpoint = `${URL}/schedule/${EMPLOYEE_ID}/edit/${newShiftData.id}`
    const updatedShift = await axiosRequest('put', endpoint, newShiftData)
  }
  //----------------------------------------

  const checkClockedInStatus = async() => {
    const endpoint = `${URL}/admin/${EMPLOYEE_ID}`;
    const status = await axiosRequest('get', endpoint);
    const isClockedIn = status.data.clockedIn;
    if ( isClockedIn === false ) {
      setClockOutDisabled(true)
      setClockInDisabled(false)
    } else {
      setClockOutDisabled(false)
      setClockInDisabled(true)
    };
  }
  //----------------------------------------

  const changeClockedInStatus = async ( boolean ) => {
    const endpoint = `${URL}/admin/${EMPLOYEE_ID}`
    const payload = { clockedIn:boolean }
    const result = await axiosRequest('put', endpoint, payload)
    console.log(result.data);
  }

  //----------------------------------------

  const clockIn = () => {
    addStartTimetoTimeSheet()
    toggleButtonStatus()
    changeClockedInStatus(true)
  }
  //----------------------------------------

  const clockOut = () => {
    toggleButtonStatus()
    addEndTimetoTimeSheet()
    changeClockedInStatus(false)
  }
  //----------------------------------------

  useEffect(() => {
    checkClockedInStatus()
  },[])

  return (
    <>
      <Header
        isAdmin={isAdmin}
        user={user}
        showNewEmployeeModal={showNewEmployeeModal}
        setShowNewEmployeeModal={setShowNewEmployeeModal}
      />
      <div className ="quick-menu">
      <div className = "clock-in-out">
        <button id={new Date().toLocaleTimeString()} className="clock-in-btn" innerText="start" onClick={clockIn} disabled={clockInDisabled}>
           Clock-In
        </button>
        <button id={new Date().toLocaleTimeString()} className="clock-out-btn" innerText="end" onClick={clockOut} disabled={clockOutDisabled}>
           Clock-Out
        </button>
      </div>
      </div>
    </>
  );
}

export default BasicDashboard;

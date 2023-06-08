import { useState, useEffect, useRef } from 'react';
import {parse} from 'date-fns'
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react';
import { getEmployeeId } from './Helpers/getEmployeeId.js'
import Checklist from '../Checklist/table.js';
import NavBar from '../nav-bar.js';
import { Routes, Route } from 'react-router-dom'
import Header from '@components/header.js';
import TimeClock from './TimeClock/time-clock.js';

const BasicDashboard = ( { user, isAdmin, showNewEmployeeModal, setShowNewEmployeeModal } ) => {
  const [clockOutDisabled, setClockOutDisabled] = useState(true)
  const [clockInDisabled, setClockInDisabled] = useState(false)
  const URL = process.env.REACT_APP_DEV_URI;
  const EMPLOYEE_ID = useRef('')
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
    const endpoint = `${URL}/schedule/${EMPLOYEE_ID.current}/new-shift`
    axiosRequest('put', endpoint, payload)
  }
  //----------------------------------------

  const addEndTimetoTimeSheet = async () => {
    let endpoint = `${URL}/schedule/${EMPLOYEE_ID.current}/clockout`
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
    endpoint = `${URL}/schedule/${EMPLOYEE_ID.current}/edit/${newShiftData.id}`
    const updatedShift = await axiosRequest('put', endpoint, newShiftData)
  }
  //----------------------------------------

  const checkClockedInStatus = async() => {
    const endpoint = `${URL}/admin/${EMPLOYEE_ID.current}`;
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
    const endpoint = `${URL}/admin/${EMPLOYEE_ID.current}`
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
    EMPLOYEE_ID.current = getEmployeeId(user.email)
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
      <NavBar
        isAdmin={isAdmin}/>
      <Routes>
        <Route path="/timeclock" element={
          <TimeClock
            clockIn={clockIn}
            clockOut={clockOut}
            clockInDisabled={clockInDisabled}
            clockOutDisabled={clockOutDisabled}/>
        }/>
        <Route path="/checklist" element={<Checklist/>}/>
      </Routes>
    </>
  );
}

export default BasicDashboard;

import axios from 'axios'
import {useState, useEffect} from 'react'
import {parse} from 'date-fns'
import { useAuth0 } from '@auth0/auth0-react';
import AddEvent from '@components/Buttons/add-event.js'
import Paper from '@mui/material/Paper';
import DetailsButton from '@components/Buttons/details-button.js'
import EmployeeDeleteButton from '@components/Buttons/employee-delete-button.js'

const QuickMenu = (props) => {
  const { getAccessTokenSilently } = useAuth0()
  const [clockOutDisabled, setClockOutDisabled]= useState(false)
  const [clockInDisabled, setClockInDisabled]= useState(false)
  const LocalStorage = window.localStorage
  const URL = process.env.REACT_APP_DEV_URI;

  const writeToDb = async (e) => {
    let targetKey = e.target.attributes.innerText.value
    let body = {
       date:new Date(),
       [targetKey]:e.target.id
    }
    let startISO = parse(body.start, 'pp', new Date())
    let endISO = parse(body.end, 'pp', new Date())
    if(body.start){body.start = startISO}
    if(body.end){body.end = endISO}
    try{
      const token = await getAccessTokenSilently()
      const options = {
        method: 'put',
        url: `${URL}/schedule/${props.selectedEmployee._id}/new-shift`,
        data: body,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      await axios(options)
    }catch(error){
      props.setMessage(error.message)
    }finally{
      props.fetchSchedule()
    }
  }

  const quickAddEvent = async (e) => {
    writeToDb(e)
    props.setMessage(`Shift added to ${props.selectedEmployee.name}`)
  }

  const clockIn = async(e) => {
    try{
      if(!LocalStorage.getItem(props.selectedEmployee._id)){
        const token = {
          employeeName:props.selectedEmployee.name,
        }
        LocalStorage.setItem(props.selectedEmployee._id, JSON.stringify(token))
        props.setMessage(`${props.selectedEmployee.name} has been clocked in.`)
        writeToDb(e)
      }
    }catch(error){
      props.setMessage(error.message)
    }
  }

  const clockOut = async() => {
    try{
      if (LocalStorage.getItem(props.selectedEmployee._id)){
        const token = await getAccessTokenSilently()
        const options = {
          method: 'get',
          url: `${URL}/schedule/${props.selectedEmployee._id}/clockout`,
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
        const res = await axios(options)
        let time = new Date().toLocaleTimeString()
        let endTimeISO = parse(time, 'pp' , new Date())
        let body = {
          id:res.data.id,
          date:res.data.date,
          start:res.data.start,
          end:endTimeISO,
          period:res.data.period
        }
        const options2 = {
          method: 'put',
          url: `${URL}/schedule/${props.selectedEmployee._id}/edit/${body.id}`,
          data: body,
          headers: {
           Authorization: `Bearer ${token}`
          }
        }
        await axios(options2)
        props.fetchSchedule()
        props.setMessage(`${props.selectedEmployee.name} has been clocked out.`)
        LocalStorage.removeItem(props.selectedEmployee._id)
      }
    }catch(error){
      props.setMessage(error.message)
    }
  }

  const checkLocalStorage = () => {
    if(LocalStorage.getItem(props.selectedEmployee._id)){
       setClockInDisabled(true)
       setClockOutDisabled(false)
    }else{
       setClockInDisabled(false)
       setClockOutDisabled(true)
    }
  }

  const handleEmployeeDelete = () => {
    console.log(`${props.selectedEmployee.name} has been removed.`)
  }

  useEffect(() => {
    checkLocalStorage()
  },[props.selectedEmployee, props.message])

   return(
      <>
         <div className='quick-menu-header'>
           <h1>{props.selectedEmployee.name}</h1>
           <DetailsButton
              selectedEmployee={props.selectedEmployee}
              detailsView={props.detailsView}
              setDetailsView={props.setDetailsView}/>
            <EmployeeDeleteButton
              selectedEmployee={props.selectedEmployee}
              handleEmployeeDelete={handleEmployeeDelete}
              setMessage={props.setMessage}/>
         </div>
         <Paper elevation={3}>
            <div className="quick-menu">
               <div className="clock-in-out">
                  <button id={new Date().toLocaleTimeString()} className="clock-in-btn" innerText="start" onClick={clockIn} disabled={clockInDisabled}>
                     Clock-In
                  </button>
                  <button id={new Date().toLocaleTimeString()} className="clock-out-btn" innerText="end" onClick={clockOut} disabled={clockOutDisabled}>
                     Clock-Out
                  </button>
               </div>
               <h4>-Quick Add-</h4>
               <div className="quick-menu-shortcuts">
                  <button id="Lunch" innerText="period" onClick={quickAddEvent}>
                     Lunch
                  </button>
                  <button id="Dinner" innerText="period" onClick={quickAddEvent}>
                     Dinner
                  </button>
                  <button id="Double" innerText="period" onClick={quickAddEvent}>
                     Double
                  </button>
                  <AddEvent
                     selectedEmployee={props.selectedEmployee}
                     eventForm={props.eventForm}
                     setEventForm={props.setEventForm}
                     showModal={props.showModal}
                     setShowModal={props.setShowModal}/>
               </div>
            </div>
         </Paper>
      </>
   )
}
export default QuickMenu

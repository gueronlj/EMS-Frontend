import axios from 'axios'
import React, {useEffect} from 'react'
import {format, parseISO} from 'date-fns'

const Schedule = (props) => {

   const toggleEdit = () => {
      props.editMode?props.setEditMode(false):props.setEditMode(true)
   }

   const handleClick = (e) => {
      toggleEdit()
      let shiftId = e.target.parentElement.id
      let fieldValue = e.target.innerText
      let fieldName = e.target.id
      props.setEditTarget({id:shiftId, name:fieldName, value:fieldValue})
      fetchShiftInfo()
   }

   const handleDelete = async(e) => {
      //TODO:Add confirmation popup
      try{
         let response = await axios
            .put(`http://localhost:3001/schedule/${props.selectedEmployee._id}/remove/${e.target.parentElement.id}`)
            .then(() => {
               props.fetchSchedule()
            })
      }catch(error){console.log(error)}
   }

   const fetchShiftInfo = async () => {
      try{
         let response = await axios
            .get(`http://localhost:3001/schedule/${props.selectedEmployee._id}/${props.editTarget.id}`)
            let formData = {
               date:response.data.date,
               start:response.data.start,
               end:response.data.end,
               period:response.data.period
            }
            props.setFormData(formData)
      }catch(error){console.log(error)}
   }

   const butifyTime = (timeObj) => {
      if(timeObj!= null){
         let timeISO = parseISO(timeObj)
         let prettyTime = format(timeISO, 'pp', new Date())
         return prettyTime
      }
   }

   const butifyDate = (dateObj) => {
      if(dateObj!=null){
         let dateISO = parseISO(dateObj)
         let prettyDate = format(dateISO, 'M/d/yyyy', new Date())
         return prettyDate
      }
   }

   useEffect(() => {
      props.fetchSchedule()
   },[])

   return(
      props.schedule && (<>
         <table>
            {props.schedule.length ?
               <thead>
                  <tr>
                     <th>Date</th>
                     <th>Start</th>
                     <th>End</th>
                     <th>L/D</th>
                  </tr>
               </thead>:
               <p>No schedule found</p>
            }
            <tbody>
               {props.schedule.map((shift) => {
                  return(
                     <tr key={shift.id} id={shift.id}>
                        <td onClick={handleClick} id="date">{butifyDate(shift.date)}</td>
                        <td onClick={handleClick} id="start">{butifyTime(shift.start)}</td>
                        <td onClick={handleClick} id="end">{butifyTime(shift.end)}</td>
                        <td onClick={handleClick} id="period">{shift.period}</td>
                        <td onClick={handleDelete} >-remove</td>
                     </tr>
                  )})}
            </tbody>
         </table>
      </>)
   )
}

export default Schedule

import axios from 'axios'
import React, {useState, useEffect} from 'react'

const Schedule = (props) => {

   const toggleEdit = () => {
      props.editMode?props.setEditMode(false):props.setEditMode(true)
   }

   const handleClick = (e) => {
      toggleEdit()
      let shiftId = e.target.parentElement.id
      let fieldValue = e.target.innerText
      let fieldName = e.target.id
      fetchShiftInfo()
      props.setEditTarget({id:shiftId, name:fieldName, value:fieldValue})
      props.setEventForm(false)
   }

   const handleDelete = (e) => {
      //TODO:Add confirmation popup
      axios
         .put(`http://localhost:3001/schedule/${props.selectedEmployee._id}/remove/${e.target.parentElement.id}`)
         .then((response) => {
            console.log(response.data);
            props.fetchSchedule()
         })
         .catch((error) => {
            console.log(error);
         })
   }

   const fetchShiftInfo = () => {
      axios
         .get(`http://localhost:3001/schedule/${props.selectedEmployee._id}/${props.editTarget.id}`)
         .then((response) => {
            props.setFormData({date:response.data.date, start:response.data.start, end:response.data.end, period:response.data.period})
         })
         .catch((error) => {
            console.log(error);
         })
   }

   useEffect(() => {
      props.fetchSchedule()
   },[])

   return(
      props.schedule && (
         <>
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
                        <tr id={shift.id}>
                           <td onClick={handleClick} id="date">{shift.date}</td>
                           <td onClick={handleClick} id="start">{shift.start}</td>
                           <td onClick={handleClick} id="end">{shift.end}</td>
                           <td onClick={handleClick} id="period">{shift.period}</td>
                           <td onClick={handleDelete} >-remove</td>
                        </tr>
                     )})}
               </tbody>
            </table>
         </>
      )
   )
}

export default Schedule

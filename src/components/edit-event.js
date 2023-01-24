import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {format, parseISO, parseJSON, parse} from 'date-fns'
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const EditEvent = (props) => {
   const [startTime, setStartTime] = useState(props.formData.start);
   const [endTime, setEndTime] = useState(props.formData.end);
   const handleInput=(e) => {
      props.setFormData({...props.formData, [e.target.name]:e.target.value})
   }
   const handleTimePick=(e) => {

   }
   const handleSubmit=(e) => {
      e && e.preventDefault()
      // let start = new Date(props.formData.start)
      // let end = new Date(props.formData.end)
      // let startISO = start.toISOString()
      // let endISO = end.toISOString()
      const body ={
         date:props.formData.date,
         period:props.formData.period,
         start:startTime,
         end:endTime
      }
      axios
         .put(`http://localhost:3001/schedule/${props.selectedEmployee._id}/edit/${props.editTarget.id}`, body)
         .then((response) => {
            props.fetchSchedule()
            props.setEditMode(false)
         })
         .catch((error) => {console.log(error)})
   }

   const renderEditForm = () => {
      if (props.editTarget.name ==='date'){
         return (
            <form onSubmit={handleSubmit}>
               <input onChange={handleInput} type='date' name={props.editTarget.name} value={props.formData.date}/>
               <button type="submit">Submit</button>
            </form>
         )
      }
      else if (props.editTarget.name ==='start'){
         return (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
               <MobileTimePicker
                  label="Change start time"
                  value={startTime}
                  onChange={(newValue) => {
                    setStartTime(newValue);
                  }}
                  onAccept={() => {
                     handleSubmit()
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
             </LocalizationProvider>
         )
      }
      else if (props.editTarget.name ==='end') {
         return (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
               <MobileTimePicker
                  label="Change end time"
                  value={endTime}
                  onChange={(newValue) => {
                    setEndTime(newValue);
                  }}
                  onAccept={() => {
                     handleSubmit()
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
             </LocalizationProvider>
         )
      }
      else if (props.editTarget.name ==='period'){
         return(
            <form onSubmit={handleSubmit}>
               <select onChange={handleInput} name={props.editTarget.name} value={props.formData.period}>
                  <option>Lunch</option>
                  <option>Dinner</option>
                  <option>Double</option>
               </select>
               <button type="submit">Submit</button>
            </form>
         )
      }
   }

   return(
      props.editMode && renderEditForm()
   )
}
export default EditEvent

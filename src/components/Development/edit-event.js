import React, {useState} from 'react'
import axios from 'axios'
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

const EditEvent = (props) => {
   const [startTime, setStartTime] = useState(props.formData.start);
   const [endTime, setEndTime] = useState(props.formData.end);
   const [date, setDate] = useState(props.formData.date);
   const URI = process.env.REACT_APP_DEV_URI;
   const handleInput=(e) => {
      props.setFormData({...props.formData, [e.target.name]:e.target.value})
   }

   const handleSubmit=(e) => {
      e && e.preventDefault()
      const body ={
         date:date,
         period:props.formData.period,
         start:startTime,
         end:endTime
      }
      axios
         .put(`${URI}/schedule/${props.selectedEmployee._id}/edit/${props.editTarget.id}`, body)
         .then((response) => {
            props.fetchSchedule()
            props.setEditMode(false)
         })
         .catch((error) => {console.log(error)})
   }

   const renderEditForm = () => {
      if (props.editTarget.name ==='date'){
         return (
            <div className='edit-form'>
               <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <MobileDatePicker
                   label="New date"
                   value={date}
                   onChange={(newValue) => {setDate(newValue)}}
                   onAccept={() => {handleSubmit()}}
                   renderInput={(params) => <TextField {...params}/>}
                  />
               </LocalizationProvider>
            </div>
         )
      }
      else if (props.editTarget.name ==='start'){
         return (
            <div className='edit-form'>
               <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <MobileTimePicker
                     label="Change start time"
                     value={startTime}
                     onChange={(newValue) => {setStartTime(newValue)}}
                     onAccept={() => {handleSubmit()}}
                     inputFormat="mm:ss"
                     mask="__:__"
                     renderInput={(params) => <TextField {...params}/>}
                   />
                </LocalizationProvider>
             </div>
         )
      }
      else if (props.editTarget.name ==='end') {
         return (
            <div className='edit-form'>
               <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <MobileTimePicker
                     label="Change end time"
                     value={endTime}
                     onChange={(newValue) => {setEndTime(newValue)}}
                     onAccept={() => {handleSubmit()}}
                     inputFormat="mm:ss"
                     mask="__:__"
                     renderInput={(params) => <TextField {...params}/>}
                   />
                </LocalizationProvider>
             </div>
         )
      }
      else if (props.editTarget.name ==='period'){
         return(
            <div className='edit-form'>
               <form onSubmit={handleSubmit}>
                  <select onChange={handleInput} name={props.editTarget.name} value={props.formData.period}>
                     <option>Lunch</option>
                     <option>Dinner</option>
                     <option>Double</option>
                  </select>
                  <button type="submit">Submit</button>
               </form>
            </div>
         )
      }
   }

   return(
      props.editMode && renderEditForm()
   )
}
export default EditEvent
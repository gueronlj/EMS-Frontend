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
      return(
         <form>
            <label>
               Date:
               <input type="date"/>
            </label>
            <label>
               Start Time:
            </label>
            <label>
               End Time:
            </label>
            <label>
               Period:
            </label>
         </form>
      )
   }

   return(
      props.editMode && renderEditForm()
   )
}
export default EditEvent

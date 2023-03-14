import React, {useState} from 'react'
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import axios from 'axios'
import {parse} from 'date-fns'

const EditEvent = (props) => {
   const defaultForm = {
      date:'',
      period:'',
      start:'',
      end:''
   }
   const [formData, setFormData] = useState(defaultForm)
   const [date, setDate] = useState();
   const URI = process.env.REACT_APP_DEV_URI;
   
   const handleInput=(e) => {
      setFormData({...formData, [e.target.name]:e.target.value})
   }
   const handleCancel=() => {
      props.setEditMode(false)
   }
   const handleDelete = async(e) => {
      //TODO:Add confirmation popup
      try{
         await axios
            .put(`${URI}/schedule/${props.selectedEmployee._id}/remove/${props.editTarget.id}`)
            .then(() => {
               props.fetchSchedule()
               props.setEditMode(false)
               props.setMessage('Shift has been deleted')
            })
      }catch(error){console.log(error)}
   }
   const handleSubmit=(e) => {
      e.preventDefault()
      // let dateISO=parse(formData.date, 'yyyy-mm-dd', new Date())
      let startISO=parse(formData.start, 'k:mm', new Date())
      let endISO=parse(formData.end, 'k:mm', new Date())
      let body = {
         date:date,
         start:startISO,
         end:endISO,
         period:formData.period,
      }
      // const body ={
      //    date:parse(props.shiftData.current.date, 'yyyy-mm-dd', new Date()),
      //    start:parse(props.shiftData.current.start, 'k:mm', new Date()),
      //    end:parse(props.shiftData.current.end, 'k:mm', new Date()),
      //    period:props.shiftData.current.period
      // }
      axios
         .put(`${URI}/schedule/${props.selectedEmployee._id}/edit/${props.editTarget.id}`, body)
         .then((response) => {
            props.fetchSchedule()
            props.setEditMode(false)
         })
         .catch((error) => {console.log(error)})
   }
   // const butifyDate = (dateObj) => {
   //    if(dateObj!=null){
   //       let dateISO = new Date(dateObj)
   //       let prettyDate = format(dateISO, 'yyyy-MM-d', new Date())
   //       return prettyDate
   //    }
   // }
   // const butifyTime = (timeObj) => {
   //    if(timeObj!= null){
   //       let timeISO = parseISO(timeObj)
   //       let prettyTime = format(timeISO, 'pp', new Date())
   //       return prettyTime
   //    }
   //}
   return(
      <form onSubmit={handleSubmit}>
         <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MobileDatePicker
             label="New date"
             value={date}
             onChange={(newValue) => {setDate(newValue)}}
             renderInput={(params) => <TextField {...params}/>}
            />
         </LocalizationProvider>
         <label>
            Start Time:
            <input
               type="time"
               name="start"
               required
               onChange={handleInput}/>
         </label>
         <label>
            End Time:
            <input
               type="time"
               name="end"
               required
               onChange={handleInput}/>
         </label>
         <div className="radios" onChange={handleInput}>
            <label>
               <input
                  name="period"
                  type="radio"
                  value="Lunch"
               />{' '}
               Lunch
            </label>
            <label>
               <input
                  name="period"
                  type="radio"
                  value="Dinner"
               />{' '}
               Dinner
            </label>
            <label>
               <input
                  name="period"
                  type="radio"
                  value="Double"
               />{' '}
               Double
            </label>
         </div>
         <div className="edit-buttons">
            <button
               type='submit'
               className="submit-btn">
               Submit
            </button>
            <button
               onClick={handleCancel}
               className="cancel-btn">
               Cancel
            </button>
            <button onClick={handleDelete}>Delete Shift</button>
         </div>
      </form>
   )
}
export default EditEvent

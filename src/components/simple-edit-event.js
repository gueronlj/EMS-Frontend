import React, {useState} from 'react'
import axios from 'axios'
import {format, parseISO, parse} from 'date-fns'

const EditEvent = (props) => {
   const [formData, setFormData] = useState(props.shiftData.current)
   const URI = process.env.REACT_APP_DEV_URI;

   const handleInput = (e) => {
      console.log(formData);
      setFormData({...formData, [e.target.name]:e.target.value})
      console.log(formData);
   }
   const handleSubmit=(e) => {
      e.preventDefault()
      const body ={
         date:parse(formData.date, 'yyyy-mm-dd', new Date()),
         start:parse(formData.start, 'k:mm', new Date()),
         end:parse(formData.end, 'k:mm', new Date()),
         period:formData.period
      }
      console.log(body);
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
   const handleCancel = () => {
      props.setEditMode(false)
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
         <label>
            Date:
            <input
               type="date"
               name="date"
               onChange={handleInput}/>
         </label>
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
         </div>
      </form>
   )
}
export default EditEvent

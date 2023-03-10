import React, {useState} from 'react'
import axios from 'axios'
import {parse} from 'date-fns'

const EventForm = (props) => {
   const defaultForm = {
      date:'',
      period:'',
      start:'',
      end:''
   }

   const [formData, setFormData] = useState(defaultForm)
   const URI = process.env.REACT_APP_DEV_URI;

   const handleInput = (e) => {
      setFormData({...formData, [e.target.name]:e.target.value})
   }

   const handleCancelBtn = () => {
     // props.setEventForm(false)
     props.setShowModal(false)
   }

   const handleSubmit = (e) => {
      e.preventDefault()
      //format date
      let dateISO=parse(formData.date, 'yyyy-mm-dd', new Date())
      //format start time
      let startISO=parse(formData.start, 'k:mm', new Date())
      //fornt end;
      let endISO=parse(formData.end, 'k:mm', new Date())
      console.log(formData);
      console.log(dateISO, startISO, endISO);
      let body = {
         date:dateISO,
         period:formData.period,
         start:startISO,
         end:endISO,
      }
      axios
         .put(`${URI}/schedule/${props.selectedEmployee._id}/new-shift`, body)
         .then((response) => {
            props.fetchSchedule()
         })
         .then(() => {
            props.setShowModal(false)
         })
         .catch((error) => {console.log(error)})
   }

   return(
      <form onSubmit={handleSubmit}>
         <div onChange={handleInput}>
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
         <div>
            <label>Day</label>
            <input
              name="date"
              type="date"
              placeholder="Date string"
              value={formData.date}
              onChange={handleInput}
            />
         </div>
         <div>
            <label>Starting time</label>
            <input
              name="start"
              type="time"
              value={formData.start}
              onChange={handleInput}
            />
         </div>
         <div>
            <label>Ending time</label>
            <input
              name="end"
              type="time"
              onChange={handleInput}
              value={formData.end}
            />
         </div>
         <div className="buttons">
            <button type="submit" className="submit-btn">
              Submit
            </button>
            <button
              onClick={handleCancelBtn} className="cancel-btn">Cancel
            </button>
         </div>
      </form>
   )
}
export default EventForm

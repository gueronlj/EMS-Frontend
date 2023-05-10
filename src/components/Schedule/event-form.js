import React, {useState} from 'react'
import axios from 'axios'
import {parse} from 'date-fns'
import { useAuth0 } from '@auth0/auth0-react';

const EventForm = (props) => {
   const { getAccessTokenSilently } = useAuth0()
   const defaultForm = {
      date:'',
      period:'',
      start:'',
      end:''
   }
   const [formData, setFormData] = useState(defaultForm)
   const URL = process.env.REACT_APP_DEV_URI;

   const handleInput = (e) => {
      setFormData({...formData, [e.target.name]:e.target.value})
   }

   const handleCancelBtn = () => {
     props.setShowModal(false)
   }

   const handleSubmit = async (e) => {
     e.preventDefault();
     let dateISO=parse(formData.date, 'yyyy-MM-dd', new Date())
     let startISO=parse(formData.start, 'k:mm', new Date())
     let endISO=parse(formData.end, 'k:mm', new Date())
     let body = {
        date:dateISO,
        period:formData.period,
        start:startISO,
        end:endISO,
     }
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
       const response = await axios(options)
       console.log(response.data);
       props.fetchSchedule()
       props.setMessage(`Shift added to ${props.selectedEmployee.name}`)
     } catch (error){
         props.setMessage(`Error: ${error.message}`)
     } finally {
         props.setShowModal(false)
     }
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

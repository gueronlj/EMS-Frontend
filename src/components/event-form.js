import React, {useState, useEffect} from 'react'
import { Form, Field } from 'react-final-form'
import axios from 'axios'

const EventForm = (props) => {

   const defaultForm = {
      id:'',
      date:'',
      period:'',
      start:'',
      end:''
   }

   const [formData, setFormData] = useState(defaultForm)

   const handleInput = (e) => {
      setFormData({...formData, [e.target.name]:e.target.value})
   }

   const handleSubmit = (e) => {
      e.preventDefault()
      let body = {
         date:formData.date,
         period:formData.period,
         start:formData.start,
         end:formData.end,
      }
      axios
         .put(`http://localhost:3001/schedule/${formData.id}/new-shift`, body)
         .then((response) => {
            console.log(response.data)
         })
         .catch((error) => {console.log(error)})
   }

   const formReset = () => {
      console.log('resetting form');
   }

   return(
      <form onSubmit={handleSubmit}>
               <div>
                  <label>Employee</label>
                  <select name="id" onChange={handleInput} value={formData.name}>
                     <option />
                     {props.employeeList.map((employee) => {
                       return(<option key={employee._id} value={employee._id}>{employee.name}</option>)
                     })}
                  </select>
               </div>
               <div onChange={handleInput}>
                  <label>
                  <input
                     name="period"
                     type="radio"
                     value="lunch"
                  />{' '}
                  Lunch
                  </label>
                  <label>
                  <input
                     name="period"
                     type="radio"
                     value="dinner"
                  />{' '}
                  Dinner
                  </label>
                  <label>
                  <input
                     name="period"
                     type="radio"
                     value="double"
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
                  <button type="submit">
                    Submit
                  </button>
                  <button
                    type="button"
                    onClick={formReset}
                  >Reset
                  </button>
               </div>
            </form>

   )
}

export default EventForm

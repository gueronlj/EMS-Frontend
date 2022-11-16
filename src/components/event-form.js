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
      setFormData({...formData, date:'1',[e.target.name]:e.target.value})
   }

   const handleOnSubmit = () => {
      console.log('submitting');
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

   return(
      <Form
         onSubmit={handleOnSubmit}
         render={({ handleSubmit, form, submitting, pristine, values }) => {
            return <form onSubmit={handleSubmit}>
               <div>
                  <label>Employee</label>
                     <Field name="id" component="select" onChange={handleInput}>
                    <option />
                    {props.employeeList.map((employee) => {
                       return(<option key={employee._id} value={employee._id}>{employee.name}</option>)
                    })}
                  </Field>
               </div>
               <label>Type:</label>
                  <div onChange={handleInput}>
                    <label>
                      <Field
                        name="period"
                        component="input"
                        type="radio"
                        value="lunch"
                      />{' '}
                      Lunch
                    </label>
                    <label>
                      <Field
                        name="period"
                        component="input"
                        type="radio"
                        value="dinner"
                      />{' '}
                      Dinner
                    </label>
                    <label>
                      <Field
                        name="period"
                        component="input"
                        type="radio"
                        value="double"
                      />{' '}
                      Double
                    </label>
                  </div>
               <div>
                  <label>Start</label>
                  <Field
                    name="start"
                    component="input"
                    type="text"
                    placeholder="Date string"
                    value={formData.start}
                    onChange={handleInput}

                  />
               </div>
               <div>
                  <label>End</label>
                  <Field
                    name="end"
                    component="input"
                    type="text"
                    placeholder="Date string"
                    onChange={handleInput}
                    value={formData.end}
                  />
               </div>
               <div className="buttons">
                  <button type="submit" disabled={submitting || pristine}>
                    Submit
                  </button>
                  <button
                    type="button"
                    onClick={form.reset}
                    disabled={submitting || pristine}
                  >
                    Reset
                  </button>
               </div>
            </form>
         }}
      />
   )
}

export default EventForm

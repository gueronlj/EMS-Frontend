import React, {useState, useEffect} from 'react'
import { Form, Field } from 'react-final-form'

const EventForm = () => {

   const handleOnSubmit = () => {
      console.log('submitting');
   }

   return(
      <Form
         onSubmit={handleOnSubmit}
         render={({ handleSubmit, form, submitting, pristine, values }) => {
            return <form onSubmit={handleSubmit}>
               <div>
                  <label>Employee</label>
                  <Field name="favoriteColor" component="select">
                    <option />
                    <option value="#ff0000">❤️ Red</option>
                    <option value="#00ff00">💚 Green</option>
                    <option value="#0000ff">💙 Blue</option>
                  </Field>
               </div>
               <label>Type:</label>
                  <div>
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
                  />
               </div>
               <div>
                  <label>End</label>
                  <Field
                    name="end"
                    component="input"
                    type="text"
                    placeholder="Date string"
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

import React, {useState} from 'react'
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import axios from 'axios'
import {parse} from 'date-fns'
import { useAuth0 } from '@auth0/auth0-react';

const EditEvent = (props) => {
  const { getAccessTokenSilently } = useAuth0()
  const defaultForm = {
    date:'',
    period:'',
    start:'',
    end:''
  }
  const [formData, setFormData] = useState(defaultForm)
  const [date, setDate] = useState();
  const URL = process.env.REACT_APP_DEV_URI;

  const handleInput=(e) => {
    setFormData({...formData, [e.target.name]:e.target.value})
  }

  const handleCancel=() => {
    props.setEditMode(false)
  }

  const handleDelete = async(e) => {
    try{
      const token = await getAccessTokenSilently()
      const options = {
        method:'put',
        url:`${URL}/schedule/${props.selectedEmployee._id}/remove/${props.editTarget.id}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      await axios(options)
      props.setFeedbackAlert(true)
      props.setMessage(`Shift was removed`)
    }catch(error) {
      props.setMessage(error.message)
    }finally{
      props.fetchSchedule()
      props.setEditMode(false)
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    let startISO=parse(formData.start, 'k:mm', new Date())
    let endISO=parse(formData.end, 'k:mm', new Date())
    let body = {
       date:date,
       start:startISO,
       end:endISO,
       period:formData.period,
    }
    try{
      const token = await getAccessTokenSilently()
      const options = {
        method: 'put',
        url: `${URL}/schedule/${props.selectedEmployee._id}/edit/${props.editTarget.id}`,
        data: body,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      const response = await axios(options)
      console.log(response.data);
      props.fetchSchedule()
      props.setFeedbackAlert(true)
      props.setMessage(`Shift was updated`)
    } catch (error){
        props.setFeedbackAlert(true)
        props.setMessage(`Error: ${error.message}`)
    } finally {
        props.setEditMode(false)
    }
  }

  return(
    <form onSubmit={handleSubmit}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <MobileDatePicker
          label="New date"
          value={props.editTarget.date}
          onChange={(newValue) => {setDate(newValue)}}
          renderInput={(params) => <TextField {...params}/>}/>
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
      <div className="buttons">
        <button
          type='submit'
          className="submit-btn">
          Submit
        </button>
        <button
          type="button"
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

import React, {useState} from 'react'
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react';

const NewEmployeeForm = (props) => {
  const { getAccessTokenSilently } = useAuth0()
  const [formData, setFormData] = useState({clockedIn:false})
  const URL = process.env.REACT_APP_DEV_URI;

  const handleInput = (e) => {
    setFormData({...formData, [e.target.name]:e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const token = await getAccessTokenSilently()
      const options = {
        method: 'post',
        url: `${URL}/admin/new-employee`,
        data: formData,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      const response = await axios(options)
      console.log(response.data);
      props.fetchEmployeeList()
      props.setFeedbackAlert(true)
      props.setMessage(`${response.data.name} was added to employee list.`)
      props.setSelectedEmployee(response.data)
    } catch (error){
        console.error(error);
        props.setFeedbackAlert(true)
        props.setMessage(error.message)
    } finally {
        props.setShowNewEmployeeModal(false)
    }
  }

  const handleCancel = () => {
    props.setShowNewEmployeeModal(false)
  }

  return(
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Name:
          <input
            type="text"
            onChange={handleInput}
            name='name'/>
        </label>
      </div>
      <div>
        <label>
          Phone:
          <input
            type="text"
            onChange={handleInput}
            name='phone'/>
        </label>
      </div>
      <div>
        <label>
          Hourly Wage($):
          <input
            type="text"
            onChange={handleInput}
            name='perHour'/>
        </label>
      </div>
      <div>
        <label>
          Daily Wage($):
          <input
            type="text"
            onChange={handleInput}
            name='perDiem'/>
        </label>
      </div>
      <div className="buttons">
        <button type='submit' className='submit-btn'>Submit</button>
        <button className='cancel-btn' onClick={handleCancel}>Cancel</button>
      </div>
    </form>
  )
}
export default NewEmployeeForm

import React, {useState} from 'react'
import axios from 'axios'

const NewEmployeeForm = (props) => {
  const [formData, setFormData] = useState({})
  const URI = process.env.REACT_APP_DEV_URI;
  const handleInput = (e) => {
    setFormData({...formData, [e.target.name]:e.target.value})
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${URI}/admin/new-employee`, formData)
      .then((response) => {
        props.setSelectedEmployee(response.data)
        props.setShowNewEmployeeModal(false)
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
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

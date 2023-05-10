import React, {useState} from 'react'
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react';

const EmployeeEditForm = (props) => {
  const { getAccessTokenSilently } = useAuth0()
  const URL = process.env.REACT_APP_DEV_URI;
  const [formData, setFormData] = useState({
    name:props.selectedEmployee.name,
    phone:props.selectedEmployee.phone,
    perDiem:props.selectedEmployee.perDiem,
    perHour:props.selectedEmployee.perHour
  })
  const handleInput = (e) => {
    setFormData({...formData, [e.target.name]:e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const token = await getAccessTokenSilently()
      const options = {
        method: 'put',
        url: `${URL}/admin/${props.selectedEmployee._id}`,
        data: formData,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      const response = await axios(options)
      console.log(response.data);
      props.setSelectedEmployee(response.data)
    } catch (error){
        console.error(error);
    } finally {
        props.setShowEditModal(false)
    }
  }

  const handleCancelBtn = () => {
    props.setShowEditModal(false)
  }

  return(
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Name:
          <input
            name="name"
            type="text"
            defaultValue={props.selectedEmployee.name}
            onChange={handleInput}/>
        </label>
      </div>
      <div>
        <label>
          Phone:
          <input
            name="phone"
            type="text"
            defaultValue={props.selectedEmployee.phone}
            onChange={handleInput}
            />
        </label>
      </div>
      <div>
        <label>
          Hourly Rate: $
          <input
            name="perHour"
            type="text"
            onChange={handleInput}
            defaultValue={props.selectedEmployee.perHour}/>
        </label>
      </div>
      <div>
        <label>
          Daily Rate: $
          <input
            name="perDiem"
            type="text"
            onChange={handleInput}
            defaultValue={props.selectedEmployee.perDiem}/>
        </label>
      </div>
      <div className="buttons">
        <button
          type="submit"
          className="submit-btn">
            Submit
        </button>
        <button
          onClick={handleCancelBtn}
          className="cancel-btn">
            Cancel
        </button>
      </div>
    </form>
  )
}

export default EmployeeEditForm

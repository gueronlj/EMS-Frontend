import React, {useState} from 'react'
import axios from 'axios'

const EmployeeEditForm = (props) => {
  const URI = 'http://localhost:3001';
  const [formData, setFormData] = useState({
    name:props.selectedEmployee.name,
    phone:props.selectedEmployee.phone,
    perDiem:props.selectedEmployee.perDiem,
    perHour:props.selectedEmployee.perHour
  })
  const handleInput = (e) => {
    setFormData({...formData, [e.target.name]:e.target.value})
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .put(`${URI}/admin/${props.selectedEmployee._id}`, formData)
      .then((response) => {
        console.log(response.data);
        props.setSelectedEmployee(response.data)
        props.setShowEditModal(false)
      })
      .catch((error) => {
        console.log(error);
      })
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
          Hourly Rate:
          <input
            name="perHour"
            type="text"
            onChange={handleInput}
            defaultValue={props.selectedEmployee.perHour}/>
        </label>
      </div>
      <div>
        <label>
          Daily Rate:
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
